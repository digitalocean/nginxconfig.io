<template>
    <div>Hello world presets</div>
</template>

<script>
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        frontend: {
            default: false,
            enabled: true,
        },
        php: {
            default: true,
            enabled: true,
        },
        django: {
            default: false,
            enabled: true,
        },
        nodejs: {
            default: false,
            enabled: true,
        },
        singlePageApplication: {
            default: false,
            enabled: true,
        },
        wordPress: {
            default: false,
            enabled: true,
        },
        drupal: {
            default: false,
            enabled: true,
        },
        magento: {
            default: false,
            enabled: true,
        },
    };

    export default {
        name: 'DomainPresets',                      // Component name
        display: 'Presets',                         // Display name for tab
        key: 'presets',                             // Key for data in parent
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
