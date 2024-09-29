# render-build.sh
if ! command -v chromium-browser &> /dev/null
then
    echo "Chromium could not be found, please ensure it's installed."
    exit
fi
