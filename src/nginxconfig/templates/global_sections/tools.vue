<!--
Copyright 2022 DigitalOcean

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
                <label class="label">
                    {{ $t('templates.globalSections.tools.modularizedStructure') }}
                </label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${modularizedStructureChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck
                                v-model="modularizedStructure"
                                class="p-default p-curve p-fill p-icon"
                            >
                                {{
                                    $t(
                                        'templates.globalSections.tools.enableModularizedConfigFiles',
                                    )
                                }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="symlinkVhostEnabled"
            class="field is-horizontal"
        >
            <div class="field-label">
                <label class="label"></label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${symlinkVhostChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck
                                v-model="symlinkVhost"
                                class="p-default p-curve p-fill p-icon"
                            >
                                {{ $t('templates.globalSections.tools.enableSymLinksFrom') }}
                                sites-available/
                                {{ $t('templates.globalSections.tools.to') }} sites-enabled/
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">
                    {{ $t('templates.globalSections.tools.shareConfiguration') }}
                </label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input
                            v-model="shareLink"
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
                <label class="label">
                    {{ $t('templates.globalSections.tools.resetConfiguration') }}
                </label>
            </div>
            <div class="field-body">
                <div class="field is-grouped">
                    <div class="control">
                        <a
                            class="button is-danger is-outline is-mini"
                            @click="resetGlobal"
                        >
                            {{ $t('templates.globalSections.tools.resetGlobalConfig') }}
                        </a>
                    </div>
                    <div
                        v-if="hasDomain"
                        class="control"
                    >
                        <a
                            class="button is-danger is-outline is-mini"
                            @click="resetDomains"
                        >
                            {{ $t('templates.globalSections.tools.resetAllDomains') }}
                        </a>
                    </div>
                    <div
                        v-if="hasDomain"
                        class="control"
                    >
                        <a
                            class="button is-danger is-outline is-mini"
                            @click="removeDomains"
                        >
                            {{ $t('templates.globalSections.tools.removeAllDomains') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label"></div>
            <div class="field-body is-vertical">
                <div
                    v-for="domainData in $parent.$parent.activeDomains"
                    class="field is-horizontal"
                >
                    <div class="field-label">
                        <label class="label">{{ domainData[0].server.domain.computed }}</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-grouped">
                            <div class="control">
                                <a
                                    class="button is-danger is-outline is-mini"
                                    @click="resetDomain(domainData[1])"
                                >
                                    {{ $t('templates.globalSections.tools.resetDomainConfig') }}
                                </a>
                            </div>
                            <div class="control">
                                <a
                                    class="button is-danger is-outline is-mini"
                                    @click="removeDomain(domainData[1])"
                                >
                                    {{ $t('templates.globalSections.tools.removeDomain') }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal
            ref="confirmModal"
            :title="confirmTitle"
        >
            <p>{{ confirmBody }}</p>
            <a
                class="button is-danger is-outline"
                @click="doConfirmAction"
            >
                {{ $t('templates.globalSections.tools.yesImSure') }}
            </a>
            <a
                class="button is-outline"
                @click="$refs.confirmModal.close()"
            >
                {{ $t('templates.globalSections.tools.noCancel') }}
            </a>
        </Modal>
    </div>
</template>

<script>
    import Modal from 'do-vue/src/templates/modal';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';
    import shareQuery from '../../util/share_query';
    import analytics from '../../util/analytics';
    import PrettyCheck from '../inputs/checkbox';

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
        name: 'GlobalTools', // Component name
        display: 'templates.globalSections.tools.tools', // Display name for tab (i18n key)
        key: 'tools', // Key for data in parent
        delegated: delegatedFromDefaults(defaults), // Data the parent will present here
        components: {
            PrettyCheck,
            Modal,
        },
        props: {
            data: Object, // Data delegated back to us from parent
        },
        data() {
            return {
                confirmTitle: '',
                confirmBody: '',
                confirmAction: () => {},
            };
        },
        computed: {
            ...computedFromDefaults(defaults, 'tools'), // Getters & setters for the delegated data
            hasDomain() {
                return this.$parent.$parent.activeDomains.length > 0;
            },
            shareQuery() {
                return shareQuery(this.$parent.$parent.activeDomains, this.$parent.$props.data);
            },
            shareLink() {
                const base = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
                return `${base}${this.shareQuery}`;
            },
        },
        watch: {
            // When the share link changes, update the site query
            shareQuery(query) {
                window.history.replaceState({}, '', `${window.location.pathname}${query || ''}`);
            },
            // Disable symlink if modularized structure is disabled
            '$props.data.modularizedStructure': {
                handler(data) {
                    if (data.computed) {
                        this.$props.data.symlinkVhost.enabled = true;
                        this.$props.data.symlinkVhost.computed =
                            this.$props.data.symlinkVhost.value;
                    } else {
                        this.$props.data.symlinkVhost.enabled = false;
                        this.$props.data.symlinkVhost.computed = false;
                    }
                },
                deep: true,
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

                Object.values(domain).forEach((category) => {
                    Object.values(category).forEach((property) => {
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
                    this.$t('templates.globalSections.tools.resetGlobalConfig'),
                    this.$t('templates.globalSections.tools.resetGlobalConfigBody'),
                    () => {
                        // Analytics
                        this.resetGlobalEvent();

                        // Do the reset
                        Object.values(this.$parent.$props.data).forEach((category) => {
                            Object.values(category).forEach((property) => {
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
                    this.$t('templates.globalSections.tools.resetDomainConfig'),
                    `${this.$t(
                        'templates.globalSections.tools.areYouSureYouWantToResetAllConfigurationOptionsForThe',
                    )}
                    ${domain.server.domain.computed}
                    ${this.$t('templates.globalSections.tools.domain')}`,
                    () => {
                        // Analytics
                        this.resetDomainEvent(domain.server.domain.computed);

                        // Do the reset
                        this.doResetDomain(domain);
                    },
                );
            },
            removeDomain(index) {
                if (index >= this.$parent.$parent.$data.domains.length) return;
                const domain = this.$parent.$parent.$data.domains[index];
                if (!domain) return;

                this.confirm(
                    this.$t('templates.globalSections.tools.removeDomain'),
                    `${this.$t('templates.globalSections.tools.areYouSureYouWantToRemoveThe')}
                    ${domain.server.domain.computed}
                    ${this.$t('templates.globalSections.tools.domainConfiguration')}`,
                    () => {
                        // Analytics
                        this.removeDomainEvent(domain.server.domain.computed);

                        // Do the removal
                        this.doRemoveDomain(index);
                    },
                );
            },
            resetDomains() {
                this.confirm(
                    this.$t('templates.globalSections.tools.resetAllDomainsConfig'),
                    this.$t('templates.globalSections.tools.resetAllDomainsConfigBody'),
                    () => {
                        // Analytics
                        this.resetDomainsEvent(
                            this.$parent.$parent.activeDomains.map(
                                (x) => x[0].server.domain.computed,
                            ),
                            this.$parent.$parent.activeDomains.length,
                        );

                        // Do the reset
                        for (let i = 0; i < this.$parent.$parent.$data.domains.length; i++) {
                            this.doResetDomain(this.$parent.$parent.$data.domains[i]);
                        }
                    },
                );
            },
            removeDomains() {
                this.confirm(
                    this.$t('templates.globalSections.tools.removeAllDomains'),
                    this.$t('templates.globalSections.tools.removeAllDomainsBody'),
                    () => {
                        // Analytics
                        this.removeDomainsEvent(
                            this.$parent.$parent.activeDomains.map(
                                (x) => x[0].server.domain.computed,
                            ),
                            this.$parent.$parent.activeDomains.length,
                        );

                        // Do the removal
                        for (let i = 0; i < this.$parent.$parent.$data.domains.length; i++) {
                            this.doRemoveDomain(i);
                        }
                    },
                );
            },
            resetGlobalEvent() {
                analytics({
                    category: 'Tools',
                    action: 'Global settings reset',
                });
            },
            resetDomainEvent(name) {
                analytics({
                    category: 'Tools',
                    action: 'Site reset',
                    label: name,
                });
            },
            removeDomainEvent(name) {
                analytics({
                    category: 'Tools',
                    action: 'Removed site',
                    label: name,
                });

                // Also fire the general site removal event
                this.$parent.$parent.removeSiteEvent(
                    this.$parent.$parent.activeDomains.length - 1,
                    name,
                );
            },
            resetDomainsEvent(names, count) {
                analytics({
                    category: 'Tools',
                    action: 'All sites reset',
                    label: names.join(', '),
                    value: count,
                });
            },
            removeDomainsEvent(names, count) {
                analytics({
                    category: 'Tools',
                    action: 'All sites removed',
                    label: names.join(', '),
                    value: count,
                });

                // Also fire the general site removal event
                for (let i = 0; i < this.$parent.$parent.$data.domains.length; i++)
                    this.$parent.$parent.removeSiteEvent(
                        this.$parent.$parent.activeDomains.length - i - 1,
                        names[i],
                    );
            },
            select(event) {
                event.target.setSelectionRange(0, event.target.value.length);
            },
        },
    };
</script>
