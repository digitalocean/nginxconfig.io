<!--
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
-->

<template>
    <div>
        <ol v-if="diffieHellmanValue || letsEncryptActive">
            <li v-if="diffieHellmanValue">
                <p>
                    <span v-html="i18n.templates.setupSections.ssl.generateDiffieHellmanKeysByRunningThisCommandOnYourServer"></span>
                    <br />
                    <BashPrism :key="`${nginxDir}-${diffieHellmanValue}`"
                               :cmd="`openssl dhparam -out ${nginxDir}/dhparam.pem ${diffieHellmanValue}`"
                    ></BashPrism>
                </p>
            </li>

            <li v-if="letsEncryptActive">
                <p>
                    <span v-html="i18n.templates.setupSections.ssl.createACommonAcmeChallengeDirectoryForLetsEncrypt"></span>
                    <br />
                    <BashPrism :key="letsEncryptDir" :cmd="`mkdir -p ${letsEncryptDir}`"></BashPrism>
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
                            {{ i18n.templates.setupSections.ssl.noAdditionalStepsAreNeededToSetUpSslForNginx }}
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
        display: i18n.templates.setupSections.ssl.sslInit,
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
