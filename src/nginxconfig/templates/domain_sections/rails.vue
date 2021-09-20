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
        <div v-if="!railsEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">{{ $t('common.rails') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <label class="text">
                            {{ $t('templates.domainSections.rails.railsIsDisabled') }}
                            <template v-if="$parent.$props.data.reverseProxy.reverseProxy.computed">
                                <br />{{ $t('templates.domainSections.rails.railsCannotBeEnabledWithReverseProxy') }}
                            </template>
                            <template v-if="$parent.$props.data.php.php.computed">
                                <br />{{ $t('templates.domainSections.rails.railsCannotBeEnabledWithPhp') }}
                            </template>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('common.rails') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${railsChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="rails" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.domainSections.rails.enableRails') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal is-aligned-top">
            <div class="field-label has-margin-top">
                <label class="label">{{ $t('templates.domainSections.rails.namedLocation') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${namedLocationChanged ? ' is-changed' : ''}`">
                        <input v-model="namedLocation" class="input" type="text" :placeholder="$props.data.namedLocation.placeholder" />
                    </div>

                    <template v-if="!namedLocationChanged">
                        <div class="control">
                            <label class="text">
                                {{ $t('templates.domainSections.rails.provideANamedLocationToSetNamedLocation') }}
                            </label>
                        </div>
                    </template>

                    <div v-if="incorrectBeginning" class="control">
                        <label class="text message is-warning">
                            <span class="message-body">
                                {{ $t('templates.domainSections.rails.namedLocationExpectedToBeginWithAmpersand') }}
                            </span>
                        </label>
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
        rails: {
            default: false,
            enabled: false,
        },
        namedLocation: {
            default: '',
            placeholder: '@my_awesome_rails_app',
            enabled: true,
        },
    };

    export default {
        name: 'DomainRails',                               // Component name
        display: 'common.rails',                           // Display name for tab (i18n key)
        key: 'rails',                                      // Key for data in parent
        delegated: delegatedFromDefaults(defaults),         // Data the parent will present here
        components: {
            PrettyCheck,
        },
        props: {
            data: Object,                                   // Data delegated back to us from parent
        },
        computed: {
            ...computedFromDefaults(defaults, 'rails'), // Getters & setters for the delegated data
            incorrectBeginning() {
                return this.namedLocationChanged && !this.$props.data.namedLocation.computed.startsWith('@');
            },
            hasWarnings() {
                return this.incorrectBeginning;
            },
        },
        watch: {
            // If the Reverse proxy or PHP is enabled, rails will be forced off
            '$parent.$props.data': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.reverseProxy.reverseProxy.computed || data.php.php.computed) {
                        this.$props.data.rails.enabled = false;
                        this.$props.data.rails.computed = false;
                    } else {
                        this.$props.data.rails.enabled = true;
                        this.$props.data.rails.computed = this.$props.data.rails.value;
                    }
                },
                deep: true,
            },
            // Set Rails namedLocation
            '$props.data.namedLocation': {
                handler(data) {
                    if (data.computed) {
                        console.log(this.$props.data.namedLocation.value);
                        data.computed = this.$props.data.namedLocation.value;
                        return data.computed;
                    } else {
                        data.computed = false;
                    }
                },
                deep: true,
            },
        },
    };
</script>
