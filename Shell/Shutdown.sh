#!/bin/sh
export GIT_TERMINAL_PROMPT=0
echo "Stop Server Process"
cd ~
sh Shell/stop_server.sh


echo "Shutdown Server"
sudo reboot
