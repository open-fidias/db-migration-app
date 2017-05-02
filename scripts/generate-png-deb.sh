#!/usr/bin/env bash
#
# icns file must have these sizes with these file names
# To convert these generated files to icns first install icnsutils
#   sudo apt-get install icnsutils

set -o nounset
set -o errexit
set -o pipefail

declare -a sizes=("16" "32" "128" "256" "512" "1024")
for size in "${sizes[@]}"
do
    inkscape --file=./app/build/icons/logo.svg \
        --export-width="$size" \
        --export-height="$size" \
        --export-png=./app/build/icons/"${size}x${size}x32.png"

done

png2icns app/icons/icon.icns app/build/icons/*.png
convert app/build/icons/256x256x32.png app/icons/icon.ico
