---
title: SPA 배포를 위한 도커 - 의존성 cache를 위한 Dockerfile 만들기
date: 2020-07-17
category: Docker
tags:
- Docker
- DevOps
- cache
vssue: true
type: post
draft: true
---

::: tip 작성 환경

osx catalina  
docker desktop community 2.3.0.4  
도커 데몬 CPU 8, memory 2GB

:::

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
COPY --from=buildstep /app/build /usr/share/nginx/html

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


