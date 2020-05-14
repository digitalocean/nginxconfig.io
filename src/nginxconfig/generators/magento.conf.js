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

        'location ~* .(?:ico|jpg|jpeg|png|gif|svg|js|css|swf|eot|ttf|otf|woff|woff2)$': {
            expires: '+1y',
            add_header: 'Cache-Control "public"',
            try_files: '$uri $uri/ /get.php?$args',
        },

        'location ~* .(?:zip|gz|gzip|bz2|csv|xml)$': {
            expires: 'off',
            add_header: 'Cache-Control "no-store"',
            try_files: '$uri $uri/ /get.php?$args',
        },

        'location ~ ^/media/theme_customization/.*.xml': {
            deny: 'all',
        },

        'location ~ ^/media/(?:customer|downloadable|import)/': {
            deny: 'all',
        },
    };

    // TODO: static route
    // TODO: static files
    // TODO: deny cron

    // Done!
    return config;
};
