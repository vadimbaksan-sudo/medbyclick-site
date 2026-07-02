# Launches 3 Medical-lane AI role terminals for Marina.
# Usage (PowerShell from the project root):
#   Set-ExecutionPolicy Bypass -Scope Process
#   .\scripts\start-medical-team.ps1

$ProjectDir = Split-Path $PSScriptRoot -Parent

function Open-Role {
    param([string]$Title, [string]$Script)
    $scriptPath = "$ProjectDir\scripts\roles\$Script"
    Start-Process wt -ArgumentList @(
        "-w", "0",
        "new-tab",
        "--title", $Title,
        "-d", $ProjectDir,
        "powershell",
        "-NoExit",
        "-ExecutionPolicy", "Bypass",
        "-File", $scriptPath
    )
    Start-Sleep -Milliseconds 500
}

Open-Role -Title "Medical Advisory"  -Script "medical-advisory.ps1"
Open-Role -Title "Medical Content"   -Script "medical-content.ps1"
Open-Role -Title "Medical Community" -Script "medical-community.ps1"

Write-Host "Launched 3 Medical-lane terminals." -ForegroundColor Cyan
