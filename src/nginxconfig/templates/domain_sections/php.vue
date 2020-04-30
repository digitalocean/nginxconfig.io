<template>
    <div>
        <div v-if="!phpEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">PHP</label>
            </div>
            <div class="field-body">
                <div class="field is-changed">
                    <div class="control">
                        <label class="text">
                            PHP is disabled.
                            <template v-if="$parent.$props.data.reverseProxy.reverseProxy.computed">
                                <br />PHP cannot be enabled whilst the reverse proxy is enabled.
                            </template>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="field is-horizontal">
            <div class="field-label">
                <label class="label">PHP</label>
            </div>
            <div class="field-body">
                <div :class="`field${phpChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="php" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable PHP
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="wordPressRulesEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">WordPress rules</label>
            </div>
            <div class="field-body">
                <div :class="`field${wordPressRulesChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="wordPressRules" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable WordPress-specific rules
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="drupalRulesEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">Drupal rules</label>
            </div>
            <div class="field-body">
                <div :class="`field${drupalRulesChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="drupalRules" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable Drupal-specific rules
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="magentoRulesEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">Magento rules</label>
            </div>
            <div class="field-body">
                <div :class="`field${magentoRulesChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="magentoRules" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable Magento-specific rules
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PrettyCheck from 'pretty-checkbox-vue/check';
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
        components: {
            PrettyCheck,
        },
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
            // Disable everything if php is disabled
            '$props.data.php': {
                handler(data) {
                    const state = data.computed;
                    if (state) {
                        this.$props.data.wordPressRules.enabled = true;
                        this.$props.data.wordPressRules.computed = this.$props.data.wordPressRules.value;
                        this.$props.data.drupalRules.enabled = true;
                        this.$props.data.drupalRules.computed = this.$props.data.drupalRules.value;
                        this.$props.data.magentoRules.enabled = true;
                        this.$props.data.magentoRules.computed = this.$props.data.magentoRules.value;
                    } else {
                        this.$props.data.wordPressRules.enabled = false;
                        this.$props.data.wordPressRules.computed = false;
                        this.$props.data.drupalRules.enabled = false;
                        this.$props.data.drupalRules.computed = false;
                        this.$props.data.magentoRules.enabled = false;
                        this.$props.data.magentoRules.computed = false;
                    }
                },
                deep: true,
            },
        },
    };
</script>
