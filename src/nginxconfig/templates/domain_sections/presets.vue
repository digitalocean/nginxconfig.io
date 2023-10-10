<!--
Copyright 2023 DigitalOcean

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
    <div class="container">
        <div
            class="header-group"
            :style="{ cursor: interacted ? 'pointer' : undefined }"
            @click="toggleCollapse"
        >
            <h3>{{ $t('templates.domainSections.presets.presets') }}</h3>
            <a
                v-if="interacted"
                class="button is-tiny"
            >
                <i :class="`fas fa-angle-${expanded ? 'up' : 'down'}`"></i>
            </a>
        </div>

        <template v-if="!$parent.$props.data.hasUserInteraction || expanded">
            <div
                v-if="$parent.$props.data.hasUserInteraction"
                class="message is-warning"
            >
                <p class="message-body">
                    {{ $t('templates.domainSections.presets.itLooksLikeYouCustomisedTheConfig') }}
                </p>
            </div>

            <div class="buttons-group">
                <a
                    v-for="(preset, key) in $props.data"
                    :class="`button${preset.computed ? ' is-primary' : ''}`"
                    @click="setPreset(key)"
                >
                    {{ $t(preset.display) }}
                </a>
            </div>
        </template>
    </div>
</template>

<script>
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';
    import analytics from '../../util/analytics';

    const defaults = {
        frontend: {
            default: false,
            display: 'templates.domainSections.presets.frontend', // i18n key
            enabled: true,
            computedCheck(data) {
                return (
                    !data.php.php.computed &&
                    !data.python.python.computed &&
                    !data.reverseProxy.reverseProxy.computed &&
                    data.routing.index.computed === 'index.html' &&
                    data.routing.fallbackHtml.computed
                );
            },
        },
        php: {
            default: true,
            display: 'common.php', // i18n key
            enabled: true,
            computedCheck(data) {
                return (
                    data.php.php.computed &&
                    data.routing.index.computed === 'index.php' &&
                    data.routing.fallbackPhp.computed &&
                    !data.routing.fallbackHtml.computed &&
                    !data.php.wordPressRules.computed &&
                    !data.php.drupalRules.computed &&
                    !data.php.magentoRules.computed &&
                    !data.php.joomlaRules.computed
                );
            },
        },
        django: {
            default: false,
            display: 'common.django', // i18n key
            enabled: true,
            computedCheck(data) {
                return (
                    data.python.python.computed &&
                    data.python.djangoRules.computed &&
                    !data.routing.root.computed
                );
            },
        },
        nodejs: {
            default: false,
            display: 'templates.domainSections.presets.nodeJs', // i18n key
            enabled: true,
            computedCheck(data) {
                return data.reverseProxy.reverseProxy.computed && !data.routing.root.computed;
            },
        },
        singlePageApplication: {
            default: false,
            display: 'templates.domainSections.presets.singlePageApplication', // i18n key
            enabled: true,
            computedCheck(data) {
                return (
                    data.php.php.computed &&
                    data.routing.index.computed === 'index.html' &&
                    data.routing.fallbackHtml.computed
                );
            },
        },
        wordPress: {
            default: false,
            display: 'common.wordPress', // i18n key
            enabled: true,
            computedCheck(data) {
                return (
                    data.routing.index.computed === 'index.php' &&
                    data.routing.fallbackPhp.computed &&
                    !data.routing.fallbackHtml.computed &&
                    data.php.wordPressRules.computed &&
                    !data.php.drupalRules.computed &&
                    !data.php.magentoRules.computed &&
                    !data.php.joomlaRules.computed
                );
            },
        },
        drupal: {
            default: false,
            display: 'common.drupal', // i18n key
            enabled: true,
            computedCheck(data) {
                return (
                    data.routing.index.computed === 'index.php' &&
                    data.routing.fallbackPhp.computed &&
                    !data.routing.fallbackHtml.computed &&
                    !data.php.wordPressRules.computed &&
                    data.php.drupalRules.computed &&
                    !data.php.magentoRules.computed &&
                    !data.php.joomlaRules.computed
                );
            },
        },
        magento: {
            default: false,
            display: 'common.magento', // i18n key
            enabled: true,
            computedCheck(data) {
                return (
                    data.routing.index.computed === 'index.php' &&
                    data.routing.fallbackPhp.computed &&
                    !data.routing.fallbackHtml.computed &&
                    !data.php.wordPressRules.computed &&
                    !data.php.drupalRules.computed &&
                    data.php.magentoRules.computed &&
                    !data.php.joomlaRules.computed
                );
            },
        },
        joomla: {
            default: false,
            display: 'common.joomla', // i18n key
            enabled: true,
            computedCheck(data) {
                return (
                    data.routing.index.computed === 'index.php' &&
                    data.routing.fallbackPhp.computed &&
                    !data.routing.fallbackHtml.computed &&
                    !data.php.wordPressRules.computed &&
                    !data.php.drupalRules.computed &&
                    !data.php.magentoRules.computed &&
                    data.php.joomlaRules.computed
                );
            },
        },
    };

    export default {
        name: 'DomainPresets', // Component name
        display: 'templates.domainSections.presets.presets', // Display name for tab (i18n key)
        key: 'presets', // Key for data in parent
        delegated: delegatedFromDefaults(defaults), // Data the parent will present here
        props: {
            data: Object, // Data delegated back to us from parent
        },
        data() {
            return {
                expanded: false,
            };
        },
        computed: {
            ...computedFromDefaults(defaults, 'presets', false), // Getters & setters for the delegated data
            interacted() {
                return this.$parent.$props.data.hasUserInteraction;
            },
        },
        watch: {
            // When any data changes, check if it still matches a preset
            '$parent.$props.data': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    Object.keys(this.$props.data).forEach((preset) => {
                        this.$props.data[preset].computed =
                            this.$props.data[preset].computedCheck(data);
                    });
                },
                deep: true,
            },
        },
        methods: {
            setPreset(key) {
                // Set that we're using this preset
                Object.keys(this.$props.data).forEach((preset) => (this[preset] = preset === key));
                this.presetEvent(key, this.interacted);

                // Restore some specific defaults first
                this.$parent.resetValue('server', 'domain');
                this.$parent.resetValue('php', 'php');
                this.$parent.resetValue('php', 'wordPressRules');
                this.$parent.resetValue('php', 'drupalRules');
                this.$parent.resetValue('php', 'magentoRules');
                this.$parent.resetValue('php', 'joomlaRules');
                this.$parent.resetValue('python', 'python');
                this.$parent.resetValue('python', 'djangoRules');
                this.$parent.resetValue('reverseProxy', 'reverseProxy');
                this.$parent.resetValue('routing', 'root');
                this.$parent.resetValue('routing', 'index');
                this.$parent.resetValue('routing', 'fallbackHtml');
                this.$parent.resetValue('routing', 'fallbackPhp');

                switch (key) {
                    case 'frontend':
                        this.$parent.setValue('php', 'php', false);
                        this.$parent.setValue('routing', 'index', 'index.html');
                        this.$parent.setValue('routing', 'fallbackHtml', true);
                        break;

                    case 'php':
                        // Defaults should be PHP
                        break;

                    case 'django':
                        this.$parent.setValue('php', 'php', false);
                        this.$parent.setValue('python', 'python', true);
                        this.$parent.setValue('python', 'djangoRules', true);
                        this.$parent.setValue('routing', 'root', false);
                        break;

                    case 'nodejs':
                        this.$parent.setValue('php', 'php', false);
                        this.$parent.setValue('reverseProxy', 'reverseProxy', true);
                        this.$parent.setValue('routing', 'root', false);
                        break;

                    case 'singlePageApplication':
                        this.$parent.setValue('routing', 'index', 'index.html');
                        this.$parent.setValue('routing', 'fallbackHtml', true);
                        break;

                    case 'wordPress':
                        this.$parent.setValue('php', 'wordPressRules', true);
                        break;

                    case 'drupal':
                        this.$parent.setValue('php', 'drupalRules', true);
                        break;

                    case 'magento':
                        this.$parent.setValue('php', 'magentoRules', true);
                        break;

                    case 'joomla':
                        this.$parent.setValue('php', 'joomlaRules', true);
                        break;
                }
            },
            presetEvent(name, overwrite = false) {
                analytics({
                    category: 'Preset',
                    action: overwrite ? 'Overwritten' : 'Applied', // TODO: Is overwritten the best word here?
                    label: name,
                });
            },
            toggleCollapse() {
                if (this.interacted) {
                    this.expanded = !this.expanded;
                }
            },
        },
    };
</script>
