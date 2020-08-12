---
title: SPA 배포를 위한 도커 - 들어가기
description: SPA CI/CD를 위한 Dockerfile 만들기 1편 도커란?
date: 2020-07-17
category: Docker
tags:
- Docker
- DevOps
vssue: true
type: post
draft: false
---

## 컨테이너

![](https://www.docker.com/sites/default/files/d8/2018-11/docker-containerized-and-vm-transparent-bg.png)

- 격리
  - 컨테이너는 분리된 프로세스로 실행되어 컨테이너가 격리된 환경
- 가볍다
  - 서버 하나에 다수의 컨테이너를 띄울수 있음
  - 가상화랑 비교해도 훨씬 가볍다.
  - 서버의 자원을 절약하고 최대화하기에 비용 절감


## 이식성

![](https://www.docker.com/sites/default/files/d8/styles/large/public/2018-11/Docker-Website-2018-Diagrams-071918-V5_26_Docker-today.png)

도커가 설치되어 있는 어디서나 운영이 가능
- 리눅스, 윈도우, 클라우드 등 도커가 실행 가능한 환경에서서 운영이 가능
- 이미 도커로 운영중인 서비스를 윈도우 서버에서 리눅스 서버로, 리눅스 서버에서
  클라우드 서비스로의 이관도 아무 문제가 없음



## 표준화

- 업계 표준
  - 도커는 2013년에 오픈소스로 시작되어 많이 사용되고 있다. 도커를 통해 컨테이너
    기술이 부상하면서 2015년 컨테이너 표준인
    [OCI](https://opencontainers.org/) (Open Container Initiative)을
    CoreOS(RedHat) 등과 함께 시작
  - [containerd](https://containerd.io/)라는 컨테이너 런타임 표준을 제작하여
    컨테이너 산업에서 사실상 표준

- 운영, 개발을 위한 표준화
  - 개발 조직에서 도커 이미지를 작성, 공유하면 해당 이미지를 사용하는 서비스는
    동일한 환경으로 운영할 수 있다.
  - 마찬가지로 로컬 개발환경에서도 서로 다른 OS라 하더라도 도커를 사용하여 동일한
    환경에서 개발을 진행할 수 있게 된다.


## 운영(DevOps)

### 지속적 배포
- Dockerfile, Docker Compose 등으로 도커 이미지를 코드로 관리하며 VCS
  시스템을 통해 버전 관리
- CI/CD 서비스와 통합되어 배포, 롤백을 쉽고 빠르게 도와줌

### 가용성 구성

컨테이너 하나하나를 관리하기도 쉽지 않기 때문에
[kubernetes](https://kubernetes.io/ko/docs/concepts/overview/what-is-kubernetes/)와
같은 컨테이너 오케스트레이션이 등장하게 되었다.

컨테이너 오케스트레이션에서는 서비스 규모에 맞게 리소스를 조절하고 배포를 도와주는
등 컨테이너를 통해 서비스를 구축하고 관리해 줌

----
참고
- [도커 공식 홈페이지](https://www.docker.com/resources/what-container)
- [레드햇 도커 소개](https://www.redhat.com/ko/topics/containers/what-is-docker)
- [레드햇 쿠버네티스 소개](https://www.redhat.com/ko/topics/containers/what-is-kubernetes)
- [쿠버네티스 공식 홈페이지](https://kubernetes.io/ko/)
