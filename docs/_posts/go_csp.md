---
title: Go 언어의 순차적인 프로세스간의 통신(CSP)
date: 2020-07-02
category: 언어
tags:
  - Go
  - CSP
  - Concurrency
vssue: true
draft: false
type: post
---
::: tip 이 글은  
[Concurrency in Go - Go 동시성 프로그램](http://acornpub.co.kr/book/concurrency-in-go)
스터디에 참여하면서 2장 `코드 모델링: 순차적인 프로세스 간의 통신`을 요약 정리한
내용입니다.  
:::

## 동시성과 병렬성의 차이

**다른 것과 동시에 실행되는 것**을 표현할 때 종종 동시성과 병렬성을 섞어서
사용하는데,  
코드에 대해 토론하는 경우라면 일반적으로 "동시"라는 단어를 사용해야
한다.

코드를 모델링할 때 동시성과 병렬성의 차이는 객체의 추상화에 큰 영향을 미치는
것으로 밝혀졌으며, Go는 이를 최대한 활용한다.

> 동시성은 코드의 속성이고, 병렬 처리는 실행 중인 프로그램의 속성이다.

병렬로 실행하려는 의도로 작성한 코드가 **실제로 그렇게 되리라는 보장이 있는가?**  
코어가 하나뿐인 기기에서 해당 코드를 실행하면 어떻게 되는가? 실제로 병렬적으로
실행되리라 생각할 수 있지만 그렇지 않다.  
실제로는 구분할 수 없을 정도로 빠르게 순차적으로 실행된다.

여기서 몇가지 중요한 사실은

1. 우리는 병렬적인 코드를 작성하는 것이 아나라, **병렬로 실행되기를 바라면서**
   동시성 코드를 작성하는 것
2. 동시성 코드가 **실제로 병렬로 실행되는지 여부를 모를 수**도 있다.  
   프로그램의 런타임, 운영체제, 컨테어너, 가상머신과 같은 운영체제가 실행되는
   플랫폼,  
   그리고 최종적으로 CPU와 같은 추상화 계층들을 통해서만 코드가 병렬로 실행되는
   확인할 수 있다.
3. 병렬 처리인지 아닌지는 **시간, 또는 컨텍스트**에 의해 결정된다.  
 여기서 컨텐스트는 1장의 원자성이 아닌 두 개 이상의 연산이 병렬적으로 실행됐다고
 여길 수 있는 범위로 정의

이 범위는  
시분할 관점  
프로그램이 실행되는 프로세스  
해당 프로세스의 운영체제 스레드  
프로세스가 동작하는 장비 등으로 정의할 수 있고,  
컨텍스트의 정의는 동시성과 정확성의 개념과 밀접하게 관련된다.  
이게 **컨텍스트 정의가 중요한 이유**다.  
동시에 수행되는 작업은 정의된 컨텍스트에서만 정확하다. 이것은 **모두
상대적**이다.

- 장비  
  두 대의 장비에서 각각 실행되는 계산기는 다른장비에서 실행되는 프로세스의 로직에
  영향을 미치지 않을것이라 기대할 수 있다.
- 프로세스  
  한 장비의 두 개의 프로세스는 서로 영향을 주지 않을 것이라고 예상되지만,  
  정말 서로의 논리에 영향을 주지 않을까?  
  프로세스 A가 사용하는 파일을 B가 덮어쓸 수도 있고, 메모리를 침범할 수도 있다.  
  다행히도 프로세스 경계와 운영체제는 논리적인 방식으로 동시성 문제들을 생각하는
  데 도움이 된다.
- OS 스레드  
  1장에서 이야기한 레이스 컨디션, 데드락, 라이브락, 기아상태와 같은 모든 문재가
  발생

추상화의 단계가 진행될수록 무언가를 동시적으로 모델링하는 문제는 **더욱 추론하기
어려워지고 중요**해짐  
거꾸로 동시적으로 모델링이 어려워질수록 추상화는 더욱 더 중요해진다.  
하지만 우리업계 대부분의 동시성 논리는 가장 높은 추상화 수준인 OS 스레드에서
작성되어있고, 시스템이 많은 스레드를 처리할 수 없는 경우에는 스레드 풀^thread^
^pool^을 만들고 스레드 풀에 작업을 다중화해야 했다.  
[thread 이미지](https://www.educative.io/courses/java-multithreading-for-senior-engineering-interviews/m2G48X18NDO)

Go는 CSP에서 몇가지 개념을 채용하여 채널^channel^을 사용하는 새로운 기본요소를
도입하였고  
스레드는 여전히 존재하지만 **고루틴과 채널에서** 모든 것을 모델링하며 **메모리를
공유**한다.

## CSP란 무엇인가?
CSP는 상호작용하는 순차적 프로세스들^Communicating^ ^Sequential^
^Processes^의 약자로  
1978년 찰스 안토니 리차드 호어^Chanrles^ ^Antony^ ^Richard^ ^Hoare^가 미국
계산기 학회에서 논문을 발표했다.  
이 논문에서 호어는 "프로그래밍에서 두 가지 기본 요소인 입력 및 출력이 간과되고
있으며, 특히 동시에 실행되는 코드의 경우에는 더욱 그렇다"  
당시에는 goto 문법의 사용, 객체 지향 패러다임이 싹트기 시작했고 동시성 연산에
대해서는 크게 고려하지 않았다.  
호어가 이를 바로잡기 시작하면서 그의 논문과 CSP가 탄생하였다.

호어는 CSP 프로그래밍 언어에 프로세스 간 입력 및 출력, 즉 **통신을 정확하게
모델링하기 위한 기본 요소들을 포함**시켰다.  
입력을 요구하고 다른 프로세스가 사용할 출력을 생산하는 로직의 캡슐화된 부분을
**프로세스**라고 지칭했다.

> !: 프로세스에 입력을 보냄  
> ?: 프로세스에 출력을 읽어 옴

| 연산                    | 설명                                                                |
|:-----------------------|:--------------------------------------------------------------------|
| cardreader?cardimage   | cardreader로부터 card를 읽어와서 <br>그 값(문자열) cardimage 변수에 할당 |
| linerprinter!lineimage | linerprinter에 출력을 위한 lineimage 값을 전송                         |

이러한 기본 요소를 사용해, 통신을 모델링하기 위한 일급^first-class^지원이 문제를
더 간단하고 이해하기 쉽게 해주고 있다.

인기있는 언어 대다수는 메모리에 대한 접근을 공유하고 동기화하는 방식을 선호한다.  
메모리 접근 동기화가 본질적으로 나쁜 것은 아니다. 그러나 공유 메모리 모델은 특히
대규모 프로그램이나 복잡한 프로그램에서 올바르게 활용하기 어려울 수 있다.

동시성이 Go의 강점 중 하나로 간주되는 이유가 바로 이것이다.  
처음부터 CSP의 원칙을 염두에 두고 구축됐으므로 읽고 쓰기 쉽고, 추록하기 쉽다.

[프로세스간 채널을 사용한 통신 이미지](http://arild.github.io/csp-presentation/#11)

::: tip first class citizen  
함수에 전달되고, 함수로부터 반환되고, 변수에 할당될 수 있는 값

:::

## 동시성을 지원하는 언어의 장점

많은 언어는 보통 OS 스레드 및 메모리 접근 동기화 수준에서 언어의 추상화를
끝내지만,  
Go는 다른 방식을 사용해 고루틴 및 채널의 개념으로 이를 대체하는데 고루틴은
스레드와, 채널은 뮤텍스와 비교할 수 있을 것이다.

병렬성을 고민할 필요 없이 동시성을 지원한다는 차이가 어떤 영향을 미치는지
살펴보자.

웹 서버를 개발한다고 할 시 스레드 추상화를 위한 질문은 이럴 것이다.
1. 언어가 자체적으로 스레드를 지원하는가? 아니면 라이브러리를 선택?
2. 스레드의 제한 영역은 어디에 있어야 하는가?
3. 이 운영체제의 스레드는 얼마나 무거운가?  
...

[스레드를 지원하는 자바에서 동시성 코드에 대한 체크리스트](https://github.com/code-review-checklists/java-concurrency)

실질적인 문제 해결보다는 병령성 문제를 해결하기 위해 생각해야 할 것이 많다.  
해당 언어에서 병렬성과 관련하여 추상화할 수 있는 프레임워크가 존재한다고 해서,  
코드의 복잡성이 숨겨져 있을 뿐 없어진 것이 아니다.  
**복잡성은 버그**를 낳는다.

Go에서라면 들어오는 연결마다 고루틴을 만들고, .....  
이처럼 문제에 대해 자연스럽게 생각하고 코딩하는 방식으로 연결된다.  
몇 가지 이점도 생기는데 Go의 런타임은 고루틴을 OS 스레드에 자동으로 다중화하고
스케줄링을 관리해준다.  
이것은 모델링한 방법을 변경하지 않고도 런타임 최적화할 수 있다는 것을 의미한다.  
이는 고전적인 관심사의 분리^seperation^ ^of^ ^concerns^이다.(6장에서 계속)

또 다른 이점은 동시성 방식으로 모델링된 공간의 양이 늘어난다는 것.  
위의 웹 서버예제로 다시 들어가보면 프로그램은 자신의 호스트에서 허용하는 병렬성의
양만큼 **동적으로** 확장될 수 있다.

이렇듯 CSP에서 영감을 얻은 기본요소들과 이를 지원하는 런타임의 화려한 조합이 Go에
강력한 힘을 선사한다.

## Go의 동시성에 대한 철학

Go에서 CSP 스타일로만 동시성 코드를 작성할 수 있는 것은 아니다.  
메모리 접근 동기화를 비롯한 여러가지 전통적인 방법을 지원한다.

**메모리 공유를 사용해 통신하지 마라. 대신 통신을 통해 메모리를 공유하라**  
하지만 Go 팀에서는 CSP 스타일의 사용을 권하고 있다.

그러면 어느 방법을 사용해야 할까?

@startuml
hide empty description
skinparam monochrome true

state "기본 요소 사용" as step5  
state "4) 성능상의 임계 영역인가?" as step1  
state "1) 데이터의 소유권을 \n 이전하려고 하는가?" as step2  
state "2) 구조체의 내부 상태를 \n 보호하려고 하는가?" as step3  
state "3) 여러 부분의 논리를 \n 조정해야 하는가?" as step4
state "채널 사용" as step6

step1 --> step5: Yes  
step3 --> step5: Yes  
step4 --> step5: No

step1 --> step2: No  
step2 --> step3: No  
step3 --> step4: No

step2 --> step6: yes  
step4 --> step6: yes

@enduml

1. 데이터의 소유권을 이전하려고 하는가?  
   채널은 한번에 하나의 동시 컨텐스트만 데이터 소유권을 가져야 한다는 의도를
   채널의 타입에 인코딩함으로써 메모리 소유권 개념을 전달할 수 있게 도와준다.  
   이 방식의 가장 큰 장점은 적은 비용으로 메모니 내부 큐^in-memory^ ^queue^를
   위한 버퍼링된 채널을 생성하고, 이를 통해 생산자와 소비자를 분리할 수 있고,
   동시성 코드를 다른 동시성 코드와 함께 구성할 수 있다.
2. 구조체의 내부 상태를 보호하고자 하는가?  
   메모리 접근 동기화 기본 요소를 사용할 수 있는 훌륭한 후보이자 채널을
   사용해서는 안된다는 강력한 지표  
   메모리 접근 동기화를 통해 호출자에게 임계영역을 잠그는 세부사항을 노출하지 않을
   수 있다.
3. 여러 부분의 논리를 조정해야 하는가?  
   채널은 본질적으로 메모리 접근 동기화 기본 요소보다 더 쉽게 구성 가능하고
   복잡성을 쉽게 제어할 수 있다.
4. 성능상의 임계 영역(performance-critical section)인가?  
   특정 영역이 다른 부분보다 느린 병목지점으로 밝혀지면 메모리 접근 동기화
   기본요소를 사용하자.  
   채널이 동작할 때 메모리 접근 동기화를 사용하기 때문에 채널이 더 늘릴 수 있기
   때문이다.

::: tip 동시성에 대한 Go의 철학을 요약하면

단순화를 목표로 하고,  
가능하면 채널을 사용하며,  
고루틴을 무한정 쓸 수 있는 자원처럼 다루어라

:::


