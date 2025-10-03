#!/bin/sh
echo シャットダウン
forever stop main.js
git fetch --prune origin
git restore --staged .
git restore .
git pull
node deployCommand.js
#shutdown -t now