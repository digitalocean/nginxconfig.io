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
                                <a @click="active = data[1]">
                                    {{ data[0].server.domain.computed }}{{ changes(data[1]) }}
                                    <i class="fas fa-times" @click="remove(data[1])"></i>
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
                    <Setup :data="{ domains, global }"></Setup>
                </div>

                <div :class="`column ${splitColumn ? 'is-half' : 'is-full'} is-full-mobile is-full-tablet`">
                    <h2>Config files</h2>
                    <template v-for="(conf, i) in confFiles">
                        <h3>{{ nginxDir }}/{{ conf[0] }}</h3>
                        <Prism :key="`${conf[0]}${i}`" language="nginx" :code="conf[1]"></Prism>
                    </template>
                </div>
            </div>
        </div>

        <Footer :text="i18n.templates.app.oss"></Footer>
    </div>
</template>

<script>
    import clone from 'clone';
    import Prism from 'vue-prism-component';
    import 'prismjs/components/prism-nginx';
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
            Prism,
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
                return generators(this.$data.domains, this.$data.global);
            },
        },
        mounted() {
            // If there is no query param, add one default domain and we're ready
            if (!window.location.search.length) {
                this.$data.domains.push(clone(Domain.delegated));
                this.$data.ready = true;
                return;
            }

            // Import any data from the URL query params
            importData(window.location.search, this.$data.domains, this.$data.global, this.$nextTick);

            // After two ticks (one tick to set watched data), we are ready
            this.$nextTick(() => this.$nextTick(() => this.$data.ready = true));
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
                if (this.$data.active === index) this.$data.active = 0;
            },
        },
    };
</script>
