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
        <div class="panel presets">
            <Presets :data="$props.data.presets"></Presets>
        </div>

        <div class="panel">
            <div class="tabs">
                <ul>
                    <li v-for="tab in tabs" :class="tabClass(tab.key)">
                        <a @click="active = tab.key">{{ tab.display }}{{ changes(tab.key) }}</a>
                    </li>
                </ul>
            </div>

            <component :is="tab"
                       v-for="tab in tabs"
                       :key="tab.key"
                       :data="$props.data[tab.key]"
                       :style="{ display: active === tab.key ? undefined : 'none' }"
                       class="container"
            ></component>

            <div class="navigation-buttons">
                <a v-if="previousTab !== false" class="button is-mini" @click="active = previousTab">
                    <i class="fas fa-long-arrow-alt-left"></i> <span>{{ i18n.common.back }}</span>
                </a>
                <a v-if="nextTab !== false" class="button is-primary is-mini" @click="active = nextTab">
                    <span>{{ i18n.common.next }}</span> <i class="fas fa-long-arrow-alt-right"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import i18n from '../i18n';
    import isChanged from '../util/is_changed';
    import Presets from './domain_sections/presets';
    import * as Sections from './domain_sections';

    const tabs = Object.values(Sections);
    const delegated = {
        hasUserInteraction: false,
        presets: Presets.delegated,
        ...tabs.reduce((prev, tab) => {
            prev[tab.key] = tab.delegated;
            return prev;
        }, {}),
    };

    export default {
        name: 'Domain',
        delegated,          // Data the parent will present here
        components: {
            Presets,
        },
        props: {
            data: Object,   // Data delegated back to us from parent
        },
        data() {
            return {
                i18n,
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
        },
        methods: {
            changesCount(tab) {
                return Object.keys(this.$props.data[tab])
                    .filter(key => isChanged(this.$props.data[tab][key], tab, key)).length;
            },
            changes(tab) {
                const changes = this.changesCount(tab);
                if (changes) return ` (${changes.toLocaleString()})`;
                return '';
            },
            setValue(tab, key, val) {
                Object.assign(this.$props.data[tab][key], { value: val, computed: val });
            },
            resetValue(tab, key) {
                this.setValue(tab, key, this.$props.data[tab][key].default);
            },
            tabClass(tab) {
                const classes = [];
                if (tab === this.$data.active) classes.push('is-active');
                if (this.changesCount(tab)) classes.push('is-changed');
                const tabs = this.$data.tabs.map(t => t.key);
                if (tabs.indexOf(tab) < tabs.indexOf(this.$data.active)) classes.push('is-before');
                return classes.join(' ');
            },
        },
    };
</script>
