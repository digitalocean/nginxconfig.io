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

export default (global) => {
    const config = {};

    config.proxy_http_version = '1.1';
    config.proxy_cache_bypass = '$http_upgrade';

    config['# Proxy SSL'] = '';
    config['proxy_ssl_server_name'] = 'on';

    config['# Proxy headers'] = '';
    config['proxy_set_header Upgrade'] = '$http_upgrade';
    config['proxy_set_header Connection'] = '$connection_upgrade';
    config['proxy_set_header X-Real-IP'] = '$remote_addr';
    config['proxy_set_header Forwarded'] = '$proxy_add_forwarded';
    if (global.reverseProxy.proxyCoexistenceXForwarded.computed == 'passOn') {
        config['proxy_set_header X-Forwarded-For'] = '$proxy_add_x_forwarded_for';
        config['proxy_set_header X-Forwarded-Proto'] = '$scheme';
        config['proxy_set_header X-Forwarded-Host'] = '$host';
        config['proxy_set_header X-Forwarded-Port'] = '$server_port';
    } else {
        config['proxy_set_header X-Forwarded-For'] = '""';
        config['proxy_set_header X-Forwarded-Proto'] = '""';
        config['proxy_set_header X-Forwarded-Host'] = '""';
        config['proxy_set_header X-Forwarded-Port'] = '""';
    }

    config['# Proxy timeouts'] = '';
    config['proxy_connect_timeout'] = global.reverseProxy.proxyConnectTimeout.computed;
    config['proxy_send_timeout'] = global.reverseProxy.proxySendTimeout.computed;
    config['proxy_read_timeout'] = global.reverseProxy.proxyReadTimeout.computed;

    // Done!
    return config;
};
