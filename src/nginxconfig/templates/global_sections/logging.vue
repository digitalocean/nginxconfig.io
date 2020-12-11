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
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">access_log</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${accessLogChanged ? ' is-changed' : ''}`">
                        <input v-model="accessLog"
                               class="input"
                               type="text"
                               :placeholder="$props.data.accessLog.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">error_log</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${errorLogChanged ? ' is-changed' : ''}`">
                        <input v-model="errorLog"
                               class="input"
                               type="text"
                               :placeholder="$props.data.errorLog.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">log_not_found</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${logNotFoundChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="logNotFound" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.logging.enableFileNotFoundErrorLogging') }} error_log
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">{{ $t('templates.globalSections.logging.logformat') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div v-if="cloudflareEnabled" :class="`control${cloudflareChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="cloudflare" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.logging.enableCloudflare') }}
                            </PrettyCheck>
                        </div>
                    </div>
                    <div v-if="cfRayEnabled" :class="`control${cfRayChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="cfRay" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.logging.cfRay') }}
                            </PrettyCheck>
                        </div>
                    </div>
                    <div v-if="cfConnectingIpEnabled" :class="`control${cfConnectingIpChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="cfConnectingIp" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.logging.cfConnectingIp') }}
                            </PrettyCheck>
                        </div>
                    </div>
                    <div v-if="xForwardedForEnabled" :class="`control${xForwardedForChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="xForwardedFor" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.logging.xForwardedFor') }}
                            </PrettyCheck>
                        </div>
                    </div>
                    <div v-if="xForwardedProtoEnabled" :class="`control${xForwardedProtoChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="xForwardedProto" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.logging.xForwardedProto') }}
                            </PrettyCheck>
                        </div>
                    </div>
                    <div v-if="trueClientIpEnabled" :class="`control${trueClientIpChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="trueClientIp" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.logging.trueClientIp') }}
                            </PrettyCheck>
                        </div>
                    </div>
                    <div v-if="cfIpCountryEnabled" :class="`control${cfIpCountryChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="cfIpCountry" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.logging.cfIpCountry') }}
                            </PrettyCheck>
                        </div>
                    </div>
                    <div v-if="cfVisitorEnabled" :class="`control${cfVisitorChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="cfVisitor" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.logging.cfVisitor') }}
                            </PrettyCheck>
                        </div>
                    </div>
                    <div v-if="cdnLoopEnabled" :class="`control${cdnLoopChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="cdnLoop" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.logging.cdnLoop') }}
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
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        accessLog: {
            default: '/var/log/nginx/access.log',
            enabled: true,
        },
        errorLog: {
            default: '/var/log/nginx/error.log warn',
            enabled: true,
        },
        logNotFound: {
            default: false,
            enabled: true,
        },
        cloudflare: {
            default: false,
            enabled: true,
        },
        cfRay: {
            default: true,
            enabled: false,
        },
        cfConnectingIp: {
            default: true,
            enabled: false,
        },
        xForwardedFor: {
            default: false,
            enabled: false,
        },
        xForwardedProto: {
            default: false,
            enabled: false,
        },
        trueClientIp: {
            default: false,
            enabled: false,
        },
        cfIpCountry: {
            default: false,
            enabled: false,
        },
        cfVisitor: {
            default: false,
            enabled: false,
        },
        cdnLoop: {
            default: false,
            enabled: false,
        },
    };

    export default {
        name: 'GlobalLogging',                                  // Component name
        display: 'common.logging',                              // Display name for tab (i18n key)
        key: 'logging',                                         // Key for data in parent
        delegated: delegatedFromDefaults(defaults),             // Data the parent will present here
        components: {
            PrettyCheck,
        },
        props: {
            data: Object,                                       // Data delegated back to us from parent
        },
        computed: computedFromDefaults(defaults, 'logging'),    // Getters & setters for the delegated data
        watch: {
            // Show Cloudflare header options if Cloudflare is enabled
            '$props.data.cloudflare': {
                handler(data) {
                    if (data.computed) {
                        this.$props.data.cfRay.enabled = true;
                        this.$props.data.cfRay.computed = this.$props.data.cfRay.value;
                        this.$props.data.cfConnectingIp.enabled = true;
                        this.$props.data.cfConnectingIp.computed = this.$props.data.cfConnectingIp.value;
                        this.$props.data.xForwardedFor.enabled = true;
                        this.$props.data.xForwardedFor.computed = this.$props.data.xForwardedFor.value;
                        this.$props.data.xForwardedProto.enabled = true;
                        this.$props.data.xForwardedProto.computed = this.$props.data.xForwardedProto.value;
                        this.$props.data.trueClientIp.enabled = true;
                        this.$props.data.trueClientIp.computed = this.$props.data.trueClientIp.value;
                        this.$props.data.cfIpCountry.enabled = true;
                        this.$props.data.cfIpCountry.computed = this.$props.data.cfIpCountry.value;
                        this.$props.data.cfVisitor.enabled = true;
                        this.$props.data.cfVisitor.computed = this.$props.data.cfVisitor.value;
                        this.$props.data.cdnLoop.enabled = true;
                        this.$props.data.cdnLoop.computed = this.$props.data.cdnLoop.value;
                    } else {
                        this.$props.data.cfRay.enabled = false;
                        this.$props.data.cfRay.computed = false;
                        this.$props.data.cfConnectingIp.enabled = false;
                        this.$props.data.cfConnectingIp.computed = false;
                        this.$props.data.xForwardedFor.enabled = false;
                        this.$props.data.xForwardedFor.computed = false;
                        this.$props.data.xForwardedProto.enabled = false;
                        this.$props.data.xForwardedProto.computed = false;
                        this.$props.data.trueClientIp.enabled = false;
                        this.$props.data.trueClientIp.computed = false;
                        this.$props.data.cfIpCountry.enabled = false;
                        this.$props.data.cfIpCountry.computed = false;
                        this.$props.data.cfVisitor.enabled = false;
                        this.$props.data.cfVisitor.computed = false;
                        this.$props.data.cdnLoop.enabled = false;
                        this.$props.data.cdnLoop.computed = false;
                    }
                },
                deep: true,
            },
        },
    };
</script>
