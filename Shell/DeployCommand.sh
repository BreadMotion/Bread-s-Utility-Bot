#!/bin/sh
echo "change directory to root"
cd ../

echo "Update Git"
git fetch --prune origin
git restore --staged .
git restore .
git pull

echo "Deploy Command"
node deployCommand.js