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

import { getSslCertificate, getSslCertificateKey } from '../../util/get_ssl_certificate';
import { getAccessLogDomainPath, getErrorLogDomainPath } from '../../util/get_log_paths';
import { extensions, gzipTypes } from '../../util/types_extensions';
import commonHsts from '../../util/common_hsts';
import securityConf from './security.conf';
import pythonConf from './python_uwsgi.conf';
import proxyConf from './proxy.conf';
import phpConf from './php_fastcgi.conf';
import generalConf from './general.conf';
import wordPressConf from './wordpress.conf';
import drupalConf from './drupal.conf';
import magentoConf from './magento.conf';
import joomlaConf from './joomla.conf';
import letsEncryptConf from './letsencrypt.conf';
import phpPath from '../../util/php_path';
import phpUpstream from '../../util/php_upstream';

const sslConfig = (domain, global) => {
    const config = [];
    if (domain.https.https.computed) {
        config.push(['# SSL', '']);
        config.push(['ssl_certificate', getSslCertificate(domain, global)]);
        config.push(['ssl_certificate_key', getSslCertificateKey(domain, global)]);

        // Let's encrypt
        if (domain.https.certType.computed === 'letsEncrypt')
            config.push(['ssl_trusted_certificate',
                `${global.https.letsEncryptCertRoot.computed.replace(/\/+$/, '')}/${domain.server.domain.computed}/chain.pem`]);
    }
    return config;
};

const httpsListen = (domain, global, ipPortPairs) => {
    const config = [];

    // Check if reuseport needs to be set
    const ipPortV4 = `${domain.server.listenIpv4.computed === '*' ? '' : `${domain.server.listenIpv4.computed}:`}443`;
    const reusePortV4 = global.https.portReuse.computed && !ipPortPairs.has(ipPortV4);
    if (reusePortV4) ipPortPairs.add(ipPortV4);

    // HTTPS
    config.push(['listen',
        `${ipPortV4} ssl${domain.https.http2.computed ? ' http2' : ''}${reusePortV4 ? ' reuseport' : ''}`]);

    // HTTP/3
    if (domain.https.http3.computed)
        config.push(['listen', `${ipPortV4} http3`]);

    // v6
    if (domain.server.listenIpv6.computed) {
        // Check if reuseport needs to be set
        const ipPortV6 = `[${domain.server.listenIpv6.computed}]:443`;
        const reusePortV6 = global.https.portReuse.computed && !ipPortPairs.has(ipPortV6);
        if (reusePortV6) ipPortPairs.add(ipPortV6);

        // HTTPS
        config.push(['listen',
            `${ipPortV6} ssl${domain.https.http2.computed ? ' http2' : ''}${reusePortV6 ? ' reuseport' : ''}`]);

        // HTTP/3
        if (domain.https.http3.computed)
            config.push(['listen', `${ipPortV6} http3`]);
    }

    return config;
};

const httpListen = (domain, global, ipPortPairs) => {
    const config = [];

    // Check if reuseport needs to be set
    const ipPortV4 = `${domain.server.listenIpv4.computed === '*' ? '' : `${domain.server.listenIpv4.computed}:`}80`;
    const reusePortV4 = global.https.portReuse.computed && !ipPortPairs.has(ipPortV4);
    if (reusePortV4) ipPortPairs.add(ipPortV4);

    // v4
    config.push(['listen', `${ipPortV4}${reusePortV4 ? ' reuseport' : ''}`]);

    // v6
    if (domain.server.listenIpv6.computed) {
        // Check if reuseport needs to be set
        const ipPortV6 = `[${domain.server.listenIpv6.computed}]:80`;
        const reusePortV6 = global.https.portReuse.computed && !ipPortPairs.has(ipPortV6);
        if (reusePortV6) ipPortPairs.add(ipPortV6);

        config.push(['listen', `${ipPortV6}${reusePortV6 ? ' reuseport' : ''}`]);
    }

    return config;
};

const listenConfig = (domain, global, ipPortPairs) => {
    if (domain.https.https.computed) return httpsListen(domain, global, ipPortPairs);
    return httpListen(domain, global, ipPortPairs);
};

const httpRedirectConfig = (domain, global, ipPortPairs, domainName, redirectDomain) => {
    // Build the server config on its own before adding it to the parent config
    const config = [];

    config.push(...httpListen(domain, global, ipPortPairs));
    config.push(['server_name', domainName]);

    if (domain.https.certType.computed === 'letsEncrypt') {
        // Let's encrypt

        if (global.tools.modularizedStructure.computed) {
            // Modularized
            config.push(['include', 'nginxconfig.io/letsencrypt.conf']);
        } else {
            // Unified
            config.push(...Object.entries(letsEncryptConf(global)));
        }

        config.push(['location /', {
            return: `301 https://${redirectDomain ? redirectDomain : domainName}$request_uri`,
        }]);
    } else {
        // Custom cert
        config.push(['return', `301 https://${redirectDomain ? redirectDomain : domainName}$request_uri`]);
    }

    return config;
};

export default (domain, domains, global, ipPortPairs) => {
    // Use kv so we can use the same key multiple times
    const config = [];

    // Build the server config on its own before adding it to the parent config
    const serverConfig = [];

    // Not HTTPS or not force HTTPS
    if (!domain.https.https.computed || !domain.https.forceHttps.computed)
        serverConfig.push(...httpListen(domain, global, ipPortPairs));

    // HTTPS
    if (domain.https.https.computed)
        serverConfig.push(...httpsListen(domain, global, ipPortPairs));

    serverConfig.push(['server_name',
        `${domain.server.wwwSubdomain.computed ? 'www.' : ''}${domain.server.domain.computed}`]);

    // PHP or Django
    if (domain.php.php.computed || (domain.python.python.computed && domain.python.djangoRules.computed)) {
        serverConfig.push(['set', `$base ${domain.server.path.computed}`]);

        // root
        if (domain.routing.root.computed)
            serverConfig.push(['root', `$base${domain.server.documentRoot.computed}`]);
    }

    // Not PHP and not Django and root
    if (!domain.php.php.computed
        && (!domain.python.python.computed || !domain.python.djangoRules.computed)
        && domain.routing.root.computed)
        serverConfig.push(['root', `${domain.server.path.computed}${domain.server.documentRoot.computed}`]);

    // HTTPS
    serverConfig.push(...sslConfig(domain, global));

    // Onion location
    if (domain.onion.onionLocation.computed) {
        serverConfig.push(['# Onion services', '']);
        serverConfig.push(['add_header Onion-Location', `http://${domain.onion.onionLocation.computed}$request_uri`]);
    }

    // HSTS
    if (!commonHsts(domains) && domain.https.hsts.computed) {
        serverConfig.push(['# HSTS', '']);
        serverConfig.push(['add_header Strict-Transport-Security',
            `"max-age=31536000${domain.https.hstsSubdomains.computed ? '; includeSubDomains' : ''}${domain.https.hstsPreload.computed ? '; preload' : ''}" always`]);
    }

    // Security
    if (global.tools.modularizedStructure.computed) {
        // Modularized
        serverConfig.push(['# security', '']);
        serverConfig.push(['include', 'nginxconfig.io/security.conf']);
    } else {
        // Unified
        serverConfig.push(...securityConf(domains, global));
    }

    // Restrict Methods
    if (Object.keys(domain.restrict).find(k => domain.restrict[k].computed && k !== 'responseCode')) {
        const allowedKeys = Object.keys(domain.restrict)
            .filter(k => !domain.restrict[k].computed && k !== 'responseCode')
            .map(e => e.replace('Method', '').toUpperCase());

        serverConfig.push(['# restrict methods', '']);
        serverConfig.push([`if ($request_method !~ ^(${allowedKeys.join('|')})$)`, {
            'return': `'${domain.restrict.responseCode.computed}'`,
        }]);
    }

    // Access log or error log for domain
    if (domain.logging.accessLog.computed || domain.logging.errorLog.computed) {
        serverConfig.push(['# logging', '']);

        if (domain.logging.accessLog.computed)
            serverConfig.push(['access_log',
                getAccessLogDomainPath(domain, global) + (global.logging.cloudflare.computed ? ' cloudflare' : '')]);

        if (domain.logging.errorLog.computed)
            serverConfig.push(['error_log', getErrorLogDomainPath(domain, global)]);
    }

    // index.php
    if (domain.routing.index.computed === 'index.php') {
        serverConfig.push(['# index.php', '']);
        serverConfig.push(['index', 'index.php']);
    }

    // Fallback index.html or index.php
    if ((domain.routing.fallbackHtml.computed || domain.routing.fallbackPhp.computed)
        && (!domain.reverseProxy.reverseProxy.computed || domain.reverseProxy.path.computed !== '/')) {
        serverConfig.push([`# index.${domain.routing.fallbackHtml.computed ? 'html' : (domain.routing.fallbackPhp.computed ? 'php' : '')} fallback`, '']);
        serverConfig.push(['location /', {
            try_files: `$uri $uri/ /index.${domain.routing.fallbackHtml.computed ? 'html' : (domain.routing.fallbackPhp.computed ? 'php?$query_string' : '')}`,
        }]);
    }

    // Fallback index.html and index.php
    if (domain.routing.fallbackHtml.computed && domain.routing.fallbackPhp.computed) {
        serverConfig.push(['# index.php fallback', '']);
        serverConfig.push([`location ~ ^${domain.routing.fallbackPhpPath.computed}`, {
            try_files: '$uri $uri/ /index.php?$query_string',
        }]);
    }

    // Python
    if (domain.python.python.computed) {
        if (global.tools.modularizedStructure.computed) {
            // Modularized
            serverConfig.push(['location /', { include: 'nginxconfig.io/python_uwsgi.conf' }]);
        } else {
            // Unified
            serverConfig.push(['location /', pythonConf(global)]);
        }

        // Django
        if (domain.python.djangoRules.computed) {
            serverConfig.push(['# Django media', '']);
            serverConfig.push(['location /media/', { alias: '$base/media/' }]);

            serverConfig.push(['# Django static', '']);
            serverConfig.push(['location /static/', { alias: '$base/static/' }]);
        }
    }

    // Reverse proxy
    if (domain.reverseProxy.reverseProxy.computed) {
        const locConf = [];
        locConf.push(['proxy_pass', domain.reverseProxy.proxyPass.computed]);

        if (global.tools.modularizedStructure.computed) {
            // Modularized
            locConf.push(['include', 'nginxconfig.io/proxy.conf']);
        } else {
            // Unified
            locConf.push(...Object.entries(proxyConf(global)));
        }

        serverConfig.push(['# reverse proxy', '']);
        serverConfig.push([`location ${domain.reverseProxy.path.computed}`, locConf]);
    }

    // Additional config
    if (global.tools.modularizedStructure.computed) {
        // Modularized
        serverConfig.push(['# additional config', '']);
        serverConfig.push(['include', 'nginxconfig.io/general.conf']);

        if (!domain.https.forceHttps.computed && domain.https.certType.computed === 'letsEncrypt')
            serverConfig.push(['include', 'nginxconfig.io/letsencrypt.conf']);

        if (domain.php.wordPressRules.computed) serverConfig.push(['include', 'nginxconfig.io/wordpress.conf']);
        if (domain.php.drupalRules.computed) serverConfig.push(['include', 'nginxconfig.io/drupal.conf']);
        if (domain.php.magentoRules.computed) serverConfig.push(['include', 'nginxconfig.io/magento.conf']);
        if (domain.php.joomlaRules.computed) serverConfig.push(['include', 'nginxconfig.io/joomla.conf']);
    } else {
        // Unified
        serverConfig.push(...Object.entries(generalConf(domains, global)));

        if (!domain.https.forceHttps.computed && domain.https.certType.computed === 'letsEncrypt')
            serverConfig.push(...Object.entries(letsEncryptConf(global)));

        if (domain.php.wordPressRules.computed) serverConfig.push(...Object.entries(wordPressConf(global)));
        if (domain.php.drupalRules.computed) serverConfig.push(...Object.entries(drupalConf(global)));
        if (domain.php.magentoRules.computed) serverConfig.push(...Object.entries(magentoConf()));
        if (domain.php.joomlaRules.computed) serverConfig.push(...Object.entries(joomlaConf()));
    }

    // PHP
    if (domain.php.php.computed) {
        if (domain.php.phpBackupServer.computed) {
            config.push([`upstream ${phpUpstream(domain)}`, {
                server: [
                    phpPath(domain),
                    `${phpPath(domain, true)} backup`,
                ],
            }]);
        }

        serverConfig.push(['# handle .php', '']);

        const loc = `location ~ ${domain.routing.legacyPhpRouting.computed ? '[^/]\\.php(/|$)' : '\\.php$'}`;

        const fastcgiPass = {
            fastcgi_pass: domain.php.phpBackupServer.computed !== ''
                ? phpUpstream(domain) : phpPath(domain),
        };

        if (global.tools.modularizedStructure.computed || domain.php.wordPressRules.computed) {
            // Modularized
            serverConfig.push([loc, {
                ...fastcgiPass,
                include: 'nginxconfig.io/php_fastcgi.conf',
            }]);
        } else {
            // Unified
            serverConfig.push([loc, {
                ...fastcgiPass,
                ...phpConf(domains),
            }]);
        }
    }

    // Add the server config to the parent config now its built
    config.push(['server', serverConfig]);

    // CDN!
    if (domain.server.cdnSubdomain.computed) {
        // Build the server config on its own before adding it to the parent config
        const cdnConfig = [];

        cdnConfig.push(...listenConfig(domain, global, ipPortPairs));
        cdnConfig.push(['server_name', `cdn.${domain.server.domain.computed}`]);
        cdnConfig.push(['root', `${domain.server.path.computed}${domain.server.documentRoot.computed}`]);

        // HTTPS
        cdnConfig.push(...sslConfig(domain, global));

        cdnConfig.push(['# disable access_log', '']);
        cdnConfig.push(['access_log', 'off']);

        // Gzip
        if (global.performance.gzipCompression.computed) {
            cdnConfig.push(['# gzip', '']);
            cdnConfig.push(['gzip', 'on']);
            cdnConfig.push(['gzip_vary', 'on']);
            cdnConfig.push(['gzip_proxied', 'any']);
            cdnConfig.push(['gzip_comp_level', 6]);
            cdnConfig.push(['gzip_types', gzipTypes]);
        }

        cdnConfig.push(['# allow safe files', '']);
        cdnConfig.push([
            `location ~* \\.(?:${extensions.assets}|${extensions.fonts}|${extensions.svg}|${extensions.images}|${extensions.audio}|${extensions.video}|${extensions.docs})$`,
            [
                ['add_header', 'Access-Control-Allow-Origin "*"'],
                ['add_header', 'Cache-Control "public"'],
                ['expires', '30d'],
            ],
        ]);

        cdnConfig.push(['# deny everything else', '']);
        cdnConfig.push(['location /', { deny: 'all' }]);

        // Add the CDN config to the parent config now its built
        config.push(['# CDN', '']);
        config.push(['server', cdnConfig]);
    }

    // Subdomains redirect
    if (domain.server.redirectSubdomains.computed) {
        // Build the server config on its own before adding it to the parent config
        const redirectConfig = [];

        redirectConfig.push(...listenConfig(domain, global, ipPortPairs));
        redirectConfig.push(['server_name',
            `${domain.server.wwwSubdomain.computed ? '' : '*'}.${domain.server.domain.computed}`]);

        // HTTPS
        redirectConfig.push(...sslConfig(domain, global));

        redirectConfig.push(['return',
            `301 http${domain.https.https.computed ? 's' : ''}://${domain.server.wwwSubdomain.computed ? 'www.' : ''}${domain.server.domain.computed}$request_uri`]);

        // Add the redirect config to the parent config now its built
        config.push([`# ${domain.server.wwwSubdomain.computed ? 'non-www, ' : ''}subdomains redirect`, '']);
        config.push(['server', redirectConfig]);
    }

    // HTTP redirect
    if (domain.https.forceHttps.computed) {
        // Add the redirect config to the parent config now its built
        config.push(['# HTTP redirect', '']);
        if (domain.server.wwwSubdomain.computed && !domain.server.redirectSubdomains.computed) {
            config.push(['server', httpRedirectConfig(domain, global, ipPortPairs,
                domain.server.domain.computed, `www.${domain.server.domain.computed}`)]);
            config.push(['server', httpRedirectConfig(domain, global, ipPortPairs,
                `www.${domain.server.domain.computed}`)]);
        } else if (!domain.server.wwwSubdomain.computed && !domain.server.redirectSubdomains.computed) {
            config.push(['server', httpRedirectConfig(domain, global, ipPortPairs,
                domain.server.domain.computed)]);
        }
        if (domain.server.cdnSubdomain.computed) {
            config.push(['server', httpRedirectConfig(domain, global, ipPortPairs,
                `cdn.${domain.server.domain.computed}`)]);
        }
        if (domain.server.redirectSubdomains.computed) {
            config.push(['server', httpRedirectConfig(domain, global, ipPortPairs,
                `.${domain.server.domain.computed}`,
                `${domain.server.wwwSubdomain.computed ? 'www.' : '' }${domain.server.domain.computed}`)]);
        }
    }

    return config;
};
