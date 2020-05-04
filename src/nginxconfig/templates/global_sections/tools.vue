<template>
    <div>
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Modularized structure</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${modularizedStructureChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="modularizedStructure" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable modularized config files
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Symlink vhost</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${symlinkVhostChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="symlinkVhost" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                enable symlink from sites-available/ to sites-enabled/
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Share configuration</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input v-model="shareLink"
                               class="input"
                               type="text"
                               disabled="disabled"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Reset configuration</label>
            </div>
            <div class="field-body">
                <div class="field is-grouped">
                    <div class="control">
                        <a class="button is-danger is-mini" @click="resetGlobal">
                            Reset global config
                        </a>
                    </div>
                    <div v-if="hasDomain" class="control">
                        <a class="button is-danger is-mini" @click="resetDomains">
                            Reset all domains
                        </a>
                    </div>
                    <div v-if="hasDomain" class="control">
                        <a class="button is-danger is-mini" @click="removeDomains">
                            Remove all domains
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
            </div>
            <div class="field-body is-vertical">
                <div v-for="domainData in $parent.$parent.activeDomains" class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">{{ domainData[0].server.domain.computed }}</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-grouped">
                            <div class="control">
                                <a class="button is-danger is-mini" @click="resetDomain(domainData[1])">
                                    Reset domain config
                                </a>
                            </div>
                            <div class="control">
                                <a class="button is-danger is-mini" @click="removeDomain(domainData[1])">
                                    Remove domain
                                </a>
                            </div>
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
    import exportData from '../../util/export_data';

    const defaults = {
        modularizedStructure: {
            default: true,
            enabled: true,
        },
        symlinkVhost: {
            default: true,
            enabled: true,
        },
    };

    export default {
        name: 'GlobalTools',                            // Component name
        display: 'Tools',                               // Display name for tab
        key: 'tools',                                   // Key for data in parent
        delegated: delegatedFromDefaults(defaults),     // Data the parent will present here
        components: {
            PrettyCheck,
        },
        props: {
            data: Object,                               // Data delegated back to us from parent
        },
        data () {
            return {
                i18n,
            };
        },
        computed: {
            ...computedFromDefaults(defaults, 'tools'), // Getters & setters for the delegated data
            hasDomain() {
                return this.$parent.$parent.activeDomains.length > 0;
            },
            shareLink() {
                return JSON.stringify(exportData(this.$parent.$parent.activeDomains, this.$parent.$props.data));
            },
        },
        methods: {
            // TODO: These all need confirmation prompts!
            resetGlobal() {
                Object.values(this.$parent.$props.data).forEach(category => {
                    Object.values(category).forEach(property => {
                        property.value = property.default;
                        property.computed = property.default;
                    });
                });
            },
            resetDomain(index) {
                if (index >= this.$parent.$parent.$data.domains.length) return;

                const domain = this.$parent.$parent.$data.domains[index];
                if (!domain) return;

                Object.values(domain).forEach(category => {
                    Object.values(category).forEach(property => {
                        property.value = property.default;
                        property.computed = property.default;
                    });
                });
            },
            removeDomain(index) {
                if (index >= this.$parent.$parent.$data.domains.length) return;

                this.$set(this.$parent.$parent.$data.domains, index, null);
            },
            resetDomains() {
                for (let i = 0; i < this.$parent.$parent.$data.domains.length; i++) {
                    this.resetDomain(i);
                }
            },
            removeDomains() {
                for (let i = 0; i < this.$parent.$parent.$data.domains.length; i++) {
                    this.removeDomain(i);
                }
            },
        },
    };
</script>
