/*
Copyright 2021 DigitalOcean

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

import isObject from './is_object';

const oldBool = (val) => (val.toString().trim() === '' ? true : val);

const globalMap = {
    ssl_profile: ['https', 'sslProfile'],
    resolver_cloudflare: ['https', 'ocspCloudflare', oldBool],
    resolver_google: ['https', 'ocspGoogle', oldBool],
    resolver_opendns: ['https', 'ocspOpenDns', oldBool],
    directory_letsencrypt: ['https', 'letsEncryptRoot'],

    referrer_policy: ['security', 'referrerPolicy'],
    content_security_policy: ['security', 'contentSecurityPolicy'],
    server_tokens: ['security', 'serverTokens', oldBool],
    limit_req: ['security', 'limitReq', oldBool],

    php_server: ['php', 'phpServer'],
    php_server_backup: ['php', 'phpBackupServer'],

    python_server: ['python', 'pythonServer'],

    gzip: ['performance', 'gzipCompression', oldBool],
    brotli: ['performance', 'brotliCompression', oldBool],
    expires_assets: ['performance', 'assetsExpiration'],
    expires_media: ['performance', 'mediaExpiration'],
    expires_svg: ['performance', 'svgExpiration'],
    expires_fonts: ['performance', 'fontsExpiration'],

    access_log: ['logging', 'accessLog'],
    error_log: ['logging', 'errorLog'],
    log_not_found: ['logging', 'logNotFound', oldBool],

    directory_nginx: ['nginx', 'nginxConfigDirectory'],
    worker_processes: ['nginx', 'workerProcesses'],
    user: ['nginx', 'user'],
    pid: ['nginx', 'pid'],
    client_max_body_size: ['nginx', 'clientMaxBodySize'],

    file_structure: [
        'tools',
        'modularizedStructure',
        (val) => val.toLowerCase().trim() === 'modularized',
    ],
    symlink: ['tools', 'symlinkVhost', oldBool],
};

const domainMap = {
    domain: ['server', 'domain'],
    path: ['server', 'path'],
    document_root: ['server', 'documentRoot'],
    non_www: ['server', 'wwwSubdomain', (val) => !oldBool(val)],
    cdn: ['server', 'cdnSubdomain', oldBool],
    redirect: ['server', 'redirectSubdomains', oldBool],
    ipv4: ['server', 'listenIpv4'],
    ipv6: ['server', 'listenIpv6'],

    https: ['https', 'https', oldBool],
    http2: ['https', 'http2', oldBool],
    force_https: ['https', 'forceHttps', oldBool],
    hsts: ['https', 'hsts', oldBool],
    hsts_subdomains: ['https', 'hstsSubdomains', oldBool],
    hsts_preload: ['https', 'hstsPreload', oldBool],
    cert_type: [
        'https',
        'certType',
        (val) => (val.toLowerCase().trim() === 'custom' ? 'custom' : 'letsEncrypt'),
    ],
    email: ['https', 'letsEncryptEmail'],
    ssl_certificate: ['https', 'sslCertificate'],
    ssl_certificate_key: ['https', 'sslCertificateKey'],

    php: ['php', 'php', oldBool],
    wordpress: ['php', 'wordPressRules', oldBool],
    drupal: ['php', 'drupalRules', oldBool],
    magento: ['php', 'magentoRules', oldBool],

    python: ['python', 'python', oldBool],
    django: ['python', 'djangoRules', oldBool],

    proxy: ['reverseProxy', 'reverseProxy', oldBool],
    proxy_path: ['reverseProxy', 'path'],
    proxy_pass: ['reverseProxy', 'proxyPass'],

    root: ['routing', 'root', oldBool],
    index: ['routing', 'index'],
    fallback_html: ['routing', 'fallbackHtml', oldBool],
    fallback_php: ['routing', 'fallbackPhp', oldBool],
    fallback_php_path: ['routing', 'fallbackPhpPath'],
    php_legacy_routing: ['routing', 'legacyPhpRouting', oldBool],

    access_log_domain: ['logging', 'accessLog', oldBool],
    error_log_domain: ['logging', 'errorLog', oldBool],
};

// Handle converting the old query format from nginxconfig.io-angular to our new query params
export default (data) => {
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
            data.domains = isObject(data.domains) ? data.domains : {};
            data.domains[key] = data[key];
        }
    }

    // Overwrite mapped global data
    data.global = { ...(data.global || {}), ...mappedGlobal };

    // Handle converting domain settings
    if ('domains' in data && isObject(data.domains)) {
        for (const key in data.domains) {
            // Don't include inherited props
            if (!Object.prototype.hasOwnProperty.call(data.domains, key)) continue;

            // Check this is an object
            if (!isObject(data.domains[key])) continue;

            // Hold any mapped data
            const mappedData = {};

            // Handle converting old domain settings to new ones
            for (const key2 in data.domains[key]) {
                // Don't include inherited props
                if (!Object.prototype.hasOwnProperty.call(data.domains[key], key2)) continue;

                // Don't convert objects
                if (isObject(data.domains[key][key2])) continue;

                // Map old settings to their new ones
                if (key2 in domainMap) {
                    const map = domainMap[key2];
                    mappedData[map[0]] = mappedData[map[0]] || {};
                    mappedData[map[0]][map[1]] =
                        map.length < 3 ? data.domains[key][key2] : map[2](data.domains[key][key2]);
                }
            }

            // Overwrite mapped properties
            data.domains[key] = { ...data.domains[key], ...mappedData };
        }
    }
};
