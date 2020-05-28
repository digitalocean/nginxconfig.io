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
        <ol>
            <li>
                <p>
                    <b>Download</b> the generated config: <b><a @click="$parent.downloadTar">{{ $parent.tarName }}</a></b>
                    <br />
                    and <b>upload</b> it to your server's <code class="slim">{{ $parent.nginxDir }}</code> directory.
                </p>
                <p>
                    or, <b><a @click="$parent.copyTar">Copy a base64 string of the compressed config</a></b>, paste it in
                    your server's command line and execute it.
                </p>
            </li>

            <li>
                <p>
                    Navigate to your NGINX <b>configuration directory</b> on your server:
                    <br />
                    <BashPrism :key="$parent.nginxDir" :cmd="`cd ${$parent.nginxDir}`"></BashPrism>
                </p>
            </li>

            <li>
                <p>
                    Create a <b>backup</b> of your current NGINX configuration:
                    <br />
                    <BashPrism cmd="tar -czvf nginx_$(date +'%F_%H-%M-%S').tar.gz nginx.conf sites-available/ sites-enabled/ nginxconfig.io/"></BashPrism>
                </p>
            </li>

            <li>
                <p>
                    <b>Extract</b> the new compressed configuration archive using tar:
                    <br />
                    <BashPrism :key="$parent.tarName" :cmd="`tar -xzvf ${$parent.tarName}`"></BashPrism>
                </p>
            </li>
        </ol>
    </div>
</template>

<script>
    import i18n from '../../i18n';
    import BashPrism from '../prism/bash';

    export default {
        name: 'SetupDownload',
        display: 'Download',
        key: 'download',
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
