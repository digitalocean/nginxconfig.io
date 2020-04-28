<template>
    <div>
        Hello world python
        <input v-model="test" type="text" />
    </div>
</template>

<script>
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        python: {
            default: false,
            enabled: true,
        },
        djangoRules: {
            default: false,
            enabled: true,
        },
        test: {
            default: '',
            enabled: true,
        },
    };

    export default {
        name: 'DomainPython',                       // Component name
        display: 'Python',                          // Display name for tab
        key: 'python',                              // Key for data in parent
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
