---
title: 어떤 프론트엔드 개발자의 개발환경 - Dotfiles
description: 개발 환경을 코드로 버전 관리하고, 자동화해보자
date: 2020-08-14
category: 개발 환경
tags:
- Dotfiles
- 개발 환경
vssue: true
type: post
draft: false
---

::: tip 글 작성 환경

osx catalina  
IntellijIDEA 2020.2  
[Homebrew](https://brew.sh/index_ko)가 설치되어 있다고 가정

:::


## 당신의 개발 환경은 어떠 합니까?

개발 공부를 시작하면서 `Hello World!`를 찍기 위해 했던 것이 무엇이었나요?  
배우려는 언어를 설치하고 코드 작성을 위한 에디터를 설치합니다.  
여러가지 환경변수를 설정할 수도 있을 겁니다.  
언어에 따라서 추가적인 도구를 설치할 수도 있을 것 같습니다.  
개발 언어의 도서 1장, 언어와 프레임워크 공식문서 1장은 대개 **install**에 관한
이야기입니다.

간단하게 언어를 배우기 위해도 설치할것이 있는데  
개발을 업으로 삼기 시작하면 어떨가요?

더 많은 것들을 설치하기 시작합니다.  
기본적으로 버전 관리 프로그램, 터미널 프로그램, 에디터, 개발 언어 등을 설치할
것이고,  
그 외에도 개발 편의를 위한 도구와 생산성을 위한 도구등 다양한 것들을
설치하게 됩니다.  
설치로 끝나면 다행이지만 설치한 프로그램 중 본인에 맞게 이것저것 설정을 맞춰놓을
것입니다.

그런데 갑자기 PC가 켜지지 않습니다.  
A/S 센터에 가서 쉽게 고쳐지면 좋겠지만  
새롭게 포맷 후 OS를 다실 깔아야 한다면?

나쁜 상황만 있는 것은 아닐 것이기에  
좋은 상황을 상상해보면 회사에서 작업 PC를 업그레이드 해줘서  
새로운 PC에 지금과 똑같은 개발 환경을 설정해야 한다면 어떻게 하시겠습니까?

아니면 학습을 위해서 회사 맥북과 개인 맥북의 개발환경을 동일하게 유지하고 싶다면?  
(저는 Dotfiles를 통해 회사 맥북과 개인 맥북의 개발 설정을 동일하게 유지하고
있습니다.)

이 상황들 모두 적게는 3~4시간에서 오래 걸리면 하루에서 이틀 정도는 걸릴 수 있는
작업입니다.

Dotfiles를 작성하였다면 매우 빠르게 개발환경을 다시 설정할 수 있을 것이고,  
개발자라면 싫어하는 반복된 작업을 줄이는 용도로도 Dotfiles를 사용할 수 있을
것입니다.  
이제 Dotfiles가 무엇인지 살펴봅시다.

## Dotfiles?!

사실 제 글을 읽는 것보다
[dotfiles.github.io](https://dotfiles.github.io/) 여기에 올라와 있는 글들과  
여러 repository를 보고 따라 해보시는 게 더 도움이 되실 수 있습니다.

Dotfiles에 대해 제 생각을 간단히 이야기하면  
**설치를 자동화하며 환경 설정을 유지보수 할 수 있는 모든 것**이라고 정의할 수
있을 것 같습니다.

그러면 어떤 것들을 Dotfiles로 관리 할 수 있을까요?

위에서 여러 번 이야기하였지만 일단 설치입니다.  
node.js 환경에는 npm이 존재하고, java 진영에는 maven이라는 패키지 매니저가
존재합니다.  
osx에서는
[Homebrew](https://brew.sh/index_ko)라는 패키지 매니저가 존재합니다.  
Homebrew를 사용하여프로그램의 설치와 의존성을 관리하게 되는데,  
이 부분은 아래에서 제가 설정한 것을 간단하게 살펴보면서 어떻게 관리하는지
알아보도록 하겠습니다.

설치하였으면 이제 설치한 프로그램의 설정을 하여야 합니다.  
설정 파일은 대개 텍스트 형태일 가능성이 높습니다.  
그 말은 결국 버전 관리가 가능하다는 뜻입니다.  
이 부분도 제가 설정한 것을 살펴보면서 조금 더 살펴보겠습니다.

그리고 아직 하지 못한 부분인데 바로 OS 환경설정입니다.  
맥북을 조금 사용하신 분들은 맥북을 처음 키고 기본적으로 설정하는 것들이 있으실
겁니다.  
저는 일단 Intellij와 단축키가 겹치는 입력 소스 단축키를 끄고 이외에도 몇 가지
기본 설정을 변경하는데요.  
이런 OS의 환경설정도 코드로 관리가 가능하다는 것을
[.macos](https://github.com/mathiasbynens/dotfiles/blob/main/.macos)라는
파일을 참고하면 알수 있습니다.

이외에도 버전관리가 가능한 모든 것이 결국 Dotfiles라는 이름으로 관리할
수 있다는 결론이 납니다.

## 어떻게 만들면 될까요~?

여러분은 언어, 프레임워크를 학습할 때 어떻게 하시나요?  
일단 무작정 만들어 볼수도 있겠지만 아예 아무것도 모를 때는 책 & 공식 문서 등을
보면서 일단 따라쳐야 할 것입니다.  
그다음으로는 배우려는 언어에서 유명한 개발자나
커뮤니티의 글 혹은 Github repo의 코드를 참고할 텐데요.

Dotfiles도
[공식 사이트](https://dotfiles.github.io/)에서 추천하는 repo나 Github에서
검색하여
[높은 star를 받은 repo](https://github.com/search?o=desc&q=dotfiles&s=stars&type=Repositories)를
보고 자신이 맘에드는 스타일을 참고하는 것이 좋을 것으로 보입니다.

여기서는 부족하지만
[제가 설정한 내용을 참고](https://github.com/yoonhona/dotfiles)하면서 어떻게
설정을 하였는지 살펴보도록 하겠습니다.

>  bash script에 이해도가 많이 부족합니다.  
>  혹시 잘못된 부분이 있으면 피드백 부탁드립니다.

### 프로그램 설치 자동화

프로그램 설치는
[`scripts/brew.sh`](https://github.com/yoonhona/dotfiles/blob/master/scripts/brew.sh)
스크립트를 실행하여 설치합니다.  
스크립트를 살펴보면

```bash
if ! [[ -x "$(command -v brew)" ]]; then
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi
```
일단 Homebrew가 설치되어 있지 않으면 Homebrew를 설치합니다.

다른 부분은 생략하고 가장 중요한 부분만 보겠습니다.
```bash
brew bundle --file=${DOTFILES_DIR}/Brewfile
```
이 명령어가 실행되면
[Hmebrew의 bundle](https://github.com/Homebrew/homebrew-bundle) 기능을
사용하여 Brewfile에 리스트업 되어 있는 패키지들을 자동으로 설치해줍니다.

결국 저는 사용하는 패키지가 변경되면 [Brewfile](https://github.com/yoonhona/dotfiles/blob/master/Brewfile)을 업데이트하여 언제 어디서나 동일한
프로그램을 자동으로 설치할 수 있게 됩니다.

::: details Brewfile 파일 만들기

Brewfile 파일이 생성되어야 할 폴더에서

```bash
brew bundle dump
```
입력하면 해당 폴더에
[Brewfile](https://github.com/yoonhona/dotfiles/blob/master/Brewfile)이
생성됨을 확인하실 수 있습니다.

:::

### 설정 자동화

저는 터미널 환경과 Hammerspoon이라는 유틸 프로그램의 환경설정을 관리하고
있는데요.  
여기서는 터미널 환경설정을 어떻게 관리하는지 살펴보겠습니다.

터미널의 환경설정 파일들은
[`.config`](https://github.com/yoonhona/dotfiles/tree/master/.config)
아래에 위치하고 있습니다.(.zshrc, .p10k.zsh, itermProfile.json)  
이 파일들만 봐서는 그냥 기존의 환경설정 파일을 복사해서 버전 관리만 하는 것으로
보일 텐데요.  
이 파일들은 실제로 터미널 프로그램에서 참조하여 환경설정에 쓰이고 있습니다.

환경설정을 진행하는 스크립트인
[zsh.sh](https://github.com/yoonhona/dotfiles/blob/master/scripts/zsh.sh)
파일을 살펴보게 되면 아래의 내용이 있습니다.

```bash
sudo rm -rf ~/.zshrc
ln -s ~/dotfiles/.config/.zshrc ~/
```
기본 설정 파일을 제거 후 Dotfiles에서 관리하는 설정 파일로
[심볼릭 링크](https://ko.wikipedia.org/wiki/%EC%8B%AC%EB%B3%BC%EB%A6%AD_%EB%A7%81%ED%81%AC)
를 생성하여 지워진 파일의 위치의 참조가 걸리도록 수정하였습니다.

이제 터미널을 실행하면 제가 Dotfiles에서 관리하는 파일로 환경구성이되기 때문에
쉽게 설정을 변경할 수 있고, 변경된 내용을 업데이트하여 항상 터미널 설정을 동일하게
유지할 수 있게 되었습니다.

이런 구성을 하여 환경설정과 관련된 부분도 Dotfiles로 관리할 수 있게 되었습니다.

## 마치며

Dotfiles를 만드는것은 매우 귀찮은 일이지만 한번 만들어 놓으면  
정말 편해지는 것을 체감할 수 있게 됩니다.

여러분 작업환경에 Dotfiles 구축을 추천드립니다.

>제 글은 macOS에 맞춰 작성되어 있지만
>[dotfiles.github.io](https://dotfiles.github.io/)에서 찾아보시면 윈도우
>환경에 맞는 Dotfiles도 찾아 보실수 있습니다.




