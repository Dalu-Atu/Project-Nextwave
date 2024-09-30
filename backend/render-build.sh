#!/bin/bash
echo "Installing Puppeteer and Chrome..."
npx puppeteer browsers install chrome
# Install dependencies
npm install
Chrome executable path: /opt/render/.cache/puppeteer/chrome/linux-127.0.6533.88/chrome-linux/chrome

# Set up Chromium path for Puppeteer
export PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"

# Run build command
npm run build
