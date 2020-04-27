<template>
    <div>Hello world https</div>
</template>

<script>
    import i18n from '../../i18n';

    const defaults = {
        https: true,
        http2: true,
        forceHttps: true,
        hsts: true,
        hstsSubdomains: true,
        hstsPreload: true,
        certType: 'letsEncrypt',
        letsEncryptEmail: '',
        sslCertificate: '',
        sslCertificateKey: '',
    };

    export default {
        name: 'DomainHTTPS',
        props: {
            data: Object,
        },
        data () {
            return {
                i18n,
                defaults,
                ...defaults,
            };
        },
        created () {
            if (this.$props.data) {
                for (const key in this.$props.data) {
                    if (key in defaults) {
                        this.$data[key] = this.$props.data[key];
                    }
                }
            }
        },
        methods: {
            exports() {
                return Object.keys(defaults).reduce((prev, key) => {
                    prev[key] = this.$data[key];
                    return prev;
                }, {});
            },
        },
        changes() {
            return Object.keys(defaults).filter(key => defaults[key] !== this.$data[key]).length;
        },
    };
</script>
