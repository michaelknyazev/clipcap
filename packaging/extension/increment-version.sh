#!/bin/bash
version=$(cat ./packaging/extension/version-number.txt)
IFS='.' read -ra version_parts <<< "$version"
patch_version=${version_parts[2]}
patch_version=$((patch_version + 1))
new_version="${version_parts[0]}.${version_parts[1]}.$patch_version"
echo $new_version > ./packaging/extension/version-number.txt