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
