<!--
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<template>
    <div>
        <div v-if="!sslProfileEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">SSL profile</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <label class="text">
                            HTTPS must be enabled on at least one site to configure global HTTPS settings.
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <template v-else>
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
        </template>
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
            '$parent.$parent.$data.domains': {
                handler(data) {
                    let httpsEnabled = false, leEnabled = false;

                    for (const domain of data) {
                        // Enable HTTPS server settings if any site uses HTTPS
                        if (domain && domain.https && domain.https.https && domain.https.https.computed) {
                            this.$props.data.sslProfile.enabled = true;
                            this.$props.data.sslProfile.computed = this.$props.data.sslProfile.value;
                            this.$props.data.ocspCloudflare.enabled = true;
                            this.$props.data.ocspCloudflare.computed = this.$props.data.ocspCloudflare.value;
                            this.$props.data.ocspGoogle.enabled = true;
                            this.$props.data.ocspGoogle.computed = this.$props.data.ocspGoogle.value;
                            this.$props.data.ocspOpenDns.enabled = true;
                            this.$props.data.ocspOpenDns.computed = this.$props.data.ocspOpenDns.value;
                            this.$props.data.letsEncryptRoot.enabled = true;
                            this.$props.data.letsEncryptRoot.computed = this.$props.data.letsEncryptRoot.value;
                            httpsEnabled = true;
                        }

                        // Enable LE webroot if any site uses LE
                        if (domain && domain.https && domain.https.certType
                            && domain.https.certType.computed === 'letsEncrypt') {
                            this.$props.data.letsEncryptRoot.enabled = true;
                            this.$props.data.letsEncryptRoot.computed = this.$props.data.letsEncryptRoot.value;
                            leEnabled = true;
                        }
                    }

                    if (!httpsEnabled) {
                        this.$props.data.sslProfile.enabled = false;
                        this.$props.data.sslProfile.computed = '';
                        this.$props.data.ocspCloudflare.enabled = false;
                        this.$props.data.ocspCloudflare.computed = false;
                        this.$props.data.ocspGoogle.enabled = false;
                        this.$props.data.ocspGoogle.computed = false;
                        this.$props.data.ocspOpenDns.enabled = false;
                        this.$props.data.ocspOpenDns.computed = false;
                        this.$props.data.letsEncryptRoot.enabled = false;
                        this.$props.data.letsEncryptRoot.computed = '';
                    }

                    if (!leEnabled) {
                        this.$props.data.letsEncryptRoot.enabled = false;
                        this.$props.data.letsEncryptRoot.computed = '';
                    }
                },
                deep: true,
            },
        },
    };
</script>
