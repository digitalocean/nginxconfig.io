<!--
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
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
                                enable file not found error logging in error_log
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
    import i18n from '../../i18n';
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
    };

    export default {
        name: 'GlobalLogging',                                  // Component name
        display: 'Logging',                                     // Display name for tab
        key: 'logging',                                         // Key for data in parent
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
        computed: computedFromDefaults(defaults, 'logging'),    // Getters & setters for the delegated data
    };
</script>
