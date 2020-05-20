import toConf from './to_conf';
import nginxConf from './conf/nginx.conf';
import websiteConf from './conf/website.conf';
import letsEncryptConf from './conf/letsencrypt.conf';
import securityConf from './conf/security.conf';
import generalConf from './conf/general.conf';
import phpConf from './conf/php_fastcgi.conf';
import pythonConf from './conf/python_uwsgi.conf';
import proxyConf from './conf/proxy.conf';
import wordPressConf from './conf/wordpress.conf';
import drupalConf from './conf/drupal.conf';
import magentoConf from './conf/magento.conf';

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

        // PHP
        if (domains.some(d => d.php.php.computed))
            files.push(['nginxconfig.io/php_fastcgi.conf', toConf(phpConf(domains, global))]);

        // Python
        if (domains.some(d => d.python.python.computed))
            files.push(['nginxconfig.io/python_uwsgi.conf', toConf(pythonConf(global))]);

        // Reverse proxy
        if (domains.some(d => d.reverseProxy.reverseProxy.computed))
            files.push(['nginxconfig.io/proxy.conf', toConf(proxyConf())]);

        // WordPress
        if (domains.some(d => d.php.wordPressRules.computed))
            files.push(['nginxconfig.io/wordpress.conf', toConf(wordPressConf(global))]);

        // Drupal
        if (domains.some(d => d.php.drupalRules.computed))
            files.push(['nginxconfig.io/drupal.conf', toConf(drupalConf(global))]);

        // Drupal
        if (domains.some(d => d.php.magentoRules.computed))
            files.push(['nginxconfig.io/magento.conf', toConf(magentoConf())]);

    }

    return files;
};
