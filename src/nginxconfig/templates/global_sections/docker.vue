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
                <label class="label">{{ $t('common.docker') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${dockerfileChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="dockerfile" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.docker.dockerfile') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="dockerfile" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('common.dockerCompose') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${dockerComposeChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="dockerCompose" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ $t('templates.globalSections.docker.dockerCompose') }}
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
        dockerfile: {
            default: false,
            enabled: true,
        },
        dockerCompose: {
            default: false,
            enabled: false,
        },
    };

    export default {
        name: 'GlobalDocker',                               // Component name
        display: 'common.docker',                           // Display name for tab (i18n key)
        key: 'docker',                                      // Key for data in parent
        delegated: delegatedFromDefaults(defaults),         // Data the parent will present here
        components: {
            PrettyCheck,
        },
        props: {
            data: Object,                                   // Data delegated back to us from parent
        },
        computed: computedFromDefaults(defaults, 'docker'), // Getters & setters for the delegated data
        watch: {
            // Disable docker-compose if dockerfile is disabled
            '$props.data.dockerfile': {
                handler(data) {
                    if (data.computed) {
                        this.$props.data.dockerCompose.enabled = true;
                        this.$props.data.dockerCompose.computed = this.$props.data.dockerCompose.value;
                    } else {
                        this.$props.data.dockerCompose.enabled = false;
                        this.$props.data.dockerCompose.computed = false;
                    }
                },
                deep: true,
            },
        },
    };
</script>
