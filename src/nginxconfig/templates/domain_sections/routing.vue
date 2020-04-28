<template>
    <div>Hello world routing</div>
</template>

<script>
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        root: {
            default: true,
            enabled: true,
        },
        index: {
            default: 'index.php',
            options: ['index.html', 'index.php'],
            enabled: true,
        },
        fallbackRouting: {
            default: ['index.php'],
            options: ['index.html', 'index.php'],
            enabled: true,
        },
        legacyPhpRouting: {
            default: false,
            enabled: true,
        },
    };

    export default {
        name: 'DomainRouting',                      // Component name
        display: 'Routing',                         // Display name for tab
        key: 'routing',                             // Key for data in parent
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
