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

---

# Step 8 follow-up — 추가 사용자 수정 요청 분석

## 확인 범위와 제한

- 기준: `MEMORY.md` Project Settings, 마지막 정상 배포 commit `27afc8d`, `https://dg-ahn.github.io/`, 현재 `index.html`, `styles.css`, `script.js`, 기존 Change Item 문서.
- 이번 단계는 분석·문서화만 수행한다. 코드 수정, 테스트 실행, commit, push, 배포는 수행하지 않는다.
- 사용자가 직접 제공한 `Samsung Galaxy Smartphone` 문자열만 확인된 콘텐츠로 취급한다. 역할·기간·기술·성과·공개 링크는 제공되지 않았으므로 추가하지 않는다.
- Tetris 구현 규칙, 이미지 원본/출처/라이선스, 개인의 실제 외모나 신원 정보는 제공되지 않았다. 추측하지 않고 HITL로 분류한다.

## 원자적 Change Items

| ID | 원문 | 분류 | 현재/기대 동작 | 대상 파일 | 의존성 | 완료 기준 | Claude 검증 | 회귀 테스트 | 위험도 | HITL |
|---|---|---|---|---|---|---|---|---|---|---|
| CR-22 | Games 항목의 Snake 상단에 Tetris 게임 추가 | GAME, STRUCTURE | 현재 Games에는 Snake 게임만 있다. 기대 동작은 Snake 위에 Tetris 진입점 또는 게임 영역이 보이는 것이다. Tetris의 규칙·조작·점수·일시정지·게임오버·최고점·저장 정책은 미정이다. | `index.html`, `script.js`, `styles.css`, 향후 Tetris asset/파일 | 기존 Games IA CR-09, Tetris 정책 HITL | Snake를 가리지 않고 Tetris가 별도 영역으로 구분되며, 구현된 규칙과 안내가 일치한다. | Tetris 영역·내비게이션·상태 전이·console 검증 | 기존 Snake 시작/입력/점수/적/메뉴 회귀 | 높음 | Tetris 구현 범위·규칙·조작·모바일 UX·접근성 승인 필요 |
| CR-23 | Projects의 `Project detilas:`에 `Samsung Galaxy Smartphone` 추가 | CONTENT | 현재 코드에는 `Project details: [사람 확인 필요]`가 있고 `Project detilas:`는 오탈자로 확인되지 않는다. 사용자가 제공한 정확한 프로젝트명만 추가할 수 있다. 역할·기간·기술·성과·공개 링크는 없다. | `index.html`, `CHANGE_REQUEST.md` | CR-02, 기존 공개 콘텐츠 HITL | 공개 문구가 `Samsung Galaxy Smartphone`을 정확히 포함하고, 확인되지 않은 경력 주장을 함께 만들지 않는다. 오탈자 교정 여부도 별도 결정한다. | Projects 텍스트와 공개 HTML의 정확한 문자열·오탈자 검토 | Projects anchor, 기존 `[사람 확인 필요]`, 내부 링크 회귀 | 중간 | 해당 명칭의 공개 유지 및 프로젝트명 표기 방식 승인 필요 |
| CR-24 | Hero 제목 옆에 system software engineer 프로필 이미지 추가 | UI_UX, RESPONSIVE, ACCESSIBILITY | 현재 Hero에는 제목·소개 문구만 있고 이미지 요소, asset, alt text가 없다. 기대 동작은 큰 제목 옆에 Editorial Minimalism을 해치지 않는 심플한 이미지가 보이는 것이다. | `index.html`, `styles.css`, 새 image asset 후보 | CR-18 언어 정책, 이미지 출처/디자인 HITL | 375/768/1440px에서 제목과 이미지가 겹치지 않고, 이미지가 장식인지 정보성인지에 맞는 alt/숨김 정책이 적용된다. | 시각 배치·responsive overflow·alt/contrast 검토 | Hero 레이아웃, heading anchor, reduced-motion·모바일 회귀 | 중간 | 실제 사진/일러스트/AI 생성 이미지, 출처·라이선스, alt text, 사람을 묘사할지 결정 필요 |

## 중복·충돌·모호성

1. CR-22는 기존 CR-09의 “Games를 전문 포트폴리오와 분리할지 결정”과 의존한다. Tetris를 추가해도 Games의 IA 결정을 대신하지 않는다.
2. CR-23은 사용자가 프로젝트명을 직접 제공했지만, 그 사실이 공개 가능한 경력이라는 의미까지 자동으로 보장하지 않는다. 공개 유지 여부는 기존 CR-02/CR-03/CR-07 계열 HITL을 따른다.
3. `Project detilas:`는 현재 코드의 확인된 표기가 아니다. `details` 오탈자 교정과 프로젝트명 추가를 한 변경으로 묶지 않는다.
4. CR-24의 “프로필 이미지”는 사용자의 실제 얼굴/신원을 의미한다고 가정하지 않는다. 이미지 정책이 승인되기 전에는 실제 인물 이미지나 개인정보를 만들지 않는다.
5. Tetris는 게임 규칙이 없는 상태에서 기존 Snake 규칙을 재사용한다고 가정하지 않는다.

## 권장 의존성 순서

`CR-22 → CR-23 → CR-24`

실행 전 기존 CR-09/CR-18/CR-02 계열 결정과 Tetris 규칙·이미지 정책 HITL을 완료한다. 승인되지 않은 항목은 `HITL_REQUIRED`로 중지한다.

## 원문 보존

> [Step 8 - 사용자 수정 요청 분석]
>
> [사용자 수정 요청]
> 배포된 포트폴리오 사이트를 다음 기준으로 개선해줘.
>
> 1. Games 항목 에서 snake 상단에 tetris 게임을 추가한다.
> 2. "Project detilas:"에 "Samsung Galaxy Smartphone"을 추가해줘.
> 3. 큰 제목(Building useful systems with care) 옆에 system software engineer를 이미하는 심플한 프로필 이미지를 추가하면 좋겠다.
>
> 각 요청은 서로 독립적으로 검증할 수 있는 원자적인 Change Item으로 나눠줘. 확인되지 않은 경력, 프로젝트, 연구 내용, 개인정보 또는 게임 규칙을 추측해서 작성하지 마.
>
> 추가 자료 없음. 이번 단계에서는 구현하거나 테스트하지 않는다. 코드 수정, 테스트, commit, push, 배포는 금지한다.

## Step 9 follow-up 실행 결과

| ID | 상태 | 결과 |
|---|---|---|
| CR-22 | HITL_REQUIRED | Claude pre-test가 결과를 반환하지 않았고, 현재 문서·코드에는 Tetris 규칙·조작·점수·일시정지·게임오버·최고점·모바일·접근성 정책이 없다. 추측 구현하지 않음. |
| CR-23 | BLOCKED_BY_CR-22 | 의존성 순서상 Tetris 결정 후 진행. 사용자 제공 문자열 외 역할·기간·기술·성과·링크는 추가하지 않음. |
| CR-24 | BLOCKED_BY_CR-22 | 이미지 출처·라이선스·실제 인물 묘사·alt 정책이 미정이며, 의존성 순서상 진행하지 않음. |

Step 9 follow-up에서는 코드 수정·테스트·commit·push·배포를 수행하지 않았다. `modify.txt`는 보존했다.

## Step 9 follow-up 실행 결과 — 규칙 제공 후 재개

| ID | 상태 | 결과 |
|---|---|---|
| CR-22 | PASSED (Codex fallback) | 제공된 Tetris 규칙으로 10×20 보드, 7종 블록, 줄 삭제·점수·레벨, next/ghost, 키보드 조작, pause/countdown, visibility 자동 일시정지, restart/high score, high contrast/sound-off UI를 구현했다. Claude pre-test는 결과 미반환이었다. |
| CR-23 | PASSED (Codex fallback) | 사용자 제공 문자열 `Samsung Galaxy Smartphone`만 Projects에 추가했다. 역할·기간·기술·성과·링크는 추가하지 않았다. |
| CR-24 | HITL_REQUIRED | 이미지 출처·라이선스·실제 인물 묘사·alt 정책이 미정이므로 구현하지 않았다. |

Fallback 검증 결과: Node syntax, Tetris 정적 assertion, 로컬 HTML/CSS/JS HTTP `200` 통과. 변경 파일은 `index.html`, `script.js`, `styles.css`, `MEMORY.md`, `CHANGE_REQUEST.md`, `AORR_LOG.md`; `modify.txt`는 수정하지 않았다. Commit/push/deploy는 수행하지 않았다.

배포 결과: 승인 후 commit `14c79d0`을 `main`에 push했고 `https://dg-ahn.github.io/`가 HTTP `200`을 반환했다. Tetris·`Samsung Galaxy Smartphone`·Snake marker와 배포 JS/CSS를 확인했다. Claude live regression은 네트워크 권한 차단으로 `HITL_REQUIRED`; CR-24 프로필 이미지는 미구현이다.

---

# Step 8 follow-up 2 — 추가 사용자 수정 요청 분석

## 확인 범위와 제한

- 기준: `MEMORY.md` Project Settings, 마지막 정상 배포 commit `428c2cf`, `https://dg-ahn.github.io/`, 현재 `index.html`, `styles.css`, `script.js`, 기존 Change Item 문서.
- 이번 단계는 분석·문서화만 수행한다. 코드 수정, 테스트 실행, commit, push, 배포는 수행하지 않는다.
- 현재 코드에서 확인된 사실만 기록한다: Tetris가 Snake보다 앞에 있고, Tetris cell/next preview에 piece type 문자가 들어가며, Snake 제목에 `지렁이`가 있고, Projects에 `[사람 확인 필요]`가 있다.

## 원자적 Change Items

| ID | 원문 | 분류 | 현재/기대 동작 | 대상 파일 | 의존성 | 완료 기준 | Claude 검증 | 회귀 테스트 | 위험도 | HITL |
|---|---|---|---|---|---|---|---|---|---|---|
| CR-25 | Tetris 블록 안 영어 알파벳 제거 | UI_UX, GAME, ACCESSIBILITY | 현재 `script.js`의 board/next preview draw가 piece type을 `textContent`로 표시한다. 기대 동작은 알파벳 없이 색상·모양·테두리로 구분하는 것이다. | `script.js`, `styles.css`, `index.html` | 없음 | 7종 블록 구분 방식은 유지하면서 보이는 I/O/T/S/Z/J/L 문자를 제거하고 키보드·next/ghost·고대비 기능은 유지한다. | board/next DOM 텍스트와 시각 구분·접근성 회귀 확인 | Tetris spawn/rotate/next/ghost/line clear, Snake DOM 회귀 | 중간 | 블록 문자를 screen reader에만 제공할지 `[사람 확인 필요]` |
| CR-26 | Games 아래 Tetris와 Snake를 차례로 배치 | STRUCTURE, UI_UX | 현재 `index.html`에서 `tetris-section`이 Snake markup보다 앞에 있어 Tetris → Snake 순서다. 기대 순서는 동일하다. | `index.html`, `styles.css` | 없음 | DOM·시각 순서가 Tetris 다음 Snake이고 두 게임이 상태·입력·레이아웃을 침범하지 않는다. | DOM 순서·시각 순서·responsive stacking 확인 | Tetris/Snake 시작·키보드·메뉴·모바일 layout | 낮음 | 현재 구조 유지로 충족 가능한지 확인 |
| CR-27 | `Snake / 지렁이`를 `Snake`로 표시 | CONTENT, UI_UX | 현재 Games 제목이 `Snake / 지렁이`다. 기대 동작은 제목을 `Snake`로만 표시하는 것이다. | `index.html` | 없음 | 제목·aria-labelledby·내부 anchor는 유지하고 보이는 한국어 보조 제목만 삭제한다. | visible heading과 accessible name 확인 | Snake 시작·상태·메뉴·Games 회귀 | 낮음 | 없음 — 요청 범위 명확 |
| CR-28 | Selected work의 `[사람 확인 필요]` 삭제 | CONTENT | 현재 Projects 문구가 `Project details: Samsung Galaxy Smartphone. [사람 확인 필요]`다. 기대 동작은 placeholder만 삭제하고 프로젝트명은 유지하는 것이다. | `index.html` | 기존 CR-23 | 공개 Projects에 placeholder가 없고 역할·기간·기술·성과·링크는 추가하지 않는다. | 공개 HTML/Projects text와 미확인 필드 부재 확인 | Projects anchor, 프로젝트명, 내부 링크 | 중간 | 프로젝트명 공개 유지 여부는 기존 CR-23 HITL과 연결 |

## 중복·충돌·모호성

1. CR-26은 현재 DOM 순서가 이미 Tetris → Snake이므로 구조 변경이 필요 없을 수 있다. Claude가 시각 순서와 responsive stacking을 확인한다.
2. CR-25는 알파벳을 화면에서 제거하는 요청이다. 블록 종류를 screen reader에 텍스트로 전달할지는 별도 접근성 결정이다.
3. CR-28은 placeholder만 삭제하며 `Samsung Galaxy Smartphone` 외 프로젝트 사실을 추가하지 않는다.
4. CR-27은 전체 언어 방향 결정인 CR-18과 별개로 제목 표시 문자열만 다룬다.

## 권장 의존성 순서

`CR-25 → CR-26 → CR-27 → CR-28`

CR-25의 접근성 텍스트 정책과 CR-28의 프로젝트 공개 유지 여부가 승인되지 않으면 해당 항목은 `HITL_REQUIRED`로 중지한다.

## 원문 보존

> [Step 8 - 사용자 수정 요청 분석]
>
> 1. Tetris 게임에서 블록 안에 영어 알파벳은 제거해줘.
> 2. Games 섹션아래에 Tetris와 Snake 게임을 차례로 배치해줘.
> 3. `Snake / 지렁이` 제목에서 `Snake`로 표시해줘.
> 4. `Selected work` 항목에서 `[사람 확인 필요]` 문구 삭제해줘.
>
> 추가 자료 없음. 이번 단계에서는 구현하거나 테스트하지 마. 코드 수정, 테스트, commit, push, 배포는 금지한다.

## Step 9 follow-up 2 실행 결과

| ID | 상태 | 결과 |
|---|---|---|
| CR-25 | PASSED (Codex fallback) | Tetris board와 next preview에서 piece type `textContent`를 제거했다. 색상·모양·테두리 구분, ghost·고대비·키보드 동작은 유지했다. |
| CR-26 | PASSED (Codex fallback) | 현재 DOM의 Tetris → Snake 순서가 이미 요구와 일치해 구조 변경 없이 유지했다. |
| CR-27 | PASSED (Codex fallback) | 제목을 `Snake`로 변경했다. |
| CR-28 | PASSED (Codex fallback) | Projects의 `[사람 확인 필요]`만 삭제하고 `Samsung Galaxy Smartphone`은 유지했다. 추가 경력 세부정보는 작성하지 않았다. |

Fallback 결과: Node syntax, CR-25~CR-28 정적 assertion, 로컬 HTML/CSS/JS HTTP `200` 통과. Claude pre-test 결과는 반환되지 않았다. 코드·문서 변경은 commit/push/배포 전 상태다.

## Step 9 follow-up 실행 결과 — 규칙 제공 후 재개

| ID | 상태 | 결과 |
|---|---|---|
| CR-22 | PASSED (Codex fallback) | 제공된 Tetris 규칙으로 10×20 보드, 7종 블록, 줄 삭제·점수·레벨, next/ghost, 키보드 조작, pause/countdown, visibility 자동 일시정지, restart/high score, high contrast/sound-off UI를 구현했다. Claude pre-test는 결과 미반환이었다. |
| CR-23 | PASSED (Codex fallback) | 사용자 제공 문자열 `Samsung Galaxy Smartphone`만 Projects에 추가했다. 역할·기간·기술·성과·링크는 추가하지 않았다. |
| CR-24 | HITL_REQUIRED | 이미지 출처·라이선스·실제 인물 묘사·alt 정책이 미정이므로 구현하지 않았다. |

Fallback 검증 결과: Node syntax, Tetris 정적 assertion, 로컬 HTML/CSS/JS HTTP `200` 통과. 변경 파일은 `index.html`, `script.js`, `styles.css`, `MEMORY.md`, `CHANGE_REQUEST.md`, `AORR_LOG.md`; `modify.txt`는 수정하지 않았다. Commit/push/deploy는 수행하지 않았다.

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
