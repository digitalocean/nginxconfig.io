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
    enableEncryptedSslConnection: `${common.enable} conexiones ${common.ssl} encriptadas`,
    http2: `${common.http}/2`,
    enableHttp2Connections: `${common.enable} conexiones ${common.http}/2`,
    http3: `${common.http}/3`,
    enableHttp3Connections: `${common.enable} conexiones ${common.http}/3`,
    forceHttps: `Forzar ${common.https}`,
    hsts: 'HSTS',
    enableStrictTransportSecurity: `Para ${common.enable} Strict Transport Security, requiriendo conexiones HTTPS`,
    enableIncludeSubDomains: `Para ${common.enable} la directiva includeSubDomains, requiriendo conexiones HTTPS para TODOS los subdominios`,
    enablePreload: `Para ${common.enable} la directiva directive, decirle a los navegadores que siempre hagan solo conexiones HTTPS`,
    certificationType: 'Tipo de certificado',
    customCertificate: 'Certificado personalizado',
    letsEncryptEmail: `Correo para ${common.letsEncrypt}`,
    http3IsANonStandardModule: 'HTTP/3 no es un modulo estandar de NGINX , verificar el ',
    http3NginxQuicReadme: 'Readme de NGINX QUIC',
    http3OrThe: ' o el ',
    http3CloudflareQuicheProject: 'Projecto quiche de Cloudflare',
    http3ForBuildingNginxWithHttp3: ' para saber como construir un NGINX con HTTP/3!',
};
