<template>
    <div>
        <div class="field-row">
            <div class="field">
                <label class="label">Domain</label>
                <div :class="`control${domainChanged ? ' is-changed' : ''}`">
                    <input v-model="domain" class="input" type="text" :placeholder="domainDefault" />
                </div>
            </div>

            <div class="field">
                <label class="label">Path</label>
                <div :class="`control${pathChanged ? ' is-changed' : ''}`">
                    <input v-model="path" class="input" type="text" :placeholder="`/var/www/${domain}`" />
                </div>
            </div>

            <div class="field">
                <label class="label">Document root</label>
                <div :class="`control${documentRootChanged ? ' is-changed' : ''}`">
                    <input v-model="documentRoot" class="input" type="text" :placeholder="documentRootDefault" />
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">www subdomain</label>
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
                <label class="label">CDN subdomain</label>
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
                <label class="label">Redirect subdomains</label>
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
                <label class="label">listen</label>
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
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        domain: {
            default: 'example.com',
            enabled: true,
        },
        path: {
            default: '',
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
        display: 'Server',                                      // Display name for tab
        key: 'server',                                          // Key for data in parent
        delegated: delegatedFromDefaults(defaults),             // Data the parent will present here
        components: {
            PrettyCheck,
        },
        props: {
            data: Object,                                       // Data delegated back to us from parent
        },
        data () {
            return {
                i18n,
            };
        },
        computed: computedFromDefaults(defaults, 'server'), // Getters & setters for the delegated data
        watch: {
            '$props.data.domain': {
                handler(data) {
                    // This might cause recursion, but seems not to

                    // Ignore www. if given
                    if (data.computed.startsWith('www.')) {
                        data.computed = data.computed.slice(4);
                    }

                    // Use default if empty
                    if (!data.computed.trim()) {
                        data.computed = data.default;
                    }
                },
                deep: true,
            },
            // Only allow CDN when WWW is enabled first
            '$props.data.wwwSubdomain': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    const state = data.computed;
                    if (state) {
                        this.$props.data.cdnSubdomain.enabled = true;
                        this.$props.data.cdnSubdomain.computed = this.$props.data.cdnSubdomain.value;
                    } else {
                        this.$props.data.cdnSubdomain.enabled = false;
                        this.$props.data.cdnSubdomain.computed = false;
                    }
                },
                deep: true,
            },
        },
    };
</script>
