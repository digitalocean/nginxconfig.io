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
    enableEncryptedSslConnection: `${common.enable} verschlüsselte ${common.ssl} Verbindungen`,
    http2: `${common.http}/2`,
    enableHttp2Connections: `${common.enable} ${common.http}/2 Verbindungen`,
    http3: `${common.http}/3`,
    enableHttp3Connections: `${common.enable} ${common.http}/3 Verbindungen`,
    forceHttps: `Erzwinge ${common.https}`,
    hsts: 'HSTS',
    enableStrictTransportSecurity: `${common.enable} Strict Transport Security, was HTTPS Verbindungen erzwingt`,
    enableIncludeSubDomains: `${common.enable} includeSubDomains Direktive, welche HTTPS Verbindungen auf ALLEN Subdomains erzwingt`,
    enablePreload: `${common.enable} preload Direktive, welche Browsern mitteilt, ausschließlich HTTPS Verbindungen zu verwenden`,
    certificationType: 'Zertifizierungsart',
    customCertificate: 'Eigenes Zertifikat',
    letsEncryptEmail: `${common.letsEncrypt} E-Mail`,
    http3IsANonStandardModule: 'HTTP/3 ist kein Standard NGINX Modul. Besuche das ',
    http3NginxQuicReadme: 'NGINX QUIC Readme',
    http3OrThe: ' oder das ',
    http3CloudflareQuicheProject: 'Cloudflare Quiche Project',
    http3ForBuildingNginxWithHttp3: ' für Informationen, wie man NGINX mit HTTP/3 verwendet!',
};
