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

const mozilla = 'Mozilla';
const ipv4 = 'IPv4';
const ipv6 = 'IPv6';


// 'Resolvers', 'webroot', 'listening socket' and 'worker' don't have a good translation in Spanish

export default {
    sslProfile: `Perfil ${common.ssl}`,
    httpsMustBeEnabledOnOneSite: `${common.https} debe estar habilitado en al menos un sitio para modificar globalmente la configuracion ${common.https}.`,
    portReuse: 'Reuseport',
    enableReuseOfPort: `${common.enable} reuseport para generar un "listening socket" por "worker"`,
    ocspDnsResolvers: 'OCSP DNS Resolvers',
    cloudflareResolver: 'Cloudflare Resolver',
    googlePublicDns: 'Google Public DNS',
    openDns: 'OpenDNS',
    quad9: 'Quad9',
    verisign: 'Verisign',
    letsEncryptWebroot: `${common.letsEncrypt} webroot`,
    letsEncryptCertRoot: `directorio del certificado ${common.letsEncrypt}`,
    mozillaModern: `${mozilla} Moderno`,
    mozillaIntermediate: `${mozilla} Intermedio`,
    mozillaOld: `${mozilla} Antiguo`,
    ipv4Only: `solo ${ipv4}`,
    ipv6Only: `solo ${ipv6}`,
    ipv4AndIpv6: `${ipv4} & ${ipv6}`,
};
