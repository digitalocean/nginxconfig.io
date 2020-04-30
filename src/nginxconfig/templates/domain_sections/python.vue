<template>
    <div>
        <div v-if="!pythonEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">Python</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <label class="text">
                            Python is disabled.
                            <template v-if="$parent.$props.data.reverseProxy.reverseProxy.computed">
                                <br />Python cannot be enabled whilst the reverse proxy is enabled.
                            </template>
                            <template v-if="$parent.$props.data.php.php.computed">
                                <br />Python cannot be enabled whilst PHP is enabled.
                            </template>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="field is-horizontal">
            <div class="field-label">
                <label class="label">Python</label>
            </div>
            <div class="field-body">
                <div :class="`field${pythonChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="python" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable Python
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="djangoRulesEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">Django rules</label>
            </div>
            <div class="field-body">
                <div :class="`field${djangoRulesChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="djangoRules" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable Django-specific rules
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
        python: {
            default: false,
            enabled: true,
        },
        djangoRules: {
            default: false,
            enabled: false,
        },
    };

    export default {
        name: 'DomainPython',                                   // Component name
        display: 'Python',                                      // Display name for tab
        key: 'python',                                          // Key for data in parent
        delegated: delegatedFromDefaults(defaults),             // Data the parent will present here
        components: {
            PrettyCheck,
        },
        props: {
            data: Object,                                       // Data delegated back to us from parent
        },
        data () {
            return {
                i18n,
            };
        },
        computed: computedFromDefaults(defaults, 'python'), // Getters & setters for the delegated data
        watch: {
            // If the Reverse proxy or PHP is enabled, Python will be forced off
            '$parent.$props.data': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.reverseProxy.reverseProxy.computed || data.php.php.computed) {
                        this.$props.data.python.enabled = false;
                        this.$props.data.python.computed = false;
                    } else {
                        this.$props.data.python.enabled = true;
                        this.$props.data.python.computed = this.$props.data.python.value;
                    }
                },
                deep: true,
            },
            // Disable Django if Python is disabled
            '$props.data.python': {
                handler(data) {
                    const state = data.computed;
                    if (state) {
                        this.$props.data.djangoRules.enabled = true;
                        this.$props.data.djangoRules.computed = this.$props.data.djangoRules.value;
                    } else {
                        this.$props.data.djangoRules.enabled = false;
                        this.$props.data.djangoRules.computed = false;
                    }
                },
                deep: true,
            },
        },
    };
</script>
