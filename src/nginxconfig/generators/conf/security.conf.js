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

import commonHsts from '../../util/common_hsts';

export default (domains, global) => {
    const config = [];

    config.push(['# security headers', '']);
    config.push(['add_header X-Frame-Options', '"SAMEORIGIN" always']);
    config.push(['add_header X-XSS-Protection', '"1; mode=block" always']);
    config.push(['add_header X-Content-Type-Options', '"nosniff" always']);
    config.push(['add_header Referrer-Policy', `"${global.security.referrerPolicy.computed}" always`]);

    if (global.security.contentSecurityPolicy.computed)
        config.push(['add_header Content-Security-Policy', `"${global.security.contentSecurityPolicy.computed}" always`]);

    // Every domain has HSTS enabled, and they all have same hstsSubdomains/hstsPreload settings
    if (commonHsts(domains)) {
        const commonHSTSSubdomains = domains.length && domains[0].https.hstsSubdomains.computed;
        const commonHSTSPreload = domains.length && domains[0].https.hstsPreload.computed;
        config.push(['add_header Strict-Transport-Security', `"max-age=31536000${commonHSTSSubdomains ? '; includeSubDomains' : ''}${commonHSTSPreload ? '; preload' : ''}" always`]);
    }

    config.push(['# . files', '']);
    config.push(['location ~ /\\.(?!well-known)', {
        deny: 'all',
    }]);

    // Done!
    return config;
};
