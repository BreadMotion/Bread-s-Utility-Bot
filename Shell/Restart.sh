#!/bin/sh
echo "Git Pull"
git fetch --prune origin
git restore --staged .
git restore .
git pull

echo "Restart Bot"
forever stop main.js
forever start main.js
