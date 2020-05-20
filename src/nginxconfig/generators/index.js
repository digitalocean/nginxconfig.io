import toConf from './to_conf';
import nginxConf from './conf/nginx.conf';
import websiteConf from './conf/website.conf';
import letsEncryptConf from './conf/letsencrypt.conf';
import securityConf from './conf/security.conf';
import generalConf from './conf/general.conf';

export default (domains, global) => {
    const files = [];

    // Base nginx config
    files.push(['nginx.conf', toConf(nginxConf(domains, global))]);

    // Modularised configs
    if (global.tools.modularizedStructure.computed) {
        // Domain config
        for (const domain of domains) {
            files.push([
                `sites-${global.tools.symlinkVhost.computed ? 'available' : 'enabled'}/${domain.server.domain.computed}.conf`,
                toConf(websiteConf(domain, domains, global)),
            ]);
        }

        // Let's encrypt
        if (domains.some(d => d.https.certType.computed === 'letsEncrypt'))
            files.push(['nginxconfig.io/letsencrypt.conf', toConf(letsEncryptConf(global))]);

        // Security
        files.push(['nginxconfig.io/security.conf', toConf(securityConf(domains, global))]);

        // General
        files.push(['nginxconfig.io/general.conf', toConf(generalConf(domains, global))]);
    }

    return files;
};
