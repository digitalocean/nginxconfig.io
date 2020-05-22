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
    <div class="all do-bulma">
        <Header :title="i18n.templates.app.title">
            <template v-slot:description>
                {{ i18n.templates.app.description }}
            </template>
            <template v-slot:header>
            </template>
            <template v-slot:buttons>
                <a v-if="splitColumn" class="button is-primary is-outline" @click="splitColumn = false">Single column mode</a>
                <a v-else class="button is-primary" @click="splitColumn = true">Split column mode</a>
            </template>
        </Header>

        <div class="main container" :style="{ display: ready ? undefined : 'none' }">
            <div class="columns is-multiline">
                <div :class="`column ${splitColumn ? 'is-half' : 'is-full'} is-full-mobile is-full-tablet`">
                    <h2>Per-website config</h2>

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
                                <a @click="add"><i class="fas fa-plus"></i> Add site</a>
                            </li>
                        </ul>
                    </div>

                    <template v-for="data in activeDomains">
                        <Domain :key="data[1]"
                                :data="data[0]"
                                :style="{ display: data[1] === active ? undefined : 'none' }"
                        ></Domain>
                    </template>

                    <h2>Global config</h2>
                    <Global :data="global"></Global>

                    <h2>Setup</h2>
                    <Setup :data="{ domains: domains.filter(d => d !== null), global, confFiles }"></Setup>
                </div>

                <div :class="`column ${splitColumn ? 'is-half' : 'is-full'} is-full-mobile is-full-tablet`">
                    <h2>Config files</h2>
                    <div class="columns is-multiline">
                        <div v-for="conf in confFilesOutput"
                             :class="`column ${confFilesOutput.length > 1 && !splitColumn ? 'is-half' : 'is-full'} is-full-mobile is-full-tablet`"
                        >
                            <h3>{{ nginxDir }}/{{ conf[0] }}</h3>
                            <pre><code ref="files" class="language-nginx" v-html="conf[1]"></code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer :text="i18n.templates.app.oss"></Footer>
    </div>
</template>

<script>
    import clone from 'clone';
    import { diffLines } from 'diff';
    import escape from 'escape-html';
    import deepEqual from 'deep-equal';
    import Prism from 'prismjs';
    import Header from 'do-vue/src/templates/header';
    import Footer from 'do-vue/src/templates/footer';
    import isChanged from '../util/is_changed';
    import importData from '../util/import_data';
    import isObject from '../util/is_object';
    import i18n from '../i18n';
    import generators from '../generators';
    import Domain from './domain';
    import Global from './global';
    import Setup from './setup';

    export default {
        name: 'App',
        components: {
            Header,
            Footer,
            Domain,
            Global,
            Setup,
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
                confFilesPrevious: [],
                confFilesOutput: [],
            };
        },
        computed: {
            activeDomains() {
                return this.$data.domains.map((domain, index) => [domain, index]).filter(d => d[0] !== null);
            },
            nginxDir() {
                return this.$data.global.nginx.nginxConfigDirectory.computed.replace(/\/+$/, '');
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
            // The config file watcher will handle setting the app as ready
            importData(window.location.search, this.$data.domains, this.$data.global, this.$nextTick);
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
                this.$data.domains.push(clone(Domain.delegated));
                this.$data.active = this.$data.domains.length - 1;
            },
            remove(index) {
                this.$set(this.$data.domains, index, null);
                if (this.$data.active === index) this.$data.active = this.$data.domains.findIndex(d => d !== null);
            },
            highlightFiles() {
                for (const file of this.$refs.files)
                    Prism.highlightElement(file, true);
            },
            checkChange(oldConf) {
                // If nothing has changed for a tick, we can use the config files
                if (deepEqual(oldConf, this.confFiles)) {
                    // If this is the initial data load on app start, don't diff and set ourselves as ready
                    if (!this.$data.ready) {
                        this.$data.confFilesOutput = this.confFiles;
                        this.$nextTick(() => {
                            this.$data.confWatcherWaiting = false;
                            this.highlightFiles();
                            this.$data.ready = true;
                        });
                        return;
                    }

                    // Otherwise, do the diff!
                    this.updateDiff(this.confFiles, this.$data.confFilesPrevious);
                    return;
                }

                // Check next tick to see if anything has changed again
                this.$nextTick(() => this.checkChange(this.confFiles));
            },
            updateDiff(newConf, oldConf) {
                // Work through each file in the new config
                const newFiles = [];
                for (const [newFileName, newFileConf] of newConf) {

                    // If a file with the same name existed before, diff!
                    // TODO: Handle diffing across file renames (eg. when a user changes a domain name)
                    const old = oldConf && oldConf.find(c => c[0] === newFileName);
                    if (old) {
                        // Get the diff
                        const diff = diffLines(old[1], newFileConf);

                        // Wrap additions in <mark>, drop removals
                        const output = diff.map((change, index, array) => {
                            if (change.removed) return '';

                            const escaped = escape(change.value);

                            // Don't mark as diff if nothing changed
                            if (!change.added) return escaped;

                            // Don't mark as diff if only whitespace changed
                            if (index > 0 && array[index - 1].removed) {
                                if (array[index - 1].value.replace(/\s/g, '') === change.value.replace(/\s/g, '')) {
                                    return escaped;
                                }
                            }
                            if (index < array.length - 1 && array[index + 1].removed) {
                                if (array[index + 1].value.replace(/\s/g, '') === change.value.replace(/\s/g, '')) {
                                    return escaped;
                                }
                            }

                            // Mark the diff, without highlighting whitespace
                            return escaped
                                .split('\n')
                                .map(part => part.replace(/^(\s*)(.*)(\s*)$/, '$1<mark>$2</mark>$3'))
                                .join('\n');
                        }).join('');

                        // Store
                        newFiles.push([newFileName, output]);
                        continue;
                    }

                    // No diffing, just store the new file
                    newFiles.push([newFileName, newFileConf]);
                }
                this.$data.confFilesOutput = newFiles;

                // Highlight in-browser (using web workers so UI isn't blocked) once these files are rendered
                this.$nextTick(() => {
                    this.$data.confWatcherWaiting = false;
                    this.highlightFiles();
                });
            },
        },
    };
</script>
