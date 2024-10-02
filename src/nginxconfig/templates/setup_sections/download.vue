<!--
Copyright 2024 DigitalOcean

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
        <ol>
            <li>
                <p>
                    <span
                        v-html="$t('templates.setupSections.download.downloadTheGeneratedConfig')"
                    ></span>
                    <b>
                        &nbsp;
                        <a @click="$parent.downloadTar">{{ $parent.tarName }}</a>
                    </b>
                    <br />
                    <span
                        v-html="$t('templates.setupSections.download.andUploadItToYourServers')"
                    ></span>
                    <code class="slim">
                        {{ $props.data.global.nginx.nginxConfigDirectory.computed }}
                    </code>
                    {{ $t('templates.setupSections.download.directory') }}
                </p>
                <p>
                    {{ $t('templates.setupSections.download.or') }}
                    <b>
                        <a ref="copyTar">
                            {{
                                $t(
                                    'templates.setupSections.download.copyBase64StringOfCompressedConfig',
                                )
                            }}
                        </a>
                    </b>
                    <span
                        v-html="
                            $t(
                                'templates.setupSections.download.pasteItInYourServersCommandLineAndExecute',
                            )
                        "
                    ></span>
                </p>
            </li>

            <li>
                <p>
                    <span
                        v-html="
                            $t(
                                'templates.setupSections.download.navigateToYourNginxConfigurationDirectoryOnYourServer',
                            )
                        "
                    ></span>
                    <br />
                    <BashPrism
                        :key="$props.data.global.nginx.nginxConfigDirectory.computed"
                        :cmd="`cd ${$props.data.global.nginx.nginxConfigDirectory.computed}`"
                        @copied="codeCopiedEvent('Navigate to nginx config directory')"
                    ></BashPrism>
                </p>
            </li>

            <li>
                <p>
                    <span
                        v-html="
                            $t(
                                'templates.setupSections.download.createABackupOfYourCurrentNginxConfiguration',
                            )
                        "
                    ></span>
                    <br />
                    <BashPrism
                        cmd="tar -czvf nginx_$(date +'%F_%H-%M-%S').tar.gz nginx.conf sites-available/ sites-enabled/ nginxconfig.io/"
                        @copied="codeCopiedEvent('Create nginx config backup tar')"
                    ></BashPrism>
                </p>
            </li>

            <li>
                <p>
                    <span
                        v-html="
                            $t(
                                'templates.setupSections.download.extractTheNewCompressedConfigurationArchiveUsingTar',
                            )
                        "
                    ></span>
                    <br />
                    <BashPrism
                        :key="$parent.tarName"
                        :cmd="`tar -xzvf ${$parent.tarName} | xargs chmod 0644`"
                        @copied="codeCopiedEvent('Extract new nginx config tar')"
                    ></BashPrism>
                </p>
            </li>
        </ol>
    </div>
</template>

<script>
    import BashPrism from '../prism/bash.vue';
    import analytics from '../../util/analytics.js';

    export default {
        name: 'SetupDownload',
        display: 'templates.setupSections.download.download', // i18n key
        key: 'download',
        components: {
            BashPrism,
        },
        props: {
            data: Object,
        },
        mounted() {
            this.$parent.setupCopy(this.$refs.copyTar);
        },
        methods: {
            codeCopiedEvent(step) {
                analytics({
                    category: 'Setup',
                    action: 'Code snippet copied',
                    label: `download: ${step}`,
                });
            },
        },
    };
</script>
