/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export const getSslCertificate = (domain, global) => {
    if (domain.https.certType.computed === 'letsEncrypt')
        `/etc/letsencrypt/live/${domain.server.domain.computed}/fullchain.pem`;

    if (domain.https.sslCertificate.computed)
        return domain.https.sslCertificate.computed;

    return `${global.nginx.nginxConfigDirectory.computed.replace(/\/+$/, '')}/ssl/${domain.server.domain.computed}.crt`;
};

export const getSslCertificateKey = (domain, global) => {
    if (domain.https.certType.computed === 'letsEncrypt')
        `/etc/letsencrypt/live/${domain.server.domain.computed}/privkey.pem`;

    if (domain.https.sslCertificateKey.computed)
        return domain.https.sslCertificateKey.computed;

    return `${global.nginx.nginxConfigDirectory.computed.replace(/\/+$/, '')}/ssl/${domain.server.domain.computed}.key`;
};
