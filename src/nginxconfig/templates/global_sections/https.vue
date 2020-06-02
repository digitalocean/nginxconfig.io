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
                <label class="label">{{ i18n.templates.globalSections.https.sslProfile }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <label class="text">
                            {{ i18n.templates.globalSections.https.httpsMustBeEnabledOnOneSite }}
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <template v-else>
            <div class="field is-horizontal is-aligned-top">
                <div class="field-label">
                    <label class="label">{{ i18n.templates.globalSections.https.sslProfile }}</label>
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
                    <label class="label">{{ i18n.templates.globalSections.https.ocspDnsResolvers }}</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div :class="`control${ocspCloudflareChanged ? ' is-changed' : ''}`">
                            <div class="checkbox">
                                <PrettyCheck v-model="ocspCloudflare" class="p-default p-curve p-fill p-icon">
                                    <i slot="extra" class="icon fas fa-check"></i>
                                    {{ i18n.templates.globalSections.https.cloudflareResolver }}
                                </PrettyCheck>
                            </div>
                        </div>
                        <div v-if="$props.data.ocspCloudflare.computed" class="control field is-horizontal is-expanded">
                            <div v-for="(name, value) in $props.data.ocspCloudflareType.options"
                                 :class="`control${ocspCloudflareTypeChanged && value === ocspCloudflareType ? ' is-changed' : ''}`"
                            >
                                <div class="radio">
                                    <PrettyRadio v-model="ocspCloudflareType" :value="value" class="p-default p-round p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ name }}
                                    </PrettyRadio>
                                </div>
                            </div>
                        </div>

                        <div :class="`control${ocspGoogleChanged ? ' is-changed' : ''}`">
                            <div class="checkbox">
                                <PrettyCheck v-model="ocspGoogle" class="p-default p-curve p-fill p-icon">
                                    <i slot="extra" class="icon fas fa-check"></i>
                                    {{ i18n.templates.globalSections.https.googlePublicDns }}
                                </PrettyCheck>
                            </div>
                        </div>
                        <div v-if="$props.data.ocspGoogle.computed" class="control field is-horizontal is-expanded">
                            <div v-for="(name, value) in $props.data.ocspGoogleType.options"
                                 :class="`control${ocspGoogleTypeChanged && value === ocspGoogleType ? ' is-changed' : ''}`"
                            >
                                <div class="radio">
                                    <PrettyRadio v-model="ocspGoogleType" :value="value" class="p-default p-round p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ name }}
                                    </PrettyRadio>
                                </div>
                            </div>
                        </div>

                        <div :class="`control${ocspOpenDnsChanged ? ' is-changed' : ''}`">
                            <div class="checkbox">
                                <PrettyCheck v-model="ocspOpenDns" class="p-default p-curve p-fill p-icon">
                                    <i slot="extra" class="icon fas fa-check"></i>
                                    {{ i18n.templates.globalSections.https.openDns }}
                                </PrettyCheck>
                            </div>
                        </div>
                        <div v-if="$props.data.ocspOpenDns.computed" class="control field is-horizontal is-expanded">
                            <div v-for="(name, value) in $props.data.ocspOpenDnsType.options"
                                 :class="`control${ocspOpenDnsTypeChanged && value === ocspOpenDnsType ? ' is-changed' : ''}`"
                            >
                                <div class="radio">
                                    <PrettyRadio v-model="ocspOpenDnsType" :value="value" class="p-default p-round p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ name }}
                                    </PrettyRadio>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="letsEncryptRootEnabled" class="field is-horizontal">
                <div class="field-label">
                    <label class="label">{{ i18n.templates.globalSections.https.letsEncryptWebroot }}</label>
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
    import clone from 'clone';
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const ipType = {
        default: 'ipv4',
        options: {
            ipv4: i18n.templates.globalSections.https.ipv4Only,
            ipv6: i18n.templates.globalSections.https.ipv6Only,
            both: i18n.templates.globalSections.https.ipv4AndIpv6,
        },
        enabled: true,
    };

    const validOptionCheck = data => {
        if (data.enabled)
            if (!Object.keys(data.options).includes(data.computed))
                data.computed = data.default;
    };

    const defaults = {
        sslProfile: {
            default: 'intermediate',
            options: {
                modern: i18n.templates.globalSections.https.mozillaModern,
                intermediate: i18n.templates.globalSections.https.mozillaIntermediate,
                old: i18n.templates.globalSections.https.mozillaOld,
            },
            enabled: true,
        },
        ocspCloudflare: {
            default: true,
            enabled: true,
        },
        ocspCloudflareType: clone(ipType),
        ocspGoogle: {
            default: true,
            enabled: true,
        },
        ocspGoogleType: clone(ipType),
        ocspOpenDns: {
            default: true,
            enabled: true,
        },
        ocspOpenDnsType: clone(ipType),
        letsEncryptRoot: {
            default: '/var/www/_letsencrypt/',
            enabled: true,
        },
    };

    export default {
        name: 'GlobalHTTPS',                                // Component name
        display: i18n.common.https,                         // Display name for tab
        key: 'https',                                       // Key for data in parent
        delegated: delegatedFromDefaults(defaults),         // Data the parent will present here
        components: {
            PrettyCheck,
            PrettyRadio,
        },
        props: {
            data: Object,                                   // Data delegated back to us from parent
        },
        data () {
            return {
                i18n,
            };
        },
        computed: computedFromDefaults(defaults, 'https'),  // Getters & setters for the delegated data
        watch: {
            // Check SSL profile is valid
            '$props.data.sslProfile': {
                handler: validOptionCheck,
                deep: true,
            },
            // Check IP type is valid
            '$props.data.ocspCloudflareType': {
                handler: validOptionCheck,
                deep: true,
            },
            '$props.data.ocspGoogleType': {
                handler: validOptionCheck,
                deep: true,
            },
            '$props.data.ocspOpenDnsType': {
                handler: validOptionCheck,
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
