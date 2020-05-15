import { getSslCertificate, getSslCertificateKey } from '../util/get_ssl_certificate';
import commonHsts from '../util/common_hsts';
import securityConf from './security.conf';

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
        serverConfig.push(...Object.entries(securityConf(domains, global)));
    }

    // Access log or error log for domain
    // TODO: this & beyond

    // Add the server config to the parent config now its built
    config.push(['server', serverConfig]);

    return config;
};
