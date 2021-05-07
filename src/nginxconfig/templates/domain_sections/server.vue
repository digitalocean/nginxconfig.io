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
        <div class="field-row">
            <div class="field">
                <label class="label">{{ $t('templates.domainSections.server.domain') }}</label>
                <div :class="`control${domainChanged ? ' is-changed' : ''}`">
                    <input v-model="domain" class="input" type="text" :placeholder="domainDefault" />
                </div>
            </div>

            <div class="field">
                <label class="label">{{ $t('common.path') }}</label>
                <div :class="`control${pathChanged ? ' is-changed' : ''}`">
                    <input v-model="path" class="input" type="text" :placeholder="`/var/www/${domain}`" />
                </div>
            </div>

            <div class="field">
                <label class="label">{{ $t('templates.domainSections.server.documentRoot') }}</label>
                <div :class="`control${documentRootChanged ? ' is-changed' : ''}`">
                    <input v-model="documentRoot" class="input" type="text" :placeholder="documentRootDefault" />
                </div>
            </div>
        </div>

        <div v-if="duplicateDomain" class="field">
            <div class="control">
                <label class="text message is-warning">
                    <span class="message-body">
                        {{ $t('templates.domainSections.server.oneOrMoreOtherDomainsAreAlsoNamed') }}
                        <code class="slim">{{ $props.data.domain.computed }}</code>.
                        {{ $t('templates.domainSections.server.thisWillCauseIssuesWithConfigGeneration') }}
                    </span>
                </label>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.server.wwwSubdomain') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${wwwSubdomainChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="wwwSubdomain" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                (www.{{ $props.data.domain.computed }})
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="cdnSubdomainEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.server.cdnSubdomain') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${cdnSubdomainChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="cdnSubdomain" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                (cdn.{{ $props.data.domain.computed }})
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.server.redirectSubdomains') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${redirectSubdomainsChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="redirectSubdomains" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                ({{ wwwSubdomain ? `${domain}, ` : '' }}*.{{ $props.data.domain.computed }}
                                <i class="fas fa-long-arrow-alt-right"></i>
                                {{ wwwSubdomain ? 'www.' : '' }}{{ $props.data.domain.computed }})
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.server.listen') }}</label>
            </div>
            <div class="field-body">
                <div class="field has-addons">
                    <div class="control">
                        <a class="button is-static">
                            IPv4
                        </a>
                    </div>
                    <div :class="`control is-expanded${listenIpv4Changed ? ' is-changed' : ''}`">
                        <input v-model="listenIpv4" class="input" type="text" :placeholder="listenIpv4Default" />
                    </div>
                </div>
                <div class="field has-addons">
                    <div class="control">
                        <a class="button is-static">
                            IPv6
                        </a>
                    </div>
                    <div :class="`control is-expanded${listenIpv6Changed ? ' is-changed' : ''}`">
                        <input v-model="listenIpv6" class="input" type="text" :placeholder="listenIpv6Default" />
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
        domain: {
            default: 'example.com',
            enabled: true,
        },
        path: {
            default: '',
            computed: '/var/www/example.com', // No default value, but a default computed
            enabled: true,
        },
        documentRoot: {
            default: '/public',
            enabled: true,
        },
        wwwSubdomain: {
            default: false,
            enabled: true,
        },
        cdnSubdomain: {
            default: false,
            enabled: false,
        },
        redirectSubdomains: {
            default: true,
            enabled: true,
        },
        listenIpv4: {
            default: '*',
            enabled: true,
        },
        listenIpv6: {
            default: '::',
            enabled: true,
        },
    };

    export default {
        name: 'DomainServer',                                   // Component name
        display: 'templates.domainSections.server.server',      // Display name for tab (i18n key)
        key: 'server',                                          // Key for data in parent
        delegated: delegatedFromDefaults(defaults),             // Data the parent will present here
        components: {
            PrettyCheck,
        },
        props: {
            data: Object,                                       // Data delegated back to us from parent
        },
        computed: {
            ...computedFromDefaults(defaults, 'server'),        // Getters & setters for the delegated data
            duplicateDomain() {
                return this.$parent.$parent.$data.domains
                    .filter(d => d && d.server.domain.computed === this.$props.data.domain.computed).length > 1;
            },
            hasWarnings() {
                return this.duplicateDomain;
            },
        },
        watch: {
            '$props.data.domain': {
                handler(data) {
                    // Ignore www. if given, enable WWW subdomain
                    if (data.computed.startsWith('www.')) {
                        data.computed = data.computed.slice(4);
                        this.wwwSubdomain = true;
                    }

                    // Use default if empty
                    if (!data.computed.trim()) {
                        data.computed = data.default;
                    }

                    // Ensure there is a default path
                    if (!this.$props.data.path.value.trim()) {
                        this.$props.data.path.computed = `/var/www/${data.computed}`;
                    }
                },
                deep: true,
            },
            // Only allow CDN when WWW is enabled first
            '$props.data.wwwSubdomain': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.computed) {
                        this.$props.data.cdnSubdomain.enabled = true;
                        this.$props.data.cdnSubdomain.computed = this.$props.data.cdnSubdomain.value;
                    } else {
                        this.$props.data.cdnSubdomain.enabled = false;
                        this.$props.data.cdnSubdomain.computed = false;
                    }
                },
                deep: true,
            },
            // Ensure there is a default path
            '$props.data.path': {
                handler(data) {
                    if (!data.computed.trim()) {
                        data.computed = `/var/www/${this.$props.data.domain.computed}`;
                    }
                },
                deep: true,
            },
        },
    };
</script>
