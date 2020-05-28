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
                <label class="label">Gzip compression</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${gzipCompressionChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="gzipCompression" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable gzip compression
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Brotli compression</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${brotliCompressionChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="brotliCompression" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable brotli compression
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Expiration for assets</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${assetsExpirationChanged ? ' is-changed' : ''}`">
                        <input v-model="assetsExpiration"
                               class="input"
                               type="text"
                               :placeholder="$props.data.assetsExpiration.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Expiration for media</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${mediaExpirationChanged ? ' is-changed' : ''}`">
                        <input v-model="mediaExpiration"
                               class="input"
                               type="text"
                               :placeholder="$props.data.mediaExpiration.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Expiration for SVGs</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${svgExpirationChanged ? ' is-changed' : ''}`">
                        <input v-model="svgExpiration"
                               class="input"
                               type="text"
                               :placeholder="$props.data.svgExpiration.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Expiration for fonts</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${fontsExpirationChanged ? ' is-changed' : ''}`">
                        <input v-model="fontsExpiration"
                               class="input"
                               type="text"
                               :placeholder="$props.data.fontsExpiration.default"
                        />
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
        gzipCompression: {
            default: true,
            enabled: true,
        },
        brotliCompression: {
            default: false,
            enabled: true,
        },
        assetsExpiration: {
            default: '7d',
            enabled: true,
        },
        mediaExpiration: {
            default: '7d',
            enabled: true,
        },
        svgExpiration: {
            default: '7d',
            enabled: true,
        },
        fontsExpiration: {
            default: '7d',
            enabled: true,
        },
    };

    export default {
        name: 'GlobalPerformance',                                  // Component name
        display: 'Performance',                                     // Display name for tab
        key: 'performance',                                         // Key for data in parent
        delegated: delegatedFromDefaults(defaults),                 // Data the parent will present here
        components: {
            PrettyCheck,
        },
        props: {
            data: Object,                                           // Data delegated back to us from parent
        },
        data () {
            return {
                i18n,
            };
        },
        computed: computedFromDefaults(defaults, 'performance'),    // Getters & setters for the delegated data
    };
</script>
