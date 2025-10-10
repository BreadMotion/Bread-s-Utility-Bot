#!/bin/sh
export GIT_TERMINAL_PROMPT=0
echo "Git Pull"
git fetch --prune origin
git restore --staged .
git restore .
git pull
