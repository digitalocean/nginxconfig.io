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
            v-if="!phpEnabled"
            class="field is-horizontal is-aligned-top"
        >
            <div class="field-label">
                <label class="label">{{ $t('common.php') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control is-changed">
                        <label class="text">
                            {{ $t('templates.domainSections.php.phpIsDisabled') }}
                            <template v-if="$parent.$props.data.reverseProxy.reverseProxy.computed">
                                <br />
                                {{
                                    $t(
                                        'templates.domainSections.php.phpCannotBeEnabledWithReverseProxy',
                                    )
                                }}
                            </template>
                            <template v-if="$parent.$props.data.python.python.computed">
                                <br />
                                {{
                                    $t('templates.domainSections.php.phpCannotBeEnabledWithPython')
                                }}
                            </template>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-else
            class="field is-horizontal"
        >
            <div class="field-label">
                <label class="label">{{ $t('common.php') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${phpChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck
                                v-model="php"
                                class="p-default p-curve p-fill p-icon"
                            >
                                {{ $t('templates.domainSections.php.enablePhp') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="phpServerEnabled"
            class="field is-horizontal is-aligned-top"
        >
            <div class="field-label has-margin-top">
                <label class="label">{{ $t('templates.domainSections.php.phpServer') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${phpServerChanged ? ' is-changed' : ''}`">
                        <VueSelect
                            ref="phpServerSelect"
                            v-model="phpServer"
                            :options="phpServerOptions"
                            :clearable="false"
                            :reduce="(s) => s.value"
                        ></VueSelect>
                    </div>

                    <div
                        v-if="phpServerCustomEnabled"
                        :class="`control${phpServerCustomChanged ? ' is-changed' : ''}`"
                    >
                        <input
                            v-model="phpServerCustom"
                            class="input"
                            type="text"
                            :placeholder="$props.data.phpServerCustom.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="phpBackupServerEnabled"
            class="field is-horizontal is-aligned-top"
        >
            <div class="field-label has-margin-top">
                <label class="label">
                    {{ $t('templates.domainSections.php.phpBackupServer') }}
                </label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${phpBackupServerChanged ? ' is-changed' : ''}`">
                        <VueSelect
                            ref="phpBackupServerSelect"
                            v-model="phpBackupServer"
                            :options="phpBackupServerOptions"
                            :clearable="false"
                            :reduce="(s) => s.value"
                        ></VueSelect>
                    </div>

                    <div
                        v-if="phpBackupServerCustomEnabled"
                        :class="`control${phpBackupServerCustomChanged ? ' is-changed' : ''}`"
                    >
                        <input
                            v-model="phpBackupServerCustom"
                            class="input"
                            type="text"
                            :placeholder="$props.data.phpBackupServerCustom.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="wordPressRulesEnabled"
            class="field is-horizontal"
        >
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.php.wordPressRules') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${wordPressRulesChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck
                                v-model="wordPressRules"
                                class="p-default p-curve p-fill p-icon"
                            >
                                {{ $t('templates.domainSections.php.enableWordPressRules') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="drupalRulesEnabled"
            class="field is-horizontal"
        >
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.php.drupalRules') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${drupalRulesChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck
                                v-model="drupalRules"
                                class="p-default p-curve p-fill p-icon"
                            >
                                {{ $t('templates.domainSections.php.enableDrupalRules') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="magentoRulesEnabled"
            class="field is-horizontal"
        >
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.php.magentoRules') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${magentoRulesChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck
                                v-model="magentoRules"
                                class="p-default p-curve p-fill p-icon"
                            >
                                {{ $t('templates.domainSections.php.enableMagentoRules') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="joomlaRulesEnabled"
            class="field is-horizontal"
        >
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.php.joomlaRules') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${joomlaRulesChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck
                                v-model="joomlaRules"
                                class="p-default p-curve p-fill p-icon"
                            >
                                {{ $t('templates.domainSections.php.enableJoomlaRules') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueSelect from 'vue-select';
    import delegatedFromDefaults from '../../util/delegated_from_defaults.js';
    import computedFromDefaults from '../../util/computed_from_defaults.js';
    import PrettyCheck from '../inputs/checkbox.vue';

    // Value -> i18n key
    const serverOptions = {
        '127.0.0.1:9000': 'templates.domainSections.php.tcp',
        '/var/run/hhvm/sock': 'templates.domainSections.php.hhvmSocket',
        '/var/run/hhvm/hhvm.sock': 'templates.domainSections.php.hhvmSocket',
        '/var/run/php/php7.1-fpm.sock': 'templates.domainSections.php.php71Socket',
        '/var/run/php/php7.2-fpm.sock': 'templates.domainSections.php.php72Socket',
        '/var/run/php/php7.0-fpm.sock': 'templates.domainSections.php.php70Socket',
        '/var/run/php/php7.3-fpm.sock': 'templates.domainSections.php.php73Socket',
        '/var/run/php/php7.4-fpm.sock': 'templates.domainSections.php.php74Socket',
        '/var/run/php/php8.0-fpm.sock': 'templates.domainSections.php.php80Socket',
        '/var/run/php/php8.1-fpm.sock': 'templates.domainSections.php.php81Socket',
        '/var/run/php/php8.2-fpm.sock': 'templates.domainSections.php.php82Socket',
        '/var/run/php/php-fpm.sock': 'templates.domainSections.php.phpSocket',
        custom: 'templates.domainSections.php.custom',
    };

    const hiddenValues = ['', 'custom'];

    const defaults = {
        phpServer: {
            default: '/var/run/php/php-fpm.sock',
            options: serverOptions,
            enabled: true,
        },
        phpServerCustom: {
            default: 'unix:/var/run/php/php-fpm.sock',
            enabled: false,
        },
        phpBackupServer: {
            default: '',
            options: { '': 'templates.domainSections.php.disabled', ...serverOptions },
            enabled: true,
        },
        phpBackupServerCustom: {
            default: 'unix:/var/run/php/php-fpm.sock',
            enabled: false,
        },
        php: {
            default: true,
            enabled: true,
        },
        wordPressRules: {
            default: false,
            enabled: true,
        },
        drupalRules: {
            default: false,
            enabled: true,
        },
        magentoRules: {
            default: false,
            enabled: true,
        },
        joomlaRules: {
            default: false,
            enabled: true,
        },
    };

    export default {
        name: 'DomainPHP', // Component name
        display: 'common.php', // Display name for tab (i18n key)
        key: 'php', // Key for data in parent
        delegated: delegatedFromDefaults(defaults), // Data the parent will present here
        components: {
            PrettyCheck,
            VueSelect,
        },
        props: {
            data: Object, // Data delegated back to us from parent
        },
        computed: {
            ...computedFromDefaults(defaults, 'php'), // Getters & setters for the delegated data
            phpServerOptions() {
                return Object.entries(this.$props.data.phpServer.options).map(([key, value]) =>
                    this.formattedOption(key, value),
                );
            },
            phpBackupServerOptions() {
                return Object.entries(this.$props.data.phpBackupServer.options).map(
                    ([key, value]) => this.formattedOption(key, value),
                );
            },
        },
        watch: {
            // If the Reverse proxy or Python is enabled, PHP will be forced off
            '$parent.$props.data': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.reverseProxy.reverseProxy.computed || data.python.python.computed) {
                        this.$props.data.php.enabled = false;
                        this.$props.data.php.computed = false;
                    } else {
                        this.$props.data.php.enabled = true;
                        this.$props.data.php.computed = this.$props.data.php.value;
                    }
                },
                deep: true,
            },
            // Disable everything if PHP is disabled
            '$props.data.php': {
                handler(data) {
                    if (data.computed) {
                        this.$props.data.phpServer.enabled = true;
                        this.$props.data.phpServer.computed = this.$props.data.phpServer.value;
                        this.$props.data.phpBackupServer.enabled = true;
                        this.$props.data.phpBackupServer.computed =
                            this.$props.data.phpBackupServer.value;
                        this.$props.data.wordPressRules.enabled = true;
                        this.$props.data.wordPressRules.computed =
                            this.$props.data.wordPressRules.value;
                        this.$props.data.drupalRules.enabled = true;
                        this.$props.data.drupalRules.computed = this.$props.data.drupalRules.value;
                        this.$props.data.magentoRules.enabled = true;
                        this.$props.data.magentoRules.computed =
                            this.$props.data.magentoRules.value;
                        this.$props.data.joomlaRules.enabled = true;
                        this.$props.data.joomlaRules.computed = this.$props.data.joomlaRules.value;
                    } else {
                        this.$props.data.phpServer.enabled = false;
                        this.$props.data.phpServer.computed = '';
                        this.$props.data.phpBackupServer.enabled = false;
                        this.$props.data.phpBackupServer.computed = '';
                        this.$props.data.wordPressRules.enabled = false;
                        this.$props.data.wordPressRules.computed = false;
                        this.$props.data.drupalRules.enabled = false;
                        this.$props.data.drupalRules.computed = false;
                        this.$props.data.magentoRules.enabled = false;
                        this.$props.data.magentoRules.computed = false;
                        this.$props.data.joomlaRules.enabled = false;
                        this.$props.data.joomlaRules.computed = false;
                    }
                },
                deep: true,
            },
            // Check server selection is valid
            '$props.data.phpServer': {
                handler(data) {
                    if (data.enabled) {
                        // This might cause recursion, but seems not to
                        if (!Object.keys(data.options).includes(data.computed))
                            data.computed = data.default;

                        // Show the custom box
                        this.$props.data.phpServerCustom.enabled = data.computed === 'custom';
                        return;
                    }

                    // Hide custom if disabled
                    this.$props.data.phpServerCustom.enabled = false;
                },
                deep: true,
            },
            // Check backup server selection is valid
            '$props.data.phpBackupServer': {
                handler(data) {
                    if (data.enabled) {
                        // This might cause recursion, but seems not to
                        if (!Object.keys(data.options).includes(data.computed))
                            data.computed = data.default;

                        // Show the custom box
                        this.$props.data.phpBackupServerCustom.enabled = data.computed === 'custom';
                        return;
                    }

                    // Hide custom if disabled
                    this.$props.data.phpBackupServerCustom.enabled = false;
                },
                deep: true,
            },
            // Ensure 'Custom'/'Disabled' get translated in VueSelect on language switch
            '$i18n.locale'() {
                if (!this.$refs.phpServerSelect) return false;
                const updated = this.phpServerOptions.find(
                    (x) => x.value === this.$refs.phpServerSelect.$data._value.value,
                );
                if (updated) this.$refs.phpServerSelect.$data._value = updated;
                const updatedBackup = this.phpBackupServerOptions.find(
                    (x) => x.value === this.$refs.phpBackupServerSelect.$data._value.value,
                );
                if (updatedBackup) this.$refs.phpBackupServerSelect.$data._value = updatedBackup;
            },
        },
        methods: {
            formattedOption(key, value) {
                return {
                    label: `${this.$t(value)}${hiddenValues.includes(key) ? '' : `: ${key}`}`,
                    value: key,
                };
            },
        },
    };
</script>
