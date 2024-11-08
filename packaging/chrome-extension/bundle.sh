#!/bin/sh

# copy the manifest file
cp -r ./dist/public/extension-wrapper ./dist/public/chrome-extension
cp ./packaging/chrome-extension/manifest-template.json ./dist/public/chrome-extension/manifest.json

# Get all js and css filenames, strip the path, add double quotes around them, then remove the trailing comma
js_files=$(for file in ./dist/public/chrome-extension/content_scripts/*.js; do basename "$file"; done | sed 's/\(.*\)/"content_scripts\/\1",/' | tr '\n' ' ' | sed 's/, $//')
css_files=$(for file in ./dist/public/chrome-extension/*.css; do basename "$file"; done | sed 's/\(.*\)/"\1",/' | tr '\n' ' ' | sed 's/, $//')
bg_js_file=$(for file in ./dist/public/chrome-extension/background_scripts/*.js; do basename "$file"; done)
bg_js_file="\"background_scripts/$bg_js_file\""

# Escape slashes in filenames
js_files=$(echo $js_files | sed 's/\//\\\//g')
css_files=$(echo $css_files | sed 's/\//\\\//g')
bg_js_file=$(echo $bg_js_file | sed 's/\//\\\//g')

# Get version number, increment the patch version, save it back in the file
version=$(cat ./packaging/chrome-extension/version-number)

# Replace the placeholders with filenames and version number
sed -i "s/{%js%}/$js_files/g" ./dist/public/chrome-extension/manifest.json
sed -i "s/{%css%}/$css_files/g" ./dist/public/chrome-extension/manifest.json
sed -i "s/{%version%}/$version/g" ./dist/public/chrome-extension/manifest.json
sed -i "s/{%bg_js%}/$bg_js_file/g" ./dist/public/chrome-extension/manifest.json

zip -r ./dist/public/chrome-extension/bundle-$version.zip ./dist/public/chrome-extension/*