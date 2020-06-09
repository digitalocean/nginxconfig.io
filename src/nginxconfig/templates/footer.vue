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
    <div class="footer">
        <div class="container">
            <p>
                <a href="#top" class="button is-primary is-small">{{ i18n.templates.footer.backToTop }}</a>
            </p>
            <p>
                {{ i18n.templates.footer.thisToolIs }}
                <ExternalLink :text="i18n.templates.footer.openSourceOnGitHub"
                              link="https://github.com/digitalocean/nginxconfig.io"
                ></ExternalLink>
                {{ i18n.templates.footer.underThe }}
                <ExternalLink :text="i18n.templates.footer.mit"
                              link="https://github.com/digitalocean/nginxconfig.io/blob/master/LICENSE"
                ></ExternalLink>
                {{ i18n.templates.footer.license }}
                {{ i18n.templates.footer.weWelcomeFeedbackAndContributions }}
            </p>
            <p>
                {{ i18n.templates.footer.originallyCreatedBy }}
                <ExternalLink :text="i18n.templates.footer.balintSzekeres"
                              link="https://b4lint.hu/"
                ></ExternalLink>,
                {{ i18n.templates.footer.maintainedBy }}
                <ExternalLink :text="i18n.templates.footer.digitalOcean"
                              link="https://github.com/digitalocean/nginxconfig.io"
                ></ExternalLink>.
            </p>
        </div>
    </div>
</template>

<script>
    import i18n from '../i18n';
    import ExternalLink from 'do-vue/src/templates/external_link';

    export default {
        name: 'Footer',
        components: {
            ExternalLink,
        },
        data() {
            return {
                i18n,
            };
        },
    };
</script>
