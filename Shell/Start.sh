#!/bin/sh
export GIT_TERMINAL_PROMPT=0
DISCORD_PROJECT_DIR="$HOME/Bread-s-Utility-Bot"
cd "$DISCORD_PROJECT_DIR"
echo "Start Bot"
node deployCommand.js > Log/deploy.log 2>&1
pm2 start main.js --name discord --output Log/node.log
