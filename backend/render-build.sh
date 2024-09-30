#!/bin/bash
echo "Installing Puppeteer and Chrome..."
npx puppeteer browsers install chrome
# Install dependencies
npm install

# Set up Chromium path for Puppeteer
export PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"

# Run build command
npm run build
