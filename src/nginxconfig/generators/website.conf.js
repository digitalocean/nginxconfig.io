import { getSslCertificate, getSslCertificateKey } from '../util/get_ssl_certificate';
import { getAccessLogDomainPath, getErrorLogDomainPath } from '../util/get_log_paths';
import { extensions, gzipTypes } from '../util/types_extensions';
import commonHsts from '../util/common_hsts';
import securityConf from './security.conf';
import pythonConf from './python_uwsgi.conf';
import proxyConf from './proxy.conf';
import phpConf from './php_fastcgi.conf';
import generalConf from './general.conf';
import wordPressConf from './wordpress.conf';
import drupalConf from './drupal.conf';
import magentoConf from './magento.conf';

export default (domain, domains, global) => {
    // Use kv so we can use the same key multiple times
    const config = [];

    // Build the server config on its own before adding it to the parent config
    const serverConfig = [];
    const ipv4Pre = domain.server.listenIpv4.computed === '*' ? '' : `${domain.server.listenIpv4.computed}:`;

    // Not HTTPS or not force HTTPS
    if (!domain.https.https.computed || !domain.https.forceHttps.computed) {
        serverConfig.push(['listen', `${ipv4Pre}80`]);

        // v6
        if (domain.server.listenIpv6.computed)
            serverConfig.push(['listen', `[${domain.server.listenIpv6.computed}]:80`]);
    }

    // HTTPS
    if (domain.https.https.computed) {
        serverConfig.push(['listen', `${ipv4Pre}443 ssl${domain.https.http2.computed ? ' http2' : ''}`]);

        // v6
        if (domain.server.listenIpv6.computed)
            serverConfig.push(['listen',
                `[${domain.server.listenIpv6.computed}]:443 ssl${domain.https.http2.computed ? ' http2' : ''}`]);
    }

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
    if (domain.https.https.computed) {
        serverConfig.push(['# SSL', '']);
        serverConfig.push(['ssl_certificate', getSslCertificate(domain, global)]);
        serverConfig.push(['ssl_certificate_key', getSslCertificateKey(domain, global)]);

        // Let's encrypt
        if (domain.https.certType.computed === 'letsEncrypt')
            serverConfig.push(['ssl_trusted_certificate',
                `/etc/letsencrypt/live/${domain.server.domain.computed}/chain.pem`]);
    }

    // HSTS
    if (!commonHsts(domains) && domain.https.hsts.computed) {
        serverConfig.push(['# HSTS', '']);
        serverConfig.push(['add_header Strict-Transport-Security',
            `'"max-age=31536000${domain.https.hstsSubdomains.computed ? '; includeSubDomains' : ''}${domain.https.hstsPreload.computed ? '; preload' : ''}" always'`]);
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

    // Access log or error log for domain
    if (domain.logging.accessLog.computed || domain.logging.errorLog.computed) {
        serverConfig.push(['# logging', '']);

        if (domain.logging.accessLog.computed)
            serverConfig.push(['access_log', getAccessLogDomainPath(domain, global)]);

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
            try_files: `$uri $uri/ /index.${domain.routing.fallbackHtml.computed ? '.html' : (domain.routing.fallbackPhp.computed ? '.php?$query_string' : '')}`,
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
            serverConfig.push(['location /', pythonConf(domains, global)]);
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
            locConf.push(['include', 'nginxconfig.io/python_uwsgi.conf']);
        } else {
            // Unified
            locConf.push(...Object.entries(proxyConf()));
        }

        serverConfig.push(['# reverse proxy', '']);
        serverConfig.push([`location ${domain.reverseProxy.path.computed}`, locConf]);
    }

    // PHP
    if (domain.php.php.computed) {
        serverConfig.push(['# handle .php', '']);

        const loc = `location ~ ${domain.routing.legacyPhpRouting.computed ? '[^/]\\.php(/|$)' : '\\.php$'}`;
        if (global.tools.modularizedStructure.computed) {
            // Modularized
            serverConfig.push([loc, { include: 'nginxconfig.io/php_fastcgi.conf' }]);
        } else {
            // Unified
            serverConfig.push([loc, phpConf(domains, global)]);
        }
    }

    // Additional config
    if (global.tools.modularizedStructure.computed) {
        // Modularized
        serverConfig.push(['# additional config', '']);
        serverConfig.push(['include', 'nginxconfig.io/general.conf']);

        if (domain.php.wordPressRules.computed) serverConfig.push(['include', 'nginxconfig.io/wordpress.conf']);
        if (domain.php.drupalRules.computed) serverConfig.push(['include', 'nginxconfig.io/drupal.conf']);
        if (domain.php.magentoRules.computed) serverConfig.push(['include', 'nginxconfig.io/magento.conf']);
    } else {
        // Unified
        serverConfig.push(...Object.entries(generalConf(domains, global)));

        if (domain.php.wordPressRules.computed) serverConfig.push(...Object.entries(wordPressConf(domains, global)));
        if (domain.php.drupalRules.computed) serverConfig.push(...Object.entries(drupalConf(domains, global)));
        if (domain.php.magentoRules.computed) serverConfig.push(...Object.entries(magentoConf()));
    }

    // Add the server config to the parent config now its built
    config.push(['server', serverConfig]);

    // CDN!
    if (domain.server.cdnSubdomain.computed) {
        // Build the server config on its own before adding it to the parent config
        const cdnConfig = [];

        if (domain.https.https.computed) {
            // HTTPS
            cdnConfig.push(['listen', `${ipv4Pre}443 ssl${domain.https.http2.computed ? ' http2' : ''}`]);

            // v6
            if (domain.server.listenIpv6.computed)
                cdnConfig.push(['listen',
                    `[${domain.server.listenIpv6.computed}]:443 ssl${domain.https.http2.computed ? ' http2' : ''}`]);
        } else {
            // Not HTTPS
            cdnConfig.push(['listen', `${ipv4Pre}80`]);

            // v6
            if (domain.server.listenIpv6.computed)
                cdnConfig.push(['listen', `[${domain.server.listenIpv6.computed}]:80`]);
        }

        cdnConfig.push(['server_name', `cdn.${domain.server.domain.computed}`]);
        cdnConfig.push(['root', `${domain.server.path.computed}${domain.server.documentRoot.computed}`]);

        // HTTPS
        if (domain.https.https.computed) {
            serverConfig.push(['# SSL', '']);
            serverConfig.push(['ssl_certificate', getSslCertificate(domain, global)]);
            serverConfig.push(['ssl_certificate_key', getSslCertificateKey(domain, global)]);

            // Let's encrypt
            if (domain.https.certType.computed === 'letsEncrypt')
                serverConfig.push(['ssl_trusted_certificate',
                    `/etc/letsencrypt/live/${domain.server.domain.computed}/chain.pem`]);
        }

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

    // TODO: subdomain redirects
    // TODO: HTTP redirect

    return config;
};
