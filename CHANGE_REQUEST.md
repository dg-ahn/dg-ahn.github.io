# Step 8 — 사용자 수정 요청 분석

## 확인 범위와 제한

- 기준: `MEMORY.md` Project Settings, `STEP1_ANALYSIS.md`, `AORR.md`, 마지막 정상 배포 commit `b5065e1`, `https://dg-ahn.github.io/`, 현재 `index.html`, `styles.css`, `script.js`, 추가 자료.
- 이번 단계는 분석·문서화만 수행한다. 코드 수정, 테스트 실행, commit, push, 배포는 수행하지 않는다.
- 실제 프로젝트 목록, 프로젝트명·역할·기간·기술·성과·공개 링크, 연구 내용, 공개 가능한 경력 자료는 제공되지 않았다. 해당 내용은 추측하지 않고 `[사람 확인 필요]`로 분류한다.
- `[Human verification needed]`는 방문자 공개 문구로 유지하지 않는다. 공개 콘텐츠에 필요한 미확인 사항은 `[사람 확인 필요]`로 분류하되, 실제 적용은 사람 승인 후 별도 Change Item에서 수행한다.

## 원자적 Change Items

| ID | 원문 | 분류 | 현재/기대 동작 | 대상 파일 | 의존성 | 완료 기준 | Claude 검증 | 회귀 테스트 | 위험도 | HITL |
|---|---|---|---|---|---|---|---|---|---|---|
| CR-01 | Projects의 공개 placeholder 제거 | CONTENT | 현재 `index.html` Projects에 `[Human verification needed]`가 노출된다. 확인되지 않은 프로젝트를 만들지 않고 `[사람 확인 필요]` 분류로 전환한다. | `index.html`, `CHANGE_REQUEST.md` | 없음 | 영어 placeholder가 방문자에게 없고 미확인 프로젝트가 사실처럼 보이지 않는다. | Projects 텍스트와 배포 HTML 대조 | Projects anchor/섹션·내비게이션 유지 | 중간 | `[사람 확인 필요]`를 공개할지 내부 분류로 둘지 결정 |
| CR-02 | 확인된 프로젝트 정보만 노출 | CONTENT | 프로젝트명·역할·기간·기술·성과·공개 링크가 확인되지 않았다. 임의 작성 금지. | `index.html` | CR-01 | 출처 없는 필드를 추가하지 않고 자료 제공 후 필드별 출처를 둔다. | 출처 없는 프로젝트 정보가 없는지 확인 | Projects 레이아웃·내부 링크 | 높음 | 프로젝트 자료와 공개 범위 승인 |
| CR-03 | About의 Samsung MX/2010 스마트폰 경력 공개 여부 확인 | CONTENT | 현재 About에 해당 경력 문구가 있다. 공개 유지 여부는 미결정이다. | `index.html`, `MEMORY.md` | 없음 | 승인된 경우에만 공개하고 미승인 시 `[사람 확인 필요]`로 분류한다. | 승인 사실과 문구 대조 | About anchor·렌더링 | 높음 | 공개 유지/비공개 결정 |
| CR-04 | About을 구체적인 검증 경력 콘텐츠로 교체 | CONTENT | 현재 구체적인 공개 경력 자료가 부족하다. 확인된 사실만 역할·기간·범위로 구조화한다. | `index.html` | CR-03 | 회사 내부 정보나 제품명을 추측하지 않는다. | 사실 출처와 문구 대조 | About 모바일 줄바꿈 | 높음 | 공개 가능한 경력 자료 제공 |
| CR-05 | Experience의 구체 경력 콘텐츠 분석·교체 | CONTENT | 현재 추상적인 `Product development...` 문구만 있다. 내부 프로젝트명·제품명·업무 내용은 확인되지 않았다. | `index.html` | CR-03, CR-04 | 검증된 경력만 추가하고 자료가 없으면 `[사람 확인 필요]`로 둔다. | 성과/기술 출처 검토 | Experience anchor·섹션 순서 | 높음 | 공개 역할·기간·업무 승인 |
| CR-06 | Research의 구체 연구 콘텐츠 분석·교체 | CONTENT | 연구명·방법·결과·링크가 확인되지 않았고 현재 문구는 추상적이다. | `index.html` | 없음 | 확인된 연구만 추가하고 미확인 연구를 창작하지 않는다. | 연구 사실·링크 출처 검토 | Research 섹션·내비게이션 | 높음 | 공개 연구 자료 제공 |
| CR-07 | Contact 이메일 공개 여부 결정 | SECURITY | 현재 `mailto:b2basic.ahn@gmail.com`이 공개되어 있다. 계속 공개할지는 미결정이다. | `index.html`, `MEMORY.md` | 없음 | 공개 유지/비공개 결정이 기록된다. 이번 단계에서는 삭제·변경하지 않는다. | 결정과 구현 상태 대조 | Contact anchor·mailto | 높음 | 사람 승인 필수 |
| CR-08 | 이메일 비공개 시 대체 연락 방식 정의 | SECURITY, CONTACT | 연락 폼·별도 공개 계정·안내 문구 중 대체 방식은 확인되지 않았다. | `index.html`, `README.md` 또는 별도 문서 | CR-07 | 운영 책임·개인정보·정적 호환성을 확인한 방식을 선택한다. | 외부 서비스·수집 정보 검토 | Contact가 비지 않는지 확인 | 높음 | 대체 방식·계정·운영 주체 승인 |
| CR-09 | Games를 포트폴리오와 분리할지 결정 | STRUCTURE, UI_UX | 현재 Games가 1페이지 주요 섹션으로 노출되어 전문 포트폴리오와 위계가 불명확하다. | `index.html`, 향후 `games.html` | CR-01~CR-08 | IA와 Games 목적·위치·내비게이션만 결정한다. 이번 단계에서는 이동하지 않는다. | IA·주요 anchor 일관성 검토 | 기존 포트폴리오 경로 | 중간 | 별도 페이지/사이드 프로젝트 여부 선택 |
| CR-10 | 표시 Speed와 실제 타이머 속도 동기화 | BUG, PERFORMANCE, GAME | `setTimer()`는 시작/재시작 때만 설정된다. 먹이 획득 후 점수만 바뀌어 표시 단계와 실제 주기가 달라질 가능성이 있다. | `script.js` | CR-11 | 단계 변화 시 실제 interval이 표시 정책과 동기화되고 중복 timer가 없다. | 먹이 전후 interval·이동 간격 검토 | pause/restart/game-over 단일 timer | 높음 | 기대 속도 정책 승인 |
| CR-11 | 점수·속도 단계·최대 속도 정책 확정 | GAME, UNKNOWN | 먹이 1개당 10점인데 `1 + Math.floor(score / 5)`라 첫 획득 후 Speed가 3으로 뛴다. 기대 단계·조건·최대 속도는 문서에 없다. | `script.js`, `MEMORY.md`, `AORR_LOG.md` | CR-10 | 점수 10점 단위와 단계 mapping이 문서·코드·검증에 일치한다. | 점수별 Speed mapping 검토 | 0/10/경계/최대 단계 | 높음 | `[사람 확인 필요]` — 속도 곡선과 최대값 |
| CR-12 | 보라색 적의 규칙 안내 추가 | GAME, CONTENT | MEMORY와 코드에 random-moving enemy가 있다. 인접 칸 무작위 이동, 뱀 머리 충돌 시 game over, 점수 보상/감점 없음이 확인된다. 화면 설명에는 없다. | `index.html`, `script.js`, `styles.css` | CR-09 | 존재·이동·충돌·점수 관계를 규칙에 명시한다. 의도된 기능이 불확실하면 `[사람 확인 필요]`로 둔다. | UI 설명과 실제 동작 대조 | 적 충돌·음식·game over | 중간 | 의도된 규칙인지 승인 |
| CR-13 | 모바일 메뉴 열기·닫기 점검 | RESPONSIVE, NAVIGATION | toggle은 `is-open`/`aria-expanded`를 바꾸고 링크 선택 후 닫는다. Escape·바깥 클릭·닫기 버튼은 정의되지 않았다. | `index.html`, `script.js`, `styles.css` | CR-09 | 열기·닫기·링크 선택 후 닫힘·키보드 동작을 정의한다. | 375px 상태·focus·aria 검토 | 메뉴 재진입·anchor 이동 | 중간 | Escape/바깥 클릭 필요 여부 |
| CR-14 | 모바일 터치 방향키 점검 | RESPONSIVE, GAME | `data-direction` 버튼이 방향을 바꾸고 역방향은 막는다. 터치 피드백·상태 안내는 추가 정의가 필요하다. | `index.html`, `script.js`, `styles.css` | CR-12 | 네 방향 버튼이 상태별로 일관되게 작동한다. | touch mapping 검토 | 방향 입력·역방향·재시작 | 중간 | 터치 UX·버튼 크기 승인 |
| CR-15 | 게임 보드 포커스와 키보드 조작 점검 | ACCESSIBILITY, GAME | 보드는 `tabindex="0"`지만 keydown listener는 document에 있다. 포커스와 조작 범위를 명확히 해야 한다. | `index.html`, `script.js` | CR-14 | focus 위치·조작 안내·입력 대상이 일관된다. | focus·Arrow/WASD/Space/Enter/R 검토 | 보드 focus·메뉴 focus·재시작 | 중간 | 키보드 입력 범위 승인 |
| CR-16 | 시작 전 방향키와 Start 동작 일관화 | GAME, UI_UX | `changeDirection()`은 방향키만으로 시작시키고 Start는 `restart()` 후 시작한다. 초기화·방향·안내가 같은지 정의가 필요하다. | `script.js`, `index.html` | CR-15 | 두 경로의 상태·점수·방향·focus 정책이 일치한다. | 두 상태 전이 대조 | 초기·방향키 시작·Start·재시작 | 중간 | 방향키 자동 시작 유지 여부 |
| CR-17 | 판독기용 상태·점수·적·음식 정보 개선 | ACCESSIBILITY | toolbar는 `aria-live`, 상태는 `role=status`지만 보드의 음식·적·뱀 위치는 의미 있는 텍스트가 없다. | `index.html`, `script.js` | CR-12, CR-15 | 상태·점수·음식·적 충돌 정보를 과도한 반복 없이 이해한다. | NVDA/VoiceOver semantic output 검토 | 상태·점수·game over·적/음식 | 높음 | 위치 안내 정책 승인 |
| CR-18 | 사이트 언어 방향 결정 | UI_UX, CONTENT | `lang="en"`인데 게임 제목에 한국어 `지렁이`가 함께 표시되고 나머지는 대체로 영문이다. | `index.html`, `MEMORY.md` | 없음 | 영문/국문/언어 전환 중 한 방향을 승인하고 UI·lang 정책을 정의한다. | lang·visible label·aria 언어 검토 | 제목·메뉴·게임 안내 | 중간 | `[사람 확인 필요]` |
| CR-19 | 검색·공유 메타데이터 정비 | UI_UX, DEPLOYMENT | title/description은 있으나 Open Graph와 favicon link가 없다. title/description에는 인코딩이 불명확한 문자가 보인다. | `index.html`, asset 후보 | CR-18 | title/description/og title·description·url·image 정책을 정의한다. | head·공유 preview 검토 | title/description·상대 경로 | 중간 | 대표 문구·공유 이미지 승인 |
| CR-20 | favicon 정책 정의 | UI_UX, DEPLOYMENT | 현재 `link rel="icon"`이 없다. 아이콘 출처·저작권·경로가 미정이다. | `index.html`, asset 후보 | CR-19 | 승인된 favicon 또는 미사용 결정을 문서화한다. | favicon 요청·404·경로 검토 | 기존 asset 경로 | 낮음 | 아이콘 승인 |
| CR-21 | Footer 문구 결정 | CONTENT, UI_UX | `Static portfolio · GitHub Pages compatible`의 방문자 필요성이 미결정이다. | `index.html`, `MEMORY.md` | CR-09, CR-18 | 유지·방문자 중심 교체·삭제 중 하나를 승인한다. | footer 문구·언어·목적 검토 | 위치·overflow·모바일 표시 | 낮음 | `[사람 확인 필요]` |

## 중복·충돌·모호성

1. CR-01은 영어 placeholder 제거를 요구하지만 `[사람 확인 필요]`를 공개할지 내부 분류로 둘지는 별도 결정이다.
2. CR-03~CR-08은 경력·개인정보의 공개 유지 여부가 핵심이며 사실이라고 가정해 확장하면 안 된다.
3. CR-09는 Games를 이동하지 말라는 이번 단계 제한과 충돌하지 않는다. IA Change Item만 작성한다.
4. CR-10과 CR-11은 속도 정책 승인 후 구현하는 순서다.
5. CR-12의 적은 MEMORY와 코드에 근거가 있지만 방문자에게 의도된 규칙인지 사람 확인이 필요하다.
6. CR-18 승인 전에는 UI·메타데이터 언어를 임의로 통일하지 않는다.

## 권장 의존성 순서

`CR-01 → CR-02 → CR-03 → CR-04 → CR-05 → CR-06 → CR-07 → CR-08 → CR-09 → CR-11 → CR-10 → CR-12 → CR-13 → CR-14 → CR-15 → CR-16 → CR-17 → CR-18 → CR-19 → CR-20 → CR-21`

공개 콘텐츠, IA, 속도, 언어/메타데이터 승인이 없으면 해당 항목은 `HITL_REQUIRED`로 중지한다.

## 원문 보존

> [Step 8 - 사용자 수정 요청 분석]
>
> 배포된 포트폴리오 사이트를 다음 기준으로 개선해줘.
>
> 1. Projects 섹션의 `[Human verification needed]`를 제거하고 확인되지 않은 정보는 `[사람 확인 필요]`로 분류한다.
> 2. About, Experience, Research의 추상 문구를 구체화할 수 있도록 분석하되 확인되지 않은 경력·프로젝트·연구는 작성하지 않는다.
> 3. Contact 이메일 공개 여부와 비공개 시 대체 방식을 별도 Change Item으로 정의한다. 이번 단계에서는 이메일을 변경하지 않는다.
> 4. Games의 전문 포트폴리오 내 위치를 검토하고 이동은 하지 않는다.
> 5. Snake Speed 표시와 실제 timer, 점수 10점과 `score / 5` 계산의 불일치를 분석한다.
> 6. 보라색 이동 장애물의 존재·이동·충돌·점수 규칙을 Change Item으로 정의한다.
> 7. 모바일 메뉴, 터치 방향키, 보드 focus, 키보드 시작 동작, screen reader 정보를 각각 분리한다.
> 8. `lang="en"`과 한국어 `지렁이`, title/description/Open Graph/favicon 메타데이터를 분석한다.
> 9. Footer 문구의 유지·교체·삭제를 `[사람 확인 필요]`로 둔다.
>
> 이번 단계에서는 구현·테스트·commit·push·배포를 금지한다.

## Step 9 실행 결과

| ID | 상태 | 구현/중지 사유 |
|---|---|---|
| CR-01 | PASSED (fallback) | 공개 영어 placeholder를 `[사람 확인 필요]`로 교체. 확인되지 않은 프로젝트 정보는 추가하지 않음. |
| CR-02 | HITL_REQUIRED | 실제 프로젝트 자료가 없어 추가 정보·필드·링크를 작성하지 않음. |
| CR-03~CR-08 | HITL_REQUIRED | 경력·연구·이메일 공개 유지와 대체 연락 방식은 사람 결정 필요. |
| CR-09 | HITL_REQUIRED | Games를 같은 페이지에 유지할지 별도 페이지로 옮길지 결정 필요. 이동하지 않음. |
| CR-10~CR-11 | HITL_REQUIRED | 기대 속도 단계·증가 조건·최대 속도 정책이 문서에 없어 timer 정책을 추측하지 않음. |
| CR-12 | PASSED (fallback) | MEMORY와 코드에서 확인된 random-moving enemy, 충돌 game over, 점수 무관 동작을 게임 안내에 반영. |
| CR-13 | PASSED (fallback) | Escape, 바깥 클릭, 링크 선택 후 모바일 메뉴 닫힘을 추가. |
| CR-14 | PASSED (fallback) | 터치 방향키에 조작 보조 스타일을 추가. 기존 direction mapping은 유지. |
| CR-15~CR-17 | HITL_REQUIRED | 키보드 입력 범위와 screen reader에서 적/음식 위치를 알리는 정책이 필요. |
| CR-18~CR-21 | HITL_REQUIRED | 사이트 언어, 공유 metadata 대표 문구/이미지, favicon, footer 문구 결정 필요. |

변경 파일: `index.html`, `script.js`, `styles.css`, `MEMORY.md`, `CHANGE_REQUEST.md`, `AORR_LOG.md`. `modify.txt`는 보존했으며 수정하지 않음.
