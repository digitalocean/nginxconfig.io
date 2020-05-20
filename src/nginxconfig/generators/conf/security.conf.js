import commonHsts from '../../util/common_hsts';

export default (domains, global) => {
    const config = [];

    config.push(['# security headers', '']);
    config.push(['add_header', 'X-Frame-Options "SAMEORIGIN" always']);
    config.push(['add_header', 'X-XSS-Protection "1; mode=block" always']);
    config.push(['add_header', 'X-Content-Type-Options "nosniff" always']);
    config.push(['add_header', `Referrer-Policy "${global.security.referrerPolicy.computed}" always`]);

    if (global.security.contentSecurityPolicy.computed)
        config.push(['add_header', `Content-Security-Policy "${global.security.contentSecurityPolicy.computed}" always`]);

    // Every domain has HSTS enabled, and they all have same hstsSubdomains/hstsPreload settings
    if (commonHsts(domains)) {
        const commonHSTSSubdomains = domains.length && domains[0].https.hstsSubdomains.computed;
        const commonHSTSPreload = domains.length && domains[0].https.hstsPreload.computed;
        config.push(['add_header', `Strict-Transport-Security "max-age=31536000${commonHSTSSubdomains ? '; includeSubDomains' : ''}${commonHSTSPreload ? '; preload' : ''}" always`]);
    }

    config.push(['# . files', '']);
    config.push(['location ~ /\\.(?!well-known)', {
        deny: 'all',
    }]);

    // Done!
    return config;
};
