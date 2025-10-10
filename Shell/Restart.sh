#!/bin/sh
export GIT_TERMINAL_PROMPT=0
echo "Restart Bot"
pm2 restart discord
node DeployCommand.sh 
