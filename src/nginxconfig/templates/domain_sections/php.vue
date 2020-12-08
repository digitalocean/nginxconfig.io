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
        <div v-if="!phpEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">{{ $t('common.php') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control is-changed">
                        <label class="text">
                            {{ $t('templates.domainSections.php.phpIsDisabled') }}
                            <template v-if="$parent.$props.data.reverseProxy.reverseProxy.computed">
                                <br />{{ $t('templates.domainSections.php.phpCannotBeEnabledWithReverseProxy') }}
                            </template>
                            <template v-if="$parent.$props.data.python.python.computed">
                                <br />{{ $t('templates.domainSections.php.phpCannotBeEnabledWithPython') }}
                            </template>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('common.php') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${phpChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="php" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.domainSections.php.enablePhp') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="wordPressRulesEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.php.wordPressRules') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${wordPressRulesChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="wordPressRules" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.domainSections.php.enableWordPressRules') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="drupalRulesEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.php.drupalRules') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${drupalRulesChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="drupalRules" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.domainSections.php.enableDrupalRules') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="magentoRulesEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.php.magentoRules') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${magentoRulesChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="magentoRules" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.domainSections.php.enableMagentoRules') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="joomlaRulesEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.php.joomlaRules') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${joomlaRulesChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="joomlaRules" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
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
    import PrettyCheck from 'pretty-checkbox-vue/check';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
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
        name: 'DomainPHP',                                  // Component name
        display: 'common.php',                              // Display name for tab (i18n key)
        key: 'php',                                         // Key for data in parent
        delegated: delegatedFromDefaults(defaults),         // Data the parent will present here
        components: {
            PrettyCheck,
        },
        props: {
            data: Object,                                   // Data delegated back to us from parent
        },
        computed: computedFromDefaults(defaults, 'php'),    // Getters & setters for the delegated data
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
                        this.$props.data.wordPressRules.enabled = true;
                        this.$props.data.wordPressRules.computed = this.$props.data.wordPressRules.value;
                        this.$props.data.drupalRules.enabled = true;
                        this.$props.data.drupalRules.computed = this.$props.data.drupalRules.value;
                        this.$props.data.magentoRules.enabled = true;
                        this.$props.data.magentoRules.computed = this.$props.data.magentoRules.value;
                        this.$props.data.joomlaRules.enabled = true;
                        this.$props.data.joomlaRules.computed = this.$props.data.joomlaRules.value;
                    } else {
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
        },
    };
</script>
