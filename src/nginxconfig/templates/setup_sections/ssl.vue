<!--
Copyright 2022 DigitalOcean

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
-->

<template>
    <div>
        <ol v-if="diffieHellmanValue || letsEncryptActive">
            <li v-if="diffieHellmanValue">
                <p>
                    <span
                        v-html="
                            $t(
                                'templates.setupSections.ssl.generateDiffieHellmanKeysByRunningThisCommandOnYourServer',
                            )
                        "
                    ></span>
                    <br />
                    <BashPrism
                        :key="`${$props.data.global.nginx.nginxConfigDirectory.computed}-${diffieHellmanValue}`"
                        :cmd="`openssl dhparam -out ${$props.data.global.nginx.nginxConfigDirectory.computed}/dhparam.pem ${diffieHellmanValue}`"
                        @copied="codeCopiedEvent('Generate diffie-hellman keys')"
                    ></BashPrism>
                </p>
            </li>

            <li v-if="letsEncryptActive">
                <p>
                    <span
                        v-html="
                            $t(
                                'templates.setupSections.ssl.createACommonAcmeChallengeDirectoryForLetsEncrypt',
                            )
                        "
                    ></span>
                    <br />
                    <BashPrism
                        :key="letsEncryptDir"
                        :cmd="`mkdir -p ${letsEncryptDir}`"
                        @copied="codeCopiedEvent('Create let\'s encrypt directory')"
                    ></BashPrism>
                    <BashPrism
                        :key="`${nginxUser}-${letsEncryptDir}`"
                        :cmd="`chown ${nginxUser} ${letsEncryptDir}`"
                        @copied="codeCopiedEvent('Set let\'s encrypt directory ownership')"
                    ></BashPrism>
                </p>
            </li>
        </ol>

        <div
            v-else
            class="field is-horizontal"
        >
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <label class="text">
                            {{
                                $t(
                                    'templates.setupSections.ssl.noAdditionalStepsAreNeededToSetUpSslForNginx',
                                )
                            }}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BashPrism from '../prism/bash';
    import analytics from '../../util/analytics';

    export default {
        name: 'SetupSSL',
        display: 'templates.setupSections.ssl.sslInit', // i18n key
        key: 'ssl',
        components: {
            BashPrism,
        },
        props: {
            data: Object,
        },
        computed: {
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
        methods: {
            codeCopiedEvent(step) {
                analytics({
                    category: 'Setup',
                    action: 'Code snippet copied',
                    label: `ssl: ${step}`,
                });
            },
        },
    };
</script>
