#!/bin/bash

# Update system packages
apt-get update

# Install dependencies for Puppeteer and Chrome
apt-get install -y wget gnupg libxss1 libappindicator3-1 libasound2

# Add the Google Chrome repository
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

# Install Chrome
apt-get update
apt-get install -y google-chrome-stable

echo "Google Chrome has been installed!"
