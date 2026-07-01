#!/bin/bash
# Launches one macOS Terminal.app window per AI role defined in docs/agents/,
# each starting in ~/medbyclick and reading its own role file as its first prompt.
#
# Usage: ./scripts/start-ai-team.sh
# Requires: macOS Terminal.app, and one-time Automation permission grant for
# Terminal to be controlled by System Events/osascript (macOS will prompt).

set -euo pipefail

PROJECT_DIR="$HOME/medbyclick"

open_role() {
  local session_name="$1"
  local role_file="$2"
  local prompt="You are operating as the ${session_name} for MedByClick. Before doing anything else, read docs/agents/${role_file} in full and strictly follow its Mission, Responsibilities, Decision Authority, Must-Not-Do, Deliverables, KPI, Handoff Rules, and Escalation Rules. Also read docs/TEAM_STRUCTURE.md and docs/governance/DECISION_MATRIX.md to understand how you fit into the two-founder structure (Marina is CEO, medical lane; Vadim is CPWO, product and Web3 lane). Confirm you have read your role file, summarize your mandate in 3 bullets, then wait for a specific task from Marina or Vadim before taking any action."

  osascript <<EOF
tell application "Terminal"
  activate
  do script "cd '${PROJECT_DIR}' && claude --name \"${session_name}\" \"${prompt}\""
end tell
EOF
}

open_role "MedByClick Medical Advisory"  "MEDICAL_ADVISORY.md"
open_role "MedByClick Medical Content"   "MEDICAL_CONTENT.md"
open_role "MedByClick Medical Community" "MEDICAL_COMMUNITY.md"
open_role "MedByClick CTO Product"       "CTO_PRODUCT.md"
open_role "MedByClick Developer"         "DEVELOPER.md"
open_role "MBC Web3 Token Strategy"      "WEB3_TOKEN_STRATEGY.md"
open_role "MBC Legal Compliance"         "LEGAL_COMPLIANCE.md"
open_role "MedByClick QA GStack"         "QA_GSTACK.md"
open_role "MBC Growth Marketing"         "GROWTH_MARKETING.md"
open_role "MBC Independent Auditor"      "INDEPENDENT_AUDITOR.md"

echo "Launched 10 AI-team terminals. Each is reading its role file in docs/agents/ now."
