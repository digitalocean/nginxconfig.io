/*
Copyright 2024 DigitalOcean

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

import commonHsts from '../../util/common_hsts.js';

export default (domains, global) => {
    const config = [];

    config.push(['# security headers', '']);
    config.push(['add_header X-XSS-Protection', '"1; mode=block" always']);
    config.push(['add_header X-Content-Type-Options', '"nosniff" always']);
    config.push([
        'add_header Referrer-Policy',
        `"${global.security.referrerPolicy.computed}" always`,
    ]);

    if (global.security.contentSecurityPolicy.computed)
        config.push([
            'add_header Content-Security-Policy',
            `"${global.security.contentSecurityPolicy.computed}" always`,
        ]);

    if (global.security.permissionsPolicy.computed)
        config.push([
            'add_header Permissions-Policy',
            `"${global.security.permissionsPolicy.computed}" always`,
        ]);

    // Every domain has HSTS enabled, and they all have same hstsSubdomains/hstsPreload settings
    if (commonHsts(domains)) {
        const commonHSTSSubdomains = domains.length && domains[0].https.hstsSubdomains.computed;
        const commonHSTSPreload = domains.length && domains[0].https.hstsPreload.computed;
        config.push([
            'add_header Strict-Transport-Security',
            `"max-age=31536000${commonHSTSSubdomains ? '; includeSubDomains' : ''}${
                commonHSTSPreload ? '; preload' : ''
            }" always`,
        ]);
    }

    config.push(['# . files', '']);
    config.push([
        'location ~ /\\.(?!well-known)',
        {
            deny: 'all',
        },
    ]);

    // Security.txt
    if (global.security.securityTxt.computed) {
        config.push(['# security.txt', '']);
        config.push([
            'location /security.txt',
            {
                return: '301 /.well-known/security.txt',
            },
        ]);

        // Custom security.txt path
        config.push([
            'location = /.well-known/security.txt',
            {
                alias: `${global.security.securityTxtPath.value}`,
            },
        ]);
    }

    // Done!
    return config;
};
