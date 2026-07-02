# MedByClick — one-click Windows setup for Marina
# Run this ONCE from any PowerShell window:
#   irm https://raw.githubusercontent.com/vadimbaksan-sudo/medbyclick-site/main/scripts/setup-marina.ps1 | iex
#
# What it does:
#   1. Checks / installs prerequisites (git, bun, Claude Code)
#   2. Clones the repo to $HOME\medbyclick
#   3. Configures git identity
#   4. Verifies push access
#   5. Launches the 3 Medical-lane AI terminals

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Step  { param($n,$text) Write-Host "`n[$n] $text" -ForegroundColor Cyan }
function Write-OK    { param($text)    Write-Host "    OK  $text" -ForegroundColor Green }
function Write-Warn  { param($text)    Write-Host "    !   $text" -ForegroundColor Yellow }
function Write-Fail  { param($text)    Write-Host "    ERR $text" -ForegroundColor Red }

$ProjectDir = "$HOME\medbyclick"
$RepoURL    = "https://github.com/vadimbaksan-sudo/medbyclick-site.git"

# ── 1. Prerequisites ──────────────────────────────────────────────────────────
Write-Step 1 "Checking prerequisites"

# Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Warn "Git not found — downloading installer..."
    $gitInstaller = "$env:TEMP\git-setup.exe"
    Invoke-WebRequest "https://github.com/git-for-windows/git/releases/download/v2.47.0.windows.2/Git-2.47.0.2-64-bit.exe" -OutFile $gitInstaller
    Start-Process $gitInstaller -ArgumentList "/VERYSILENT /NORESTART /NOCANCEL" -Wait
    $env:PATH += ";C:\Program Files\Git\cmd"
    Write-OK "Git installed"
} else {
    Write-OK "Git $(git --version)"
}

# Bun (needed to run `bun run dev` locally — optional but recommended)
if (-not (Get-Command bun -ErrorAction SilentlyContinue)) {
    Write-Warn "Bun not found — installing..."
    Invoke-RestMethod "https://bun.sh/install.ps1" | Invoke-Expression
    Write-OK "Bun installed"
} else {
    Write-OK "Bun $(bun --version)"
}

# Claude Code
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    Write-Warn "Claude Code not found."
    Write-Host "    Install it from: https://docs.claude.com/claude-code" -ForegroundColor Yellow
    Write-Host "    Then re-run this script." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
} else {
    Write-OK "Claude Code found"
}

# ── 2. Clone or update repo ───────────────────────────────────────────────────
Write-Step 2 "Repository"

if (Test-Path "$ProjectDir\.git") {
    Write-OK "Repo already cloned at $ProjectDir — pulling latest"
    git -C $ProjectDir pull
} else {
    Write-OK "Cloning into $ProjectDir"
    git clone $RepoURL $ProjectDir
}

Set-Location $ProjectDir

# ── 3. Git identity ───────────────────────────────────────────────────────────
Write-Step 3 "Git identity"

$currentName  = git config --local user.name  2>$null
$currentEmail = git config --local user.email 2>$null

if ($currentName -and $currentEmail) {
    Write-OK "Already set: $currentName <$currentEmail>"
} else {
    $name  = Read-Host "    Your name (e.g. Marina)"
    $email = Read-Host "    Your GitHub email"
    git config --local user.name  $name
    git config --local user.email $email
    Write-OK "Identity saved: $name <$email>"
}

# ── 4. Push access check ──────────────────────────────────────────────────────
Write-Step 4 "Verifying push access"

try {
    git ls-remote --exit-code origin HEAD | Out-Null
    Write-OK "Read access confirmed"
    # Try a dry-run push to verify write permission
    $pushTest = git push --dry-run origin HEAD:main 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-OK "Push (write) access confirmed — you can commit and push"
    } else {
        Write-Warn "Read OK, but push access not yet active."
        Write-Host "    Accept the GitHub collaborator invitation email from Vadim and try again." -ForegroundColor Yellow
    }
} catch {
    Write-Fail "Cannot reach remote. Check your internet connection."
}

# ── 5. Launch Medical-lane terminals ──────────────────────────────────────────
Write-Step 5 "Launching Medical-lane AI terminals"

if (Get-Command wt -ErrorAction SilentlyContinue) {
    & "$ProjectDir\scripts\start-medical-team.ps1"
    Write-OK "3 Medical-lane terminals launched in Windows Terminal"
} else {
    Write-Warn "Windows Terminal (wt.exe) not found — skipping auto-launch."
    Write-Host "    Install Windows Terminal from the Microsoft Store, then run:" -ForegroundColor Yellow
    Write-Host "    .\scripts\start-medical-team.ps1" -ForegroundColor Yellow
}

# ── Done ──────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host " Setup complete!  Project is at:  $ProjectDir" -ForegroundColor Cyan
Write-Host ""
Write-Host " Read first:" -ForegroundColor White
Write-Host "   docs\WINDOWS_SETUP.md            — full guide" -ForegroundColor Gray
Write-Host "   docs\agents\MEDICAL_ADVISORY.md  — your advisory role" -ForegroundColor Gray
Write-Host "   docs\agents\MEDICAL_CONTENT.md   — your content role" -ForegroundColor Gray
Write-Host "   docs\agents\MEDICAL_COMMUNITY.md — your community role" -ForegroundColor Gray
Write-Host ""
Write-Host " Daily workflow:" -ForegroundColor White
Write-Host "   cd $ProjectDir" -ForegroundColor Gray
Write-Host "   git pull                          — sync before starting" -ForegroundColor Gray
Write-Host "   .\scripts\start-medical-team.ps1 — launch AI roles" -ForegroundColor Gray
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
