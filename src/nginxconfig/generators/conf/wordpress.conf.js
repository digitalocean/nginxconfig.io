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

    config['# WordPress: allow TinyMCE'] = '';
    config['location = /wp-includes/js/tinymce/wp-tinymce.php'] = {
        include: 'nginxconfig.io/php_fastcgi.conf',
    };

    config['# WordPress: deny wp-content, wp-includes php files'] = '';
    config['~* ^/(?:wp-content|wp-includes)/.*\\.php$'] = {
        deny: 'all',
    };

    config['# WordPress: deny wp-content/uploads nasty stuff'] = '';
    config['location ~* ^/wp-content/uploads/.*\\.(?:s?html?|php|js|swf)$'] = {
        deny: 'all',
    };

    config['# WordPress: SEO plugin'] = '';
    config['location ~* ^/wp-content/plugins/wordpress-seo(?:-premium)?/css/main-sitemap\\.xsl$'] = {};

    config['# WordPress: deny wp-content/plugins (except earlier rules)'] = '';
    config['location ~ ^/wp-content/plugins'] = {
        deny: 'all',
    };

    config['# WordPress: deny scripts and styles concat'] = '';
    config['location ~* \\/wp-admin\\/load-(?:scripts|styles)\\.php'] = {
        deny: 'all',
    };

    config['# WordPress: deny general stuff'] = '';
    config['location ~* ^/(?:xmlrpc\\.php|wp-links-opml\\.php|wp-config\\.php|wp-config-sample\\.php|wp-comments-post\\.php|readme\\.html|license\\.txt)$'] = {
        deny: 'all',
    };

    if (global.security.limitReq.computed) {
        config['# WordPress: throttle wp-login.php'] = '';
        config['location = /wp-login.php'] = {
            limit_req: 'zone=login burst=2 nodelay',
            include: 'nginxconfig.io/php_fastcgi.conf',
        };
    }

    // Done!
    return config;
};
