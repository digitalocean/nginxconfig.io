<!--
Copyright 2024 DigitalOcean

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
        <div
            v-if="!reverseProxyEnabled"
            class="field is-horizontal is-aligned-top"
        >
            <div class="field-label">
                <label class="label">{{ $t('common.reverseProxy') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <label class="text">
                            {{
                                $t(
                                    'templates.globalSections.reverseProxy.reverseProxyMustBeEnabledOnOneSite',
                                )
                            }}
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <template v-else>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">proxy_connect_timeout</label>
                </div>
                <div class="field-body">
                    <div class="field has-addons">
                        <div
                            :class="`control is-expanded${
                                proxyConnectTimeoutChanged ? ' is-changed' : ''
                            }`"
                        >
                            <input
                                v-model.number="proxyConnectTimeout"
                                class="input"
                                type="number"
                                min="0"
                                step="1"
                                :placeholder="$props.data.proxyConnectTimeout.default"
                            />
                        </div>
                        <div class="control">
                            <a class="button is-static">
                                {{ $t('templates.globalSections.reverseProxy.seconds') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">proxy_send_timeout</label>
                </div>
                <div class="field-body">
                    <div class="field has-addons">
                        <div
                            :class="`control is-expanded${
                                proxySendTimeoutChanged ? ' is-changed' : ''
                            }`"
                        >
                            <input
                                v-model.number="proxySendTimeout"
                                class="input"
                                type="number"
                                min="0"
                                step="1"
                                :placeholder="$props.data.proxySendTimeout.default"
                            />
                        </div>
                        <div class="control">
                            <a class="button is-static">
                                {{ $t('templates.globalSections.reverseProxy.seconds') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">proxy_read_timeout</label>
                </div>
                <div class="field-body">
                    <div class="field has-addons">
                        <div
                            :class="`control is-expanded${
                                proxyReadTimeoutChanged ? ' is-changed' : ''
                            }`"
                        >
                            <input
                                v-model.number="proxyReadTimeout"
                                class="input"
                                type="number"
                                min="0"
                                step="1"
                                :placeholder="$props.data.proxyReadTimeout.default"
                            />
                        </div>
                        <div class="control">
                            <a class="button is-static">
                                {{ $t('templates.globalSections.reverseProxy.seconds') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">Coexistence with X-Forwarded-*</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="field">
                            <div
                                v-for="(name, value) in $props.data.proxyCoexistenceXForwarded
                                    .options"
                                :class="`control${
                                    proxyCoexistenceXForwardedChanged &&
                                    value === proxyCoexistenceXForwarded
                                        ? ' is-changed'
                                        : ''
                                }`"
                            >
                                <div class="radio">
                                    <PrettyRadio
                                        v-model="proxyCoexistenceXForwarded"
                                        :value="value"
                                        class="p-default p-round p-fill p-icon"
                                    >
                                        {{ $t(name) }}
                                    </PrettyRadio>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import delegatedFromDefaults from '../../util/delegated_from_defaults.js';
    import computedFromDefaults from '../../util/computed_from_defaults.js';
    import PrettyRadio from '../inputs/radio.vue';

    const defaults = {
        proxyConnectTimeout: {
            default: 60,
            computed: '60s', // We use a watcher to append 's'
            enabled: false,
        },
        proxySendTimeout: {
            default: 60,
            computed: '60s', // We use a watcher to append 's'
            enabled: false,
        },
        proxyReadTimeout: {
            default: 60,
            computed: '60s', // We use a watcher to append 's'
            enabled: false,
        },
        proxyCoexistenceXForwarded: {
            default: 'passOn',
            options: {
                passOn: 'templates.globalSections.reverseProxy.passOn', // i18n key
                remove: 'templates.globalSections.reverseProxy.remove', // i18n key
            },
            enabled: false,
        },
    };

    const validTimeout = (data) => {
        let val = parseFloat(data.computed);

        // Use default if we've got an invalid setting
        if (isNaN(val)) {
            val = data.default;
        }

        // Set the value with 's' appended
        data.computed = `${val}s`;
    };

    export default {
        name: 'GlobalReverseProxy', // Component name
        display: 'common.reverseProxy', // Display name for tab (i18n key)
        key: 'reverseProxy', // Key for data in parent
        delegated: delegatedFromDefaults(defaults), // Data the parent will present here
        components: {
            PrettyRadio,
        },
        props: {
            data: Object, // Data delegated back to us from parent
        },
        data() {
            return {
                reverseProxyEnabled: false,
            };
        },
        computed: computedFromDefaults(defaults, 'reverseProxy'), // Getters & setters for the delegated data
        watch: {
            // Disable all options if Reverse proxy is disabled
            '$parent.$parent.$data.domains': {
                handler(data) {
                    for (const domain of data) {
                        if (
                            domain &&
                            domain.reverseProxy &&
                            domain.reverseProxy.reverseProxy &&
                            domain.reverseProxy.reverseProxy.computed
                        ) {
                            this.$data.reverseProxyEnabled = true;
                            this.$props.data.proxyConnectTimeout.enabled = true;
                            this.$props.data.proxyConnectTimeout.computed =
                                this.$props.data.proxyConnectTimeout.value;
                            this.$props.data.proxySendTimeout.enabled = true;
                            this.$props.data.proxySendTimeout.computed =
                                this.$props.data.proxySendTimeout.value;
                            this.$props.data.proxyReadTimeout.enabled = true;
                            this.$props.data.proxyReadTimeout.computed =
                                this.$props.data.proxyReadTimeout.value;
                            this.$props.data.proxyCoexistenceXForwarded.enabled = true;
                            this.$props.data.proxyCoexistenceXForwarded.computed =
                                this.$props.data.proxyCoexistenceXForwarded.value;
                            return;
                        }
                    }

                    this.$data.reverseProxyEnabled = false;
                    this.$props.data.proxyConnectTimeout.enabled = false;
                    this.$props.data.proxyConnectTimeout.computed = '';
                    this.$props.data.proxySendTimeout.enabled = false;
                    this.$props.data.proxySendTimeout.computed = '';
                    this.$props.data.proxyReadTimeout.enabled = false;
                    this.$props.data.proxyReadTimeout.computed = '';
                    this.$props.data.proxyCoexistenceXForwarded.enabled = false;
                    this.$props.data.proxyCoexistenceXForwarded.computed = '';
                },
                deep: true,
            },
            // Ensure the timeouts are valid numbers
            '$props.data.proxyConnectTimeout': {
                handler: validTimeout,
                deep: true,
            },
            '$props.data.proxySendTimeout': {
                handler: validTimeout,
                deep: true,
            },
            '$props.data.proxyReadTimeout': {
                handler: validTimeout,
                deep: true,
            },
        },
    };
</script>
