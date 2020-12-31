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
                <label class="label">{{ $t('templates.domainSections.onion.onionLocation') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${onionLocationChanged ? ' is-changed' : ''}`">
                        <input v-model="onionLocation" class="input" type="text" :placeholder="onionLocationDefault" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        onionLocation: {
            default: '',
            enabled: true,
        },
    };

    export default {
        name: 'DomainOnion',                                    // Component name
        display: 'templates.domainSections.onion.onion',        // Display name for tab (i18n key)
        key: 'onion',                                           // Key for data in parent
        delegated: delegatedFromDefaults(defaults),             // Data the parent will present here
        props: {
            data: Object,                                       // Data delegated back to us from parent
        },
        computed: computedFromDefaults(defaults, 'onion'),      // Getters & setters for the delegated data
        watch: {
            '$props.data.onionLocation': {
                handler(data) {
                    // Drop http(s)://
                    data.computed = data.computed.replace(/^https?:\/\//, '');
                },
                deep: true,
            },
        },
    };
</script>
