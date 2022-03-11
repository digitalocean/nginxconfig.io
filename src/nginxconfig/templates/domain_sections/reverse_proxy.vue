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
        <div v-if="!reverseProxyEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">{{ $t('common.reverseProxy') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <label class="text">
                            {{ $t('templates.domainSections.reverseProxy.reverseProxyIsDisabled') }}
                            <template v-if="$parent.$props.data.php.php.computed">
                                <br />{{ $t('templates.domainSections.reverseProxy.reverseProxyCannotBeEnabledWithPhp') }}
                            </template>
                            <template v-if="$parent.$props.data.python.python.computed">
                                <br />{{ $t('templates.domainSections.reverseProxy.reverseProxyCannotBeEnabledWithPython') }}
                            </template>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('common.reverseProxy') }}</label>
            </div>
            <div class="field-body">
                <div :class="`field${reverseProxyChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="reverseProxy" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.domainSections.reverseProxy.enableReverseProxy') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="pathEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('common.path') }}</label>
            </div>
            <div class="field-body">
                <div :class="`field${pathChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <input v-model="path"
                               class="input"
                               type="text"
                               :placeholder="$props.data.path.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div v-if="proxyPassEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">proxy_pass</label>
            </div>
            <div class="field-body">
                <div :class="`field${proxyPassChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <input v-model="proxyPass"
                               class="input"
                               type="text"
                               :placeholder="$props.data.proxyPass.default"
                        />
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
        reverseProxy: {
            default: false,
            enabled: false,
        },
        path: {
            default: '/',
            enabled: false,
        },
        proxyPass: {
            default: 'http://127.0.0.1:3000',
            enabled: false,
        },
    };

    export default {
        name: 'DomainReverseProxy',                                 // Component name
        display: 'common.reverseProxy',                             // Display name for tab (i18n key)
        key: 'reverseProxy',                                        // Key for data in parent
        delegated: delegatedFromDefaults(defaults),                 // Data the parent will present here
        components: {
            PrettyCheck,
        },
        props: {
            data: Object,                                           // Data delegated back to us from parent
        },
        computed: computedFromDefaults(defaults, 'reverseProxy'),   // Getters & setters for the delegated data
        watch: {
            // If the PHP or Python is enabled, the Reverse proxy will be forced off
            '$parent.$props.data': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.php.php.computed || data.python.python.computed) {
                        this.$props.data.reverseProxy.enabled = false;
                        this.$props.data.reverseProxy.computed = false;
                    } else {
                        this.$props.data.reverseProxy.enabled = true;
                        this.$props.data.reverseProxy.computed = this.$props.data.reverseProxy.value;
                    }
                },
                deep: true,
            },
            // Disable all options if Reverse proxy is disabled
            '$props.data.reverseProxy': {
                handler(data) {
                    if (data.computed) {
                        this.$props.data.path.enabled = true;
                        this.$props.data.path.computed = this.$props.data.path.value;
                        this.$props.data.proxyPass.enabled = true;
                        this.$props.data.proxyPass.computed = this.$props.data.proxyPass.value;
                    } else {
                        this.$props.data.path.enabled = false;
                        this.$props.data.path.computed = '';
                        this.$props.data.proxyPass.enabled = false;
                        this.$props.data.proxyPass.computed = '';
                    }
                },
                deep: true,
            },
        },
    };
</script>
