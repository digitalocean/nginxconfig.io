import { gzipTypes, extensions } from '../../util/types_extensions';

export default (domains, global) => {
    const config = {};

    config['# favicon.ico'] = '';
    config['location = /favicon.ico'] = {
        log_not_found: 'off',
    };
    if (global.logging.accessLog.computed) config['location = /favicon.ico'].access_log = 'off';

    config['# robots.txt'] = '';
    config['location = /robots.txt'] = {
        log_not_found: 'off',
    };
    if (global.logging.accessLog.computed) config['location = /robots.txt'].access_log = 'off';

    if (domains.every(d => d.routing.root.computed)) {
        if (global.performance.assetsExpiration.computed === global.performance.mediaExpiration.computed) {
            if (global.performance.assetsExpiration.computed) {
                // Assets & media combined
                config['# assets, media'] = '';
                const loc = `location ~* \\.(?:${extensions.assets}|${extensions.images}|${extensions.audio}|${extensions.video})$`;
                config[loc] = {
                    expires: global.performance.assetsExpiration.computed,
                };
                if (global.logging.accessLog.computed) config[loc].access_log = 'off';
            }
        } else {
            // Assets & media separately
            if (global.performance.assetsExpiration.computed) {
                config['# assets'] = '';
                const loc = `location ~* \\.(?:${extensions.assets})$`;
                config[loc] = {
                    expires: global.performance.assetsExpiration.computed,
                };
                if (global.logging.accessLog.computed) config[loc].access_log = 'off';
            }

            if (global.performance.mediaExpiration.computed) {
                config['# media'] = '';
                const loc = `location ~* \\.(?:${extensions.images}|${extensions.audio}|${extensions.video})$`;
                config[loc] = {
                    expires: global.performance.mediaExpiration.computed,
                };
                if (global.logging.accessLog.computed) config[loc].access_log = 'off';
            }
        }

        if (global.performance.svgExpiration.computed === global.performance.fontsExpiration.computed) {
            if (global.performance.svgExpiration.computed) {
                // SVG & fonts combined
                config['# svg, fonts'] = '';
                const loc = `location ~* \\.(?:${extensions.svg}|${extensions.fonts})$`;
                config[loc] = {
                    add_header: 'Access-Control-Allow-Origin "*"',
                    expires: global.performance.svgExpiration.computed,
                };
                if (global.logging.accessLog.computed) config[loc].access_log = 'off';
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
                if (global.logging.accessLog.computed) config[loc].access_log = 'off';
            }

            if (global.performance.fontsExpiration.computed) {
                config['# fonts'] = '';
                const loc = `location ~* \\.${extensions.fonts}$`;
                config[loc] = {
                    add_header: 'Access-Control-Allow-Origin "*"',
                    expires: global.performance.fontsExpiration.computed,
                };
                if (global.logging.accessLog.computed) config[loc].access_log = 'off';
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
