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

import isObject from './is_object';

const oldBool = val => val.toString().trim() === '' ? true : val;

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

const domainMap = {
    domain:                 ['server', 'domain'],
    path:                   ['server', 'path'],
    document_root:          ['server', 'documentRoot'],
    non_www:                ['server', 'wwwSubdomain', val => !oldBool(val)],
    cdn:                    ['server', 'cdnSubdomain', oldBool],
    redirect:               ['server', 'redirectSubdomains', oldBool],
    ipv4:                   ['server', 'listenIpv4'],
    ipv6:                   ['server', 'listenIpv6'],

    https:                  ['https', 'https', oldBool],
    http2:                  ['https', 'http2', oldBool],
    force_https:            ['https', 'forceHttps', oldBool],
    hsts:                   ['https', 'hsts', oldBool],
    hsts_subdomains:        ['https', 'hstsSubdomains', oldBool],
    hsts_preload:           ['https', 'hstsPreload', oldBool],
    cert_type:              ['https', 'certType', val => val.toLowerCase().trim() === 'custom' ? 'custom' : 'letsEncrypt'],
    email:                  ['https', 'letsEncryptEmail'],
    ssl_certificate:        ['https', 'sslCertificate'],
    ssl_certificate_key:    ['https', 'sslCertificateKey'],

    php:                    ['php', 'php', oldBool],
    wordpress:              ['php', 'wordPressRules', oldBool],
    drupal:                 ['php', 'drupalRules', oldBool],
    magento:                ['php', 'magentoRules', oldBool],

    python:                 ['python', 'python', oldBool],
    django:                 ['python', 'djangoRules', oldBool],

    proxy:                  ['reverseProxy', 'reverseProxy', oldBool],
    proxy_path:             ['reverseProxy', 'path'],
    proxy_pass:             ['reverseProxy', 'proxyPass'],

    root:                   ['routing', 'root', oldBool],
    index:                  ['routing', 'index'],
    fallback_html:          ['routing', 'fallbackHtml', oldBool],
    fallback_php:           ['routing', 'fallbackPhp', oldBool],
    fallback_php_path:      ['routing', 'fallbackPhpPath'],
    php_legacy_routing:     ['routing', 'legacyPhpRouting', oldBool],

    access_log_domain:      ['logging', 'accessLog', oldBool],
    error_log_domain:       ['logging', 'errorLog', oldBool],
};

// Handle converting the old query format from nginxconfig.io-angular to our new query params
export default data => {
    // Hold any mapped global data
    const mappedGlobal = {};

    // Handle converting global settings & storing domains
    for (const key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) continue;

        // Map old global settings to their new ones
        if (key in globalMap && !isObject(data[key])) {
            const map = globalMap[key];

            mappedGlobal[map[0]] = mappedGlobal[map[0]] || {};
            mappedGlobal[map[0]][map[1]] = map.length < 3 ? data[key] : map[2](data[key]);
            continue;
        }

        // If not a global setting and if this is an integer
        // Then, this is probably an old domain, so we'll try to convert it as such
        if (!isNaN(parseInt(key))) {
            data.domains = data.domains || [];
            data.domains.push(data[key]);
        }
    }

    // Overwrite mapped global data
    data.global = {...(data.global || {}), ...mappedGlobal};

    // Handle converting domain settings
    if ('domains' in data && (Array.isArray(data.domains) || isObject(data.domains))) {
        // Ensure we're working with an array
        const values = isObject(data.domains) ? Object.values(data.domains) : data.domains;

        for (let i = 0; i < values.length; i++) {
            // Check this is an object
            if (!isObject(values[i])) continue;

            // Hold any mapped data
            const mappedData = {};

            // Handle converting old domain settings to new ones
            for (const key in values[i]) {
                if (!Object.prototype.hasOwnProperty.call(values[i], key)) continue;

                // Map old settings to their new ones
                if (key in domainMap) {
                    const map = domainMap[key];
                    mappedData[map[0]] = mappedData[map[0]] || {};
                    mappedData[map[0]][map[1]] = map.length < 3 ? values[i][key] : map[2](values[i][key]);
                }
            }

            // Overwrite mapped properties
            values[i] = {...values[i], ...mappedData};
        }

        // Store the updated domain data
        data.domains = values;
    }
};
