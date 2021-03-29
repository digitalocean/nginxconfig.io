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

import common from '../../common';

export default {
    enableEncryptedSslConnection: `${common.enable}加密的${common.ssl}连接`,
    http2: `${common.http}/2`,
    enableHttp2Connections: `${common.enable} ${common.http}/2 连接`,
    http3: `${common.http}/3`,
    enableHttp3Connections: `${common.enable} ${common.http}/3 连接`,
    portReuse: 'Reuseport', // TODO: translate
    enableReuseOfPort: `${common.enable} reuseport to generate a listening socket per worker`, // TODO: translate
    forceHttps: `强制 ${common.https}`,
    hsts: 'HSTS',
    enableStrictTransportSecurity: `${common.enable}HSTS（强制客户端、浏览器等使用 HTTPS 与服务器创建链接），需要HTTPS连接`,
    enableIncludeSubDomains: `${common.enable}includeSubDomains指令，HSTS对所有子域生效`,
    enablePreload: `${common.enable}preload指令, 强制客户端只可以使用https连接`,
    certificationType: '证书类型',
    customCertificate: '本地证书',
    letsEncryptEmail: `${common.letsEncrypt} 邮箱`,
    http3Warning1: 'HTTP/3 isn\'t a standard NGINX module, check the ', // TODO: translate
    http3Warning2: 'NGINX QUIC readme ', // TODO: translate
    http3Warning3: ' or the ', // TODO: translate
    http3Warning4: 'Cloudflare quiche project ', // TODO: translate
    http3Warning5: ' for how to build NGINX with HTTP/3!', // TODO: translate
};
