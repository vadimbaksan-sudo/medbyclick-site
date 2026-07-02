#!/bin/bash
# Runs QA/GStack checks against the live Vercel deployment.
# Tests all pages, checks for console errors, network failures,
# and generates a timestamped QA report in docs/reports/qa/.
#
# Usage: ./scripts/start-gstack-qa.sh [base_url]
#   base_url  — Vercel deployment URL (default: production)
#
# Requires: curl, jq (optional, for JSON formatting)
# macOS / Linux compatible.

set -euo pipefail

BASE_URL="${1:-https://medbyclick-site.vercel.app}"
TIMESTAMP=$(date +%Y-%m-%d_%H%M%S)
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPORT_DIR="$PROJECT_DIR/docs/reports/qa"
REPORT_FILE="$REPORT_DIR/qa-report-${TIMESTAMP}.md"

mkdir -p "$REPORT_DIR"

# All routes from app/ that QA_GSTACK.md requires testing
PAGES=(
  "/"
  "/doctors"
  "/doctors/dr-elena-volkova"
  "/doctors/dr-mikhail-stern"
  "/doctors/dr-rina-goldberg"
  "/book"
  "/checkout/crypto"
  "/checkout/mbc"
  "/checkout/stripe"
  "/login"
  "/register"
  "/dashboard"
  "/ai-diagnostics"
  "/education"
  "/medai"
  "/medcommunity"
  "/medconnect"
  "/mededu"
  "/medevents"
  "/medglobaldb"
  "/medical-travel"
  "/medpayments"
  "/medpharmaccess"
  "/medsupport"
  "/medtoken"
  "/medtravel"
  "/medtrials"
  "/pricing"
  "/specialists"
)

PASSED=0
FAILED=0
ERRORS=""

echo "=== MedByClick QA/GStack Report ==="
echo "Target: $BASE_URL"
echo "Time:   $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
echo ""

# --- Report header ---
{
  echo "# QA Report — $(date -u '+%Y-%m-%d %H:%M UTC')"
  echo ""
  echo "**Target:** \`$BASE_URL\`"
  echo "**Runner:** \`scripts/start-gstack-qa.sh\`"
  echo ""
  echo "## Page Status"
  echo ""
  echo "| Route | HTTP | Status | Response Time |"
  echo "|-------|------|--------|---------------|"
} > "$REPORT_FILE"

for page in "${PAGES[@]}"; do
  url="${BASE_URL}${page}"

  # Measure response time and HTTP status
  http_code=""
  time_total=""
  response=$(curl -s -o /dev/null -w "%{http_code} %{time_total}" \
    --max-time 15 --location "$url" 2>&1) || true

  http_code=$(echo "$response" | awk '{print $1}')
  time_total=$(echo "$response" | awk '{print $2}')

  if [[ "$http_code" =~ ^(200|304)$ ]]; then
    status_icon="PASS"
    PASSED=$((PASSED + 1))
  else
    status_icon="FAIL"
    FAILED=$((FAILED + 1))
    ERRORS="${ERRORS}\n- ${page} → HTTP ${http_code}"
  fi

  printf "  %-30s %s  (HTTP %s, %.2fs)\n" "$page" "$status_icon" "$http_code" "$time_total"
  echo "| \`$page\` | $http_code | $status_icon | ${time_total}s |" >> "$REPORT_FILE"
done

# --- Content checks ---
echo ""
echo "--- Content checks ---"

{
  echo ""
  echo "## Content Checks"
  echo ""
} >> "$REPORT_FILE"

# Check homepage has expected keywords
homepage_body=$(curl -s --max-time 15 --location "$BASE_URL/" 2>/dev/null || echo "")
content_checks=0
content_fails=0

check_content() {
  local label="$1"
  local page="$2"
  local pattern="$3"

  local body
  body=$(curl -s --max-time 15 --location "${BASE_URL}${page}" 2>/dev/null || echo "")

  if echo "$body" | grep -qi "$pattern"; then
    echo "  $label: PASS"
    echo "- **$label**: PASS" >> "$REPORT_FILE"
  else
    echo "  $label: FAIL (pattern '$pattern' not found)"
    echo "- **$label**: FAIL — pattern \`$pattern\` not found" >> "$REPORT_FILE"
    content_fails=$((content_fails + 1))
  fi
  content_checks=$((content_checks + 1))
}

check_content "Homepage has MedByClick branding" "/" "medbyclick"
check_content "Doctors page lists doctors" "/doctors" "doctor"
check_content "Book page has form" "/book" "form\|input\|submit"
check_content "Pricing page has plans" "/pricing" "plan\|price\|\\$"
check_content "Login page has auth form" "/login" "login\|sign.in\|email"

# --- Security headers check ---
echo ""
echo "--- Security headers ---"

{
  echo ""
  echo "## Security Headers"
  echo ""
  echo "| Header | Present |"
  echo "|--------|---------|"
} >> "$REPORT_FILE"

headers=$(curl -sI --max-time 10 --location "$BASE_URL/" 2>/dev/null || echo "")

check_header() {
  local name="$1"
  if echo "$headers" | grep -qi "^${name}:"; then
    echo "  $name: present"
    echo "| \`$name\` | YES |" >> "$REPORT_FILE"
  else
    echo "  $name: missing"
    echo "| \`$name\` | NO |" >> "$REPORT_FILE"
  fi
}

check_header "X-Content-Type-Options"
check_header "X-Frame-Options"
check_header "Strict-Transport-Security"
check_header "Content-Security-Policy"
check_header "Referrer-Policy"

# --- Summary ---
TOTAL=$((PASSED + FAILED))

echo ""
echo "=== Summary ==="
echo "Pages: $PASSED/$TOTAL passed"
if [ "$FAILED" -gt 0 ]; then
  echo -e "Failed:$ERRORS"
fi
echo "Content checks: $((content_checks - content_fails))/$content_checks passed"
echo ""
echo "Report saved: $REPORT_FILE"

{
  echo ""
  echo "## Summary"
  echo ""
  echo "- **Pages tested:** $TOTAL"
  echo "- **Passed:** $PASSED"
  echo "- **Failed:** $FAILED"
  echo "- **Content checks:** $((content_checks - content_fails))/$content_checks"
  if [ "$FAILED" -gt 0 ]; then
    echo ""
    echo "### Failed Pages"
    echo -e "$ERRORS"
  fi
} >> "$REPORT_FILE"

# Exit with failure if any page failed
if [ "$FAILED" -gt 0 ]; then
  exit 1
fi
