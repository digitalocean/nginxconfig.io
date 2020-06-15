/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export default global => {
    const config = {};

    config['# Drupal: deny private files'] = '';
    config['location ~ ((^|/)\.|^.*\.yml$|^/sites/.*/private/|^/sites/[^/]+/.*settings.*\.php$)'] = {
        deny: 'all',
        return: '404',
    };

    config['# Drupal: deny php in files'] = '';
    config['location ~ ^/sites/[^/]+/files/.*\\.php$'] = {
        deny: 'all',
    };

    config['# Drupal: deny php in vendor'] = '';
    config['location ~ /vendor/.*\\.php$'] = {
        deny: 'all',
    };

    config['# Drupal: allow image styles to be handled by the CMS'] = '';
    config['location ~ ^/sites/[^/]+/files/styles/'] = {
        try_files: '$uri @rewrite',
    };

    config['location @rewrite'] = {
        rewrite: '^/(.*)$ /index.php?q=$1',
    };

    config['# Drupal: handle private files'] = '';
    config['location ~ ^(/[a-z\\-]+)?/system/files/'] = {
        try_files: '$uri /index.php?$query_string',
    };

    if (global.security.limitReq.computed) {
        config['# Drupal: throttle user functions'] = '';
        config['location ~ ^/user/(?:login|register|password)'] = {
            limit_req: 'zone=login burst=2 nodelay',
            try_files: '$uri /index.php?$query_string',
        };
    }

    // Done!
    return config;
};
