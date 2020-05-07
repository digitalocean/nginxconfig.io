<template>
    <div>
        <p>
            <b>Let's go live!</b> 🎉
        </p>
        <p>
            Reload NGINX to load in your new configuration:
            <br />
            <code class="slim">sudo nginx -t && sudo systemctl reload nginx</code>
        </p>
    </div>
</template>

<script>
    import i18n from '../../i18n';

    export default {
        name: 'SetupGoLive',
        display: 'Go live!',
        key: 'goLive',
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
