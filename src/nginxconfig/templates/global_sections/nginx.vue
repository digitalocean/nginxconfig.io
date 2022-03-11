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
                <label class="label">{{ $t('templates.globalSections.nginx.nginxConfigDirectory') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${nginxConfigDirectoryChanged ? ' is-changed' : ''}`">
                        <input v-model="nginxConfigDirectory"
                               class="input"
                               type="text"
                               :placeholder="$props.data.nginxConfigDirectory.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">worker_processes</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${workerProcessesChanged ? ' is-changed' : ''}`">
                        <VueSelect v-model="workerProcesses"
                                   :options="$props.data.workerProcesses.options"
                                   :clearable="false"
                        ></VueSelect>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">user</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${userChanged ? ' is-changed' : ''}`">
                        <input v-model="user"
                               class="input"
                               type="text"
                               :placeholder="$props.data.user.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">pid</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${pidChanged ? ' is-changed' : ''}`">
                        <input v-model="pid"
                               class="input"
                               type="text"
                               :placeholder="$props.data.pid.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">client_max_body_size</label>
            </div>
            <div class="field-body">
                <div class="field has-addons">
                    <div :class="`control is-expanded${clientMaxBodySizeChanged ? ' is-changed' : ''}`">
                        <input v-model.number="clientMaxBodySize"
                               class="input"
                               type="number"
                               min="0"
                               step="1"
                               :placeholder="$props.data.clientMaxBodySize.default"
                        />
                    </div>
                    <div class="control">
                        <a class="button is-static">
                            {{ $t('templates.globalSections.nginx.mb') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">types_hash_max_size</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${typesHashMaxSizeChanged ? ' is-changed' : ''}`">
                        <VueSelect v-model="typesHashMaxSize"
                                   :options="$props.data.typesHashMaxSize.options"
                                   :clearable="false"
                        ></VueSelect>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">types_hash_bucket_size</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${typesHashBucketSizeChanged ? ' is-changed' : ''}`">
                        <VueSelect v-model="typesHashBucketSize"
                                   :options="$props.data.typesHashBucketSize.options"
                                   :clearable="false"
                        ></VueSelect>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueSelect from 'vue-select';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        nginxConfigDirectory: {
            default: '/etc/nginx/',
            computed: '/etc/nginx', // We use a watcher to trim trailing slashes
            enabled: true,
        },
        workerProcesses: {
            default: 'auto',
            options: [
                'auto',
                ...Array.from({ length: 16 }, (_, i) => i + 1),
            ],
            enabled: true,
        },
        user: {
            default: 'www-data',
            enabled: true,
        },
        pid: {
            default: '/run/nginx.pid',
            enabled: true,
        },
        clientMaxBodySize: {
            default: 16,
            enabled: true,
        },
        typesHashMaxSize: {
            default: 2048,
            options: Array.from({ length: 8 }, (_, i) => Math.pow(2, i + 6)),
            enabled: true,
        },
        typesHashBucketSize: {
            default: 64,
            options: Array.from({ length: 10 }, (_, i) => Math.pow(2, i + 4)),
            enabled: true,
        },
    };

    export default {
        name: 'GlobalNGINX',                                // Component name
        display: 'common.nginx',                            // Display name for tab (i18n key)
        key: 'nginx',                                       // Key for data in parent
        delegated: delegatedFromDefaults(defaults),         // Data the parent will present here
        components: {
            VueSelect,
        },
        props: {
            data: Object,                                   // Data delegated back to us from parent
        },
        computed: computedFromDefaults(defaults, 'nginx'),  // Getters & setters for the delegated data
        watch: {
            // Clean nginx directory of trailing slashes
            '$props.data.nginxConfigDirectory': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.enabled)
                        if (data.computed.endsWith('/'))
                            data.computed = data.computed.replace(/\/+$/, '');
                },
                deep: true,
            },
            // Check worker processes selection is valid
            '$props.data.workerProcesses': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.enabled)
                        if (!data.options.includes(data.computed))
                            data.computed = data.default;
                },
                deep: true,
            },
            // Check client max body size value is valid
            '$props.data.clientMaxBodySize': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.enabled)
                        if (data.computed < 0)
                            data.computed = 0;
                },
                deep: true,
            },
            // Check hash max size selection is valid
            '$props.data.typesHashMaxSize': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.enabled)
                        if (!data.options.includes(data.computed))
                            data.computed = data.default;
                },
                deep: true,
            },
            // Check hash bucket size selection is valid
            '$props.data.typesHashBucketSize': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.enabled)
                        if (!data.options.includes(data.computed))
                            data.computed = data.default;
                },
                deep: true,
            },
        },
    };
</script>
