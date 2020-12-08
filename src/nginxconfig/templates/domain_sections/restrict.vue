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
        <div class="columns">
            <div class="column">
                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">GET</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div :class="`control${getMethodChanged ? ' is-changed' : ''}`">
                                <div class="checkbox">
                                    <PrettyCheck v-model="getMethod" class="p-default p-curve p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ $t('templates.domainSections.restrict.disableForThisDomain') }}
                                    </PrettyCheck>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">POST</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div :class="`control${postMethodChanged ? ' is-changed' : ''}`">
                                <div class="checkbox">
                                    <PrettyCheck v-model="postMethod" class="p-default p-curve p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ $t('templates.domainSections.restrict.disableForThisDomain') }}
                                    </PrettyCheck>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">PUT</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div :class="`control${putMethodChanged ? ' is-changed' : ''}`">
                                <div class="checkbox">
                                    <PrettyCheck v-model="putMethod" class="p-default p-curve p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ $t('templates.domainSections.restrict.disableForThisDomain') }}
                                    </PrettyCheck>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">PATCH</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div :class="`control${patchMethodChanged ? ' is-changed' : ''}`">
                                <div class="checkbox">
                                    <PrettyCheck v-model="patchMethod" class="p-default p-curve p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ $t('templates.domainSections.restrict.disableForThisDomain') }}
                                    </PrettyCheck>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">DELETE</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div :class="`control${deleteMethodChanged ? ' is-changed' : ''}`">
                                <div class="checkbox">
                                    <PrettyCheck v-model="deleteMethod" class="p-default p-curve p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ $t('templates.domainSections.restrict.disableForThisDomain') }}
                                    </PrettyCheck>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">HEAD</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div :class="`control${headMethodChanged ? ' is-changed' : ''}`">
                                <div class="checkbox">
                                    <PrettyCheck v-model="headMethod" class="p-default p-curve p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ $t('templates.domainSections.restrict.disableForThisDomain') }}
                                    </PrettyCheck>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">CONNECT</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div :class="`control${connectMethodChanged ? ' is-changed' : ''}`">
                                <div class="checkbox">
                                    <PrettyCheck v-model="connectMethod" class="p-default p-curve p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ $t('templates.domainSections.restrict.disableForThisDomain') }}
                                    </PrettyCheck>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">OPTIONS</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div :class="`control${optionsMethodChanged ? ' is-changed' : ''}`">
                                <div class="checkbox">
                                    <PrettyCheck v-model="optionsMethod" class="p-default p-curve p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ $t('templates.domainSections.restrict.disableForThisDomain') }}
                                    </PrettyCheck>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">TRACE</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div :class="`control${traceMethodChanged ? ' is-changed' : ''}`">
                                <div class="checkbox">
                                    <PrettyCheck v-model="traceMethod" class="p-default p-curve p-fill p-icon">
                                        <i slot="extra" class="icon fas fa-check"></i>
                                        {{ $t('templates.domainSections.restrict.disableForThisDomain') }}
                                    </PrettyCheck>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="hasAtLeastOneEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.restrict.responseCode') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${responseCodeChanged ? ' is-changed' : ''}`">
                        <input v-model.number="responseCode"
                               :class="['input', validResponseCode ? '' : 'is-danger']"
                               type="number"
                               min="100"
                               step="1"
                               :placeholder="$props.data.responseCode.default"
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
        getMethod: {
            default: false,
            enabled: true,
        },
        postMethod: {
            default: false,
            enabled: true,
        },
        putMethod: {
            default: false,
            enabled: true,
        },
        patchMethod: {
            default: false,
            enabled: true,
        },
        deleteMethod: {
            default: false,
            enabled: true,
        },
        headMethod: {
            default: false,
            enabled: true,
        },
        connectMethod: {
            default: false,
            enabled: true,
        },
        optionsMethod: {
            default: false,
            enabled: true,
        },
        traceMethod: {
            default: false,
            enabled: true,
        },
        responseCode: {
            default: 405,
            enabled: true,
        },
    };

    export default {
        name: 'DomainRestrict',                             // Component name
        display: 'common.restrict',                         // Display name for tab (i18n key)
        key: 'restrict',                                    // Key for data in parent
        delegated: delegatedFromDefaults(defaults),         // Data the parent will present here
        components: {
            PrettyCheck,
        },
        props: {
            data: Object,                                   // Data delegated back to us from parent
        },
        data () {
            return {
                validResponseCode: true,
            };
        },
        computed: {
            ...computedFromDefaults(defaults, 'restrict'),  // Getters & setters for the delegated data
            hasAtLeastOneEnabled() {
                return (Object.keys(this.$props.data).filter(k => this.$props.data[k].computed && k !== 'responseCode')).length > 0;
            },
        },
        watch: {
            '$props.data.responseCode': {
                handler(data) {
                    if (data.computed && /^[1-5][0-9][0-9]$/.test(data.computed)) {
                        this.validResponseCode = true;
                    } else {
                        this.validResponseCode = false;
                    }
                },
                deep: true,
            },
        },
    };
</script>
