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
        <div class="tabs">
            <ul>
                <li v-for="tab in tabs" :class="active === tab.key ? 'is-active' : undefined">
                    <a @click="active = tab.key">{{ tab.display }}{{ changes(tab.key) }}</a>
                </li>
            </ul>
        </div>

        <component :is="tab"
                   v-for="tab in tabs"
                   :key="tab.key"
                   :data="$props.data[tab.key]"
                   :style="{ display: active === tab.key ? 'block' : 'none' }"
        ></component>
    </div>
</template>

<script>
    import * as Sections from './domain_sections';

    const tabs = Object.values(Sections);
    const delegated = tabs.reduce((prev, tab) => {
        prev[tab.key] = tab.delegated;
        return prev;
    }, {});

    export default {
        name: 'Domain',
        delegated,          // Data the parent will present here
        props: {
            data: Object,   // Data delegated back to us from parent
        },
        data() {
            return {
                active: tabs[0].key,
                tabs,
            };
        },
        methods: {
            changes(tab) {
                if (tab === 'presets') return ''; // Ignore changes from presets
                const changes = Object.values(this.$props.data[tab]).filter(d => d.default !== d.computed).length;
                if (changes) return ` (${changes.toLocaleString()})`;
                return '';
            },
            setValue(tab, key, val) {
                Object.assign(this.$props.data[tab][key], { value: val, computed: val });
            },
            resetValue(tab, key) {
                this.setValue(tab, key, this.$props.data[tab][key].default);
            },
        },
    };
</script>
