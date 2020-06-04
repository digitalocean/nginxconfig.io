/*
Copyright 2020 DigitalOcean

This code is licensed under the MIT License.
You may obtain a copy of the License at
https://github.com/digitalocean/nginxconfig.io/blob/master/LICENSE or https://mit-license.org/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions :

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
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
