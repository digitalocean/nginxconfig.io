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
    <div class="panel setup">
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
                <i class="fas fa-long-arrow-alt-left"></i> <span>Back</span>
            </a>
            <a v-if="nextTab !== false" class="button is-primary is-mini" @click="active = nextTab">
                <span>Next</span> <i class="fas fa-long-arrow-alt-right"></i>
            </a>
        </div>
    </div>
</template>

<script>
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
        },
        methods: {
            tabClass(tab) {
                if (tab === this.$data.active) return 'is-active';
                const tabs = this.$data.tabs.map(t => t.key);
                if (tabs.indexOf(tab) < tabs.indexOf(this.$data.active)) return 'is-before';
                return undefined;
            },
        },
    };
</script>
