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
    enableEncryptedSslConnection: `${common.enable} szyfrowane połączenie ${common.ssl}`,
    http2: `${common.http}/2`,
    enableHttp2Connections: `${common.enable} połączenia ${common.http}/2`,
    http3: `${common.http}/3`,
    enableHttp3Connections: `${common.enable} połączenia ${common.http}/3`,
    forceHttps: `Wymuś ${common.https}`,
    hsts: 'HSTS',
    enableStrictTransportSecurity: `${common.enable} Strict Transport Security, wymaga połaczenia HTTPS`,
    enableIncludeSubDomains: `${common.enable} dyrektywę includeSubDomains, wymaga połaczenia HTTPS dla WSZYSTKICH subdomen`,
    enablePreload: `${common.enable} dyrektywę preload, aby przekazać przeglądarce by wykonywała wyłącznie połączenia HTTPS`,
    certificationType: 'Typ certyfikacji',
    customCertificate: 'Własny certyfikat',
    letsEncryptEmail: `email ${common.letsEncrypt}`,
    http3IsANonStandardModule: 'HTTP/3 nie jest standardowym modułem NGINX, sprawdź ',
    http3NginxQuicReadme: 'NGINX QUIC readme',
    http3OrThe: ' lub ',
    http3CloudflareQuicheProject: 'Cloudflare quiche project',
    http3ForBuildingNginxWithHttp3: ' aby dowiedzieć się o NGINX z HTTP/3!',
};
