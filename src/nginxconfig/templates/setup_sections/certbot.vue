<template>
    <div>
        <ol v-if="letsEncryptActive">
            <li>
                <p>
                    Comment out SSL related directives in the configuration:
                    <br />
                </p>
                <BashPrism :key="sitesAvailable"
                           :cmd="`sed -i -r 's/(listen .*443)/\\1;#/g; s/(ssl_(certificate|certificate_key|trusted_certificate) )/#;#\\1/g' ${sitesAvailable}`"
                ></BashPrism>
            </li>

            <li>
                <p>
                    Reload your NGINX server:
                    <br />
                </p>
                <BashPrism :cmd="'sudo nginx -t && sudo systemctl reload nginx'"></BashPrism>
            </li>

            <li>
                <p>
                    Obtain SSL certificates from Let's Encrypt using Certbot:
                    <br />
                </p>
                <BashPrism :key="certbotCmds" :cmd="certbotCmds"></BashPrism>
            </li>

            <li>
                <p>
                    Uncomment SSL related directives in the configuration:
                    <br />
                </p>
                <BashPrism :key="sitesAvailable" :cmd="`sed -i -r 's/#?;#//g' ${sitesAvailable}`"></BashPrism>
            </li>

            <li>
                <p>
                    Reload your NGINX server:
                    <br />
                </p>
                <BashPrism :cmd="'sudo nginx -t && sudo systemctl reload nginx'"></BashPrism>
            </li>

            <li>
                <p>
                    Configure Certbot to reload NGINX when it successfully renews certificates:
                    <br />
                </p>
                <BashPrism :cmd="'echo -e \'#!/bin/bash\\nnginx -t && systemctl reload nginx\' | sudo tee /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh'"></BashPrism>
                <br />
                <BashPrism :cmd="'sudo chmod a+x /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh'"></BashPrism>
            </li>
        </ol>

        <div v-else class="field is-horizontal">
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <label class="text">
                            Certbot does not need to be set up for your NGINX configuration.
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import i18n from '../../i18n';
    import BashPrism from '../prism/bash';

    export default {
        name: 'SetupCertbot',
        components: {
            BashPrism,
        },
        display: 'Certbot',
        key: 'certbot',
        props: {
            data: Object,
        },
        data() {
            return {
                i18n,
            };
        },
        computed: {
            nginxDir() {
                return this.$props.data.global.nginx.nginxConfigDirectory.computed.replace(/\/+$/, '');
            },
            letsEncryptDir() {
                return this.$props.data.global.https.letsEncryptRoot.computed.replace(/\/+$/, '');
            },
            letsEncryptActive() {
                for (const domain of this.$props.data.domains) {
                    if (domain && domain.https.certType.computed === 'letsEncrypt') {
                        return true;
                    }
                }
                return false;
            },
            sitesAvailable() {
                if (!this.$props.data.global.tools.modularizedStructure.computed) return `${this.nginxDir}/nginx.conf`;

                const enabledAvailable = this.$props.data.global.tools.symlinkVhost.computed ? 'available' : 'enabled';
                return this.$props.data.domains
                    .filter(domain => domain.https.certType.computed === 'letsEncrypt')
                    .map(domain => `${this.nginxDir}/sites-${enabledAvailable}/${domain.server.domain.computed}.conf`)
                    .join(' ');
            },
            certbotCmds() {
                return this.$props.data.domains
                    .filter(domain => domain.https.certType.computed === 'letsEncrypt')
                    .map(domain => (
                        [
                            'certbot certonly --webroot',
                            `-d ${domain.server.domain.computed}`,
                            domain.server.wwwSubdomain.computed ? `-d www.${domain.server.domain.computed}` : null,
                            domain.server.cdnSubdomain.computed ? `-d cdn.${domain.server.domain.computed}` : null,
                            `--email ${domain.https.letsEncryptEmail.computed}`,
                            `-w ${this.letsEncryptDir}`,
                            '-n --agree-tos --force-renewal',
                        ].filter(x => x !== null).join(' ')
                    )).join('\n');
            },
        },
    };
</script>
