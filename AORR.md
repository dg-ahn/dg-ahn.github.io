# AORR 상태 머신

## 1. Target과 완료 기준

### Target

`MEMORY.md`와 `STEP1_ANALYSIS.md`에 정의된 정적 프로페셔널 웹사이트를 구현·검증·배포하기 위한 실행 상태 머신이다.

- 정적 HTML, CSS, JavaScript만 사용
- 데스크톱·태블릿·모바일 반응형 지원
- 상단 `Games` 메뉴와 접근 가능한 섹션 탐색
- 키보드·터치 지렁이 게임
- 자동 전진, 반대 방향 입력 무시, 일시정지, 점수·길이·속도 증가, 충돌·게임 오버·재시작, 최고 점수 저장
- 랜덤하게 움직이는 적
- GitHub Pages 배포
- 공개 범위는 public이며 개인정보는 최소화
- 프로필은 확인된 내용만 사용: Ahn Dong-Gyu, 안녕하세요. 반갑습니다., 2010년 이후 현재까지 삼성전자 스마트폰 과제, 삼성전자 MX 사업부 S/W 엔지니어, 공개 이메일
- 외부 폰트는 사용하지 않고 푸른 색 계열을 사용

현재 저장소 구조에는 웹사이트 소스가 없으며, `MEMORY.md`, `STEP1_ANALYSIS.md`, `cv.txt`, `claude-code-cli/claude_auto_install.md`, `claude-code-cli/env_settings.txt`, `github_token.txt`만 확인되었다. 실제 Git 작업 트리와 GitHub 원격 상태는 **[사람 확인 필요]**이다.

### 완료 기준

1. 확정된 콘텐츠만 공개되고 미기재 정보는 노출되지 않는다.
2. HTML·CSS·JavaScript가 정적 호스팅에서 동작한다.
3. 주요 화면과 `Games` 메뉴가 데스크톱·태블릿·모바일에서 사용 가능하다.
4. 키보드와 터치 입력이 요구된 게임 규칙대로 동작한다.
5. 랜덤 적이 게임 영역 안에서 움직이고, 충돌·게임 오버 규칙이 일관된다.
6. Claude의 전체 검증이 통과하고 결과가 기록된다. Claude CLI를 사용할 수 없으면 `CODEX_FALLBACK`과 그 사유가 기록된다.
7. 토큰 원문이 코드·문서·로그·Git에 남지 않는다.
8. GitHub Pages 배포 전 사람의 배포 승인을 받는다.

## 2. Act: Codex가 수행할 최소 수정

Codex는 현재 상태와 직전 Claude 결과를 읽고, 통과 기준을 만족하는 데 필요한 최소 파일만 수정한다.

- 요구사항·콘텐츠: 확인된 프로필과 게임 규칙만 반영하고, 불명확한 내용은 `[사람 확인 필요]`로 표시한다.
- HTML: 시맨틱 구조, `Games` 메뉴, 게임 안내·상태 영역, 재시작 버튼을 추가한다.
- CSS: 푸른 색 계열과 시스템 폰트로 반응형 레이아웃, 포커스 상태, 터치 영역을 최소 구현한다.
- JavaScript: 자동 전진, 방향키/WASD, 반대 방향 무시, Space 일시정지/재개, 먹이·점수·길이·속도, 벽/자기 몸 충돌, 게임 오버, Enter/R/버튼 재시작, 최고 점수 저장을 구현한다.
- 게임 적: 별도 규칙이 확정되지 않은 수·속도·충돌 결과는 구현 전에 합리적인 기본값으로 정하고 코드 주석 또는 문서에 `[사람 확인 필요]`를 남긴다.
- 보안: `github_token.txt`와 `claude-code-cli/env_settings.txt`의 내용을 읽어 출력하지 않으며, 비밀값을 소스·로그·문서에 복사하지 않는다.
- 배포: 승인 전에는 push·배포하지 않는다.

한 Retry에서는 실패 원인 하나만 선택하고, 그 원인과 직접 관련된 파일만 수정한다. 무관한 리팩터링은 다음 루프로 미룬다.

## 3. Observe: Claude가 실행할 테스트와 수집할 결과

Claude Code CLI Sonnet을 우선 사용한다. 2026-07-23 확인 결과 `claude` 명령은 `C:\Users\b2bas\.local\bin\claude.exe`에서 사용 가능하고 버전은 `2.1.218`이다. `claude auth status`는 `loggedIn: true`, `authMethod: claude.ai`, `apiProvider: firstParty`, `subscriptionType: team`을 반환했다. `claude --model sonnet`의 실제 응답 모델은 `claude-sonnet-5`였고 호출에 성공했다. 명시적 모델명 `sonnet-5`는 404였으므로 실행 시에는 `--model claude-sonnet-5`를 사용한다. 현재 검증 모드는 `CLAUDE_SONNET_5`이며, CLI 인증·실행이 실패할 때만 `CODEX_FALLBACK`으로 전환한다.

Claude는 각 루프에서 동일한 검증 명령과 절차를 실행하고 다음을 수집한다.

- 구조: 파일 목록, 진입 HTML, 참조된 CSS/JavaScript 경로, 정적 자산 누락
- HTML: 파싱 오류, 필수 메타·시맨틱 구조, 메뉴·게임 상태 영역, 링크 및 버튼
- CSS: 문법 오류, 반응형 레이아웃, 가로 overflow, 대비·포커스·터치 영역
- JavaScript: 문법 오류, 콘솔 오류, 이벤트 연결, 상태 전환
- 게임: 자동 전진, 방향키/WASD, 반대 방향 무시, Space, 먹이·점수·길이·속도, 벽/자기 몸 충돌, 게임 오버 정보, Enter/R/버튼 재시작, 최고 점수 저장, 먹이 겹침 방지
- 적: 랜덤 이동, 경계 이탈 여부, 재시작 초기화, 불공정한 즉시 충돌 여부
- 반응형: 데스크톱·태블릿·모바일 뷰포트별 렌더링과 터치 조작
- 보안: 토큰 문자열·비밀 파일 내용의 소스·로그·문서 노출 여부
- 배포 전: 정적 파일만으로 동작하는지, 상대 경로와 GitHub Pages 기준 경로가 유효한지

수집 결과에는 실행한 명령, 대상 파일, 성공/실패, 재현 단계, 오류 메시지, 스크린샷 또는 브라우저 관찰 결과를 포함한다. 토큰 원문은 결과에 포함하지 않는다.

## Self-Correcting TDD Loop

### Verifier 우선 모드

- Worker: Codex. 변경 전·후에 Claude가 실행한 테스트를 중복 실행하지 않고, Claude 결과를 근거로 원인 분석과 최소 수정만 수행한다.
- Verifier: Claude Code CLI Sonnet. 인증 및 실행이 가능해지면 실제 모델명을 확인한 뒤 사용한다. Sonnet 5가 실제 사용 가능하면 Sonnet 5를 사용하고, 불가능하면 확인된 최신 Sonnet 모델을 사용한다.
- 현재 상태: Claude CLI 인증·실행 가능. 실제 Verifier 모델은 `claude-sonnet-5`이다. Sonnet 5를 우선 사용하며, 동일 모델 호출이 실패할 때만 사용 가능한 최신 Sonnet을 재확인하고, Claude 자체를 사용할 수 없을 때만 `CODEX_FALLBACK`으로 전환한다.

### 실행 순서

1. Claude가 변경 전 전체 테스트를 실행한다.
2. Claude가 실패 항목, 핵심 오류, 관련 파일·라인, fingerprint를 보고한다.
3. Codex가 원인 하나에 필요한 최소 코드만 수정한다.
4. Claude가 변경 후 동일한 전체 테스트를 재실행한다.
5. 실패하면 Claude가 새 결과와 fingerprint를 보고한다.
6. Codex가 같은 규칙으로 최소 수정 후 Claude에 재검증을 요청한다.
7. Claude의 전체 테스트가 통과한 경우에만 `PASSED`로 전환한다.

### 검증 범위

- 파일 존재와 상대 경로
- HTML 구조와 내부 링크
- CSS 반응형
- JavaScript 오류
- 지렁이 게임 기능과 키보드·터치 입력
- 로컬 HTTP 응답
- 375px, 768px, 1440px 뷰포트
- GitHub Pages 호환성

### 실패 기록 형식

각 검증 결과에 다음 필드를 기록한다.

```text
실행 주체: Claude | Codex
모델: 실제 모델명 또는 CODEX_FALLBACK
명령: <실행한 명령>
exit code: <정수>
핵심 오류: <요약>
관련 파일·라인: <경로:라인 또는 없음>
fingerprint: <안정적인 오류 식별자>
최종 상태: <READY|ACTING|VERIFYING|RETRYING|PASSED|DEPLOY_APPROVAL_REQUIRED|DEPLOYED|BLOCKED|HITL_REQUIRED>
```

토큰·인증 정보는 필드에 포함하지 않는다.

### Retry 규칙

- 오류별 최대 Retry 횟수는 6회다.
- 동일 fingerprint가 6회 반복되면 더 수정하지 않고 `BLOCKED` 또는 `HITL_REQUIRED`로 중지한다.
- 한 Retry에서는 원인 하나와 관련 파일만 최소 수정한다.
- 테스트 삭제, assertion 완화, 검증 범위 축소는 금지한다.
- 동일 테스트를 유지한 채 Claude가 전체 검증을 재실행해야 한다.
- Claude CLI를 사용할 수 없을 때만 Codex가 수정과 테스트를 모두 수행하며, 모든 결과에 `CODEX_FALLBACK`과 fallback 이유를 기록한다.

## 4. Reason: 실패 원인 분류

실패는 아래 분류 중 정확히 하나를 주원인으로 선택한다.

| 분류 | 판정 예시 | 기본 조치 |
|---|---|---|
| HTML | 태그 구조, 링크, 버튼, 접근 가능한 이름, 필수 요소 오류 | 관련 HTML만 수정 |
| CSS | 반응형 깨짐, overflow, 대비, 포커스, 터치 영역 오류 | 관련 CSS만 수정 |
| JAVASCRIPT | 문법·이벤트·상태 관리·저장 오류 | 관련 JS만 수정 |
| GAME | 이동·점수·속도·충돌·게임 오버·재시작·적 규칙 오류 | 게임 관련 JS/HTML만 수정 |
| CONTENT | 확인되지 않은 프로필 정보, 문구, 공개 범위 오류 | 관련 콘텐츠만 수정; 불명확하면 HITL_REQUIRED |
| TEST | 검증 명령·픽스처·테스트 절차 자체의 오류 | 테스트 설정/절차만 수정 |
| ENVIRONMENT | 런타임·브라우저·의존 도구·권한 문제 | 환경 복구 또는 CODEX_FALLBACK |
| GITHUB | 원격 저장소·인증·브랜치·Pages 설정 문제 | push 전 사람 승인 및 환경 확인 |
| DEPLOYMENT | 배포 경로·빌드 산출물·Pages 반영 문제 | 배포 설정만 수정; 승인 필요 |
| UNKNOWN | 재현되지 않거나 분류 근거가 부족한 실패 | 추가 관찰 후 HITL_REQUIRED |

토큰·권한·공개 개인정보와 관련된 실패는 원인 분류와 별개로 즉시 `HITL_REQUIRED`를 고려한다.

## 5. Repeat: Codex 최소 수정 → Claude 동일 테스트 재실행

상태 전이는 다음 순서를 따른다.

```text
READY
  → ACTING
  → VERIFYING
  → PASSED
```

Claude 검증이 실패하면 다음과 같이 반복한다.

```text
VERIFYING --실패 1개--> RETRYING
RETRYING --원인 1개·관련 파일만 수정--> ACTING
ACTING --> VERIFYING
```

- `RETRYING`에서 Codex는 Claude 결과의 주원인 하나만 수정한다.
- Claude는 동일한 전체 검증을 다시 실행한다. 일부 테스트만 통과해도 `PASSED`로 바꾸지 않는다.
- 같은 실패가 반복되거나 수정 범위가 요구사항을 넘어가면 `HITL_REQUIRED`로 전환한다.
- Claude CLI 사용 불가 시 `VERIFYING → CODEX_FALLBACK`으로 기록하고, Codex가 동일한 검증 항목을 수행하되 결과의 검증자를 `Codex`로 명시한다. 이 경우에도 불명확한 성공은 `PASSED`로 기록하지 않는다.

## 6. Stop과 HITL 조건

### Stop

- Claude의 전체 검증이 통과하면 `PASSED`에서 해당 개발 루프를 종료한다.
- 모든 구현 루프가 `PASSED`이고 배포 전 검증이 완료되면 `DEPLOY_APPROVAL_REQUIRED`로 멈춘다.
- 사람의 배포 승인이 확인된 뒤에만 push·GitHub Pages 배포를 수행한다.
- 배포가 성공하고 URL·핵심 화면·게임을 확인하면 `DEPLOYED`로 종료한다.

### HITL 조건

- 프로필·경력·이메일·공개 범위가 현재 문서와 다르게 해석될 가능성이 있을 때
- 게임의 랜덤 적 수·속도·충돌 결과처럼 미확정 규칙을 외부 공개 전에 결정해야 할 때
- Claude CLI 설치·인증·실행이 불가능하고 CODEX_FALLBACK으로도 신뢰 가능한 검증이 어려울 때
- 동일 원인 Retry가 반복되거나 관련 없는 파일 수정이 필요할 때
- 저장소가 올바른 Git 작업 트리인지, 원격·브랜치·Pages 설정이 무엇인지 확인할 수 없을 때
- 토큰·개인정보·외부 서비스 권한이 노출될 위험이 있을 때
- push 또는 배포를 실행하려 할 때

HITL이 필요한 경우 상태를 `HITL_REQUIRED`로 기록하고 질문·근거·선택이 필요한 값을 함께 제시한다. 외부 권한이나 승인이 없으면 `BLOCKED`로 종료한다.

## 7. 개발 루프 표

| 루프 | 입력 | Codex Act | Claude Verify | 통과 기준 | 다음 상태 |
|---|---|---|---|---|---|
| L0 요구사항·환경 확인 | `MEMORY.md`, `STEP1_ANALYSIS.md`, `cv.txt`, 저장소 구조 | 확정 콘텐츠·게임 규칙·미확정 적 규칙·파일 위치를 정리하고 `[사람 확인 필요]`를 표시 | 파일 구조, 비밀 파일 노출, Git 작업 트리·원격 확인 가능 여부를 읽기 전용 점검 | 요구사항과 작업 위치가 일치하고 불명확한 값이 표시됨 | ACTING → VERIFYING |
| L1 정보 구조·HTML | L0 결과, 확인된 프로필 | 시맨틱 HTML, 반응형 진입 구조, `Games` 메뉴, 게임 상태·재시작 요소를 최소 구현 | HTML 파싱, 링크·버튼·메뉴, 접근 가능한 이름, 상대 경로 검증 | 구조 오류 없음, 확인된 콘텐츠만 표시 | ACTING → VERIFYING |
| L2 Editorial CSS | L1 HTML, 푸른 계열·외부 폰트 금지 | 시스템 폰트, 레이아웃, 모바일 메뉴, 반응형 규칙, 포커스·터치 영역을 최소 구현 | 데스크톱·태블릿·모바일 렌더링, overflow, 대비·포커스 확인 | 세 뷰포트에서 핵심 콘텐츠와 메뉴 사용 가능 | ACTING → VERIFYING |
| L3 지렁이 게임 코어 | 확정 지렁이 게임 규칙 | 자동 전진, 입력, 점수, 성장, 속도 단계, 충돌, 일시정지, 게임 오버, 재시작, 최고 점수 저장 구현 | 동일 게임 테스트 전체와 콘솔·저장소 결과 수집 | 모든 확정 규칙 통과 | ACTING → VERIFYING |
| L4 랜덤 적 | L3 게임, 적 규칙의 Codex 기본안 | 적 이동·경계·충돌·초기화 구현; 불명확한 공개 규칙 표시 | 반복 실행, 랜덤성, 경계, 충돌, 재시작과 난이도 관찰 | 적 기능이 안정적이고 미확정 정책은 승인 또는 표시됨 | ACTING → VERIFYING 또는 HITL_REQUIRED |
| L5 통합·보안·접근성 | L1~L4 산출물 | 관련 파일만 통합하고 토큰·미기재 정보·외부 폰트·콘솔 오류를 제거 | Claude 전체 검증, 키보드·터치·반응형·보안 회귀 테스트 | 전체 검증 통과 | PASSED 또는 RETRYING |
| L6 배포 승인 준비 | 모든 루프 PASSED, GitHub Pages 정보 | 배포 전 산출물과 변경 요약만 준비; push하지 않음 | 정적 호스팅 경로·배포 체크리스트를 검증 | 배포 가능 상태이며 승인 대기 | DEPLOY_APPROVAL_REQUIRED |
| L7 배포 | 사람의 명시적 승인, 원격·브랜치·Pages 설정 | 승인된 범위만 push·배포 | 배포 URL, 핵심 화면, Games, 게임, 콘솔을 동일 검증 | 실제 URL에서 완료 기준 충족 | DEPLOYED 또는 RETRYING |

초기 상태는 `READY`이다. 현재 요청에서는 이 문서만 갱신했으며, 코드 수정·테스트·push·배포는 수행하지 않았다. Claude CLI 확인 명령은 상태·모델 가용성 확인을 위한 probe이며 프로젝트 테스트가 아니다.
## Step 8 — CHANGE_REQUEST 문서화 실행 순서

1. MEMORY Project Settings, STEP1_ANALYSIS, 배포 URL, 마지막 commit, 현재 코드의 확인 사실을 수집한다.
2. 공개 콘텐츠·개인정보·IA·게임 속도·적 규칙·접근성·언어/메타데이터·Footer 요청을 원자적 Change Item으로 분리한다.
3. 확인되지 않은 경력·프로젝트·연구·공개 여부는 추측하지 않고 `[사람 확인 필요]`와 `HITL_REQUIRED`로 분류한다.
4. CR-01~CR-21의 의존성, Claude 변경 전/후 검증, 회귀 테스트, 위험도, HITL을 표에 기록한다.
5. 이번 단계는 문서 작성만 종료하며 코드 수정·테스트·commit·push·배포는 수행하지 않는다.

## Step 8 follow-up — 추가 요청 분석 순서

1. 마지막 배포 commit/URL, Games·Projects·Hero 현재 구조와 Git 상태를 확인한다.
2. Tetris, Samsung Galaxy Smartphone 문자열, Hero 프로필 이미지 요청을 CR-22~CR-24로 분리한다.
3. 사용자 제공 문자열 외 프로젝트 사실, 게임 규칙, 이미지 신원·출처를 추측하지 않는다.
4. 의존성·완료 기준·Claude 변경 전/후 검증·회귀 테스트·위험도·HITL을 문서화한다.
5. 문서화만 종료하며 코드 수정·테스트·commit·push·배포는 수행하지 않는다.

## Step 9 follow-up 2 — 실행 결과와 중지

1. CR-25~CR-28을 의존성 순서대로 최소 수정한다.
2. Claude pre-test가 없으면 `CODEX_FALLBACK`으로 syntax·정적 assertion·로컬 HTTP를 수행한다.
3. Tetris 문자, Games 순서, Snake 제목, Projects placeholder 회귀를 확인한다.
4. 모든 항목이 fallback 기준을 통과하면 `DEPLOY_APPROVAL_REQUIRED`로 설정한다.
5. 사용자 승인 전 commit·push·재배포하지 않는다.

## Step 9 follow-up — 실행 순서와 중지

1. MEMORY 실행 정보와 CR-22~CR-24 의존성을 확인한다.
2. CR-22 Tetris 규칙·조작·점수·접근성 정책을 Claude pre-test로 확인한다.
3. 규칙이 없으면 추측 구현하지 않고 `HITL_REQUIRED`로 중지한다.
4. CR-22 승인 후에만 CR-23 프로젝트명, CR-24 Hero 이미지 순서로 진행한다.
5. 이번 실행에서는 중지 상태를 기록하고 코드 수정·테스트·commit·push·배포를 수행하지 않는다.

## Step 9 follow-up 재개 — Tetris 규칙 제공 후 순서

1. 사용자 제공 Tetris 규칙을 CR-22 구현 입력으로 고정하고 Claude pre-test를 요청한다.
2. Claude 결과가 없으면 `CODEX_FALLBACK`으로 CR-22를 최소 구현하고 정적/HTTP 회귀를 수행한다.
3. CR-23은 사용자 제공 프로젝트명만 추가하고 경력 세부정보는 만들지 않는다.
4. CR-24는 이미지 출처·라이선스·alt·실제 인물 묘사 정책이 없으면 `HITL_REQUIRED`로 중지한다.
5. commit·push·배포 없이 변경·검증·중지 결과만 기록한다.
## Step 8 follow-up 2 — 추가 요청 분석 순서

1. 마지막 배포 commit/URL과 Tetris cell 텍스트, Games DOM 순서, Snake 제목, Projects placeholder를 확인한다.
2. 영어 알파벳 제거, Tetris→Snake 순서, Snake 제목, Projects placeholder를 CR-25~CR-28로 분리한다.
3. CR-25는 색상·모양·테두리 구분과 접근성 정책을 함께 기록하고, CR-28은 프로젝트명 외 정보를 만들지 않는다.
4. 각 항목의 Claude 변경 전/후 검증과 회귀 테스트를 정의한다.
5. 문서화만 종료하며 코드 수정·테스트·commit·push·배포는 수행하지 않는다.
