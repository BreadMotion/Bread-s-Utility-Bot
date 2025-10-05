#!/bin/sh
echo "Deploy Command"
pwd
pm2 deployCommand.js > Log/deploy.log 2>&1