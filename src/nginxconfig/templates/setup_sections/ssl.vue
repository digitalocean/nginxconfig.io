<template>
    <div>
        <ol v-if="diffieHellmanValue || letsEncryptActive">
            <li v-if="diffieHellmanValue">
                <p>
                    Generate <b>Diffie-Hellman keys</b> by running this command on your server:
                    <br />
                    <BashPrism :key="`${nginxDir}-${diffieHellmanValue}`"
                               :cmd="`openssl dhparam -out ${nginxDir}/dhparam.pem ${diffieHellmanValue}`"
                    ></BashPrism>
                </p>
            </li>

            <li v-if="letsEncryptActive">
                <p>
                    Create a common <b>ACME-challenge</b> directory (for <b>Let's Encrypt</b>):
                    <br />
                    <BashPrism :key="letsEncryptDir" :cmd="`mkdir -p ${letsEncryptDir}`"></BashPrism>
                    <br />
                    <BashPrism :key="`${nginxUser}-${letsEncryptDir}`"
                               :cmd="`chown ${nginxUser} ${letsEncryptDir}`"
                    ></BashPrism>
                </p>
            </li>
        </ol>

        <div v-else class="field is-horizontal">
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <label class="text">
                            No additional steps are needed to set up SSL for your NGINX configuration.
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
        name: 'SetupSSL',
        display: 'SSL init',
        key: 'ssl',
        components: {
            BashPrism,
        },
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
            nginxUser() {
                return this.$props.data.global.nginx.user.computed;
            },
            diffieHellmanValue() {
                switch (this.$props.data.global.https.sslProfile.computed) {
                case 'intermediate':
                    return 2048;
                case 'old':
                    return 1024;
                case 'modern':
                default:
                    return 0;
                }
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
    };
</script>
