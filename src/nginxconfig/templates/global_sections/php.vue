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
        <div v-if="!phpServerEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">{{ $t('templates.globalSections.php.phpServer') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <label class="text">
                            {{ $t('templates.globalSections.php.phpMustBeEnabledOnOneSite') }}
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <template v-else>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">{{ $t('templates.globalSections.php.phpServer') }}</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div :class="`control${phpServerChanged ? ' is-changed' : ''}`">
                            <VueSelect v-model="phpServer"
                                       :options="phpServerOptions"
                                       :clearable="false"
                                       :reduce="s => s.value"
                            ></VueSelect>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">{{ $t('templates.globalSections.php.phpBackupServer') }}</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div :class="`control${phpBackupServerChanged ? ' is-changed' : ''}`">
                            <VueSelect ref="phpBackupServerSelect"
                                       v-model="phpBackupServer"
                                       :options="phpBackupServerOptions"
                                       :clearable="false"
                                       :reduce="s => s.value"
                            ></VueSelect>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import VueSelect from 'vue-select';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    // Value -> i18n key
    const serverOptions = {
        '127.0.0.1:9000': 'templates.globalSections.php.tcp',
        '/var/run/hhvm/sock': 'templates.globalSections.php.hhvmSocket',
        '/var/run/hhvm/hhvm.sock': 'templates.globalSections.php.hhvmSocket',
        '/var/run/php5-fpm.sock': 'templates.globalSections.php.php5Socket',
        '/var/run/php/php7.1-fpm.sock': 'templates.globalSections.php.php71Socket',
        '/var/run/php/php7.2-fpm.sock': 'templates.globalSections.php.php72Socket',
        '/var/run/php/php7.0-fpm.sock': 'templates.globalSections.php.php70Socket',
        '/var/run/php/php7.3-fpm.sock': 'templates.globalSections.php.php73Socket',
        '/var/run/php/php7.4-fpm.sock': 'templates.globalSections.php.php74Socket',
        '/var/run/php/php8.0-fpm.sock': 'templates.globalSections.php.php80Socket',
        '/var/run/php/php-fpm.sock': 'templates.globalSections.php.phpSocket',
    };

    const defaults = {
        phpServer: {
            default: '/var/run/php/php-fpm.sock',
            options: serverOptions,
            enabled: true,
        },
        phpBackupServer: {
            default: '',
            options: { '': 'templates.globalSections.php.disabled', ...serverOptions },
            enabled: true,
        },
    };

    export default {
        name: 'GlobalPHP',                              // Component name
        display: 'common.php',                          // Display name for tab (i18n key)
        key: 'php',                                     // Key for data in parent
        delegated: delegatedFromDefaults(defaults),     // Data the parent will present here
        components: {
            VueSelect,
        },
        props: {
            data: Object,                               // Data delegated back to us from parent
        },
        computed: {
            ...computedFromDefaults(defaults, 'php'),   // Getters & setters for the delegated data
            phpServerOptions() {
                return Object.entries(this.$props.data.phpServer.options)
                    .map(([key, value]) => ({ label: `${this.$t(value)}${key ? `: ${key}` : ''}`, value: key }));
            },
            phpBackupServerOptions() {
                return Object.entries(this.$props.data.phpBackupServer.options)
                    .map(([key, value]) => ({ label: `${this.$t(value)}${key ? `: ${key}` : ''}`, value: key }));
            },
        },
        watch: {
            // Check server selection is valid
            '$props.data.phpServer': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.enabled)
                        if (!Object.keys(data.options).includes(data.computed))
                            data.computed = data.default;
                },
                deep: true,
            },
            // Check backup server selection is valid
            '$props.data.phpBackupServer': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.enabled)
                        if (!Object.keys(data.options).includes(data.computed))
                            data.computed = data.default;
                },
                deep: true,
            },
            // Enable PHP server settings if any site uses PHP
            '$parent.$parent.$data.domains': {
                handler(data) {
                    for (const domain of data) {
                        if (domain && domain.php && domain.php.php && domain.php.php.computed) {
                            this.$props.data.phpServer.enabled = true;
                            this.$props.data.phpServer.computed = this.$props.data.phpServer.value;
                            this.$props.data.phpBackupServer.enabled = true;
                            this.$props.data.phpBackupServer.computed = this.$props.data.phpBackupServer.value;
                            return;
                        }
                    }
                    this.$props.data.phpServer.enabled = false;
                    this.$props.data.phpServer.computed = '';
                    this.$props.data.phpBackupServer.enabled = false;
                    this.$props.data.phpBackupServer.computed = '';
                },
                deep: true,
            },
            // Ensure 'Disabled' gets translated in VueSelect on language switch
            '$i18n.locale'() {
                const updated = this.phpBackupServerOptions
                    .find(x => x.value === this.$refs.phpBackupServerSelect.$data._value.value);
                if (updated) this.$refs.phpBackupServerSelect.$data._value = updated;
            },
        },
    };
</script>
