/*
Copyright 2024 DigitalOcean

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

import phpPath from '../../util/php_path.js';
import phpUpstream from '../../util/php_upstream.js';

export default (global, domain) => {
    const config = {};

    config['# WordPress: allow TinyMCE'] = '';
    config['location = /wp-includes/js/tinymce/wp-tinymce.php'] = {
        include: 'nginxconfig.io/php_fastcgi.conf',
    };

    config['# WordPress: deny wp-content, wp-includes php files'] = '';
    config['location ~* ^/(?:wp-content|wp-includes)/.*\\.php$'] = {
        deny: 'all',
    };

    config['# WordPress: deny wp-content/uploads nasty stuff'] = '';
    config['location ~* ^/wp-content/uploads/.*\\.(?:s?html?|php|js|swf)$'] = {
        deny: 'all',
    };

    config['# WordPress: SEO plugin'] = '';
    config['location ~* ^/wp-content/plugins/wordpress-seo(?:-premium)?/css/main-sitemap\\.xsl$'] =
        {};

    config['# WordPress: deny wp-content/plugins (except earlier rules)'] = '';
    config['location ~ ^/wp-content/plugins'] = {
        deny: 'all',
    };

    config['# WordPress: deny general stuff'] = '';
    config[
        'location ~* ^/(?:xmlrpc\\.php|wp-links-opml\\.php|wp-config\\.php|wp-config-sample\\.php|readme\\.html|license\\.txt)$'
    ] = {
        deny: 'all',
    };

    if (global.security.limitReq.computed) {
        config['# WordPress: throttle wp-login.php'] = '';
        config['location = /wp-login.php'] = {
            limit_req: 'zone=login burst=2 nodelay',
            include: 'nginxconfig.io/php_fastcgi.conf',
        };
        if (domain.php.wordPressRules.computed) {
            config['location = /wp-login.php'].fastcgi_pass =
                domain.php.phpBackupServer.computed !== '' ? phpUpstream(domain) : phpPath(domain);
        }
    }

    // Done!
    return config;
};
