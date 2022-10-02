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

import commonHsts from '../../util/common_hsts';

export default (domains, global) => {
    const config = [];

    config.push(['# security headers', '']);
    config.push(['add_header X-XSS-Protection', '"1; mode=block" always']);
    config.push(['add_header X-Content-Type-Options', '"nosniff" always']);
    config.push(['add_header Referrer-Policy', `"${global.security.referrerPolicy.computed}" always`]);

    if (global.security.contentSecurityPolicy.computed)
        config.push(['add_header Content-Security-Policy', `"${global.security.contentSecurityPolicy.computed}" always`]);

    if (global.security.permissionsPolicy.computed)
        config.push(['add_header Permissions-Policy', `"${global.security.permissionsPolicy.computed}" always`]);

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

    // Security.txt
    if (global.security.securityTxt.computed) {
        config.push(['# security.txt', '']);
        config.push(['location /security.txt', {
            return: '301 /.well-known/security.txt',
        }]);

        // Custom security.txt path
        config.push(['location = /.well-known/security.txt', {
            alias: `${global.security.securityTxtPath.value}`,
        }]);
    }

    if (global.security.blockCommonExploits.computed) {
        // Based on https://github.com/NginxProxyManager/nginx-proxy-manager/blob/v2.9.0/docker/rootfs/etc/nginx/conf.d/include/block-exploits.conf
        // Block SQL Injections
        config.push(['# Block SQL injections', '']);
        config.push(['set $block_sql_injections', '0']);
        config.push([
            'if ($query_string ~ "union.*select.*(")',
            {
                set: '$block_sql_injections 1',
            },
        ]);
        config.push([
            'if ($query_string ~ "union.*all.*select.*")',
            {
                set: '$block_sql_injections 1',
            },
        ]);
        config.push([
            'if ($query_string ~ "concat.*(")',
            {
                set: '$block_sql_injections 1',
            },
        ]);
        config.push(['if ($block_sql_injections = 1)', { return: '403' }]);

        // Block file injections
        config.push(['## Block file injections', '']);
        config.push(['set $block_file_injections', '0']);
        config.push([
            'if ($query_string ~ "[a-zA-Z0-9_]=http://")',
            { set: '$block_file_injections 1' },
        ]);
        config.push([
            'if ($query_string ~ "[a-zA-Z0-9_]=(..//?)+")', // eslint-disable-line
            { set: '$block_file_injections 1' },
        ]);
        config.push([
            'if ($query_string ~ "[a-zA-Z0-9_]=/([a-z0-9_.]//?)+")', // eslint-disable-line
            { set: '$block_file_injections 1' },
        ]);
        config.push(['if ($block_file_injections = 1)', { return: '403' }]);

        // Block common exploits
        config.push(['## Block common exploits', '']);
        config.push(['set $block_common_exploits', '0']);
        config.push([
            'if ($query_string ~ "(<|%3C).*script.*(>|%3E)")',
            {
                set: '$block_common_exploits 1',
            },
        ]);
        config.push([
            'if ($query_string ~ "GLOBALS(=|[|%[0-9A-Z]{0,2})")',
            {
                set: '$block_common_exploits 1',
            },
        ]);
        config.push([
            'if ($query_string ~ "_REQUEST(=|[|%[0-9A-Z]{0,2})")',
            {
                set: '$block_common_exploits 1',
            },
        ]);
        config.push([
            'if ($query_string ~ "proc/self/environ")',
            {
                set: '$block_common_exploits 1',
            },
        ]);
        config.push([
            'if ($query_string ~ "mosConfig_[a-zA-Z_]{1,21}(=|%3D)")',
            {
                set: '$block_common_exploits 1',
            },
        ]);
        config.push([
            'if ($query_string ~ "base64_(en|de)code(.*)")',
            {
                set: '$block_common_exploits 1',
            },
        ]);
        config.push(['if ($block_common_exploits = 1)', { return: '403' }]);

        // Block spam
        config.push(['# Block spam', '']);
        config.push(['set $block_spam', '0']);
        config.push([
            'if ($query_string ~ "\b(ultram|unicauca|valium|viagra|vicodin|xanax|ypxaieo)\b")', // eslint-disable-line
            {
                set: '$block_spam 1',
            },
        ]);
        config.push([
            'if ($query_string ~ "\b(erections|hoodia|huronriveracres|impotence|levitra|libido)\b")', // eslint-disable-line
            {
                set: '$block_spam 1',
            },
        ]);
        config.push([
            'if ($query_string ~ "\b(ambien|bluespill|cialis|cocaine|ejaculation|erectile)\b")', // eslint-disable-line
            {
                set: '$block_spam 1',
            },
        ]);
        config.push([
            'if ($query_string ~ "\b(lipitor|phentermin|pro[sz]ac|sandyauer|tramadol|troyhamby)\b")', // eslint-disable-line
            {
                set: '$block_spam 1',
            },
        ]);
        config.push(['if ($block_spam = 1)', { return: '403' }]);

        // Block user agents
        config.push(['$Block user agents', '']);
        config.push(['set $block_user_agents', '0']);
        config.push(['# Disable Akeeba Remote Control 2.5 and earlier', '']);
        config.push([
            'if ($http_user_agent ~ "Indy Library")',
            {
                set: '$block_user_agents 1',
            },
        ]);
        config.push(['# Common bandwidth hoggers and hacking tools.', '']);
        config.push([
            'if ($http_user_agent ~ "libwww-perl")',
            {
                set: '$block_user_agents 1',
            },
        ]);
        config.push([
            'if ($http_user_agent ~ "GetRight")',
            {
                set: '$block_user_agents 1',
            },
        ]);
        config.push([
            'if ($http_user_agent ~ "GetWeb!")',
            {
                set: '$block_user_agents 1',
            },
        ]);
        config.push([
            'if ($http_user_agent ~ "Go!Zilla")',
            {
                set: '$block_user_agents 1',
            },
        ]);
        config.push([
            'if ($http_user_agent ~ "Download Demon")',
            {
                set: '$block_user_agents 1',
            },
        ]);
        config.push([
            'if ($http_user_agent ~ "Go-Ahead-Got-It")',
            {
                set: '$block_user_agents 1',
            },
        ]);
        config.push([
            'if ($http_user_agent ~ "TurnitinBot")',
            {
                set: '$block_user_agents 1',
            },
        ]);
        config.push([
            'if ($http_user_agent ~ "GrabNet")',
            {
                set: '$block_user_agents 1',
            },
        ]);
        config.push(['if ($block_user_agents = 1)', { return: '403' }]);
    }

    // Done!
    return config;
};
