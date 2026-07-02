#!/bin/bash
# Boots the local MedByClick workspace after a reboot: checks git status,
# checks the OpenClaw Gateway status, opens VS Code, starts the dev server
# in its own Terminal tab, tails OpenClaw logs in another Terminal tab, and
# prints (but does not run) the Claude Code launch command.
#
# Usage: ./scripts/start-workspace.sh
# Does NOT launch the 10-agent AI team - run scripts/start-ai-team.sh
# yourself when you're ready for that.
# Requires: macOS Terminal.app, and one-time Automation permission grant for
# Terminal to be controlled by System Events/osascript (macOS will prompt).

set -euo pipefail

PROJECT_DIR="$HOME/medbyclick"

cd "$PROJECT_DIR"

echo "== MedByClick workspace startup =="
echo

echo "-- git status (${PROJECT_DIR}) --"
git status
echo

echo "-- openclaw status --"
if command -v openclaw >/dev/null 2>&1; then
  openclaw status || echo "openclaw status failed - check the Gateway"
else
  echo "openclaw CLI not found in PATH, skipping"
fi
echo

echo "-- opening VS Code --"
if command -v code >/dev/null 2>&1; then
  code "$PROJECT_DIR"
else
  open -a "Visual Studio Code" "$PROJECT_DIR"
fi

open_terminal_tab() {
  local cmd="$1"
  osascript <<EOF
tell application "Terminal"
  activate
  do script "cd '${PROJECT_DIR}' && ${cmd}"
end tell
EOF
}

echo "-- starting dev server (bun run dev) in a new Terminal tab --"
open_terminal_tab "bun run dev"

echo "-- opening OpenClaw logs (openclaw logs --follow) in a new Terminal tab --"
open_terminal_tab "openclaw logs --follow"

echo
echo "-- Claude Code --"
CLAUDE_CMD="cd '${PROJECT_DIR}' && claude"
echo "Command prepared (not run automatically):"
echo "  ${CLAUDE_CMD}"
if command -v pbcopy >/dev/null 2>&1; then
  printf '%s' "${CLAUDE_CMD}" | pbcopy
  echo "(copied to clipboard - paste it into a terminal to start Claude Code)"
fi

echo
echo "== Workspace ready =="
echo "Reminder: the 10-agent AI team is NOT started automatically."
echo "Run ./scripts/start-ai-team.sh yourself when you want to launch it."
