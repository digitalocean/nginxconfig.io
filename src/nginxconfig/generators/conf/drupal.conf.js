export default global => {
    const config = {};

    config['# Drupal: deny private files'] = '';
    config['location ~ ^/sites/.*/private/'] = {
        deny: 'all',
    };

    config['# Drupal: deny php in files'] = '';
    config['location ~ ^/sites/[^/]+/files/.*\\.php$'] = {
        deny: 'all',
    };

    config['# Drupal: deny php in vendor'] = '';
    config['location ~ /vendor/.*\\.php$'] = {
        deny: 'all',
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
