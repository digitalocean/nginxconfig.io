#!/bin/bash

npm run build:prod
find public -type f -name "*.html" -exec sed -i -e "s/COMMIT_HASH/$TRAVIS_COMMIT/" {} \;
rsync \
	--checksum \
	--delete \
	--delete-after \
	--force \
	--ignore-errors \
	--links \
	--recursive \
	--stats \
	--verbose \
	--exclude="/node_modules*" \
	--exclude="/cypress/videos*" \
	./ \
	www-data@nginxconfig.io:/var/www/nginxconfig.io/
