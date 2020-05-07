<template>
    <div>
        <p>
            <b>Let's go live!</b> 🎉
        </p>
        <p>
            Reload NGINX to load in your new configuration:
            <br />
            <Prism language="bash" code="sudo nginx -t && sudo systemctl reload nginx"></Prism>
        </p>
    </div>
</template>

<script>
    import Prism from 'vue-prism-component';
    import 'prismjs/components/prism-bash';
    import i18n from '../../i18n';

    export default {
        name: 'SetupGoLive',
        display: 'Go live!',
        key: 'goLive',
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
