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
                <li v-for="(_, key) in tabs" :class="key === tab ? 'is-active' : undefined">
                    <a @click="tab = key">{{ key }}{{ sectionChanges(key) }}</a>
                </li>
            </ul>
        </div>
        <component v-for="(component, key) in tabs"
                   :is="component"
                   :ref="key"
                   :key="key"
                   :style="{ display: key === tab ? 'block' : 'none' }"
        ></component>
        <a class="button" @click="log">Log export data to console</a>
    </div>
</template>

<script>
    import * as Sections from './domain_sections';

    export default {
        name: 'Domain',
        data() {
            return {
                tab: Object.keys(Sections)[0],
                tabs: Sections,
            };
        },
        methods: {
            sectionChanges(key) {
                if (key in this.$refs && this.$refs[key] && this.$refs[key][0].changes) {
                    const changes = this.$refs[key][0].changes();
                    if (changes) {
                        return ` (${changes.toLocaleString()})`;
                    }
                }
                return '';
            },
            changes() {
                return Object.keys(Sections).reduce((prev, key) => {
                    if (key in this.$refs && this.$refs[key] && this.$refs[key][0].changes) {
                        prev += this.$refs[key][0].changes();
                    }
                    return prev;
                }, 0);
            },
            exports () {
                return Object.keys(Sections).reduce((prev, key) => {
                    prev[key] = {};
                    if (key in this.$refs && this.$refs[key] && this.$refs[key][0].exports) {
                        prev[key] = this.$refs[key][0].exports();
                    }
                    return prev;
                }, {});
            },
            log () {
                console.log(this.exports());
            },
        },
    };
</script>
