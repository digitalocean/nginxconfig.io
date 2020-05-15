export default () => {
    const config = {};

    config.proxy_http_version = '1.1';
    config.proxy_cache_bypass = '$http_upgrade';

    config['proxy_set_header Upgrade'] = '$http_upgrade';
    config['proxy_set_header Connection'] = '"upgrade"';
    config['proxy_set_header Host'] = '$host';
    config['proxy_set_header X-Real-IP'] = '$remote_addr';
    config['proxy_set_header X-Forwarded-For'] = '$proxy_add_x_forwarded_for';
    config['proxy_set_header X-Forwarded-Proto'] = '$scheme';
    config['proxy_set_header X-Forwarded-Host'] = '$host';
    config['proxy_set_header X-Forwarded-Port'] = '$server_port';

    // Done!
    return config;
};
