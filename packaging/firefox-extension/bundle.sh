#!/bin/sh

cp -r ./dist/public/extension-wrapper ./dist/public/firefox-extension
# copy the manifest file
cp ./packaging/firefox-extension/manifest-template.json ./dist/public/firefox-extension/manifest.json

# Get all js and css filenames, strip the path, add double quotes around them, then remove the trailing comma
js_files=$(for file in ./dist/public/firefox-extension/content_scripts/*.js; do basename "$file"; done | sed 's/\(.*\)/"content_scripts\/\1",/' | tr '\n' ' ' | sed 's/, $//')
css_files=$(for file in ./dist/public/firefox-extension/*.css; do basename "$file"; done | sed 's/\(.*\)/"\1",/' | tr '\n' ' ' | sed 's/, $//')
bg_js_file=$(for file in ./dist/public/firefox-extension/background_scripts/*.js; do basename "$file"; done)
bg_js_file="\"background_scripts/$bg_js_file\""

# Escape slashes in filenames
js_files=$(echo $js_files | sed 's/\//\\\//g')
css_files=$(echo $css_files | sed 's/\//\\\//g')
bg_js_file=$(echo $bg_js_file | sed 's/\//\\\//g')

# Get version number, increment the patch version, save it back in the file
version=$(cat ./packaging/firefox-extension/version-number)
IFS='.' read -ra version_parts <<< "$version"
patch_version=${version_parts[2]}
patch_version=$((patch_version + 1))
new_version="${version_parts[0]}.${version_parts[1]}.$patch_version"
echo $new_version > ./packaging/firefox-extension/version-number

# Replace the placeholders with filenames and version number
sed -i "s/{%js%}/$js_files/g" ./dist/public/firefox-extension/manifest.json
sed -i "s/{%css%}/$css_files/g" ./dist/public/firefox-extension/manifest.json
sed -i "s/{%version%}/$new_version/g" ./dist/public/firefox-extension/manifest.json
sed -i "s/{%bg_js%}/$bg_js_file/g" ./dist/public/firefox-extension/manifest.json

cd ./dist/public/firefox-extension
zip -r ./bundle-$new_version.zip ./*
cd ../../../
mv ./dist/public/firefox-extension/bundle-$new_version.zip ./dist/public/firefox-extension/bundle-$new_version.xpi