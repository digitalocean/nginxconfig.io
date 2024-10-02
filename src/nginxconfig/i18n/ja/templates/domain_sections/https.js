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
    enableEncryptedSslConnection: `暗号化された ${common.ssl} 接続を${common.enable}`,
    http2: `${common.http}/2`,
    enableHttp2Connections: `${common.http}/2 接続を${common.enable}`,
    http3: `${common.http}/3`,
    enableHttp3Connections: `${common.http}/3 接続を${common.enable}`,
    forceHttps: `${common.https}を強制する`,
    hsts: 'HSTS',
    enableStrictTransportSecurity: `Strict Transport Security を${common.enable}, HTTPS接続が必要`,
    enableIncludeSubDomains: `includeSubDomains ディレクティブを${common.enable}, 全てのサブドメインでHTTPS接続が必要`,
    enablePreload: `プリロードディレクティブを${common.enable}, HTTPS接続のみを常に行うようブラウザに指示します`,
    certificationType: '証明書',
    customCertificate: 'カスタム証明書',
    letsEncryptEmail: `${common.letsEncrypt} Eメールアドレス`,
    http3IsANonStandardModule: 'HTTP/3 は NGINX の標準モジュールではありません, くわしくは ',
    http3NginxQuicReadme: 'NGINX QUIC readme',
    http3OrThe: ' もしくは ',
    http3CloudflareQuicheProject: 'Cloudflare quicheプロジェクト',
    http3ForBuildingNginxWithHttp3: ' のHTTP/3を使ったNGINXの構築方法を確認してください!',
};
