param(
 [Parameter(Mandatory=$true)][string]$Godot,
 [string]$WebTemplate
)
$ErrorActionPreference = 'Stop'
$presetPath = Join-Path $PSScriptRoot 'export_presets.cfg'
$originalPreset = [IO.File]::ReadAllText($presetPath)
try {
 if ($WebTemplate) {
  $templatePath = (Resolve-Path -LiteralPath $WebTemplate).Path.Replace('\','/')
  $updatedPreset = $originalPreset.Replace('custom_template/release=""', ('custom_template/release="' + $templatePath + '"'))
  [IO.File]::WriteAllText($presetPath,$updatedPreset)
 }
 & $Godot --headless --path $PSScriptRoot --editor --quit
 if ($LASTEXITCODE -ne 0) { throw 'Godot import failed' }
 & $Godot --headless --path $PSScriptRoot --script tests/validate.gd
 if ($LASTEXITCODE -ne 0) { throw 'Gameplay validation failed' }
 & $Godot --headless --path $PSScriptRoot --export-release Web
 if ($LASTEXITCODE -ne 0) { throw 'Godot web export failed' }
 $htmlPath = Join-Path $PSScriptRoot '../runeclash/index.html'
 [IO.File]::WriteAllText($htmlPath, [IO.File]::ReadAllText($htmlPath).TrimEnd() + "`n")
} finally {
 [IO.File]::WriteAllText($presetPath,$originalPreset)
}
