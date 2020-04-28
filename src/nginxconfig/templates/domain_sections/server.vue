<template>
    <div>
        Hello world server
        <input v-model="domain" type="text" />
    </div>
</template>

<script>
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        domain: {
            default: 'example.com',
            enabled: true,
        },
        path: {
            default: '',
            enabled: true,
        },
        documentRoot: {
            default: '/public',
            enabled: true,
        },
        wwwSubdomain: {
            default: false,
            enabled: true,
        },
        cdnSubdomain: {
            default: false,
            enabled: false,
        },
        redirectSubdomains: {
            default: true,
            enabled: true,
        },
        listenIpv4: {
            default: '*',
            enabled: true,
        },
        listenIpv6: {
            default: '::',
            enabled: true,
        },
    };

    export default {
        name: 'DomainServer',                       // Component name
        display: 'Server',                          // Display name for tab
        key: 'server',                              // Key for data in parent
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
