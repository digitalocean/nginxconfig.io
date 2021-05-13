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
    enableEncryptedSslConnection: `${common.enable}加密的${common.ssl}連接`,
    http2: `${common.http}/2`,
    enableHttp2Connections: `${common.enable} ${common.http}/2 連接`,
    http3: `${common.http}/3`,
    enableHttp3Connections: `${common.enable} ${common.http}/3 連接`,
    portReuse: 'Reuseport', // TODO: translate
    enableReuseOfPort: `${common.enable} reuseport to generate a listening socket per worker`, // TODO: translate
    forceHttps: `強制 ${common.https}`,
    hsts: 'HSTS',
    enableStrictTransportSecurity: `${common.enable}HSTS（強制用戶端、瀏覽器等使用HTTPS與服務器創建連結），需要HTTPS連接`,
    enableIncludeSubDomains: `${common.enable}includeSubDomains指令，HSTS對所有子域生效`,
    enablePreload: `${common.enable}preload指令，強制用戶端只可以使用https連接`,
    certificationType: '證書類型',
    customCertificate: '本地證書',
    letsEncryptEmail: `${common.letsEncrypt} 郵箱`,
    http3IsANonStandardModule: 'HTTP/3 isn\'t a standard NGINX module, check the ', // TODO: translate
    http3NginxQuicReadme: 'NGINX QUIC readme', // TODO: translate
    http3OrThe: ' or the ', // TODO: translate
    http3CloudflareQuicheProject: 'Cloudflare quiche project', // TODO: translate
    http3ForBuildingNginxWithHttp3: ' for how to build NGINX with HTTP/3!', // TODO: translate
};
