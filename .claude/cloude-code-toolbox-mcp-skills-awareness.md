# Cloude Code ToolBox — MCP & Skills awareness

_Generated: 2026-07-02T13:12:08.143Z_

## How to use this report

- **Saved copy:** This file is **`.claude/cloude-code-toolbox-mcp-skills-awareness.md`** — refreshed whenever the toolbox runs an MCP & Skills scan (including on workspace open when auto-scan is enabled). It is meant for **Claude Code workspace context** together with `CLAUDE.md` (which gets a shorter replaceable summary when auto-merge is on).
- **MCP:** Lists **configured** servers from Claude Code config (`~/.claude.json` for user scope, `.mcp.json` for project scope). Use `/mcp` in the Claude Code panel to connect servers for your session.
- **Skills:** **On-disk** folders with `SKILL.md`. Claude Code does not auto-load them; attach `SKILL.md` or paths in chat when useful.
- **Task routing:** When the user’s request matches a server’s purpose (e.g. Confluence → Confluence/Atlassian MCP), prefer that **server id** from the tables below.

---

## MCP — workspace

Workspace `mcp.json` _(folder: medbyclick)_

- **/Users/vadimrudkovsky/medbyclick/.mcp.json** — _File missing_

_No active workspace servers in mcp.json._

## MCP — user profile

- **/Users/vadimrudkovsky/.claude.json** — _File exists — no servers defined_

_No active user-scoped servers in mcp.json._

## Skills (local `SKILL.md` folders)

### Project-scoped

_None found (or no workspace open)._

### User-scoped

- **_gstack-command** — `/Users/vadimrudkovsky/.claude/skills/_gstack-command`
  - Router for the gstack skill suite. (gstack)

- **autoplan** — `/Users/vadimrudkovsky/.claude/skills/autoplan`
  - Auto-review pipeline — reads the full CEO, design, eng, and DX review skills from disk and runs them sequentially with auto-decisions using 6 decision principles. (gstack)

- **benchmark** — `/Users/vadimrudkovsky/.claude/skills/benchmark`
  - Performance regression detection using the browse daemon. (gstack)

- **benchmark-models** — `/Users/vadimrudkovsky/.claude/skills/benchmark-models`
  - Cross-model benchmark for gstack skills. (gstack)

- **browse** — `/Users/vadimrudkovsky/.claude/skills/browse`
  - Fast headless browser for QA testing and site dogfooding. (gstack)

- **canary** — `/Users/vadimrudkovsky/.claude/skills/canary`
  - Post-deploy canary monitoring. (gstack)

- **careful** — `/Users/vadimrudkovsky/.claude/skills/careful`
  - Safety guardrails for destructive commands. (gstack)

- **codex** — `/Users/vadimrudkovsky/.claude/skills/codex`
  - OpenAI Codex CLI wrapper — three modes. (gstack)

- **connect-chrome** — `/Users/vadimrudkovsky/.claude/skills/connect-chrome`
  - Launch GStack Browser — AI-controlled Chromium with the sidebar extension baked in.

- **context-restore** — `/Users/vadimrudkovsky/.claude/skills/context-restore`
  - Restore working context saved earlier by /context-save. (gstack)

- **context-save** — `/Users/vadimrudkovsky/.claude/skills/context-save`
  - Save working context. (gstack)

- **cso** — `/Users/vadimrudkovsky/.claude/skills/cso`
  - Chief Security Officer mode. (gstack)

- **design-consultation** — `/Users/vadimrudkovsky/.claude/skills/design-consultation`
  - Design consultation: understands your product, researches the landscape, proposes a complete design system (aesthetic, typography, color, layout, spacing, motion), and generates font+color preview... (gstack)

- **design-html** — `/Users/vadimrudkovsky/.claude/skills/design-html`
  - Design finalization: generates production-quality Pretext-native HTML/CSS. (gstack)

- **design-review** — `/Users/vadimrudkovsky/.claude/skills/design-review`
  - Designer's eye QA: finds visual inconsistency, spacing issues, hierarchy problems, AI slop patterns, and slow interactions — then fixes them. (gstack)

- **design-shotgun** — `/Users/vadimrudkovsky/.claude/skills/design-shotgun`
  - Design shotgun: generate multiple AI design variants, open a comparison board, collect structured feedback, and iterate. (gstack)

- **devex-review** — `/Users/vadimrudkovsky/.claude/skills/devex-review`
  - Live developer experience audit. (gstack)

- **diagram** — `/Users/vadimrudkovsky/.claude/skills/diagram`
  - Turn an English description (or mermaid source) into a diagram triplet: the source, an editable .excalidraw file you can open (gstack)

- **document-generate** — `/Users/vadimrudkovsky/.claude/skills/document-generate`
  - Generate missing documentation from scratch for a feature, module, or entire project. (gstack)

- **document-release** — `/Users/vadimrudkovsky/.claude/skills/document-release`
  - Post-ship documentation update. (gstack)

- **freeze** — `/Users/vadimrudkovsky/.claude/skills/freeze`
  - Restrict file edits to a specific directory for the session. (gstack)

- **gstack** — `/Users/vadimrudkovsky/.claude/skills/gstack`
  - Router for the gstack skill suite. (gstack)

- **gstack-upgrade** — `/Users/vadimrudkovsky/.claude/skills/gstack-upgrade`
  - Upgrade gstack to the latest version.

- **guard** — `/Users/vadimrudkovsky/.claude/skills/guard`
  - Full safety mode: destructive command warnings + directory-scoped edits. (gstack)

- **health** — `/Users/vadimrudkovsky/.claude/skills/health`
  - Code quality dashboard. (gstack)

- **investigate** — `/Users/vadimrudkovsky/.claude/skills/investigate`
  - Systematic debugging with root cause investigation. (gstack)

- **ios-clean** — `/Users/vadimrudkovsky/.claude/skills/ios-clean`
  - Remove the DebugBridge SPM package and all #if DEBUG wiring from an iOS app. (gstack)

- **ios-design-review** — `/Users/vadimrudkovsky/.claude/skills/ios-design-review`
  - Visual design audit for iOS apps on real hardware. (gstack)

- **ios-fix** — `/Users/vadimrudkovsky/.claude/skills/ios-fix`
  - Autonomous iOS bug fixer. (gstack)

- **ios-qa** — `/Users/vadimrudkovsky/.claude/skills/ios-qa`
  - Live-device iOS QA for SwiftUI apps. (gstack)

- **ios-sync** — `/Users/vadimrudkovsky/.claude/skills/ios-sync`
  - Regenerate the iOS debug bridge against the latest upstream gstack templates. (gstack)

- **land-and-deploy** — `/Users/vadimrudkovsky/.claude/skills/land-and-deploy`
  - Land and deploy workflow. (gstack)

- **landing-report** — `/Users/vadimrudkovsky/.claude/skills/landing-report`
  - Read-only queue dashboard for workspace-aware ship. (gstack)

- **learn** — `/Users/vadimrudkovsky/.claude/skills/learn`
  - Manage project learnings.

- **make-pdf** — `/Users/vadimrudkovsky/.claude/skills/make-pdf`
  - Turn any markdown file into a publication-quality PDF. (gstack)

- **office-hours** — `/Users/vadimrudkovsky/.claude/skills/office-hours`
  - YC Office Hours — two modes. (gstack)

- **open-gstack-browser** — `/Users/vadimrudkovsky/.claude/skills/open-gstack-browser`
  - Launch GStack Browser — AI-controlled Chromium with the sidebar extension baked in.

- **pair-agent** — `/Users/vadimrudkovsky/.claude/skills/pair-agent`
  - Pair a remote AI agent with your browser. (gstack)

- **plan-ceo-review** — `/Users/vadimrudkovsky/.claude/skills/plan-ceo-review`
  - CEO/founder-mode plan review. (gstack)

- **plan-design-review** — `/Users/vadimrudkovsky/.claude/skills/plan-design-review`
  - Designer's eye plan review — interactive, like CEO and Eng review. (gstack)

- **plan-devex-review** — `/Users/vadimrudkovsky/.claude/skills/plan-devex-review`
  - Interactive developer experience plan review. (gstack)

- **plan-eng-review** — `/Users/vadimrudkovsky/.claude/skills/plan-eng-review`
  - Eng manager-mode plan review. (gstack)

- **plan-tune** — `/Users/vadimrudkovsky/.claude/skills/plan-tune`
  - Self-tuning question sensitivity + developer psychographic for gstack (v1: observational). (gstack)

- **qa** — `/Users/vadimrudkovsky/.claude/skills/qa`
  - Systematically QA test a web application and fix bugs found. (gstack)

- **qa-only** — `/Users/vadimrudkovsky/.claude/skills/qa-only`
  - Report-only QA testing. (gstack)

- **retro** — `/Users/vadimrudkovsky/.claude/skills/retro`
  - Weekly engineering retrospective. (gstack)

- **review** — `/Users/vadimrudkovsky/.claude/skills/review`
  - Pre-landing PR review. (gstack)

- **scrape** — `/Users/vadimrudkovsky/.claude/skills/scrape`
  - Pull data from a web page. (gstack)

- **setup-browser-cookies** — `/Users/vadimrudkovsky/.claude/skills/setup-browser-cookies`
  - Import cookies from your real Chromium browser into the headless browse session. (gstack)

- **setup-deploy** — `/Users/vadimrudkovsky/.claude/skills/setup-deploy`
  - Configure deployment settings for /land-and-deploy.

- **setup-gbrain** — `/Users/vadimrudkovsky/.claude/skills/setup-gbrain`
  - Set up gbrain for this coding agent: install the CLI, initialize a local PGLite or Supabase brain, register MCP, capture per-remote trust policy. (gstack)

- **ship** — `/Users/vadimrudkovsky/.claude/skills/ship`
  - Ship workflow: detect + merge base branch, run tests, review diff, bump VERSION, update CHANGELOG, commit, push, create PR. (gstack)

- **skillify** — `/Users/vadimrudkovsky/.claude/skills/skillify`
  - Codify the most recent successful /scrape flow into a permanent browser-skill on disk. (gstack)

- **spec** — `/Users/vadimrudkovsky/.claude/skills/spec`
  - Turn vague intent into a precise, executable spec in five phases. (gstack)

- **sync-gbrain** — `/Users/vadimrudkovsky/.claude/skills/sync-gbrain`
  - Keep gbrain current with this repo's code and refresh agent search guidance in CLAUDE.md. Wraps the gstack-gbrain-sync orchestrator with state (gstack)

- **unfreeze** — `/Users/vadimrudkovsky/.claude/skills/unfreeze`
  - Clear the freeze boundary set by /freeze, allowing edits to all directories again. (gstack)

---

## Suggested next steps

- **MCP:** Use this extension’s hub **MCP** tab, or `claude mcp list` in the terminal. In Claude Code, use `/mcp` to connect servers for the session.
- **Edit config:** Open `~/.claude.json` (user MCP) or `<workspace>/.mcp.json` (project MCP) via the extension commands.
- **Refresh this report:** run **Intelligence — scan MCP & Skills awareness** again after changing MCP config or adding skills.

_Report from Cloude Code ToolBox extension._
