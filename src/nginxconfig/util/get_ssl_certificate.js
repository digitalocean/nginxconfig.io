/*
Copyright 2020 DigitalOcean

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

export const getSslCertificate = (domain, global) => {
    if (domain.https.certType.computed === 'letsEncrypt')
        return `${global.https.letsEncryptCertRoot.computed.replace(/\/+$/, '')}/${domain.server.domain.computed}/fullchain.pem`;

    if (domain.https.sslCertificate.computed)
        return domain.https.sslCertificate.computed;

    return `${global.nginx.nginxConfigDirectory.computed.replace(/\/+$/, '')}/ssl/${domain.server.domain.computed}.crt`;
};

export const getSslCertificateKey = (domain, global) => {
    if (domain.https.certType.computed === 'letsEncrypt')
        return `${global.https.letsEncryptCertRoot.computed.replace(/\/+$/, '')}/${domain.server.domain.computed}/privkey.pem`;

    if (domain.https.sslCertificateKey.computed)
        return domain.https.sslCertificateKey.computed;

    return `${global.nginx.nginxConfigDirectory.computed.replace(/\/+$/, '')}/ssl/${domain.server.domain.computed}.key`;
};
