# Project Settings

- GitHub Pages URL: https://dg-ahn.github.io
- GitHub repository: https://github.com/dg-ahn/dg-ahn.github.io.git
- GitHub token file: `github_token.txt` (never print or commit)
- Profile reference: `cv.txt`
- Design direction: Editorial Minimalism
- Game addition: randomly moving enemy

# Goal

Complete a static responsive portfolio and snake game, verify it locally, then prepare GitHub Pages deployment.

# Scope

- Static HTML, CSS, JavaScript only; responsive UI; Home/About/Contact; Projects/Experience/Research where verifiable; Games menu; snake game; GitHub Pages compatibility.
- No backend, external services, unverified personal information, commit, push, or deployment without explicit approval.

# Execution

- Mode: `CODEX_WORKER + CLAUDE_VERIFIER`; use `CODEX_FALLBACK` only when Claude cannot verify.
- Claude CLI: `2.1.218`; actual model probe: `claude-sonnet-5`.
- Current verifier mode: `CODEX_FALLBACK`; Claude repository prompts returned no result body (`CLAUDE_REPOSITORY_VERIFIER_NO_OUTPUT`).
- Step 9 execution mode: `CODEX_WORKER + CLAUDE_VERIFIER` requested; fallback only if Claude cannot return tests. Actual model: `claude-sonnet-5`.
- Step 9 start commit: `b5065e1`; last normal deployment commit: `b5065e1`; URL: https://dg-ahn.github.io/.
- Step 9 start Git status: `M AORR.md`, `?? CHANGE_REQUEST.md`, `?? modify.txt` (`modify.txt` is out of scope and must be preserved).
- Rollback 기준: before any Step 9 code change, preserve current worktree; if an approved change must be reverted, restore only its touched files to commit `b5065e1` without force push, hard reset, or rewriting records.

# Current State

- Step 9 follow-up 2 execution mode: `CODEX_WORKER + CLAUDE_VERIFIER` requested; actual model `claude-sonnet-5`; current/last normal commit `428c2cf`; URL https://dg-ahn.github.io/; Git status `M AORR.md`, `M CHANGE_REQUEST.md`, `?? modify.txt`.
- Step 9 follow-up 2 rollback basis: preserve current worktree and `modify.txt`; restore only touched files to `428c2cf` if rejected, without hard reset, force push, or record rewriting.

- Step 9 follow-up execution mode: `CODEX_WORKER + CLAUDE_VERIFIER` requested; actual model `claude-sonnet-5`; current/last normal commit `27afc8d`; URL https://dg-ahn.github.io/; Git status `M AORR.md`, `M CHANGE_REQUEST.md`, `?? modify.txt`.
- Step 9 follow-up rollback basis: preserve current worktree and `modify.txt`; restore only touched files to `27afc8d` if rejected, without hard reset, force push, or record rewriting.

- Status: `HITL_REQUIRED` (commits `c48cf99` and `88f6f60` pushed, but Pages still serves stale HTML/JavaScript).
- Latest code commit: `6f51af0`; expected URL https://dg-ahn.github.io/; repository main matches the commit.
- Current change: Tetris cells now use numeric piece classes and empty text content; local syntax/static assertions passed. Live Pages remains stale until a new approved deployment.
- Latest deployment attempts: `c48cf99` and `88f6f60` pushed; repeated cache-busting checks return HTTP 200 but omit the pinned script and numeric mapping. Live propagation remains unresolved.
- Step 9 follow-up 2 result: current commit `428c2cf`; last normal deployment commit `428c2cf`; modified files are `index.html`, `script.js`, `AORR.md`, `AORR_LOG.md`, `CHANGE_REQUEST.md`, `MEMORY.md`; `modify.txt` remains excluded.
- Latest deployment commit: `14c79d0`; GitHub Pages URL https://dg-ahn.github.io/ returned HTTP 200 with Tetris, Samsung Galaxy Smartphone, and Snake markers.
- Step 9 deployment commit: `8a1a663`; GitHub Pages URL: https://dg-ahn.github.io/; Codex fallback HTTP/content regression passed.
- Fallback checks: Node syntax, static assertions, local HTTP, relative paths PASS.
- Browser visual/console viewport inspection is `[Human verification needed]` because browser runtime hit sandbox `EPERM`.
- Deployment: commit `cddb366` pushed to `main`; GitHub Pages returned HTTP 200 with expected markers.

# Acceptance

- Preserve verified content; mark uncertain content `[Human verification needed]`.
- Verify HTML structure, internal links, responsive layout at 375px/768px/1440px, JavaScript syntax/console, game controls and state transitions, local HTTP, relative paths, and GitHub Pages compatibility.
- Game must support start, movement, food, growth, score, collision, game over, pause, restart, high score, arrow keys, WASD, mobile buttons, reverse-direction prevention, one timer, and randomly moving enemy.

# Guardrails

- Never expose secrets; never delete or weaken tests; one cause and minimal files per retry; maximum 6 retries per fingerprint.
- Detailed execution records belong in `AORR_LOG.md`.
- After all local checks pass, stop at `DEPLOY_APPROVAL_REQUIRED` and wait for explicit approval before commit, push, or deployment.
