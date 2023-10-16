/*
Copyright 2022 DigitalOcean

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

import { gzipTypes, extensions } from '../../util/types_extensions';

export default (domains, global) => {
    const config = {};

    config['# favicon.ico'] = '';
    config['location = /favicon.ico'] = {
        log_not_found: 'off',
    };

    config['# robots.txt'] = '';
    config['location = /robots.txt'] = {
        log_not_found: 'off',
    };

    if (global.performance.disableHtmlCaching.computed) {
        // Disable HTML caching for changes take effect in time
        config['# Disable HTML caching'] = '';
        const loc = `location ~* \\.(?:${extensions.html})$`;
        config[loc] = {
            add_header: 'Cache-Control "no-cache"',
        };
    }

    if (domains.every((d) => d.routing.root.computed)) {
        if (
            global.performance.assetsExpiration.computed ===
            global.performance.mediaExpiration.computed
        ) {
            if (global.performance.assetsExpiration.computed) {
                // Assets & media combined
                config['# assets, media'] = '';
                const loc = `location ~* \\.(?:${extensions.assets}|${extensions.images}|${extensions.audio}|${extensions.video})$`;
                config[loc] = {
                    expires: global.performance.assetsExpiration.computed,
                };
            }
        } else {
            // Assets & media separately
            if (global.performance.assetsExpiration.computed) {
                config['# assets'] = '';
                const loc = `location ~* \\.(?:${extensions.assets})$`;
                config[loc] = {
                    expires: global.performance.assetsExpiration.computed,
                };
            }

            if (global.performance.mediaExpiration.computed) {
                config['# media'] = '';
                const loc = `location ~* \\.(?:${extensions.images}|${extensions.audio}|${extensions.video})$`;
                config[loc] = {
                    expires: global.performance.mediaExpiration.computed,
                };
            }
        }

        if (
            global.performance.svgExpiration.computed ===
            global.performance.fontsExpiration.computed
        ) {
            if (global.performance.svgExpiration.computed) {
                // SVG & fonts combined
                config['# svg, fonts'] = '';
                const loc = `location ~* \\.(?:${extensions.svg}|${extensions.fonts})$`;
                config[loc] = {
                    add_header: 'Access-Control-Allow-Origin "*"',
                    expires: global.performance.svgExpiration.computed,
                };
            }
        } else {
            // SVG & fonts separately
            if (global.performance.svgExpiration.computed) {
                config['# svg'] = '';
                const loc = `location ~* \\.${extensions.svg}$`;
                config[loc] = {
                    add_header: 'Access-Control-Allow-Origin "*"',
                    expires: global.performance.svgExpiration.computed,
                };
            }

            if (global.performance.fontsExpiration.computed) {
                config['# fonts'] = '';
                const loc = `location ~* \\.${extensions.fonts}$`;
                config[loc] = {
                    add_header: 'Access-Control-Allow-Origin "*"',
                    expires: global.performance.fontsExpiration.computed,
                };
            }
        }
    }

    if (global.performance.gzipCompression.computed) {
        config['# gzip'] = '';
        config.gzip = 'on';
        config.gzip_vary = 'on';
        config.gzip_proxied = 'any';
        config.gzip_comp_level = 6;
        config.gzip_types = gzipTypes;
    }

    if (global.performance.brotliCompression.computed) {
        config['# brotli'] = '';
        config.brotli = 'on';
        config.brotli_comp_level = 6;
        config.brotli_types = gzipTypes;
    }

    // Done!
    return config;
};
