<template>
    <div>
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">NGINX config directory</label>
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
                            MB
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueSelect from 'vue-select';
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        nginxConfigDirectory: {
            default: '/etc/nginx/',
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
    };

    export default {
        name: 'GlobalNGINX',                                // Component name
        display: 'NGINX',                                   // Display name for tab
        key: 'nginx',                                       // Key for data in parent
        delegated: delegatedFromDefaults(defaults),         // Data the parent will present here
        components: {
            VueSelect,
        },
        props: {
            data: Object,                                   // Data delegated back to us from parent
        },
        data () {
            return {
                i18n,
            };
        },
        computed: computedFromDefaults(defaults, 'nginx'),  // Getters & setters for the delegated data
        watch: {
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
        },
    };
</script>
