<!--
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<template>
    <div>
        <p>
            <b>Let's go live!</b> 🎉
        </p>
        <p>
            Reload NGINX to load in your new configuration:
            <br />
            <BashPrism cmd="sudo nginx -t && sudo systemctl reload nginx"></BashPrism>
        </p>
    </div>
</template>

<script>
    import i18n from '../../i18n';
    import BashPrism from '../prism/bash';

    export default {
        name: 'SetupGoLive',
        display: 'Go live!',
        key: 'goLive',
        components: {
            BashPrism,
        },
        props: {
            data: Object,
        },
        data() {
            return {
                i18n,
            };
        },
    };
</script>
