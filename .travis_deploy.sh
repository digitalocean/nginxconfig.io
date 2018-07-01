#!/bin/bash

rm public/assets/css/app.min.css*
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
	--exclude="/.git*" \
	--exclude="/node_modules*" \
	./ \
	www-data@nginxconfig.io:/var/www/nginxconfig.io/
