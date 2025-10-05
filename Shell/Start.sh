#!/bin/sh
export GIT_TERMINAL_PROMPT=0
echo "Start Bot"
pwd
node deployCommand.js > Log/deploy.log 2>&1
pm2 start main.js --name "Discord" --output Log/node.log