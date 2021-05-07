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
                <label class="label">{{ $t('templates.globalSections.performance.gzipCompression') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${gzipCompressionChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="gzipCompression" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.performance.enableGzipCompression') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal is-aligned-top">
            <div class="field-label has-small-margin-top">
                <label class="label">{{ $t('templates.globalSections.performance.brotliCompression') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${brotliCompressionChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="brotliCompression" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.performance.enableBrotliCompression') }}
                            </PrettyCheck>
                        </div>
                    </div>

                    <div v-if="showBrotliWarning" class="control">
                        <label class="text message is-warning">
                            <span class="message-body">
                                {{ $t('templates.globalSections.performance.brotliIsANonStandardModule') }}
                                <ExternalLink
                                    :text="$t('templates.globalSections.performance.brotliGoogleNgxBrotliProject')"
                                    link="https://github.com/google/ngx_brotli"
                                ></ExternalLink>
                                {{ $t('templates.globalSections.performance.brotliForBuildingNginxWithBrotli') }}
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.globalSections.performance.expirationForAssets') }}</label>
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
                <label class="label">{{ $t('templates.globalSections.performance.expirationForMedia') }}</label>
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
                <label class="label">{{ $t('templates.globalSections.performance.expirationForSvgs') }}</label>
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
                <label class="label">{{ $t('templates.globalSections.performance.expirationForFonts') }}</label>
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
    import ExternalLink from 'do-vue/src/templates/external_link';
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
        name: 'GlobalPerformance',                                      // Component name
        display: 'templates.globalSections.performance.performance',    // Display name for tab (i18n key)
        key: 'performance',                                             // Key for data in parent
        delegated: delegatedFromDefaults(defaults),                     // Data the parent will present here
        components: {
            PrettyCheck,
            ExternalLink,
        },
        props: {
            data: Object,                                               // Data delegated back to us from parent
        },
        computed: {
            ...computedFromDefaults(defaults, 'performance'),           // Getters & setters for the delegated data
            showBrotliWarning() {
                return this.$props.data.brotliCompression.computed;
            },
            hasWarnings() {
                return this.showBrotliWarning;
            },
        },
    };
</script>
