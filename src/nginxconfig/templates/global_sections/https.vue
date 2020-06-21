<!--
Copyright 2020 DigitalOcean

This code is licensed under the MIT License.
You may obtain a copy of the License at
https://github.com/digitalocean/nginxconfig.io/blob/master/LICENSE or https://mit-license.org/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions :

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
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

                        <div :class="`control${ocspQuad9Changed ? ' is-changed' : ''}`">
                            <div class="checkbox">
                                <PrettyCheck v-model="ocspQuad9" class="p-default p-curve p-fill p-icon">
                                    <i slot="extra" class="icon fas fa-check"></i>
                                    {{ i18n.templates.globalSections.https.quad9 }}
                                </PrettyCheck>
                            </div>
                        </div>
                        <div v-if="$props.data.ocspQuad9.computed" class="control field is-horizontal is-expanded">
                            <div v-for="(name, value) in $props.data.ocspQuad9Type.options"
                                 :class="`control${ocspQuad9TypeChanged && value === ocspQuad9Type ? ' is-changed' : ''}`"
                            >
                                <div class="radio">
                                    <PrettyRadio v-model="ocspQuad9Type" :value="value" class="p-default p-round p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ name }}
                                    </PrettyRadio>
                                </div>
                            </div>
                        </div>

                        <div :class="`control${ocspVerisignChanged ? ' is-changed' : ''}`">
                            <div class="checkbox">
                                <PrettyCheck v-model="ocspVerisign" class="p-default p-curve p-fill p-icon">
                                    <i slot="extra" class="icon fas fa-check"></i>
                                    {{ i18n.templates.globalSections.https.verisign }}
                                </PrettyCheck>
                            </div>
                        </div>
                        <div v-if="$props.data.ocspVerisign.computed" class="control field is-horizontal is-expanded">
                            <div v-for="(name, value) in $props.data.ocspVerisignType.options"
                                 :class="`control${ocspVerisignTypeChanged && value === ocspVerisignType ? ' is-changed' : ''}`"
                            >
                                <div class="radio">
                                    <PrettyRadio v-model="ocspVerisignType" :value="value" class="p-default p-round p-fill p-icon">
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

            <div v-if="letsEncryptCertRootEnabled" class="field is-horizontal">
                <div class="field-label">
                    <label class="label">{{ i18n.templates.globalSections.https.letsEncryptCertRoot }}</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div :class="`control${letsEncryptCertRootChanged ? ' is-changed' : ''}`">
                            <input v-model="letsEncryptCertRoot"
                                   class="input"
                                   type="text"
                                   :placeholder="$props.data.letsEncryptCertRoot.default"
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
        ocspQuad9: {
            default: false,
            enabled: true,
        },
        ocspQuad9Type: clone(ipType),
        ocspVerisign: {
            default: false,
            enabled: true,
        },
        ocspVerisignType: clone(ipType),
        letsEncryptRoot: {
            default: '/var/www/_letsencrypt/',
            enabled: true,
        },
        letsEncryptCertRoot: {
            default: '/etc/letsencrypt/live/',
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
            '$props.data.ocspQuad9Type': {
                handler: validOptionCheck,
                deep: true,
            },
            '$props.data.ocspVerisignType': {
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
