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
                <label class="label">{{ i18n.templates.globalSections.docker.dockerServer }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${dockerServerChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="dockerServer" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ i18n.templates.globalSections.docker.dockerServer }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';
    import PrettyCheck from 'pretty-checkbox-vue/check';

    const defaults = {
        dockerServer: {
            default: false,
            enabled: false,
        },
    };

    export default {
        name: 'GlobalDocker',                               // Component name
        display: i18n.common.docker,                        // Display name for tab
        key: 'docker',                                      // Key for data in parent
        delegated: delegatedFromDefaults(defaults),         // Data the parent will present here
        components: {
            PrettyCheck,
        },
        props: {
            data: Object,                                   // Data delegated back to us from parent
        },
        data () {
            return {
                i18n,
            };
        },
        computed: computedFromDefaults(defaults, 'docker'), // Getters & setters for the delegated data
        watch: {
            // Enable Docker server settings if any site uses Docker
            '$parent.$parent.$data.domains': {
                handler(data) {
                    for (const domain of data) {
                        if (domain && domain.docker && domain.docker.docker && domain.docker.docker.computed) {
                            this.$props.data.dockerServer.enabled = true;
                            this.$props.data.dockerServer.computed = this.$props.data.dockerServer.value;
                            return;
                        }
                    }
                    this.$props.data.dockerServer.enabled = false;
                    this.$props.data.dockerServer.computed = '';
                },
                deep: true,
            },
        },
    };
</script>
