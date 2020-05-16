---
title: 어떤 FE 개발자의 Intellij 사용법 - 설치 및 업데이트
date: 2020-05-16
category: Tool
tags:
  - Intellij IDEA
  - 개발 툴
vssue: true
draft: true
---
::: tip 이 글은  
macOS, Intellij 2020.1.1에서 작성되었습니다.  
Intellij 설치 및 업데이트를 macOS 기준으로 살펴봅니다.
:::

## 설치

### Intellij 다운로드 페이지에서 다운로드 설치

가장 간편한 방법입니다.  
Intellj
[다운로드 페이지로](https://www.jetbrains.com/idea/download) 접속하여
Download를 클릭하여 설치 파일을 다운받아 설치합니다.

![down_page](./images/down_page.png)
![down_setup](./images/down_setup.png)
1. 본인의 OS를 확인
2. 자신이 사용할 Edition의 `Download` 버튼을 클릭합니다.
3. 다운된 설치 파일을 실행하여 Applications 폴더로 Intellij IDEA 파일을
   `드래그`해서 설치합니다.

### Homebrew cask 사용하여 설치
> [Homebrew](https://brew.sh/)가 설치되어 있다고 가정합니다.  
> [Homebrew cask](https://github.com/Homebrew/homebrew-cask)는 바이너리로
> 배포된 프로그램을 관리해주는 관리 툴입니다.  
> 위의 홈페이지에서 다운로드 설치 과정을 brew를 통해서 자동화해놓은 것입니다.

먼저 brew에서 Intellij를 검색해 봅시다.  
Casks 하위에
[intellij-idea](https://github.com/Homebrew/homebrew-cask/blob/master/Casks/intellij-idea.rb)와
[intellij-idea-ce](https://github.com/Homebrew/homebrew-cask/blob/master/Casks/intellij-idea-ce.rb)가
검색이 됩니다.

```bash
brew search intellij
...
==> Casks
intellij-idea ✔  intellij-idea-ce
```
`intellij-idea`는 Ultimate, `intellij-idea-ce`는 Community Edition입니다.

본인이 사용할 Edition을 설치해 줍니다.  
저는 `Ultimate`가 설치되어 있어 `Community Edition`를 설치해보았습니다.
```bash
brew cask install intellij-idea-ce
...
==> Downloading https://download.jetbrains.com/idea/ideaIC-2020.1.1.dmg
==> Downloading from https://download-cf.jetbrains.com/idea/ideaIC-2020.1.1.dmg
######################################################################## 100.0%
==> Verifying SHA-256 checksum for Cask 'intellij-idea-ce'.
==> Installing Cask intellij-idea-ce
==> Moving App 'IntelliJ IDEA CE.app' to '/Applications/IntelliJ IDEA CE.app'.
🍺  intellij-idea-ce was successfully installed!
```

명령어 한 번으로 다운로드 후 설치까지 `자동`으로 진행되었습니다.

![image_2](./images/image_2.png)

### Toolbox App 사용
> Toolbox App은 Jetbrains 프로그램들의 설치, 업데이트, 롤백 등을 간편하게 나온
> 프로그램입니다.  
> 이하 `Toolbox`라고 지칭

먼저 [Toolbox 페이지](https://www.jetbrains.com/toolbox-app/)에서 다운 및 설치해줍니다.

::: details brew로 설치  
 "brew로 설치"  
:::




