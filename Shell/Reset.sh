#!/bin/sh
echo コード更新
git fetch --prune origin
git restore --staged .
git restore .
git pull
node deployCommand.js
#forever stop main.js
#forever start main.js
