const oldBool = val => val === '' ? true : val;

const globalMap = {
    ssl_profile:                ['https', 'sslProfile'],
    resolver_cloudflare:        ['https', 'ocspCloudflare', oldBool],
    resolver_google:            ['https', 'ocspGoogle', oldBool],
    resolver_opendns:           ['https', 'ocspOpenDns', oldBool],
    directory_letsencrypt:      ['https', 'letsEncryptRoot'],

    referrer_policy:            ['security', 'referrerPolicy'],
    content_security_policy:    ['security', 'contentSecurityPolicy'],
    server_tokens:              ['security', 'serverTokens', oldBool],
    limit_req:                  ['security', 'limitReq', oldBool],

    php_server:                 ['php', 'phpServer'],
    php_server_backup:          ['php', 'phpBackupServer'],

    python_server:              ['python', 'pythonServer'],

    gzip:                       ['performance', 'gzipCompression', oldBool],
    brotli:                     ['performance', 'brotliCompression', oldBool],
    expires_assets:             ['performance', 'assetsExpiration'],
    expires_media:              ['performance', 'mediaExpiration'],
    expires_svg:                ['performance', 'svgExpiration'],
    expires_fonts:              ['performance', 'fontsExpiration'],

    access_log:                 ['logging', 'accessLog'],
    error_log:                  ['logging', 'errorLog'],
    log_not_found:              ['logging', 'logNotFound', oldBool],

    directory_nginx:            ['nginx', 'nginxConfigDirectory'],
    worker_processes:           ['nginx', 'workerProcesses'],
    user:                       ['nginx', 'user'],
    pid:                        ['nginx', 'pid'],
    client_max_body_size:       ['nginx', 'clientMaxBodySize'],

    file_structure:             ['tools', 'modularizedStructure', val => val.toLowerCase().trim() === 'modularized'],
    symlink:                    ['tools', 'symlinkVhost', oldBool],
};

// Handle converting the old query format from nginxconfig.io-angular to our new query params
export default data => {
    // Handle converting global settings & storing domains
    for (const key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) continue;

        // Map old global settings to their new ones
        if (key in globalMap) {
            const map = globalMap[key];

            data.global = data.global || {};
            data.global[map[0]] = data.global[map[0]] || {};
            data.global[map[0]][map[1]] = map.length < 3 ? data[key] : map[2](data[key]);

            delete data[key];
            continue;
        }

        // If not a global setting and if this is an integer
        // Then, this is probably an old domain, so we'll try to convert it as such
        if (!isNaN(parseInt(key))) {
            data.domains = data.domains || [];
            data.domains.push(data[key]);
        }
    }

    // TODO: Handle converting domain settings
};
