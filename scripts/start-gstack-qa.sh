#!/bin/bash
# GStack QA — full audit of all 10 AI agents + live site checks.
#
# Usage: ./scripts/start-gstack-qa.sh [base_url]
#   base_url — Vercel deployment URL (default: production)
#
# What it checks:
#   Part 1: Live site — HTTP status, content, security headers for all 29 routes
#   Part 2: Agent audit — for each of 10 agents:
#           - Role file exists in docs/agents/
#           - Deliverables exist (expected files/directories)
#           - KPI tracking artifacts present
#           - Must-Not-Do violations (code touched by non-Developer, etc.)
#           - Handoff/escalation docs referenced actually exist
#   Part 3: Cross-agent integrity — governance docs, decision log, RACI coverage
#
# Generates a timestamped report in docs/reports/qa/
# macOS / Linux compatible. Requires: curl, git.

set -euo pipefail

BASE_URL="${1:-https://medbyclick-site.vercel.app}"
TIMESTAMP=$(date +%Y-%m-%d_%H%M%S)
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPORT_DIR="$PROJECT_DIR/docs/reports/qa"
REPORT_FILE="$REPORT_DIR/qa-audit-${TIMESTAMP}.md"

mkdir -p "$REPORT_DIR"

PASS_COUNT=0
FAIL_COUNT=0
WARN_COUNT=0

pass() { PASS_COUNT=$((PASS_COUNT + 1)); echo "  [PASS] $1"; echo "- [PASS] $1" >> "$REPORT_FILE"; }
fail() { FAIL_COUNT=$((FAIL_COUNT + 1)); echo "  [FAIL] $1"; echo "- **[FAIL]** $1" >> "$REPORT_FILE"; }
warn() { WARN_COUNT=$((WARN_COUNT + 1)); echo "  [WARN] $1"; echo "- [WARN] $1" >> "$REPORT_FILE"; }

file_exists()    { [ -f "$PROJECT_DIR/$1" ]; }
dir_has_files()  { [ -d "$PROJECT_DIR/$1" ] && [ "$(find "$PROJECT_DIR/$1" -type f ! -name 'README.md' 2>/dev/null | head -1)" ]; }

{
  echo "# GStack QA Audit — $(date -u '+%Y-%m-%d %H:%M UTC')"
  echo ""
  echo "**Target:** \`$BASE_URL\`"
  echo "**Runner:** \`scripts/start-gstack-qa.sh\`"
  echo ""
} > "$REPORT_FILE"

# ═══════════════════════════════════════════════════════════════
# PART 1: LIVE SITE CHECKS
# ═══════════════════════════════════════════════════════════════

echo "═══ PART 1: Live Site Checks ═══"
echo "" >> "$REPORT_FILE"
echo "## Part 1: Live Site Checks" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

PAGES=(
  "/" "/doctors" "/doctors/dr-elena-volkova" "/doctors/dr-mikhail-stern"
  "/doctors/dr-rina-goldberg" "/book" "/checkout/crypto" "/checkout/mbc"
  "/checkout/stripe" "/login" "/register" "/dashboard" "/ai-diagnostics"
  "/education" "/medai" "/medcommunity" "/medconnect" "/mededu" "/medevents"
  "/medglobaldb" "/medical-travel" "/medpayments" "/medpharmaccess"
  "/medsupport" "/medtoken" "/medtravel" "/medtrials" "/pricing" "/specialists"
)

echo "### Page Status" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "| Route | HTTP | Time |" >> "$REPORT_FILE"
echo "|-------|------|------|" >> "$REPORT_FILE"

for page in "${PAGES[@]}"; do
  url="${BASE_URL}${page}"
  response=$(curl -s -o /dev/null -w "%{http_code} %{time_total}" --max-time 15 --location "$url" 2>&1) || true
  http_code=$(echo "$response" | awk '{print $1}')
  time_total=$(echo "$response" | awk '{print $2}')

  if [[ "$http_code" =~ ^(200|304)$ ]]; then
    pass "$page → HTTP $http_code (${time_total}s)"
    echo "| \`$page\` | $http_code | ${time_total}s |" >> "$REPORT_FILE"
  else
    fail "$page → HTTP $http_code"
    echo "| \`$page\` | **$http_code** | ${time_total}s |" >> "$REPORT_FILE"
  fi
done

# Content spot-checks
echo "" >> "$REPORT_FILE"
echo "### Content Checks" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

check_content() {
  local label="$1" page="$2" pattern="$3"
  local body
  body=$(curl -s --max-time 15 --location "${BASE_URL}${page}" 2>/dev/null || echo "")
  if echo "$body" | grep -qi "$pattern"; then
    pass "$label"
  else
    fail "$label — pattern '$pattern' not found"
  fi
}

check_content "Homepage branding" "/" "medbyclick"
check_content "Doctors page lists doctors" "/doctors" "doctor"
check_content "Book page has form" "/book" "form\|input\|submit"
check_content "Pricing page has plans" "/pricing" "plan\|price\|\\$"
check_content "Login page has auth form" "/login" "login\|sign.in\|email"

# Security headers
echo "" >> "$REPORT_FILE"
echo "### Security Headers" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

headers=$(curl -sI --max-time 10 --location "$BASE_URL/" 2>/dev/null || echo "")

check_header() {
  if echo "$headers" | grep -qi "^${1}:"; then pass "Header: $1"; else warn "Header missing: $1"; fi
}

check_header "X-Content-Type-Options"
check_header "X-Frame-Options"
check_header "Strict-Transport-Security"
check_header "Content-Security-Policy"
check_header "Referrer-Policy"

# ═══════════════════════════════════════════════════════════════
# PART 2: AGENT-BY-AGENT AUDIT
# ═══════════════════════════════════════════════════════════════

echo ""
echo "═══ PART 2: Agent Audit (all 10 agents) ═══"
echo "" >> "$REPORT_FILE"
echo "## Part 2: Agent-by-Agent Audit" >> "$REPORT_FILE"

# --- Helper: check git blame for code changes by non-Developer ---
# (simplified: checks if docs/agents/ files were modified — Must-Not-Do for Developer)
check_must_not_touch() {
  local role="$1" pattern="$2" label="$3"
  local offending=""
  offending=$(cd "$PROJECT_DIR" && git log --all --oneline --diff-filter=M -5 -- $pattern 2>/dev/null || echo "")
  if [ -z "$offending" ]; then
    pass "$role: no unauthorized changes to $label"
  else
    warn "$role: changes detected in $label — verify authorization"
  fi
}

# ---------------------------------------------------------------
# 1. Medical Advisory
# ---------------------------------------------------------------
echo "" >> "$REPORT_FILE"
echo "### 1. Medical Advisory" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo ""
echo "--- 1. Medical Advisory ---"

file_exists "docs/agents/MEDICAL_ADVISORY.md" && pass "Role file exists" || fail "Role file MISSING"

# Deliverables: clinical review sign-off log, doctor vetting standard, medical incident reports
if dir_has_files "docs/reports/medical"; then
  pass "Deliverables: docs/reports/medical/ has content"
else
  fail "Deliverables: docs/reports/medical/ is empty — no clinical review log, no vetting standard"
fi

# KPI: zero unreviewed claims, 100% vetting, same-day incident triage
# Check: medical incident playbook exists
file_exists "docs/playbooks/Medical Incident.md" && pass "Medical Incident playbook exists" || fail "Medical Incident playbook MISSING"

# ---------------------------------------------------------------
# 2. Medical Content
# ---------------------------------------------------------------
echo "" >> "$REPORT_FILE"
echo "### 2. Medical Content" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo ""
echo "--- 2. Medical Content ---"

file_exists "docs/agents/MEDICAL_CONTENT.md" && pass "Role file exists" || fail "Role file MISSING"

# Deliverables: content drafts in docs/reports/medical/, whitepaper medical sections
file_exists "docs/WHITEPAPER.md" && pass "WHITEPAPER.md exists (medical sections source)" || fail "WHITEPAPER.md MISSING"

# Must-Not-Do: must not touch app/ code directly
check_must_not_touch "Medical Content" "app/ modules/ components/ lib/" "application code"

# ---------------------------------------------------------------
# 3. Medical Community
# ---------------------------------------------------------------
echo "" >> "$REPORT_FILE"
echo "### 3. Medical Community" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo ""
echo "--- 3. Medical Community ---"

file_exists "docs/agents/MEDICAL_COMMUNITY.md" && pass "Role file exists" || fail "Role file MISSING"

# Deliverables: coordinator JD (TODOS T1), doctor pipeline, quality-review triage log (T3)
# Check for T1/T3 progress in reports
if dir_has_files "docs/reports/medical"; then
  pass "Deliverables dir has content (shared with Medical Advisory)"
else
  warn "docs/reports/medical/ empty — no coordinator JD, no doctor pipeline status"
fi

# TODOS T1 assignment check
if grep -q "T1" "$PROJECT_DIR/TODOS.md" 2>/dev/null; then
  pass "TODOS.md T1 (coordinator JD) exists"
else
  fail "TODOS.md T1 (coordinator JD) not found"
fi

# TODOS T3 assignment check
if grep -q "T3" "$PROJECT_DIR/TODOS.md" 2>/dev/null; then
  pass "TODOS.md T3 (quality review triage) exists"
else
  fail "TODOS.md T3 (quality review triage) not found"
fi

# ---------------------------------------------------------------
# 4. CTO / Product
# ---------------------------------------------------------------
echo "" >> "$REPORT_FILE"
echo "### 4. CTO / Product" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo ""
echo "--- 4. CTO / Product ---"

file_exists "docs/agents/CTO_PRODUCT.md" && pass "Role file exists" || fail "Role file MISSING"

# Deliverables: docs/ROADMAP.md (CRITICAL — flagged as missing gap)
if file_exists "docs/ROADMAP.md"; then
  pass "ROADMAP.md exists"
else
  fail "ROADMAP.md MISSING — first deliverable for this role (extract from WHITEPAPER.md §18 + TODOS.md)"
fi

# Platform evaluation rubric (TODOS T2)
if dir_has_files "docs/reports/product"; then
  pass "docs/reports/product/ has content"
else
  fail "docs/reports/product/ empty — no platform evaluation rubric (T2), no release notes"
fi

# TODOS T2 assignment check
if grep -q "T2" "$PROJECT_DIR/TODOS.md" 2>/dev/null; then
  pass "TODOS.md T2 (platform evaluation) exists"
else
  fail "TODOS.md T2 (platform evaluation) not found"
fi

# Must-Not-Do: must not write code
check_must_not_touch "CTO/Product" "app/ modules/ components/ lib/" "application code"

# ---------------------------------------------------------------
# 5. Developer
# ---------------------------------------------------------------
echo "" >> "$REPORT_FILE"
echo "### 5. Developer" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo ""
echo "--- 5. Developer ---"

file_exists "docs/agents/DEVELOPER.md" && pass "Role file exists" || fail "Role file MISSING"

# Deliverables: working code, bug fixes, deployment health
# Check Vercel deployment config
file_exists "vercel.json" && pass "vercel.json exists" || warn "vercel.json not found"

# Check codebase directories exist
for dir in app modules components lib; do
  [ -d "$PROJECT_DIR/$dir" ] && pass "Directory $dir/ exists" || warn "Directory $dir/ not found"
done

# Must-Not-Do: must not touch docs/agents/, docs/governance/, docs/decision-log/
check_must_not_touch "Developer" "docs/agents/ docs/governance/ docs/decision-log/" "governance documents"

# ---------------------------------------------------------------
# 6. Web3 & Token Strategy
# ---------------------------------------------------------------
echo "" >> "$REPORT_FILE"
echo "### 6. Web3 & Token Strategy" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo ""
echo "--- 6. Web3 & Token Strategy ---"

file_exists "docs/agents/WEB3_TOKEN_STRATEGY.md" && pass "Role file exists" || fail "Role file MISSING"

# Deliverables
file_exists "docs/TOKENOMICS.md" && pass "TOKENOMICS.md exists" || fail "TOKENOMICS.md MISSING"
file_exists "docs/CONTRACT_AUDIT.md" && pass "CONTRACT_AUDIT.md exists" || fail "CONTRACT_AUDIT.md MISSING"

# Fundraising reports
if dir_has_files "docs/reports/fundraising"; then
  pass "docs/reports/fundraising/ has content"
else
  warn "docs/reports/fundraising/ empty — no fundraising deck/investor tracker yet"
fi

# Listing readiness
if dir_has_files "docs/reports/web3"; then
  pass "docs/reports/web3/ has content"
else
  warn "docs/reports/web3/ empty — no listing readiness checklist yet"
fi

# Contract audit status — check if still bytecode-only
if file_exists "docs/CONTRACT_AUDIT.md"; then
  if grep -qi "bytecode.only\|not a substitute\|not.*source.level" "$PROJECT_DIR/docs/CONTRACT_AUDIT.md" 2>/dev/null; then
    warn "CONTRACT_AUDIT.md still flagged as bytecode-only — needs real source-level audit"
  else
    pass "CONTRACT_AUDIT.md — no bytecode-only warning found"
  fi
fi

# ---------------------------------------------------------------
# 7. Legal & Compliance
# ---------------------------------------------------------------
echo "" >> "$REPORT_FILE"
echo "### 7. Legal & Compliance" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo ""
echo "--- 7. Legal & Compliance ---"

file_exists "docs/agents/LEGAL_COMPLIANCE.md" && pass "Role file exists" || fail "Role file MISSING"

# Deliverables
file_exists "docs/LEGAL_BRIEF.md" && pass "LEGAL_BRIEF.md exists" || fail "LEGAL_BRIEF.md MISSING"

# docs/legal/ — should be populated with jurisdiction opinions
if [ -d "$PROJECT_DIR/docs/legal" ]; then
  if dir_has_files "docs/legal"; then
    pass "docs/legal/ has jurisdiction opinions"
  else
    fail "docs/legal/ exists but EMPTY — no jurisdiction-specific legal opinions yet"
  fi
else
  fail "docs/legal/ directory MISSING entirely"
fi

# Legal reports
if dir_has_files "docs/reports/legal"; then
  pass "docs/reports/legal/ has content"
else
  warn "docs/reports/legal/ empty — no legal risk findings logged"
fi

# ---------------------------------------------------------------
# 8. QA / GStack
# ---------------------------------------------------------------
echo "" >> "$REPORT_FILE"
echo "### 8. QA / GStack" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo ""
echo "--- 8. QA / GStack ---"

file_exists "docs/agents/QA_GSTACK.md" && pass "Role file exists" || fail "Role file MISSING"

# Deliverables: QA reports
if dir_has_files "docs/reports/qa"; then
  qa_count=$(find "$PROJECT_DIR/docs/reports/qa" -type f ! -name 'README.md' | wc -l | tr -d ' ')
  pass "docs/reports/qa/ has $qa_count report(s)"
else
  warn "docs/reports/qa/ empty — no QA reports yet"
fi

# Must-Not-Do: must not edit code
check_must_not_touch "QA/GStack" "app/ modules/ components/ lib/" "application code"

# ---------------------------------------------------------------
# 9. Growth / Marketing
# ---------------------------------------------------------------
echo "" >> "$REPORT_FILE"
echo "### 9. Growth / Marketing" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo ""
echo "--- 9. Growth / Marketing ---"

file_exists "docs/agents/GROWTH_MARKETING.md" && pass "Role file exists" || fail "Role file MISSING"

# Deliverables: T4 channel hypothesis, campaign reports
if grep -q "T4" "$PROJECT_DIR/TODOS.md" 2>/dev/null; then
  pass "TODOS.md T4 (channel hypothesis) exists"
else
  fail "TODOS.md T4 (channel hypothesis) not found"
fi

if dir_has_files "docs/reports/growth"; then
  pass "docs/reports/growth/ has content"
else
  warn "docs/reports/growth/ empty — no T4 document, no campaign reports"
fi

# Must-Not-Do: must not write code, must not publish clinical claims without sign-off
check_must_not_touch "Growth/Marketing" "app/ modules/ components/ lib/" "application code"

# ---------------------------------------------------------------
# 10. Independent Auditor
# ---------------------------------------------------------------
echo "" >> "$REPORT_FILE"
echo "### 10. Independent Auditor" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo ""
echo "--- 10. Independent Auditor ---"

file_exists "docs/agents/INDEPENDENT_AUDITOR.md" && pass "Role file exists" || fail "Role file MISSING"

# Deliverables: weekly audit reports, standing gaps list
if dir_has_files "docs/reports/audit"; then
  audit_count=$(find "$PROJECT_DIR/docs/reports/audit" -type f ! -name 'README.md' | wc -l | tr -d ' ')
  pass "docs/reports/audit/ has $audit_count report(s)"
else
  fail "docs/reports/audit/ empty — no weekly audit reports"
fi

# Decision log entries
if dir_has_files "docs/decision-log"; then
  dl_count=$(find "$PROJECT_DIR/docs/decision-log" -type f ! -name 'Decision Template.md' | wc -l | tr -d ' ')
  pass "docs/decision-log/ has $dl_count entry(ies)"
else
  warn "docs/decision-log/ empty — no decisions documented"
fi

# ═══════════════════════════════════════════════════════════════
# PART 3: CROSS-AGENT INTEGRITY
# ═══════════════════════════════════════════════════════════════

echo ""
echo "═══ PART 3: Cross-Agent Integrity ═══"
echo "" >> "$REPORT_FILE"
echo "## Part 3: Cross-Agent Integrity" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Governance documents
echo "--- Governance Documents ---"
for doc in DECISION_MATRIX.md ESCALATION_FLOW.md FOUNDERS_AGREEMENT.md RACI_MATRIX.md; do
  file_exists "docs/governance/$doc" && pass "Governance: $doc exists" || fail "Governance: $doc MISSING"
done

# Team structure
file_exists "docs/TEAM_STRUCTURE.md" && pass "TEAM_STRUCTURE.md exists" || fail "TEAM_STRUCTURE.md MISSING"

# All 10 role files present
echo "" >> "$REPORT_FILE"
echo "### Role File Completeness" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

EXPECTED_ROLES=(
  MEDICAL_ADVISORY MEDICAL_CONTENT MEDICAL_COMMUNITY
  CTO_PRODUCT DEVELOPER WEB3_TOKEN_STRATEGY
  LEGAL_COMPLIANCE QA_GSTACK GROWTH_MARKETING INDEPENDENT_AUDITOR
)

for role in "${EXPECTED_ROLES[@]}"; do
  file_exists "docs/agents/${role}.md" && pass "Role: ${role}.md" || fail "Role MISSING: ${role}.md"
done

# Playbooks completeness
echo "" >> "$REPORT_FILE"
echo "### Playbooks" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

for pb in "Audit.md" "Product Release.md" "Security Incident.md" "Medical Incident.md" "Fundraising.md" "TGE.md" "Exchange Listing.md"; do
  file_exists "docs/playbooks/$pb" && pass "Playbook: $pb" || fail "Playbook MISSING: $pb"
done

# Report directories exist
echo "" >> "$REPORT_FILE"
echo "### Report Directories" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

for rdir in daily medical product web3 fundraising legal qa growth audit; do
  [ -d "$PROJECT_DIR/docs/reports/$rdir" ] && pass "Report dir: $rdir/" || fail "Report dir MISSING: $rdir/"
done

# Known gaps summary
echo "" >> "$REPORT_FILE"
echo "### Known Gaps (Standing List)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

GAPS=""
add_gap() { GAPS="${GAPS}\n- $1"; echo "- $1" >> "$REPORT_FILE"; }

file_exists "docs/ROADMAP.md"    || add_gap "docs/ROADMAP.md missing (CTO/Product first deliverable)"
[ -d "$PROJECT_DIR/docs/legal" ] && dir_has_files "docs/legal" || add_gap "docs/legal/ empty (Legal & Compliance — no jurisdiction opinions)"
dir_has_files "docs/reports/audit"       || add_gap "No audit reports (Independent Auditor)"
dir_has_files "docs/reports/product"     || add_gap "No product reports (CTO/Product — no T2 rubric, no release notes)"
dir_has_files "docs/reports/medical"     || add_gap "No medical reports (Medical Advisory + Content + Community)"
dir_has_files "docs/reports/growth"      || add_gap "No growth reports (Growth/Marketing — no T4 document)"
dir_has_files "docs/reports/fundraising" || add_gap "No fundraising reports (Web3 & Token Strategy)"
dir_has_files "docs/reports/web3"        || add_gap "No web3 reports (listing readiness checklist)"
dir_has_files "docs/reports/legal"       || add_gap "No legal reports (Legal & Compliance)"

if file_exists "docs/CONTRACT_AUDIT.md"; then
  grep -qi "bytecode.only\|not a substitute" "$PROJECT_DIR/docs/CONTRACT_AUDIT.md" 2>/dev/null \
    && add_gap "CONTRACT_AUDIT.md still bytecode-only — source-level audit needed"
fi

if [ -z "$GAPS" ]; then
  echo "No known gaps — all clear." >> "$REPORT_FILE"
  echo "  No known gaps."
else
  echo "  Known gaps found (see report)."
fi

# ═══════════════════════════════════════════════════════════════
# SUMMARY
# ═══════════════════════════════════════════════════════════════

TOTAL=$((PASS_COUNT + FAIL_COUNT + WARN_COUNT))

echo ""
echo "═══════════════════════════════════"
echo "  PASS: $PASS_COUNT"
echo "  FAIL: $FAIL_COUNT"
echo "  WARN: $WARN_COUNT"
echo "  TOTAL: $TOTAL checks"
echo "═══════════════════════════════════"

{
  echo ""
  echo "---"
  echo ""
  echo "## Summary"
  echo ""
  echo "| | Count |"
  echo "|--|-------|"
  echo "| PASS | $PASS_COUNT |"
  echo "| FAIL | $FAIL_COUNT |"
  echo "| WARN | $WARN_COUNT |"
  echo "| **Total** | **$TOTAL** |"
} >> "$REPORT_FILE"

echo ""
echo "Report saved: $REPORT_FILE"

if [ "$FAIL_COUNT" -gt 0 ]; then
  exit 1
fi
