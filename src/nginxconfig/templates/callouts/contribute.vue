<!--
Copyright 2024 DigitalOcean

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
    <div
        class="callout floating"
        :style="style"
    >
        <div class="close">
            <p>
                {{ $t('templates.callouts.contribute.wantToContributeChanges') }}
            </p>
            <a @click.prevent="close">
                <i class="fas fa-times"></i>
            </a>
        </div>
        <a
            href="https://github.com/digitalocean/nginxconfig.io"
            class="button is-primary"
            target="_blank"
            @click="linkClickEvent"
        >
            {{ $t('templates.callouts.contribute.getInvolvedOnGitHub') }}
        </a>
    </div>
</template>

<script>
    import analytics from '../../util/analytics.js';

    export default {
        name: 'ContributeCallout',
        data() {
            return {
                scrolled: false,
                closed: false,
            };
        },
        computed: {
            visible() {
                return this.$data.scrolled && !this.$data.closed;
            },
            style() {
                const nonVisibleStyle = {
                    opacity: 0,
                    pointerEvents: 'none',
                };

                return this.visible ? undefined : nonVisibleStyle;
            },
        },
        mounted() {
            document.addEventListener('scroll', () => {
                if (this.$data.scrolled) return;
                if (window.scrollY < 300) return;
                this.$data.scrolled = true;
                this.calloutVisibleEvent();
            });
        },
        methods: {
            close() {
                this.$data.closed = true;
                this.closedEvent();
            },
            closedEvent() {
                analytics({
                    category: 'Contribute callout',
                    action: 'Closed',
                });
            },
            calloutVisibleEvent() {
                analytics({
                    category: 'Contribute callout',
                    action: 'Visible',
                    nonInteraction: true,
                });
            },
            linkClickEvent() {
                analytics({
                    category: 'Contribute callout',
                    action: 'Clicked',
                });
            },
        },
    };
</script>
