@echo off

setlocal enabledelayedexpansion

if not "%~1"=="" (
  set "message=%~1"
) else (
  set "message=no comment"
)

git add --all
git commit -m "%message%"
git push
cls