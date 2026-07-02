# Launches 3 Medical-lane AI role terminals for Marina.
# Works with standard PowerShell — Windows Terminal not required.
# Usage:
#   Set-ExecutionPolicy Bypass -Scope Process
#   .\scripts\start-medical-team.ps1

$ProjectDir = Split-Path $PSScriptRoot -Parent

function Open-Role {
    param([string]$Title, [string]$Script)
    $scriptPath = "$ProjectDir\scripts\roles\$Script"
    Start-Process powershell -ArgumentList @(
        "-NoExit",
        "-ExecutionPolicy", "Bypass",
        "-File", $scriptPath
    ) -WorkingDirectory $ProjectDir
    Start-Sleep -Milliseconds 800
}

Open-Role -Title "Medical Advisory"  -Script "medical-advisory.ps1"
Open-Role -Title "Medical Content"   -Script "medical-content.ps1"
Open-Role -Title "Medical Community" -Script "medical-community.ps1"

Write-Host "Launched 3 Medical-lane windows." -ForegroundColor Cyan
