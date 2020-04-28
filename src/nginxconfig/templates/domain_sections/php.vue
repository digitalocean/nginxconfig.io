<template>
    <div>Hello world php</div>
</template>

<script>
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        php: {
            default: true,
            enabled: true,
        },
        wordPressRules: {
            default: false,
            enabled: true,
        },
        drupalRules: {
            default: false,
            enabled: true,
        },
        magentoRules: {
            default: false,
            enabled: true,
        },
    };

    export default {
        name: 'DomainPHP',                          // Component name
        display: 'PHP',                             // Display name for tab
        key: 'php',                                 // Key for data in parent
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
