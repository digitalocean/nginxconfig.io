<!--
Copyright 2022 DigitalOcean

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
        <div class="field is-horizontal is-aligned-top">
            <div class="field-label has-small-margin-top">
                <label class="label">access_log {{ $t('templates.domainSections.logging.byDomain') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${accessLogChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="accessLog" class="p-default p-curve p-fill p-icon">
                                {{ $t('templates.domainSections.logging.enableForThisDomain') }}
                            </PrettyCheck>
                        </div>
                    </div>
                    <div v-if="$props.data.accessLog.computed" :class="`control field is-horizontal is-expanded${accessLogPathChanged ? ' is-changed' : ''}`">
                        <input
                            v-model="accessLogPath"
                            class="input"
                            type="text"
                            :placeholder="`/var/log/nginx/${$parent.$props.data.server.domain.computed}.access.log`"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div v-if="$props.data.accessLog.computed" class="field is-horizontal">
            <div class="field-label">
                <label class="label">access_log {{ $t('templates.domainSections.logging.arguments') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${accessLogParametersChanged ? ' is-changed' : ''}`">
                        <input
                            v-model="accessLogParameters"
                            class="input"
                            type="text"
                            :placeholder="$props.data.accessLogParameters.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal is-aligned-top">
            <div class="field-label has-small-margin-top">
                <label class="label">error_log {{ $t('templates.domainSections.logging.byDomain') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${errorLogChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="errorLog" class="p-default p-curve p-fill p-icon">
                                {{ $t('templates.domainSections.logging.enableForThisDomain') }}
                            </PrettyCheck>
                        </div>
                        <div v-if="$props.data.errorLog.computed" :class="`control field is-horizontal is-expanded${errorLogPathChanged ? ' is-changed' : ''}`">
                            <input
                                v-model="errorLogPath"
                                class="input"
                                type="text"
                                :placeholder="`/var/log/nginx/${$parent.$props.data.server.domain.computed}.error.log`"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="$props.data.errorLog.computed" class="field is-horizontal">
            <div class="field-label">
                <label class="label">error_log {{ $t('templates.domainSections.logging.level') }}</label>
            </div>
            <div class="field-body">
                <div class="field is-horizontal">
                    <div
                        v-for="value in $props.data.errorLogLevel.options"
                        :class="`control${errorLogLevelChanged && value === errorLogLevel ? ' is-changed' : ''}`"
                    >
                        <div class="radio">
                            <PrettyRadio v-model="errorLogLevel" :value="value" class="p-default p-round p-fill p-icon">
                                {{ value }}
                            </PrettyRadio>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';
    import { accessLogParamsDefault, errorLogLevelDefault, errorLogLevelOptions } from '../../util/logging';
    import PrettyCheck from '../inputs/checkbox';
    import PrettyRadio from '../inputs/radio';

    const defaults = {
        accessLog: {
            default: true,
            enabled: true,
        },
        accessLogPath: {
            default: '',
            enabled: true,
        },
        accessLogParameters: {
            default: accessLogParamsDefault,
            enabled: true,
        },
        errorLog: {
            default: true,
            enabled: true,
        },
        errorLogPath: {
            default: '',
            enabled: true,
        },
        errorLogLevel: {
            default: errorLogLevelDefault,
            options: errorLogLevelOptions,
            enabled: true,
        },
    };

    export default {
        name: 'DomainLogging',                                  // Component name
        display: 'common.logging',                              // Display name for tab (i18n key)
        key: 'logging',                                         // Key for data in parent
        delegated: delegatedFromDefaults(defaults),             // Data the parent will present here
        components: {
            PrettyCheck,
            PrettyRadio,
        },
        props: {
            data: Object,                                       // Data delegated back to us from parent
        },
        computed: computedFromDefaults(defaults, 'logging'),    // Getters & setters for the delegated data
        watch: {
            '$parent.$props.data.server.domain': {
                handler(data) {
                    if (!this.$props.data.accessLogPath.value.trim()) {
                        this.$props.data.accessLogPath.computed = `/var/log/nginx/${data.computed}.access.log`;
                    }
                    if (!this.$props.data.errorLogPath.value.trim()) {
                        this.$props.data.errorLogPath.computed = `/var/log/nginx/${data.computed}.error.log`;
                    }
                },
                deep: true,
            },  
        },
    };
</script>
