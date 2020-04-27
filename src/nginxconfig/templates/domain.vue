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
                <li v-for="tab in tabs" :class="tabName === tab ? 'is-active' : undefined">
                    <a @click="setTab(tab)">{{ tab }}</a>
                </li>
            </ul>
        </div>
        <keep-alive>
            <component :is="tabComponent" :ref="tabName"></component>
        </keep-alive>
    </div>
</template>

<script>
    import * as Sections from './domain_sections';

    export default {
        name: 'Domain',
        data() {
            return {
                tabName: Object.keys(Sections)[0],
                tabComponent: Object.values(Sections)[0],
                tabs: Object.keys(Sections),
            };
        },
        methods: {
            setTab(tab) {
                this.$data.tabName = tab;
                this.$data.tabComponent = Sections[tab];
            },
        },
    };
</script>
