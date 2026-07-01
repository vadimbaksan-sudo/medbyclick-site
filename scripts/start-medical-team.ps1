# Launches one Windows Terminal tab per Medical-lane AI role for MedByClick.
# Counterpart to scripts/start-ai-team.sh (macOS), scoped to Marina's 3 roles:
# Medical Advisory, Medical Content, Medical Community.
#
# Usage (PowerShell):
#   cd $HOME\medbyclick
#   .\scripts\start-medical-team.ps1
#
# Requires: Windows Terminal (wt.exe) on PATH, Claude Code CLI installed and
# logged in, git clone of this repo already done.

$ProjectDir = "$HOME\medbyclick"

function Open-Role {
    param(
        [string]$SessionName,
        [string]$RoleFile
    )

    $prompt = "You are operating as the $SessionName for MedByClick. Before doing anything else, read docs/agents/$RoleFile in full and strictly follow its Mission, Responsibilities, Decision Authority, Must-Not-Do, Deliverables, KPI, Handoff Rules, and Escalation Rules. Also read docs/TEAM_STRUCTURE.md and docs/governance/DECISION_MATRIX.md to understand how you fit into the two-founder structure (Marina is CEO, medical lane; Vadim is CPWO, product and Web3 lane). Confirm you have read your role file, summarize your mandate in 3 bullets, then wait for a specific task from Marina before taking any action."

    wt -w 0 new-tab --title "$SessionName" -d "$ProjectDir" powershell -NoExit -Command "claude --name `"$SessionName`" `"$prompt`""
}

Open-Role -SessionName "MedByClick Medical Advisory"  -RoleFile "MEDICAL_ADVISORY.md"
Open-Role -SessionName "MedByClick Medical Content"   -RoleFile "MEDICAL_CONTENT.md"
Open-Role -SessionName "MedByClick Medical Community" -RoleFile "MEDICAL_COMMUNITY.md"

Write-Host "Launched 3 Medical-lane AI-team terminals. Each is reading its role file in docs/agents/ now."
