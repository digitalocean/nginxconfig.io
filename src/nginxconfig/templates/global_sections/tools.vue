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
                                enable symlinks from sites-available/ to sites-enabled/
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
                               readonly="readonly"
                               @click="select"
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
                        <a class="button is-danger is-outline is-mini" @click="resetGlobal">
                            Reset global config
                        </a>
                    </div>
                    <div v-if="hasDomain" class="control">
                        <a class="button is-danger is-outline is-mini" @click="resetDomains">
                            Reset all domains
                        </a>
                    </div>
                    <div v-if="hasDomain" class="control">
                        <a class="button is-danger is-outline is-mini" @click="removeDomains">
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
                                <a class="button is-danger is-outline is-mini" @click="resetDomain(domainData[1])">
                                    Reset domain config
                                </a>
                            </div>
                            <div class="control">
                                <a class="button is-danger is-outline is-mini" @click="removeDomain(domainData[1])">
                                    Remove domain
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal ref="confirmModal" :title="confirmTitle">
            <p>{{ confirmBody }}</p>
            <a class="button is-danger is-outline" @click="doConfirmAction">Yes, I'm sure</a>
            <a class="button is-outline" @click="$refs.confirmModal.close()">No, cancel</a>
        </Modal>
    </div>
</template>

<script>
    import PrettyCheck from 'pretty-checkbox-vue/check';
    import Modal from 'do-vue/src/templates/modal';
    import qs from 'qs';
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
            Modal,
        },
        props: {
            data: Object,                               // Data delegated back to us from parent
        },
        data() {
            return {
                i18n,
                confirmTitle: '',
                confirmBody: '',
                confirmAction: () => {
                },
            };
        },
        computed: {
            ...computedFromDefaults(defaults, 'tools'), // Getters & setters for the delegated data
            hasDomain() {
                return this.$parent.$parent.activeDomains.length > 0;
            },
            shareQuery() {
                const data = exportData(this.$parent.$parent.activeDomains, this.$parent.$props.data);
                return qs.stringify(data, { allowDots: true });
            },
            shareLink() {
                const base = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
                return `${base}${this.shareQuery.length ? '?' : ''}${this.shareQuery}`;
            },
        },
        watch: {
            // When the share link changes, update the site query
            shareQuery(query) {
                window.history.replaceState({}, '', `?${query}`);
            },
        },
        methods: {
            confirm(title, body, callback) {
                this.$data.confirmTitle = title;
                this.$data.confirmBody = body;
                this.$data.confirmAction = callback;
                this.$refs.confirmModal.open();
            },
            doConfirmAction() {
                this.$refs.confirmModal.close();
                this.$data.confirmAction();
            },
            doResetDomain(domain) {
                if (!domain) return;

                Object.values(domain).forEach(category => {
                    Object.values(category).forEach(property => {
                        property.value = property.default;
                        property.computed = property.default;
                    });
                });
            },
            doRemoveDomain(index) {
                this.$set(this.$parent.$parent.$data.domains, index, null);
            },
            resetGlobal() {
                this.confirm(
                    'Reset global config',
                    'Are you sure you want to reset all configuration options in the global config section?',
                    () => {
                        Object.values(this.$parent.$props.data).forEach(category => {
                            Object.values(category).forEach(property => {
                                property.value = property.default;
                                property.computed = property.default;
                            });
                        });
                    },
                );
            },
            resetDomain(index) {
                if (index >= this.$parent.$parent.$data.domains.length) return;
                const domain = this.$parent.$parent.$data.domains[index];
                if (!domain) return;

                this.confirm(
                    'Reset domain config',
                    `Are you sure you want to reset all configuration options for the ${domain.server.domain.computed} domain?`,
                    () => this.doResetDomain(domain),
                );
            },
            removeDomain(index) {
                if (index >= this.$parent.$parent.$data.domains.length) return;
                const domain = this.$parent.$parent.$data.domains[index];
                if (!domain) return;

                this.confirm(
                    'Remove domain',
                    `Are you sure you want to remove the ${domain.server.domain.computed} domain configuration?`,
                    () => this.doRemoveDomain(index),
                );
            },
            resetDomains() {
                this.confirm(
                    'Reset all domain configs',
                    'Are you sure you want to reset the configuration of ALL domains?',
                    () => {
                        for (let i = 0; i < this.$parent.$parent.$data.domains.length; i++) {
                            this.doResetDomain(this.$parent.$parent.$data.domains[i]);
                        }
                    },
                );
            },
            removeDomains() {
                this.confirm(
                    'Remove all domains',
                    'Are you sure you want to remove ALL domain configurations?',
                    () => {
                        for (let i = 0; i < this.$parent.$parent.$data.domains.length; i++) {
                            this.doRemoveDomain(i);
                        }
                    },
                );
            },
            select(event) {
                event.target.setSelectionRange(0, event.target.value.length);
            },
        },
    };
</script>
