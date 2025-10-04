#!/bin/sh
echo "Git Pull"
git fetch --prune origin
git restore --staged .
git restore .
git pull

echo "Restart Bot"
forever restart main.js