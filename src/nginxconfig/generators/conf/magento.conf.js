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

export default () => {
    const config = {};

    config['# Magento: setup'] = '';
    config['location ^~ /setup'] = {
        root: '$base',

        '# allow index.php': '',
        'location ~ ^/setup/index.php': {
            include: 'nginxconfig.io/php_fastcgi.conf',
        },

        '# deny everything except pub': '',
        'location ~ ^/setup/(?!pub/).': {
            deny: 'all',
        },
    };

    config['# Magento: update'] = '';
    config['location ^~ /update'] = {
        root: '$base',

        '# allow index.php': '',
        'location ~ ^/update/index.php': {
            include: 'nginxconfig.io/php_fastcgi.conf',
        },

        '# deny everything except pub': '',
        'location ~ ^/update/(?!pub/).': {
            deny: 'all',
        },
    };

    config['# Magento: media files'] = '';
    config['location ^~ /media/'] = {
        try_files: '$uri $uri/ /get.php?$args',

        'location ~* \\.(?:ico|jpg|jpeg|png|gif|svg|js|css|swf|eot|ttf|otf|woff|woff2)$': {
            expires: '+1y',
            add_header: 'Cache-Control "public"',
            try_files: '$uri $uri/ /get.php?$args',
        },

        'location ~* \\.(?:zip|gz|gzip|bz2|csv|xml)$': {
            expires: 'off',
            add_header: 'Cache-Control "no-store"',
            try_files: '$uri $uri/ /get.php?$args',
        },

        'location ~ ^/media/theme_customization/.*\\.xml': {
            deny: 'all',
        },

        'location ~ ^/media/(?:customer|downloadable|import)/': {
            deny: 'all',
        },
    };

    config['# Magento: static route'] = '';
    config['location @magento_static'] = {
        rewrite: '^/static/(version\\d*/)?(.*)$ /static.php?resource=$2 last',
    };

    config['# Magento: static files'] = '';
    config['location ^~ /static/'] = {
        expires: 'max',
        try_files: '$uri $uri/ @magento_static',

        'location ~* \\.(ico|jpg|jpeg|png|gif|svg|js|css|swf|eot|ttf|otf|woff|woff2)$': {
            expires: '+1y',
            add_header: 'Cache-Control "public"',
            try_files: '$uri $uri/ magento_static',
        },

        'location ~* .(zip|gz|gzip|bz2|csv|xml)$': {
            expires: 'off',
            add_header: 'Cache-Control "no-store"',
            try_files: '$uri $uri/ @magento_static',
        },
    };

    config['# Magento: deny cron'] = '';
    config['location ~ cron\\.php'] = {
        deny: 'all',
    };

    // Done!
    return config;
};
