<!--
Copyright 2021 DigitalOcean

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
    <div class="setup">
        <div class="panel">
            <div class="tabs">
                <ul>
                    <li v-for="tab in tabs" :class="tabClass(tab.key)">
                        <a @click="showTab(tab.key)">{{ $t(tab.display) }}</a>
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
                <a v-if="previousTab !== false" class="button is-mini" @click="showPreviousTab">
                    <i class="fas fa-long-arrow-alt-left"></i> <span>{{ $t('common.back') }}</span>
                </a>
                <a v-if="nextTab !== false" class="button is-primary is-mini" @click="showNextTab">
                    <span>{{ $t('common.next') }}</span> <i class="fas fa-long-arrow-alt-right"></i>
                </a>
            </div>
        </div>

        <div class="buttons is-centered">
            <a class="button is-success" @click="downloadTar">{{ $t('templates.setup.downloadConfig') }}</a>
            <a ref="copyTar" class="button is-primary">{{ $t('templates.setup.copyBase64') }}</a>
        </div>
    </div>
</template>

<script>
    import Tar from 'memory-tar-create';
    import ClipboardJS from 'clipboard';
    import analytics from '../util/analytics';
    import Sections from './setup_sections';

    export default {
        name: 'Setup',
        props: {
            data: Object,
        },
        data() {
            return {
                active: Sections[0].key,
                tabs: Sections,
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
            domainCount() {
                return this.$props.data.domains.filter(d => d !== null).length;
            },
            tarName() {
                const domains = this.$props.data.domains.filter(d => d !== null).map(d => d.server.domain.computed);
                return `nginxconfig.io-${domains.join(',')}.tar.gz`;
            },
        },
        mounted() {
            this.setupCopy(this.$refs.copyTar);
        },
        methods: {
            tabClass(tab) {
                if (tab === this.$data.active) return 'is-active';
                const tabs = this.$data.tabs.map(t => t.key);
                if (tabs.indexOf(tab) < tabs.indexOf(this.$data.active)) return 'is-before';
                return undefined;
            },
            tarContents() {
                const data = {};

                // Add all our config files to the tar
                for (const fileName in this.$props.data.confFiles) {
                    if (!Object.prototype.hasOwnProperty.call(this.$props.data.confFiles, fileName)) continue;
                    data[fileName] = { contents: this.$props.data.confFiles[fileName] };

                    // If symlinks are enabled and this is in sites-available, symlink to sites-enabled
                    if (this.$props.data.global.tools.symlinkVhost.computed && fileName.startsWith('sites-available'))
                        data[fileName.replace(/^sites-available/, 'sites-enabled')] = { target: `../${fileName}` };
                }

                return new Tar(data).gz();
            },
            downloadTar() {
                // Analytics
                analytics({
                    category: 'Setup',
                    action: 'Downloaded tar file',
                    label: this.tarName,
                    value: this.domainCount,
                });

                // Do tar generation
                this.tarContents().download(this.tarName);
            },
            copyTar() {
                // Analytics
                analytics({
                    category: 'Setup',
                    action: 'Copied base64 tar',
                    label: this.tarName,
                    value: this.domainCount,
                });

                // Do tar generation
                const path = `${this.$props.data.global.nginx.nginxConfigDirectory.computed}/${this.tarName}`;
                return this.tarContents().base64(path);
            },
            setupCopy(elm) {
                const originalText = elm.textContent;

                const resetText = () => {
                    setTimeout(() => {
                        elm.textContent = originalText;
                    }, 5000);
                };

                const clipboard = new ClipboardJS(elm, {
                    text: this.copyTar,
                });

                clipboard.on('success', e => {
                    elm.textContent = 'Copied';
                    e.clearSelection();
                    resetText();
                });

                clipboard.on('error', () => {
                    elm.textContent = 'Press Ctrl + C to copy';
                    resetText();
                });
            },
            showTab(target) {
                // Analytics
                analytics({
                    category: 'Setup',
                    action: 'Tab clicked',
                    label: `${this.$data.active}, ${target}`,
                });

                // Go!
                this.$data.active = target;
            },
            showPreviousTab() {
                // Analytics
                analytics({
                    category: 'Setup',
                    action: 'Back clicked',
                    label: `${this.$data.active}, ${this.previousTab}`,
                });

                // Go!
                this.$data.active = this.previousTab;
            },
            showNextTab() {
                // Analytics
                analytics({
                    category: 'Setup',
                    action: 'Next clicked',
                    label: `${this.$data.active}, ${this.nextTab}`,
                });

                // Go!
                this.$data.active = this.nextTab;
            },
        },
    };
</script>
