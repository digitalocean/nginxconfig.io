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

import common from '../../common.js';

export default {
    enableEncryptedSslConnection: `${common.enable}加密的 ${common.ssl} 連線`,
    http2: `${common.http}/2`,
    enableHttp2Connections: `${common.enable} ${common.http}/2 連線`,
    http3: `${common.http}/3`,
    enableHttp3Connections: `${common.enable} ${common.http}/3 連線`,
    forceHttps: `強制使用 ${common.https}`,
    hsts: 'HSTS',
    enableStrictTransportSecurity: `${common.enable} HSTS（強制安全傳輸），需要 HTTPS 連線`,
    enableIncludeSubDomains: `${common.enable} includeSubDomains 指令，所有子網域須啟用 HTTPS 連線`,
    enablePreload: `${common.enable} preload 指令，強制瀏覽器使用 HTTPS 連線`,
    certificationType: '憑證類型',
    customCertificate: '自訂憑證',
    letsEncryptEmail: `${common.letsEncrypt} 電子郵件地址`,
    http3IsANonStandardModule: 'HTTP/3 並不是標準的 NGINX 模組，請查閱 ',
    http3NginxQuicReadme: 'NGINX QUIC 說明',
    http3OrThe: ' 或者 ',
    http3CloudflareQuicheProject: 'Cloudflare quiche 專案',
    http3ForBuildingNginxWithHttp3: '以了解如何建置支援 HTTP/3 的 NGINX !',
};
