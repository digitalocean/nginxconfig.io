<template>
    <div>
        <div class="buttons-group">
            <a v-for="(preset, key) in $props.data"
               :class="`button${preset.computed ? ' is-primary' : ''}`"
               @click="setPreset(key)"
            >
                {{ preset.display }}
            </a>
        </div>
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
            computedCheck (data) {
                return !data.php.php.computed
                    && !data.python.python.computed
                    && !data.reverseProxy.reverseProxy.computed
                    && data.routing.index.computed === 'index.html'
                    && data.routing.fallbackHtml.computed;
            },
        },
        php: {
            default: true,
            display: 'PHP',
            enabled: true,
            computedCheck (data) {
                return data.php.php.computed
                    && data.routing.index.computed === 'index.php'
                    && data.routing.fallbackPhp.computed
                    && !data.routing.fallbackHtml.computed
                    && !data.php.wordPressRules.computed
                    && !data.php.drupalRules.computed
                    && !data.php.magentoRules.computed;
            },
        },
        django: {
            default: false,
            display: 'Django',
            enabled: true,
            computedCheck (data) {
                return data.python.python.computed
                    && data.python.djangoRules.computed
                    && !data.routing.root.computed;
            },
        },
        nodejs: {
            default: false,
            display: 'Node.js',
            enabled: true,
            computedCheck (data) {
                return data.reverseProxy.reverseProxy.computed
                    && !data.routing.root.computed;
            },
        },
        singlePageApplication: {
            default: false,
            display: 'Single-page application',
            enabled: true,
            computedCheck (data) {
                return data.php.php.computed
                    && data.routing.index.computed === 'index.html'
                    && data.routing.fallbackHtml.computed;
            },
        },
        wordPress: {
            default: false,
            display: 'WordPress',
            enabled: true,
            computedCheck (data) {
                return data.routing.index.computed === 'index.php'
                    && data.routing.fallbackPhp.computed
                    && !data.routing.fallbackHtml.computed
                    && data.php.wordPressRules.computed
                    && !data.php.drupalRules.computed
                    && !data.php.magentoRules.computed;
            },
        },
        drupal: {
            default: false,
            display: 'Drupal',
            enabled: true,
            computedCheck (data) {
                return data.routing.index.computed === 'index.php'
                    && data.routing.fallbackPhp.computed
                    && !data.routing.fallbackHtml.computed
                    && !data.php.wordPressRules.computed
                    && data.php.drupalRules.computed
                    && !data.php.magentoRules.computed;
            },
        },
        magento: {
            default: false,
            display: 'Magento',
            enabled: true,
            computedCheck (data) {
                return data.routing.index.computed === 'index.php'
                    && data.routing.fallbackPhp.computed
                    && !data.routing.fallbackHtml.computed
                    && !data.php.wordPressRules.computed
                    && !data.php.drupalRules.computed
                    && data.php.magentoRules.computed;
            },
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
        watch: {
            // When any data changes, check if it still matches a preset
            '$parent.$props.data': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    Object.keys(this.$props.data).forEach(preset => {
                        this.$props.data[preset].computed = this.$props.data[preset].computedCheck(data);
                    });
                },
                deep: true,
            },
        },
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
                this.$parent.resetValue('routing', 'fallbackPhp');

                switch (key) {
                case 'frontend':
                    this.$parent.setValue('php', 'php', false);
                    this.$parent.setValue('routing', 'index', 'index.html');
                    this.$parent.setValue('routing', 'fallbackHtml', true);
                    break;

                case 'php':
                    // Defaults should be PHP
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
