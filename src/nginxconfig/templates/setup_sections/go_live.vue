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
