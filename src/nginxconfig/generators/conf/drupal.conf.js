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

export default global => {
    const config = {};

    config['# Drupal: deny private files'] = '';
    config['location ~ ((^|/)\\.|^.*\\.yml$|^/sites/.*/private/|^/sites/[^/]+/[^/]*settings.*\\.php$)'] = {
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
        try_files: '$uri /index.php?q=$uri&$args',
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
