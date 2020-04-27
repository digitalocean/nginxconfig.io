<template>
    <div>Hello world server</div>
</template>

<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    // Create the store of values
    const store = new Vuex.Store({
        state: {
            path: {
                default: '',
            },
            documentRoot: {
                default: '',
            },
            wwwSubdomain: {
                default: false,
            },
            cdnSubdomain: {
                default: false,
            },
            redirectSubdomains: {
                default: true,
            },
        },
        mutations: {
            setPath(state, value) {
                state.path.value = value;
            },
            setDocumentRoot(state, value) {
                state.documentRoot.value = value;
            },
            setWwwSubdomain(state, value) {
                state.wwwSubdomain.value = value;
            },
            setCdnSubdomain(state, value) {
                state.cdnSubdomain.value = value;
            },
            setRedirectSubdomains(state, value) {
                state.redirectSubdomains.value = value;
            },
        },
    });

    // Set the values to defaults
    Object.keys(store.state).forEach(key => {
        store.state[key].value = store.state[key].value || store.state[key].default;
    });

    export default {
        name: 'DomainServer',
        store,
        computed: {
            ...Object.keys(store.state).reduce((prev, current) => {
                prev[current] = {
                    get () {
                        return this.$store.state[current].value;
                    },
                    set (value) {
                        this.$store.commit(`set${current.slice(0, 1).toUpperCase()}${current.slice(1)}`, value);
                    },
                };
                return prev;
            }, {}),
        },
    };
</script>
