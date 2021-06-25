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

export default {
    sslProfile: `Perfil ${common.ssl}`,
    httpsMustBeEnabledOnOneSite: `O ${common.https} deve estar habilitado em pelo menos um site para definir as configurações globais de ${common.https}.`,
    portReuse: 'Reuseport', // TODO: translate
    enableReuseOfPort: `${common.enable} reuseport to generate a listening socket per worker`, // TODO: translate
    ocspDnsResolvers: 'Resolvedores de DNS OCSP',
    cloudflareResolver: 'Resolvedor Cloudflare',
    googlePublicDns: 'DNS público do Google',
    openDns: 'OpenDNS',
    quad9: 'Quad9',
    verisign: 'Verisign',
    letsEncryptWebroot: `Diretório raiz do ${common.letsEncrypt}`,
    letsEncryptCertRoot: `Diretório de certificado do ${common.letsEncrypt}`,
    mozillaModern: `${mozilla} Modern`,
    mozillaIntermediate: `${mozilla} Intermediate`,
    mozillaOld: `${mozilla} Old`,
    ipv4Only: `${ipv4} apenas`,
    ipv6Only: `${ipv6} apenas`,
    ipv4AndIpv6: `${ipv4} & ${ipv6}`,
};
