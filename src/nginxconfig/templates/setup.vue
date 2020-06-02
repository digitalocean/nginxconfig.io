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
    <div class="setup">
        <div class="panel">
            <div class="tabs">
                <ul>
                    <li v-for="tab in tabs" :class="tabClass(tab.key)">
                        <a @click="active = tab.key">{{ tab.display }}</a>
                    </li>
                </ul>
            </div>

            <component :is="tab"
                       v-for="tab in tabs"
                       :key="tab.key"
                       :data="$props.data"
                       :style="{ display: active === tab.key ? undefined : 'none' }"
                       class="container"
            ></component>

            <div class="navigation-buttons">
                <a v-if="previousTab !== false" class="button is-mini" @click="active = previousTab">
                    <i class="fas fa-long-arrow-alt-left"></i> <span>{{ i18n.templates.setup.back }}</span>
                </a>
                <a v-if="nextTab !== false" class="button is-primary is-mini" @click="active = nextTab">
                    <span>{{ i18n.templates.setup.next }}</span> <i class="fas fa-long-arrow-alt-right"></i>
                </a>
            </div>
        </div>

        <div class="buttons is-centered">
            <a class="button is-success" @click="downloadTar">{{ i18n.templates.setup.downloadConfig }}</a>
            <a class="button is-primary" @click="copyTar">{{ i18n.templates.setup.copyBase64 }}</a>
        </div>
    </div>
</template>

<script>
    import { pack } from 'tar-stream';
    import getStream from 'get-stream';
    import { gzip } from 'node-gzip';
    import copy from 'copy-to-clipboard';
    import * as Sections from './setup_sections';

    const tabs = Object.values(Sections);

    export default {
        name: 'Setup',
        props: {
            data: Object,
        },
        data() {
            return {
                active: tabs[0].key,
                tabs,
            };
        },
        computed: {
            nextTab() {
                const tabs = this.$data.tabs.map(t => t.key);
                const index = tabs.indexOf(this.$data.active) + 1;
                if (index < tabs.length) return tabs[index];
                return false;
            },
            previousTab() {
                const tabs = this.$data.tabs.map(t => t.key);
                const index = tabs.indexOf(this.$data.active) - 1;
                if (index >= 0) return tabs[index];
                return false;
            },
            nginxDir() {
                return this.$props.data.global.nginx.nginxConfigDirectory.computed.replace(/\/+$/, '');
            },
            tarName() {
                const domains = this.$props.data.domains.filter(d => d !== null).map(d => d.server.domain.computed);
                return `nginxconfig.io-${domains.join(',')}.tar.gz`;
            },
        },
        methods: {
            tabClass(tab) {
                if (tab === this.$data.active) return 'is-active';
                const tabs = this.$data.tabs.map(t => t.key);
                if (tabs.indexOf(tab) < tabs.indexOf(this.$data.active)) return 'is-before';
                return undefined;
            },
            async tarContents() {
                const tar = pack();

                // Add all our config files to the tar
                for (const conf of this.$props.data.confFiles) {
                    tar.entry({ name: conf[0] }, conf[1]);

                    // If symlinks are enabled and this is in sites-available, symlink to sites-enabled
                    if (this.$props.data.global.tools.symlinkVhost.computed && conf[0].startsWith('sites-available'))
                        tar.entry({
                            name: conf[0].replace(/^sites-available/, 'sites-enabled'),
                            type: 'symlink',
                            linkname: `../${conf[0]}`,
                        });
                }

                // Convert the tar to a buffer and gzip it
                tar.finalize();
                const raw = await getStream.buffer(tar);
                return gzip(raw);
            },
            async downloadTar() {
                // Get the config files as a compressed tar
                const contents = await this.tarContents();

                // Convert it to a blob and download
                const blob = new Blob([ contents ], { type: 'application/tar+gzip' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = this.tarName;
                link.click();
            },
            async copyTar() {
                // Get the config files as a compressed tar
                const contents = await this.tarContents();

                // Convert it to base64 string
                const b64 = Buffer.from(contents).toString('base64');
                const command = `echo '${b64}' | base64 --decode > ${this.nginxDir}/${this.tarName}`;
                copy(command);
            },
        },
    };
</script>
