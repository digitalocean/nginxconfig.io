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
