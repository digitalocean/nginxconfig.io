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
        <ol>
            <li>
                <p>
                    <span v-html="i18n.templates.setupSections.download.downloadTheGeneratedConfig"></span>
                    <b>&nbsp;<a @click="$parent.downloadTar">{{ $parent.tarName }}</a></b>
                    <br />
                    <span v-html="i18n.templates.setupSections.download.andUploadItToYourServers"></span>
                    <code class="slim">{{ $parent.nginxDir }}</code>
                    {{ i18n.templates.setupSections.download.directory }}
                </p>
                <p>
                    {{ i18n.templates.setupSections.download.or }}
                    <b>
                        <a @click="$parent.copyTar">
                            {{ i18n.templates.setupSections.download.copyBase64StringOfCompressedConfig }}</a>
                    </b>
                    <span v-html="i18n.templates.setupSections.download.pasteItInYourServersCommandLineAndExecute"></span>
                </p>
            </li>

            <li>
                <p>
                    <span v-html="i18n.templates.setupSections.download.navigateToYourNginxConfigurationDirectoryOnYourServer"></span>
                    <br />
                    <BashPrism :key="$parent.nginxDir" :cmd="`cd ${$parent.nginxDir}`"></BashPrism>
                </p>
            </li>

            <li>
                <p>
                    <span v-html="i18n.templates.setupSections.download.createABackupOfYourCurrentNginxConfiguration"></span>
                    <br />
                    <BashPrism cmd="tar -czvf nginx_$(date +'%F_%H-%M-%S').tar.gz nginx.conf sites-available/ sites-enabled/ nginxconfig.io/"></BashPrism>
                </p>
            </li>

            <li>
                <p>
                    <span v-html="i18n.templates.setupSections.download.extractTheNewCompressedConfigurationArchiveUsingTar"></span>
                    <br />
                    <BashPrism :key="$parent.tarName" :cmd="`tar -xzvf ${$parent.tarName}`"></BashPrism>
                </p>
            </li>
        </ol>
    </div>
</template>

<script>
    import i18n from '../../i18n';
    import BashPrism from '../prism/bash';

    export default {
        name: 'SetupDownload',
        display: i18n.templates.setupSections.download.download,
        key: 'download',
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
    };
</script>
