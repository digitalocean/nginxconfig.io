<template>
    <div>
        <ol>
            <li>
                <p>
                    <b>Download</b> the generated config: <b><a @click="$parent.downloadZip">{{ $parent.zipName }}</a></b>
                    <br />
                    and <b>upload</b> it to your server's <code class="slim">{{ $parent.nginxDir }}</code> directory.
                </p>
                <p>
                    or, <b><a @click="$parent.copyZip">Copy a base64 string of the compressed config</a></b>, paste it in
                    your server's command line and execute it.
                </p>
            </li>

            <li>
                <p>
                    Check that you have <b>unzip</b> installed, or install it, on your server by running this command:
                    <br />
                    <Prism language="bash" code="(unzip -v >/dev/null 2>&1 && echo 'unzip already installed') || sudo apt-get install unzip"></Prism>
                </p>
            </li>

            <li>
                <p>
                    Navigate to your NGINX <b>configuration directory</b> on your server:
                    <br />
                    <Prism language="bash" :code="`cd ${$parent.nginxDir}`"></Prism>
                </p>
            </li>

            <li>
                <p>
                    Create a <b>backup</b> of your current NGINX configuration:
                    <br />
                    <Prism language="bash" code="tar -czvf nginx_$(date +'%F_%H-%M-%S').tar.gz nginx.conf sites-available/ sites-enabled/ nginxconfig.io/"></Prism>
                </p>
            </li>

            <li>
                <p>
                    <b>Unzip</b> the new compressed configuration archive:
                    <br />
                    <Prism language="bash" :code="`unzip -o ${$parent.nginxDir}`"></Prism>
                </p>
            </li>
        </ol>
    </div>
</template>

<script>
    import Prism from 'vue-prism-component';
    import 'prismjs/components/prism-bash';
    import i18n from '../../i18n';

    export default {
        name: 'SetupDownload',
        display: 'Download',
        key: 'download',
        components: {
            Prism,
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
