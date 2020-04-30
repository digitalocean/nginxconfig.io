<template>
    <div>
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">HTTPS</label>
            </div>
            <div class="field-body">
                <div :class="`field${httpsChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="https" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable encrypted SSL connections
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="http2Enabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">HTTP/2</label>
            </div>
            <div class="field-body">
                <div :class="`field${http2Changed ? ' is-changed' : ''}`">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="http2" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable HTTP/2 connections
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="forceHttpsEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">Force HTTPS</label>
            </div>
            <div class="field-body">
                <div :class="`field${forceHttpsChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="forceHttps" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                (http://{{ $parent.$props.data.server.domain.value }}
                                <i class="fas fa-long-arrow-alt-right"></i>
                                https://{{ $parent.$props.data.server.domain.value }})
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="hstsEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">HSTS</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${hstsChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="hsts" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable Strict Transport Security
                            </PrettyCheck>
                        </div>
                    </div>

                    <div v-if="hstsSubdomainsEnabled" :class="`control${hstsSubdomainsChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="hstsSubdomains" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                includeSubDomains
                            </PrettyCheck>
                        </div>
                    </div>

                    <div v-if="hstsPreloadEnabled" :class="`control${hstsPreloadChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="hstsPreload" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                preload
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="certTypeEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">Certification type</label>
            </div>
            <div class="field-body">
                <div :class="`field${certTypeChanged ? ' is-changed' : ''}`">
                    <div v-for="(name, value) in $props.data.certType.options" class="control">
                        <div class="radio">
                            <PrettyRadio v-model="certType" :value="value" class="p-default p-round p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ name }}
                            </PrettyRadio>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="letsEncryptEmailEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">Let's Encrypt email</label>
            </div>
            <div class="field-body">
                <div :class="`field${letsEncryptEmailChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <input v-model="letsEncryptEmail"
                               class="input"
                               type="text"
                               :placeholder="`info@${$parent.$props.data.server.domain.value}`"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div v-if="sslCertificateEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">ssl_certificate</label>
            </div>
            <div class="field-body">
                <div :class="`field${sslCertificateChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <input v-model="sslCertificate"
                               class="input"
                               type="text"
                               :placeholder="`/etc/nginx/ssl/${$parent.$props.data.server.domain.value}.crt`"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div v-if="sslCertificateKeyEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">ssl_certificate_key</label>
            </div>
            <div class="field-body">
                <div :class="`field${sslCertificateKeyChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <input v-model="sslCertificateKey"
                               class="input"
                               type="text"
                               :placeholder="`/etc/nginx/ssl/${$parent.$props.data.server.domain.value}.key`"
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
        https: {
            default: true,
            enabled: true,
        },
        http2: {
            default: true,
            enabled: true,
        },
        forceHttps: {
            default: true,
            enabled: true,
        },
        hsts: {
            default: true,
            enabled: true,
        },
        hstsSubdomains: {
            default: true,
            enabled: true,
        },
        hstsPreload: {
            default: true,
            enabled: true,
        },
        certType: {
            default: 'letsEncrypt',
            options: {
                letsEncrypt: 'Let\'s Encrypt',
                custom: 'Custom certificate',
            },
            enabled: true,
        },
        letsEncryptEmail: {
            default: '',
            enabled: true,
        },
        sslCertificate: {
            default: '',
            enabled: false,
        },
        sslCertificateKey: {
            default: '',
            enabled: false,
        },
    };

    export default {
        name: 'DomainHTTPS',                                    // Component name
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
            // Disable everything if https is disabled
            '$props.data.https': {
                handler(data) {
                    const state = data.computed;
                    if (state) {
                        this.$props.data.http2.enabled = true;
                        this.$props.data.http2.computed = this.$props.data.http2.value;
                        this.$props.data.forceHttps.enabled = true;
                        this.$props.data.forceHttps.computed = this.$props.data.forceHttps.value;
                        this.$props.data.hsts.enabled = true;
                        this.$props.data.hsts.computed = this.$props.data.hsts.value;
                        this.$props.data.certType.enabled = true;
                        this.$props.data.certType.computed = this.$props.data.certType.value;
                    } else {
                        this.$props.data.http2.enabled = false;
                        this.$props.data.http2.computed = false;
                        this.$props.data.forceHttps.enabled = false;
                        this.$props.data.forceHttps.computed = false;
                        this.$props.data.hsts.enabled = false;
                        this.$props.data.hsts.computed = false;
                        this.$props.data.certType.enabled = false;
                        this.$props.data.certType.computed = '';
                    }
                },
                deep: true,
            },
            // Disable hsts options if hsts is disabled
            '$props.data': {
                handler() {
                    // hstsSubdomains
                    if (this.$props.data.hsts.computed) {
                        this.$props.data.hstsSubdomains.enabled = true;
                        this.$props.data.hstsSubdomains.computed = this.$props.data.hstsSubdomains.value;
                    } else {
                        this.$props.data.hstsSubdomains.enabled = false;
                        this.$props.data.hstsSubdomains.computed = false;
                    }

                    // hstsPreload
                    if (this.$props.data.hsts.computed && this.$props.data.hstsSubdomains.computed) {
                        this.$props.data.hstsPreload.enabled = true;
                        this.$props.data.hstsPreload.computed = this.$props.data.hstsPreload.value;
                    } else {
                        this.$props.data.hstsPreload.enabled = false;
                        this.$props.data.hstsPreload.computed = false;
                    }
                },
                deep: true,
            },
            // Toggle form elms based on cert selection
            '$props.data.certType': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    // Hide all if disabled
                    if (!data.enabled) {
                        this.$props.data.letsEncryptEmail.enabled = false;
                        this.$props.data.letsEncryptEmail.computed = '';
                        this.$props.data.sslCertificate.enabled = false;
                        this.$props.data.sslCertificate.computed = '';
                        this.$props.data.sslCertificateKey.enabled = false;
                        this.$props.data.sslCertificateKey.computed = '';
                    } else {
                        // First, check its valid
                        if (!Object.keys(data.options).includes(data.computed)) data.computed = data.default;

                        // Show the correct fields
                        if (data.computed === 'letsEncrypt') {
                            this.$props.data.letsEncryptEmail.enabled = true;
                            this.$props.data.letsEncryptEmail.computed = this.$props.data.letsEncryptEmail.value;

                            this.$props.data.sslCertificate.enabled = false;
                            this.$props.data.sslCertificate.computed = '';
                            this.$props.data.sslCertificateKey.enabled = false;
                            this.$props.data.sslCertificateKey.computed = '';
                        } else {
                            this.$props.data.sslCertificate.enabled = true;
                            this.$props.data.sslCertificate.computed = this.$props.data.sslCertificate.value;
                            this.$props.data.sslCertificateKey.enabled = true;
                            this.$props.data.sslCertificateKey.computed = this.$props.data.sslCertificateKey.value;

                            this.$props.data.letsEncryptEmail.enabled = false;
                            this.$props.data.letsEncryptEmail.computed = '';
                        }
                    }
                },
                deep: true,
            },
        },
    };
</script>
