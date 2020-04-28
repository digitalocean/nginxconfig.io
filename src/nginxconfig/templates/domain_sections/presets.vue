<template>
    <div>
        <a v-for="(preset, key) in $props.data"
           :class="`button${preset.computed ? ' is-primary' : ''}`"
           @click="setPreset(key)"
        >
            {{ preset.display }}
        </a>
    </div>
</template>

<script>
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        frontend: {
            default: false,
            display: 'Frontend',
            enabled: true,
        },
        php: {
            default: true,
            display: 'PHP',
            enabled: true,
        },
        django: {
            default: false,
            display: 'Django',
            enabled: true,
        },
        nodejs: {
            default: false,
            display: 'Node.js',
            enabled: true,
        },
        singlePageApplication: {
            default: false,
            display: 'Single-page application',
            enabled: true,
        },
        wordPress: {
            default: false,
            display: 'WordPress',
            enabled: true,
        },
        drupal: {
            default: false,
            display: 'Drupal',
            enabled: true,
        },
        magento: {
            default: false,
            display: 'Magento',
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
        methods: {
            setPreset(key) {
                // Set that we're using this preset
                Object.keys(this.$props.data).forEach(preset => this[preset] = preset === key);

                // Restore some specific defaults first
                this.$parent.resetValue('server', 'domain');
                this.$parent.resetValue('php', 'php');
                this.$parent.resetValue('php', 'wordPressRules');
                this.$parent.resetValue('php', 'drupalRules');
                this.$parent.resetValue('php', 'magentoRules');
                this.$parent.resetValue('python', 'python');
                this.$parent.resetValue('python', 'djangoRules');
                this.$parent.resetValue('reverseProxy', 'reverseProxy');
                this.$parent.resetValue('routing', 'root');
                this.$parent.resetValue('routing', 'index');
                this.$parent.resetValue('routing', 'fallbackHtml');

                switch (key) {
                case 'frontend':
                    this.$parent.setValue('php', 'php', false);
                    this.$parent.setValue('routing', 'index', 'index.html');
                    this.$parent.setValue('routing', 'fallbackHtml', true);
                    break;

                case 'php':
                    this.$parent.setValue('routing', 'index', 'index.php');
                    break;

                case 'django':
                    this.$parent.setValue('php', 'php', false);
                    this.$parent.setValue('python', 'python', true);
                    this.$parent.setValue('python', 'djangoRules', true);
                    this.$parent.setValue('routing', 'root', false);
                    break;

                case 'nodejs':
                    this.$parent.setValue('reverseProxy', 'reverseProxy', true);
                    this.$parent.setValue('routing', 'root', false);
                    break;

                case 'singlePageApplication':
                    this.$parent.setValue('routing', 'index', 'index.html');
                    this.$parent.setValue('routing', 'fallbackHtml', true);
                    break;

                case 'wordPress':
                    this.$parent.setValue('php', 'wordPressRules', true);
                    break;

                case 'drupal':
                    this.$parent.setValue('php', 'drupalRules', true);
                    break;

                case 'magento':
                    this.$parent.setValue('php', 'magentoRules', true);
                    break;
                }
            },
        },
    };
</script>
