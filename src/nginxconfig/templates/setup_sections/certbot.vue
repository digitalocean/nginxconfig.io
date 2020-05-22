<template>
    <div>
        <ol v-if="letsEncryptActive">
            <li>
                <p>
                    Comment out SSL related directives in the configuration:
                    <br />
                </p>
                <pre><code ref="commentOut" class="language-bash"></code></pre>
            </li>

            <li>
                <p>
                    Reload your NGINX server:
                    <br />
                </p>
                <pre><code ref="reload" class="language-bash">sudo nginx -t && sudo systemctl reload nginx</code></pre>
            </li>

            <li>
                <p>
                    Obtain SSL certificates from Let's Encrypt using Certbot:
                    <br />
                </p>
                <pre><code ref="certBot" class="language-bash"></code></pre>
            </li>

            <li>
                <p>
                    Uncomment SSL related directives in the configuration:
                    <br />
                </p>
                <pre><code ref="unComment" class="language-bash"></code></pre>
            </li>

            <li>
                <p>
                    Reload your NGINX server:
                    <br />
                </p>
                <pre><code ref="reload2" class="language-bash">sudo nginx -t && sudo systemctl reload nginx</code></pre>
            </li>

            <li>
                <p>
                    Configure Certbot to reload NGINX when it successfully renews certificates:
                    <br />
                </p>
                <pre><code ref="renewal" class="language-bash">echo -e '#!/bin/bash\nnginx -t && systemctl reload nginx' | sudo tee /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh</code></pre>
                <br />
                <pre><code ref="chmod" class="language-bash">sudo chmod a+x /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh</code></pre>
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
    import Prism from 'prismjs';
    import i18n from '../../i18n';

    export default {
        name: 'SetupCertbot',
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
        },
        watch: {
            '$props.data.domains': {
                handler() {
                    this.certbotCmds();
                    this.sitesAvailable();
                },
                deep: true,
            },
            '$props.data.global.tools': {
                handler() {
                    this.sitesAvailable();
                },
                deep: true,
            },
        },
        mounted() {
            this.$nextTick(() => this.certbotCmds());
            this.$nextTick(() => this.sitesAvailable());
            this.$nextTick(() => Prism.highlightElement(this.$refs.reload, true));
            this.$nextTick(() => Prism.highlightElement(this.$refs.reload2, true));
            this.$nextTick(() => Prism.highlightElement(this.$refs.renewal, true));
            this.$nextTick(() => Prism.highlightElement(this.$refs.chmod, true));
        },
        methods: {
            certbotCmds() {
                if (!this.$refs.certBot) return;

                this.$refs.certBot.textContent = this.$props.data.domains
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

                this.$nextTick(() => Prism.highlightElement(this.$refs.certBot, true));
            },
            sitesAvailable() {
                if (!this.$refs.commentOut) return;
                if (!this.$refs.unComment) return;

                const enabledAvailable = this.$props.data.global.tools.symlinkVhost.computed ? 'available' : 'enabled';
                const sitesAvailable = this.$props.data.global.tools.modularizedStructure.computed
                    ? this.$props.data.domains
                        .filter(domain => domain.https.certType.computed === 'letsEncrypt')
                        .map(domain => `${this.nginxDir}/sites-${enabledAvailable}/${domain.server.domain.computed}.conf`)
                        .join(' ')
                    : `${this.nginxDir}/nginx.conf`;

                this.$refs.commentOut.textContent = `sed -i -r 's/(listen .*443)/\\1;#/g; s/(ssl_(certificate|certificate_key|trusted_certificate) )/#;#\\1/g' ${sitesAvailable}`;
                this.$refs.unComment.textContent = `sed -i -r 's/#?;#//g' ${sitesAvailable}`;

                this.$nextTick(() => Prism.highlightElement(this.$refs.commentOut, true));
                this.$nextTick(() => Prism.highlightElement(this.$refs.unComment, true));
            },
        },
    };
</script>
