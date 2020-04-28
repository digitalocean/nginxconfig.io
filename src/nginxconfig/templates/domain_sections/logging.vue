<template>
    <div>Hello world logging</div>
</template>

<script>
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        accessLog: {
            default: false,
            enabled: true,
        },
        errorLog: {
            default: false,
            enabled: true,
        },
    };

    export default {
        name: 'DomainLogging',                      // Component name
        display: 'Logging',                         // Display name for tab
        key: 'logging',                             // Key for data in parent
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
