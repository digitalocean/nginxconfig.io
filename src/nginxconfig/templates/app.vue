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
            </template>
        </Header>

        <div class="main container">
            <Domain></Domain>
        </div>

        <Footer :text="i18n.templates.app.oss"></Footer>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import i18n from '../i18n';
    import Header from 'do-vue/src/templates/header';
    import Footer from 'do-vue/src/templates/footer';
    import Domain from './domain';

    Vue.use(Vuex);

    const store = new Vuex.Store({
        state: {
            domains: {},
        },
        mutations: {
            setDomain(state, domain, data) {
                state.domains[domain] = data;
            },
        },
    });

    export default {
        name: 'App',
        components: {
            Domain,
            Header,
            Footer,
        },
        store,
        data() {
            return {
                i18n,
            };
        },
    };
</script>
