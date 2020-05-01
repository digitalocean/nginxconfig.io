<template>
    <div>
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Referrer-Policy</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${referrerPolicyChanged ? ' is-changed' : ''}`">
                        <VueSelect v-model="referrerPolicy"
                                   :options="$props.data.referrerPolicy.options"
                                   :clearable="false"
                        ></VueSelect>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Content-Security-Policy</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${contentSecurityPolicyChanged ? ' is-changed' : ''}`">
                        <input v-model="contentSecurityPolicy"
                               class="input"
                               type="text"
                               :placeholder="$props.data.contentSecurityPolicy.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">server_tokens</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${serverTokensChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="serverTokens" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">limit_req</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${limitReqChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="limitReq" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable
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
    import VueSelect from 'vue-select';
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        referrerPolicy: {
            default: 'no-referrer-when-downgrade',
            options: [
                'no-referrer',
                'no-referrer-when-downgrade',
                'origin',
                'origin-when-cross-origin',
                'same-origin',
                'strict-origin',
                'strict-origin-when-cross-origin',
                'unsafe-url',
            ],
            enabled: true,
        },
        contentSecurityPolicy: {
            default: 'default-src \'self\' http: https: data: blob: \'unsafe-inline\'',
            enabled: true,
        },
        serverTokens: {
            default: false,
            enabled: true,
        },
        limitReq: {
            default: false,
            enabled: true,
        },
    };

    export default {
        name: 'GlobalSecurity',                                     // Component name
        display: 'Security',                                        // Display name for tab
        key: 'security',                                            // Key for data in parent
        delegated: delegatedFromDefaults(defaults),                 // Data the parent will present here
        components: {
            PrettyCheck,
            VueSelect,
        },
        props: {
            data: Object,                                           // Data delegated back to us from parent
        },
        data () {
            return {
                i18n,
            };
        },
        computed: computedFromDefaults(defaults, 'security'),   // Getters & setters for the delegated data
        watch: {
            // Check referrer policy selection is valid
            '$props.data.referrerPolicy': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.enabled)
                        if (!data.options.includes(data.computed))
                            data.computed = data.default;
                },
                deep: true,
            },
        },
    };
</script>
