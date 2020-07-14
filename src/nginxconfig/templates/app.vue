<!--
Copyright 2020 DigitalOcean

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
    <div class="all do-bulma">
        <Header :title="i18n.templates.app.title">
            <template v-slot:description>
                {{ i18n.templates.app.description }}
            </template>
            <template v-slot:header>
            </template>
            <template v-slot:buttons>
                <a v-if="splitColumn" class="button is-primary is-outline is-hidden-touch" @click="splitColumnToggle">
                    {{ i18n.templates.app.singleColumnMode }}
                </a>
                <a v-else class="button is-primary is-hidden-touch" @click="splitColumnToggle">
                    {{ i18n.templates.app.splitColumnMode }}
                </a>
            </template>
        </Header>

        <div class="main container" :style="{ display: ready ? undefined : 'none' }">
            <div class="columns is-multiline">
                <div :class="`column ${splitColumn ? 'is-half' : 'is-full'} is-full-touch`">
                    <h2>{{ i18n.templates.app.perWebsiteConfig }}</h2>

                    <div class="tabs">
                        <ul>
                            <li v-for="data in activeDomains" :class="data[1] === active ? 'is-active' : undefined">
                                <a class="domain" @click="active = data[1]">
                                    {{ data[0].server.domain.computed }}{{ changes(data[1]) }}
                                </a>
                                <a class="remove" @click="remove(data[1])">
                                    <i class="fas fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <a @click="add"><i class="fas fa-plus"></i> {{ i18n.templates.app.addSite }}</a>
                            </li>
                        </ul>
                    </div>

                    <template v-for="data in activeDomains">
                        <Domain :key="data[1]"
                                :data="data[0]"
                                :style="{ display: data[1] === active ? undefined : 'none' }"
                        ></Domain>
                    </template>

                    <h2>{{ i18n.templates.app.globalConfig }}</h2>
                    <Global :data="global"></Global>

                    <h2>{{ i18n.templates.app.setup }}</h2>
                    <Setup :data="{ domains: domains.filter(d => d !== null), global, confFiles }"></Setup>
                </div>

                <div :class="`column ${splitColumn ? 'is-half' : 'is-full'} is-full-touch`">
                    <h2>{{ i18n.templates.app.configFiles }}</h2>
                    <div ref="files" class="columns is-multiline files">
                        <NginxPrism v-for="confContents in confFilesOutput"
                                    :key="confContents[2]"
                                    :name="confContents[0]"
                                    :conf="confContents[1]"
                                    :half="Object.keys(confFilesOutput).length > 1 && !splitColumn"
                        ></NginxPrism>
                    </div>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
    import clone from 'clone';
    import sha2_256 from 'simple-js-sha2-256';
    import escape from 'escape-html';
    import Header from 'do-vue/src/templates/header';
    import diff from 'files-diff';

    import isChanged from '../util/is_changed';
    import importData from '../util/import_data';
    import isObject from '../util/is_object';
    import analytics from '../util/analytics';

    import i18n from '../i18n';
    import generators from '../generators';

    import Domain from './domain';
    import Global from './global';
    import Setup from './setup';
    import NginxPrism from './prism/nginx';
    import Footer from './footer';

    export default {
        name: 'App',
        components: {
            Header,
            Footer,
            Domain,
            Global,
            Setup,
            NginxPrism,
        },
        data() {
            return {
                i18n,
                domains: [],
                global: Global.delegated,
                active: 0,
                ready: false,
                splitColumn: false,
                confWatcherWaiting: false,
                confFilesPrevious: {},
                confFilesOutput: {},
            };
        },
        computed: {
            activeDomains() {
                return this.$data.domains.map((domain, index) => [domain, index]).filter(d => d[0] !== null);
            },
            confFiles() {
                return generators(this.$data.domains.filter(d => d !== null), this.$data.global);
            },
        },
        watch: {
            confFiles(newConf, oldConf) {
                if (this.$data.confWatcherWaiting) return;

                // Set that we're waiting for changes to stop
                this.$data.confWatcherWaiting = true;
                this.$data.confFilesPrevious = oldConf;

                // Check next tick to see if anything has changed again
                this.$nextTick(() => this.checkChange(newConf));
            },
        },
        mounted() {
            // Import any data from the URL query params, defaulting to one domain
            // Fallback to the window hash if no search query params, from the Angular version of nginxconfig
            // The config file watcher will handle setting the app as ready
            const query = window.location.search || window.location.hash.slice(1);
            importData(query, this.$data.domains, this.$data.global, this.$nextTick);

            // Send an initial GA event for column mode
            this.splitColumnEvent();
        },
        methods: {
            changes(index) {
                const data = this.$data.domains[index];
                const changes = Object.entries(data).reduce((prev, current) => {
                    if (current[0] === 'presets') return prev; // Ignore changes from presets
                    if (!isObject(current[1])) return prev; // Ignore non-objects (things that aren't tabs)
                    prev += Object.keys(current[1]).filter(key => isChanged(current[1][key], current[0], key)).length;
                    return prev;
                }, 0);
                if (changes) return ` (${changes.toLocaleString()})`;
                return '';
            },
            add() {
                const data = clone(Domain.delegated);

                // Avoid dupe domains
                let count = 1;
                while (this.$data.domains.some(d => d && d.server.domain.computed === data.server.domain.computed)) {
                    count++;
                    data.server.domain.computed = data.server.domain.default.replace('.com', `${count}.com`);
                }
                data.server.domain.value = data.server.domain.computed;

                // Store
                this.$data.domains.push(data);
                this.$data.active = this.$data.domains.length - 1;

                // GA
                analytics('add_site', 'Sites', undefined, this.activeDomains.length);
            },
            remove(index) {
                this.$set(this.$data.domains, index, null);
                if (this.$data.active === index) this.$data.active = this.$data.domains.findIndex(d => d !== null);

                // GA
                analytics('remove_site', 'Sites', undefined, this.activeDomains.length);
            },
            checkChange(oldConf) {
                // If nothing has changed for a tick, we can use the config files
                if (oldConf === this.confFiles) {
                    // If this is the initial data load on app start, run the diff logic
                    // but with previous as this so that we don't highlight any changes
                    if (!this.$data.ready) {
                        this.$data.confFilesPrevious = this.confFiles;
                        this.$nextTick(() => { this.$data.ready = true; });
                    }

                    // Do the diff!
                    this.updateDiff(this.confFiles, this.$data.confFilesPrevious);
                    return;
                }

                // Check next tick to see if anything has changed again
                this.$nextTick(() => this.checkChange(this.confFiles));
            },
            updateDiff(newConf, oldConf) {
                // Calculate the diff & highlight after render
                const diffConf = diff(newConf, oldConf, {
                    highlightFunction: value => `<mark>${value}</mark>`,
                });
                this.$data.confFilesOutput = diffConf ? Object.values(diffConf).map(({ name, content }) => {
                    const diffName = name.filter(x => !x.removed).map(x => x.value).join('');
                    const confName = `${escape(this.$data.global.nginx.nginxConfigDirectory.computed)}/${diffName}`;
                    const diffContent = content.filter(x => !x.removed).map(x => x.value).join('');

                    return [
                        confName,
                        diffContent,
                        `${sha2_256(confName)}-${sha2_256(diffContent)}`,
                    ];
                }) : [];
                this.$nextTick(() => this.$data.confWatcherWaiting = false);
            },
            splitColumnToggle() {
                this.$data.splitColumn = !this.$data.splitColumn;
                this.splitColumnEvent();
            },
            splitColumnEvent() {
                analytics('toggle_split_column', 'Button', undefined, Number(this.$data.splitColumn));
            },
        },
    };
</script>
