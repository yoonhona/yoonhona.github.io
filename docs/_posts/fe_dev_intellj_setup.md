---
title: 어떤 프론트엔드 개발자의 Intellij 사용법 - 나는 왜 Intellij IDEA를 사용하는가
description: 프론트엔드 개발자가 Intellij를 사용하는 이유
date: 2020-05-04
category: Tool
tags:
- Intellij IDEA
- 개발 툴
vssue: true
type: post
draft: false
---

::: tip 이 글은  
os x, Intellij 2020.1.1에서 작성되었습니다.  
:::

> 지극히 주관적인 Intellij IDEA ~~빠돌이~~사용자 시점에서 쓴 글임을
> 참고바랍니다.


##  현재 저는 프론트엔드 개발을 하고 있습니다.
하지만 프론트엔드 개발환경에서 많이 사용되는 Visual Studio Code(이하 VSCode)와
WebStorm이 아닌 Intellij IDEA(이하 Intellij)를 주 개발도구로 사용하고
있습니다.  
VSCode가 아닌 왜 Intellij를 사용하는지 제 개인적인 이야기를 해보고자
합니다.
> 참고로 WebStorm의 모든 기능은(프로젝트 설정 제외) Intellj로 들어가게 됩니다.  
> `IntelliJ IDEA provides full JavaScript support along with *all* other
> features of WebStorm`
> [WebStorm FAQ confluence IntelliJ IDEA vs WebStorm features 중](https://confluence.jetbrains.com/display/WI/WebStorm+FAQ#WebStormFAQ-IntelliJIDEAvsWebStormfeatures)

##  이클립스에서 Intellij IDEA로스
이전에 근무하던 SI 회사에서 동료 개발자의 `강력추천`으로 이클립스에서 Intellij를
사용하게 되었습니다.  
free trial 기간이라도 한번 사용해보라는 권유에 사용을 시작하여  
결국 개인 라이선스 구매 후 라이선스를 갱신해가며 현재까지 사용하고 있습니다.  
SI 회사에서는 라이선스 구매를 해주지 않았지만, 현재 재직 중인 회사에서는 라이선스
구매를 해주고 있습니다~!만 제 개인 라이선스가 기간이 남아 아직 개인 라이선스를
사용중입니다.
> 참고로 Intellij 라이선스는 개인 라이선스를 다른 사람에게 공유하지 않으면 상용
> 개발 환경에서도 사용이 가능합니다.(
> [라이선스 FAQ 중](https://sales.jetbrains.com/hc/en-gb/articles/207241015-Can-I-use-my-personal-license-for-commercial-development-)
>)


##  왜 개인 라이선스를 사용중이냐?
라이선스 구매를  
**2017년**에 첫 구매  
**2018년**에 구독 갱신  
**2달 후** Jetbrains 사에서 **50% 할인 행사**를 진행하여 재
구매(~~득템!?!?!~~)  
**그해 11월** 이팩티브 자바 3판이 출간되어 구매하여 읽던 중 출파사인 인사이트
측에서
[`이펙티브 자바
‘이판삼판’`](https://blog.insightbook.co.kr/2018/11/22/%eb%8b%b9%ec%b2%a8%ec%9e%90-%eb%b0%9c%ed%91%9c-%ec%9d%b4%ed%8e%99%ed%8b%b0%eb%b8%8c-%ec%9e%90%eb%b0%94-%ec%9d%b4%ed%8c%90%ec%82%bc%ed%8c%90/)
라는 행사를 진행하여 응모하였고 Intellij 1년 라이선스가 당첨되어(다시 한번
인사이트 출판사에 감사하다는 말을 남깁니다.)  
**2021년**까지 라이선스가 등록되어 있고 사용 중에 있습니다.  
더 편한 편집기가 나오지 않는 한 이후로도 Intellij를 사용할 것 같습니다.


## 제가 사용하면서 느낀 장점
1. 코드 작성을 위한 다양한 지원
   - 찾기  
     Intellij는 코드를 cache 하기에 굉장히 빠르게 최근 작업 파일, 코드 찾기
     등을 수행할 수 있습니다.

   - 리팩토링 VSCode에도 리팩토링 기능이 있지만,
     [공식 문사](https://code.visualstudio.com/docs/editor/refactoring)에
     나온 메서드 추출, 변수 추출 등
     [Intellij에서 제공하는 기능(Javascript)](https://www.jetbrains.com/help/idea/specific-javascript-refactorings.html)
     보다 적은 것을 확인할 수 있습니다.

   - 자동완성 및 추천 프론트 환경에 필요한 설정을 하게 되면(webpack 등) 해당
     프로젝트에 설정된 내용을 탐지하여 해당 프로젝트에 맞게 자동완성을 해주고
     Webpack 환경 설정 등과 같은 특정 라이브러리 환경에서도 자동완성을
     지원합니다.

2. 여러 플러그인
   - 테마를 비롯하여 여러 가지 플러그인이 있으나 아무래도 이 부분은 VSCode 보다
     플러그인은 적습니다. 하지만 여러 가지 도움을 주는 플러그인이 존재합니다.
     (제가 사용하는 플러그인은 추후 공유하도록 하겠습니다.)

3. Intellij에서 기본적으로 지원하는 여러 기능
   - Java, Spring 진영은 물론, 프론트 환경에서의 debug 환경을 강력하게
     지원합니다.
   - Git을 비롯하여 버전 관리 시스템을 Intellij에서 편하게 사용할 수 있도록
     강력하게 지원합니다.
   - 그 외에도 언어 외적으로 Docker 등 여러 가지 툴을 통합적으로 Intellij에서
     관리할 수 있도록 지원합니다.



## 제가 사용하면서 느낀 단점
- 무겁다 & 실행이 느리다.
   - 아무래도 Java에서 실행되다 보니 VSCode랑 비교하면 무겁습니다.
  -  처음 프로젝트 실행 시 인덱싱을 하다 보니 실행 후 인덱싱에 추가로 시간이
     소모됩니다.
  -  이 부분은 Intellij 블로그
     [IntelliJ Platform Roadmap for 2020 글](https://blog.jetbrains.com/idea/2019/12/intellij-platform-roadmap-for-2020/)에서
     2019년도에는(
     [2019.3 버전에서](https://blog.jetbrains.com/idea/2019/10/preview-the-performance-improvements-in-intellij-idea-2019-3/)
     성능 향상) 실행에 대한 성능 향상을 하였고 올해에는 인덱싱 성능향상에 목표가
     있다고 밝혔습니다.
-  페어 프로그래밍 기능 부재
   - 코로나19로 인해 전 세계적으로 재택근무가 늘어나면서 온라인 페어 프로그래밍
     기능에 대한 요구사항이 늘어나고 있는 것 같습니다.
   - [VSCode에는 Live Share](https://visualstudio.microsoft.com/ko/services/live-share/) 라는 강력한 온라인 페어프로그래밍 기능이 존재
      합니다.
   -  하지만 아쉽게도 Intellij에서는 아직 외부 서비스(혹은 외부 서비스에서
      지원하는 플러그인)에 의존하고 있는게 현실입니다.
   - 이 부분도 Intellij 블로그
     [IntelliJ Platform Roadmap for 2020 글](https://blog.jetbrains.com/idea/2019/12/intellij-platform-roadmap-for-2020/)에서
     Collaborative Editing 기능을 개발중에 있으나 장기 과제라고 밝혔습니다.

## 그래서
단점도 존재하지만 그것을 상쇄시키는 기능들이많다고 생각합니다.  
이런 기능들을 통해서 `생산성`에 많은 도움을 받을 수 있습니다.  
그래서 저는 ~~긴 말 필요 없이~~ Intellij를 `강력 추천` 드립니다~!
