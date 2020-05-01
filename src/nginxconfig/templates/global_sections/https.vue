<template>
    <div>
        <div class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">SSL profile</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="field">
                        <div v-for="(name, value) in $props.data.sslProfile.options"
                             :class="`control${sslProfileChanged && value === sslProfile ? ' is-changed' : ''}`"
                        >
                            <div class="radio">
                                <PrettyRadio v-model="sslProfile" :value="value" class="p-default p-round p-fill p-icon">
                                    <i slot="extra" class="icon fas fa-check"></i>
                                    {{ name }}
                                </PrettyRadio>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">OCSP DNS Resolvers</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${ocspCloudflareChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="ocspCloudflare" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                Cloudflare Resolver
                            </PrettyCheck>
                        </div>
                    </div>
                    <div :class="`control${ocspGoogleChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="ocspGoogle" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                Google Public DNS
                            </PrettyCheck>
                        </div>
                    </div>
                    <div :class="`control${ocspOpenDnsChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="ocspOpenDns" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                OpenDNS
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="letsEncryptRootEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">Let's Encrypt webroot</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${letsEncryptRootChanged ? ' is-changed' : ''}`">
                        <input v-model="letsEncryptRoot"
                               class="input"
                               type="text"
                               :placeholder="$props.data.letsEncryptRoot.default"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PrettyCheck from 'pretty-checkbox-vue/check';
    import PrettyRadio from 'pretty-checkbox-vue/radio';
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        sslProfile: {
            default: 'intermediate',
            options: {
                modern: 'Mozilla Modern',
                intermediate: 'Mozilla Intermediate',
                old: 'Mozilla Old',
            },
            enabled: true,
        },
        ocspCloudflare: {
            default: true,
            enabled: true,
        },
        ocspGoogle: {
            default: true,
            enabled: true,
        },
        ocspOpenDns: {
            default: true,
            enabled: true,
        },
        letsEncryptRoot: {
            default: '/var/www/_letsencrypt/',
            enabled: true,
        },
    };

    export default {
        name: 'GlobalHTTPS',                                    // Component name
        display: 'HTTPS',                                       // Display name for tab
        key: 'https',                                           // Key for data in parent
        delegated: delegatedFromDefaults(defaults),             // Data the parent will present here
        components: {
            PrettyCheck,
            PrettyRadio,
        },
        props: {
            data: Object,                                       // Data delegated back to us from parent
        },
        data () {
            return {
                i18n,
            };
        },
        computed: computedFromDefaults(defaults, 'https'), // Getters & setters for the delegated data
        watch: {
            // Check SSL profile is valid
            '$props.data.sslProfile': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.enabled)
                        if (!Object.keys(data.options).includes(data.computed))
                            data.computed = data.default;
                },
                deep: true,
            },
            // Enable LE webroot if any site uses LE
            '$parent.$parent.$data.domains': {
                handler(data) {
                    for (const domain of data) {
                        if (domain && domain.https && domain.https.certType
                            && domain.https.certType.computed === 'letsEncrypt') {
                            this.$props.data.letsEncryptRoot.enabled = true;
                            this.$props.data.letsEncryptRoot.computed = this.$props.data.letsEncryptRoot.value;
                            return;
                        }
                    }
                    this.$props.data.letsEncryptRoot.enabled = false;
                    this.$props.data.letsEncryptRoot.computed = '';
                },
                deep: true,
            },
        },
    };
</script>
