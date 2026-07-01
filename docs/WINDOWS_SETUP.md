# Windows Setup — Marina (CEO, Medical Lane)

This gets the MedByClick repo and the 3 Medical-lane AI roles running on
Windows. Vadim runs the other 7 roles on macOS via `scripts/start-ai-team.sh`;
this is the Windows counterpart, scoped to `scripts/start-medical-team.ps1`.

## 1. Install Prerequisites

- **Git for Windows**: https://git-scm.com/download/win
- **Node.js LTS**: https://nodejs.org (needed to run/build the site locally, optional for just reading docs)
- **Windows Terminal**: usually pre-installed on Windows 11; if not, install from the Microsoft Store
- **Claude Code CLI**: install and log in with your own Anthropic account —
  follow the official install instructions at https://docs.claude.com/claude-code
  (do not share Vadim's login; each founder should use their own account)

## 2. Clone the Repository

The repo is **public**, so cloning needs no credentials:

```powershell
cd $HOME
git clone https://github.com/vadimbaksan-sudo/medbyclick-site.git medbyclick
cd medbyclick
```

## 3. Set Your Git Identity

So your commits are attributed to you, not to Vadim's machine:

```powershell
git config user.name "Marina"
git config user.email "your-email@example.com"
```

## 4. Push Access (one-time, needs Vadim)

Cloning works with no account. **Pushing** (committing your Medical Advisory /
Content / Community reports back to the repo) requires write access:

1. Create a free GitHub account if you don't have one: https://github.com/signup
2. Send Vadim your GitHub username
3. Vadim adds you at: `github.com/vadimbaksan-sudo/medbyclick-site` → Settings →
   Collaborators → Add people

Until that's done, you can still read everything and run the AI roles locally
— you just can't push your own commits yet. Save your work locally in the
meantime; nothing is lost.

## 5. Launch Your 3 Medical-Lane Terminals

```powershell
cd $HOME\medbyclick
powershell -ExecutionPolicy Bypass -File .\scripts\start-medical-team.ps1
```

This opens 3 Windows Terminal tabs:
- **MedByClick Medical Advisory** — clinical accuracy sign-off
- **MedByClick Medical Content** — content for doctors/patients
- **MedByClick Medical Community** — doctor recruitment/vetting/relations

Each one reads its own file in `docs/agents/` on startup and waits for a task
from you before doing anything.

## 6. Where to Read First

- `docs/TEAM_STRUCTURE.md` — the whole team map
- `docs/governance/FOUNDERS_AGREEMENT.md` — your role vs. Vadim's, decision rights
- `docs/governance/DECISION_MATRIX.md` — what you decide alone vs. jointly
- `docs/agents/MEDICAL_ADVISORY.md`, `MEDICAL_CONTENT.md`, `MEDICAL_COMMUNITY.md` — your 3 roles in detail

## Keeping in Sync

Before starting work each day:

```powershell
cd $HOME\medbyclick
git pull
```

After your AI roles produce reports (in `docs/reports/medical/`) or content,
commit and push once you have write access:

```powershell
git add docs/reports/medical
git commit -m "Medical lane update: <what changed>"
git push
```
