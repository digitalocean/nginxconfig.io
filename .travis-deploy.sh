#!/bin/bash

eval "$(ssh-agent -s)"
echo "$DEPLOY_PRIVATE_KEY" > deploy_key
chmod 600 deploy_key
ssh-add deploy_key
ssh -l root szekeres.me \
	"sudo -u www-data -H sh -c ' \
	cd /var/www/nginxconfig.io; \
	git pull origin master'"
