---
title: SPA 배포를 위한 도커 - 의존성 cache를 위한 Dockerfile 만들기
description: 빠른 배포를 위한 cache용 Dockerfile을 만들어보자
date: 2020-07-31
category: Docker
tags:
- Docker
- DevOps
- cache
vssue: true
type: post
draft: false
---

::: tip 작성 환경

osx catalina  
docker desktop community 2.3.0.4  
도커 데몬 CPU 8, memory 2GB  
[사용된 소스 코드](https://github.com/yoonhona/study/tree/master/example/docker/cache)

:::

![](https://www.docker.com/sites/default/files/d8/2019-07/horizontal-logo-monochromatic-white.png)

일단
[Create React App](https://create-react-app.dev/)^이하⎺CRA^ 을 사용하여
간단히 React 프로젝트 세팅을 해보자.

```bash
npx create-react-app my-app
cd my-app
# node_modules 크기 확인
du -hcs node_modules
247M    node_modules
247M    total
```
CRA 문서에 따라 my-app이라는 폴더에 설치 후 만들어진 프로젝트 내 설치된 의존성(node_modules) 크기를 확인해보자.  
247M가 나온다.  
`머 이정도야` 일단 한번 도커를 사용하여 빌드하여 이미지를 만들어보자.

```nginx
# nginx.conf
server {
	listen 80;

	location / {
		root   /usr/share/nginx/html;
		index  index.html index.htm;
		try_files $uri /index.html;
	}
}
```
```dockerfile
# node alpine 이미지를 base로 하고
FROM node:alpine as build

# /app 디렉토리 생성 후 프로젝트 폴더를 /app 복사한다.
WORKDIR /app
COPY . /app

# 의존성 설치 후 빌드를 실행
RUN yarn
RUN yarn build

# 서비스를 실행할 nginx를 alpine 이미지를 base로 하여  
FROM nginx:alpine

# 만들어 놓은 nginx 설정 파일과 위에서 빌드한 결과물을 복사한다. 
COPY ./nginx.conf /etc/nginx/conf.d
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
일단 nginx 환경 설정 파일을 간단하게 만들고,  
Dockerfile도 간단하게 만들어보자.  
그리고 `docker build`하여 시간이 얼마나 걸리는지 살펴보자.
```bash
# 시간을 확인하기 위해서 BUILDKIT 활용 
DOCKER_BUILDKIT=1 docker build .
# 실행 결과
[+] Building 113.4s (14/14) FINISHED
 ...
 => [internal] load build context               8.8s
 => => transferring context: 152.55MB           8.6s
 ...
```
> [BuildKit](https://docs.docker.com/develop/develop-images/build_enhancements/)

총 113.4초가 걸린것을 확인할 수 있는데 시간을 살펴보기 전에 context라는 것을
살펴보자.  
context는 도커 빌드 시 대상이 되는 디렉토리로 도커 빌드가 일어나면 도커 데몬에
복사되게되는데  
context가 되는 프로젝트 폴더에는 node_modules가 존재하기 때문에 이미 용량이
많이 커져 있게 된다.  
이런 파일들을 context에서 제외 시킬 수 있는 `.dockerignore` 파일을 설정할
필요가 있다.
```bash
# .dockerignore
node_modules
build
```
```bash
DOCKER_BUILDKIT=1 docker build .
# 실행 결과
[+] Building 99.1s (14/14) FINISHED
 ...
 => [internal] load build context      0.0s
 => => transferring context: 509.52kB  0.0s
 ...
```
`.dockerignore`에 node_modules와 build 디렉토리를 제외하도록 설정 후 빌드를
실행하면 불 필요한 파일이 복사되지 않아 context의 크기가 줄어듬을 확인할 수
있다.

이제 빌드 과정을 살펴보자.
```bash
[+] Building 99.1s (14/14) FINISHED
...
 => [build 2/5] WORKDIR /app                             0.0s
 => [stage-1 2/3] COPY ./nginx.conf /etc/nginx/conf.d    0.0s
 => [build 3/5] COPY . /app                              0.0s
 => [build 4/5] RUN yarn                                90.8s
 => [build 5/5] RUN yarn build                           7.6s
...
```
한눈에도 알 수 있듯이 의존성 설치 명령이 `yarn`에서 90초가 넘게 걸렸다.  
지금 프로젝트에는 가장 기본적인 설정만 되어 있다는 것을 명심하자.  
앞으로 의존성은 더 늘어나면 늘어나지 줄지는 않을 것이다.  
그리고 npm 생태계 특성상 프로젝트에서 1개의 의존성을 추가하였다고 해도 1개가 아닐
가능성이 더 높다.

이제 맨 위에서 `머 이정도야` 했던 것이 이정도가 아니게 되어버렸다.

이제 이 부분을 최적화해야 할 것 같은데 이미 여러 최적화 방법이 있고 여기서는
[`multi-stage builds`](https://docs.docker.com/develop/develop-images/multistage-build/)를
사용하려 한다.

일단 의존성 cache를 위한 부분을 수정해보자.
```dockerfile
FROM node:alpine as dependences
# /app 디렉토리 생성 후 프로젝트 폴더를 /app 복사한다.
WORKDIR /app
COPY package.json /app/
# 의존성 설치
RUN yarn
...
```
변경된 부분을 살펴보면
1. `FROM node:alpine as dependences`  
   처음 FROM 절에 name이 추가되었다. 의존성 cache 후에 프로젝트를 빌드하는
   단계에서 cache를 베이스로 하기 위함이다.
2. `COPY package.json /app/`  
   전체를 복사하지 않고 프로젝트의 의존성을 관리하는 `package.json`만 복사하도록
   변경되었다.  
   COPY 명령어로 레이어가 생성될 때는 COPY되는 파일의 변경에 따라 생성이 되는데
   프로젝트 전체 파일을 대상으로 하게되면 프로젝트의 의존성 변경과 관계없이
   레이어가 변경이 되기 때문에 `package.json`만 복사하게되면 프로젝트 의존성
   변경이 없으면 기존에 빌드된 이미지를 도커가 cache 할 것이다.

의존성 cache 부분을 변경하면서 빌드를 제외하였기 때문에 빌드 부분을 추가해보면
```dockerfile
...
FROM dependences as build
COPY . /app
RUN yarn build
... 
# Nginx 부분 동일
```
라인 별로 살펴보면
1.  `FROM dependences`는 위의 의존성 cache한 부분을 base로 하고 있다.  
    이게 어떻게 동작하는지는 나중에 살펴보자.
2.  나머지 프로젝트내 파일을 복사한다.
3.  빌드를 실행한다.

크게 바뀐 부분은 의존성 설치와 빌드단계를 나눴다는 것이다.  
하지만 다들 알다시피 도커 빌드는 위에서 아래로 흐른다.  
그러면 빌드 단계 앞에 의존성 설치 부분이 존재하기 때문에 빌드 단계에서 의존성
설치가 진행되지 않을까?  
이 부분 도커 빌드를 하면서 살펴보자
```bash
DOCKER_BUILDKIT=1 docker build . --target=dependences -t dependences
# 실행 결과
[+] Building 2.4s (9/9) FINISHED
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: 37B
 => [internal] load .dockerignore
 => => transferring context: 34B
 => [internal] load metadata for docker.io/library/node:alpine
 => [dependences 1/4] FROM docker.io/library/node:alpine@sha256:...
 => [internal] load build context
 => => transferring context: 34B
 => CACHED [dependences 2/4] WORKDIR /app
 => CACHED [dependences 3/4] COPY package.json /app/
 => CACHED [dependences 4/4] RUN yarn
 => exporting to image
 => => exporting layers
 => => writing image sha256:....
 => => naming to docker.io/library/dependences

# 이미지 검색
docker images | grep dependences
# 이미지 검색 결과
REPOSITORY    TAG   IMAGE ID            CREATED             SIZE
dependences latest  67b2b7604004        About an hour ago   441MB

```
먼저 의존성 cache를 위해서 빌드를 하였다.  
빌드 명령어에 두가지가 추가되었는데  
`--target=dependences`은 첫 번째 stage인 `FROM node:alpine as
dependences`만 실행하라는 것이고 그렇게 의존성이 설치된 이미지의 tag를 지정하기
위해 `-t dependences` 추가하여 dependences라고 tag를 달아 주었다.

이어서 프로젝트 빌드 단계를 진행하면
```bash
DOCKER_BUILDKIT=1 docker build . --target=build --cache-from=dependences -t build
# 결과
[+] Building 12.0s (12/12) FINISHED                                               
 => [internal] load .dockerignore                                            0.0s
 => => transferring context: 34B                                             0.0s
 => [internal] load build definition from Dockerfile                         0.0s
 => => transferring dockerfile: 37B                                          0.0s
 => [internal] load metadata for docker.io/library/node:alpine               2.1s
 => importing cache manifest from dependences                                0.0s
 => [dependences 1/4] FROM docker.io/library/node:alpine@sha256:...          0.0s
 => [internal] load build context                                            0.0s
 => => transferring context: 509.11kB                                        0.0s
 => CACHED [dependences 2/4] WORKDIR /app                                    0.0s
 => CACHED [dependences 3/4] COPY package.json /app/                         0.0s
 => CACHED [dependences 4/4] RUN yarn                                        0.0s
 => [build 1/2] COPY . /app                                                  0.0s
 => [build 2/2] RUN yarn build                                               9.7s
 => exporting to image                                                       0.0s
 => => exporting layers                                                      0.0s
 => => writing image sha256:...                                              0.0s 
 => => naming to docker.io/library/build                                     0.0s 
```
여기서는 `--cache-from=dependences` 추가되었다.

중간에 이야기 했듯이 도커 빌드는 Dockerfile의 위에서 아래로 흐르기 때문에 의존성
설치 부분이 이미 빌드가 된 이미지를 참조하기 때문에 13~15라인은 도커에서 cache
처리된것을 확인 할 수 있다.

그렇기 때문에 90초 이상이 걸리던 의존성 설치부분이 cache되어 0초가 되었다.  
배포를 위한 빌드 단계의 시간을 절약할 수 있게 되었다.  
이제 의존성 부분을 이미지화 하는 부분을 CI단계에서 자동화 처리한다면 배포를 위해서
시간은 더 단축될것이다.


----
참고
1. 도커 [레이어](https://docs.docker.com/storage/storagedriver/)
2. [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/)
