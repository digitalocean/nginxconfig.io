<template>
    <div>Hello world reverse proxy</div>
</template>

<script>
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        reverseProxy: {
            default: false,
            enabled: true,
        },
        path: {
            default: '/',
            enabled: false,
        },
        proxyPass: {
            default: 'http://127.0.0.1:3000',
            enabled: false,
        },
    };

    export default {
        name: 'DomainReverseProxy',                 // Component name
        display: 'Reverse proxy',                   // Display name for tab
        key: 'reverseProxy',                        // Key for data in parent
        delegated: delegatedFromDefaults(defaults), // Data the parent will present here
        props: {
            data: Object,                           // Data delegated back to us from parent
        },
        data () {
            return {
                i18n,
            };
        },
        computed: computedFromDefaults(defaults),   // Getters & setters for the delegated data
    };
</script>
