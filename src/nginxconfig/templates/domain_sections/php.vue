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
        name: 'DomainPHP',                                  // Component name
        display: 'PHP',                                     // Display name for tab
        key: 'php',                                         // Key for data in parent
        delegated: delegatedFromDefaults(defaults),         // Data the parent will present here
        props: {
            data: Object,                                   // Data delegated back to us from parent
        },
        data () {
            return {
                i18n,
            };
        },
        computed: computedFromDefaults(defaults, 'php'), // Getters & setters for the delegated data
        watch: {
            // If the Reverse proxy is enabled, PHP will be forced off
            '$parent.$props.data': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    const state = data.reverseProxy.reverseProxy.computed;
                    if (state) {
                        this.$props.data.php.enabled = false;
                        this.$props.data.php.computed = false;
                    } else {
                        this.$props.data.php.enabled = true;
                        this.$props.data.php.computed = this.$props.data.php.value;
                    }
                },
                deep: true,
            },
        },
    };
</script>
