---
title: Reverse Proxy
date: 2020-07-10
category: Network
tags:
  - proxy
  - nginx
vssue: true
draft: false
type: post
---

::: tip 이 글은

HTTP 완벽 가이드 6장  
인프라 엔지니어의 교과서(네트워크 관리편) - 7장  
참고하여 간단히 정리한 글입니다.

:::

## 한마디로 "중개자"

Proxy 서버는 클라이언트에서 요청을 받아 서버에 보내주고, 서버의 응답을 받아 클라이언트에 돌려준다.  
그렇기에 Proxy 서버는 웹 서버이자 웹 클라이언트이다.  
클라이언트 입장에서는 HTTP Request를 보내는 웹 서버이고, 서버 입장에서는 요청을 받아 처리 후 HTTP Response를 보내는 웹 클라이언트이다.

## 등장 배경

웹 사이트가 단순히 정적인 HTML에서 클라이언트에 반응하는 동적인 페이지로 서비스를 하게 되면서 클라이언트와 HTTP 통신을 담당하는 웹 서버, 도메인 로직을 처리하는 애플리케이션 서버, 데이터를 저장하는 데이터베이스 등 시스템 구성이 복잡하고 부하가 커지게 되었다.

@startuml
skinparam defaultTextAlignment center
!define ICONURL https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/v2.1.0

title 시스템 구성 예시

!includeurl ICONURL/common.puml
!includeurl ICONURL/devicons/mysql.puml
!includeurl ICONURL/devicons/redis.puml
!includeurl ICONURL/font-awesome/server.puml
!includeurl ICONURL/font-awesome/cloud.puml
!includeurl ICONURL/font-awesome-5/database.puml

FA_CLOUD(internet,internet,cloud) #White

FA_SERVER(load,로드 밸런서) #AliceBlue
FA_SERVER(proxy1,리버스 프록시) #Azure
FA_SERVER(proxy2,리버스 프록시) #Azure
FA_SERVER(proxy3,리버스 프록시) #Azure
FA_SERVER(web1, API 서버) #Beige
FA_SERVER(web2, API 서버) #Beige
FA_SERVER(web3, API 서버) #Beige
FA_SERVER(web4, API 서버) #Beige

DEV_MYSQL(mysql,mysql,node) #Bisque
DEV_REDIS(redis,redis,node) #Bisque

internet --> load

load --> proxy1
load --> proxy2
load --> proxy3

proxy1 --> web1
proxy1 --> web2
proxy1 --> web3
proxy2 --> web2
proxy2 --> web3
proxy3 --> web3
proxy3 --> web4

web1 --> mysql
web2 --> mysql
web3 --> mysql
web4 --> mysql

web1 --> redis
web2 --> redis
web3 --> redis
web4 --> redis


@enduml

여기서 리버스 프록시가 등장하게 된다.  
HTTP 서버로써 브라우저와 통신,  
애플리케이션 서버의 선택,  
HTML, 이미지 등의 정적 자원 캐싱하여 백 엔드의 부하를 줄이는 역할을 함

## 사용법

### 콘텐츠 캐싱

리버스 프록시의 대표적인 용도  
오리진 서버에서 배포되는 콘테츠를 캐싱하여 클라이언트 요청의 응답 시간 단축

### 부하분산(로드 밸런싱)

클라이언트의 요청을 여러대의 애플리케이션 서버에 분배,  
각 애플리케이션 서버의 헬스 체크를 하는 용도로 사용할 수 있으며  
부차적인 효과로 클라이언트에서 직접 애플리케이션 서버에 접근할 수 없는 보안 향상이 있다.

### 콘텐츠 압축

네트워크 통신량을 줄이기 위해 HTTP 통신 데이터를 gzip 등으로 압축하여 전송하고 이를 브라우저에서는 해제가 가능  
하지만 애플리케이션 서버에서 매번 응답 결과를 gzip 압축을 하게 되면 CPU 부하가 많이 걸리게 되는데  
이를 프록시 서버에서 대신하여 처리

### SSL 가속

[SSL 핸드세이크](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/)을 대신하여 애플리케이션 서버의 CPU의 부하를 낮춤

### 싱글 사인온

프록시 서버에서 사용자를 인증하고, 통과하지 못할 시 하위 서버로의 전송을 차단
