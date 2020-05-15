import commonHsts from '../util/common_hsts';

export default (domains, global) => {
    const config = {};

    config['# security headers'] = '';
    config['add_header X-Frame-Options'] = '"SAMEORIGIN" always';
    config['add_header X-XSS-Protection'] = '"1; mode=block" always';
    config['add_header X-Content-Type-Options'] = '"nosniff" always';
    config['add_header Referrer-Policy'] = `"${global.security.referrerPolicy.computed}" always`;

    if (global.security.contentSecurityPolicy.computed)
        config['add_header Content-Security-Policy'] = `"${global.security.contentSecurityPolicy.computed}" always`;

    // Every domain has HSTS enabled, and they all have same hstsSubdomains/hstsPreload settings
    if (commonHsts(domains)) {
        const commonHSTSSubdomains = domains.length && domains[0].https.hstsSubdomains.computed;
        const commonHSTSPreload = domains.length && domains[0].https.hstsPreload.computed;
        config['add_header Strict-Transport-Security'] = `"max-age=31536000${commonHSTSSubdomains ? '; includeSubDomains' : ''}${commonHSTSPreload ? '; preload' : ''}" always`;
    }

    config['# . files'] = '';
    config['location ~ /\\.(?!well-known)'] = {
        deny: 'all',
    };

    // Done!
    return config;
};
