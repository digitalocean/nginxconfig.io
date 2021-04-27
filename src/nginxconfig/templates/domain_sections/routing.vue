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
                <label class="label">root</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${rootChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="root" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('common.enable') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="indexEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">index</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div v-for="value in $props.data.index.options"
                         :class="`control${indexChanged && value === index ? ' is-changed' : ''}`"
                    >
                        <div class="radio">
                            <PrettyRadio v-model="index" :value="value" class="p-default p-round p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ value }}
                            </PrettyRadio>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="fallbackHtmlEnabled || fallbackPhpEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.routing.fallbackRouting') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div v-if="fallbackHtmlEnabled" :class="`control${fallbackHtmlChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="fallbackHtml" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                index.html
                            </PrettyCheck>
                        </div>
                    </div>
                    <div v-if="fallbackPhpEnabled" :class="`control${fallbackPhpChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="fallbackPhp" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                index.php
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="fallbackPhpPathEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.routing.fallbackRoutingPhpPath') }}</label>
            </div>
            <div class="field-body">
                <div :class="`field${fallbackPhpPathChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <input v-model="fallbackPhpPath"
                               class="input"
                               type="text"
                               :placeholder="$props.data.fallbackPhpPath.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div v-if="legacyPhpRoutingEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.routing.legacyPhpRouting') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${legacyPhpRoutingChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="legacyPhpRouting" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.domainSections.routing.enableLegacyRouting') }}
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
    import PrettyRadio from 'pretty-checkbox-vue/radio';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        root: {
            default: true,
            enabled: true,
        },
        index: {
            default: 'index.php',
            options: ['index.html', 'index.php'],
            enabled: true,
        },
        fallbackHtml: {
            default: false,
            enabled: true,
        },
        fallbackPhp: {
            default: true,
            enabled: true,
        },
        fallbackPhpPath: {
            default: '/api/',
            enabled: false,
        },
        legacyPhpRouting: {
            default: false,
            enabled: true,
        },
    };

    export default {
        name: 'DomainRouting',                                  // Component name
        display: 'templates.domainSections.routing.routing',    // Display name for tab (i18n key)
        key: 'routing',                                         // Key for data in parent
        delegated: delegatedFromDefaults(defaults),             // Data the parent will present here
        components: {
            PrettyCheck,
            PrettyRadio,
        },
        props: {
            data: Object,                                       // Data delegated back to us from parent
        },
        computed: computedFromDefaults(defaults, 'routing'),    // Getters & setters for the delegated data
        watch: {
            // Disable all options (expect legacy php) if root is disabled
            '$props.data.root': {
                handler(data) {
                    if (data.computed) {
                        this.$props.data.index.enabled = true;
                        this.$props.data.index.computed = this.$props.data.index.value;
                        this.$props.data.fallbackHtml.enabled = true;
                        this.$props.data.fallbackHtml.computed = this.$props.data.fallbackHtml.value;
                        this.$props.data.fallbackPhp.enabled = true;
                        this.$props.data.fallbackPhp.computed = this.$props.data.fallbackPhp.value;
                    } else {
                        this.$props.data.index.enabled = false;
                        this.$props.data.index.computed = '';
                        this.$props.data.fallbackHtml.enabled = false;
                        this.$props.data.fallbackHtml.computed = false;
                        this.$props.data.fallbackPhp.enabled = false;
                        this.$props.data.fallbackPhp.computed = false;
                    }
                },
                deep: true,
            },
            // Only enable PHP path if both fallback routing options enabled
            '$props.data': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.fallbackHtml.computed && data.fallbackPhp.computed) {
                        this.$props.data.fallbackPhpPath.enabled = true;
                        this.$props.data.fallbackPhpPath.computed = this.$props.data.fallbackPhpPath.value;
                    } else {
                        this.$props.data.fallbackPhpPath.enabled = false;
                        this.$props.data.fallbackPhpPath.computed = '';
                    }
                },
                deep: true,
            },
        },
    };
</script>
