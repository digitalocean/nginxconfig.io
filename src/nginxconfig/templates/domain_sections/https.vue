<template>
    <div>Hello world https</div>
</template>

<script>
    import i18n from '../../i18n';
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        https: {
            default: true,
            enabled: true,
        },
        http2: {
            default: true,
            enabled: true,
        },
        forceHttps: {
            default: true,
            enabled: true,
        },
        hsts: {
            default: true,
            enabled: true,
        },
        hstsSubdomains: {
            default: true,
            enabled: true,
        },
        hstsPreload: {
            default: true,
            enabled: true,
        },
        certType: {
            default: 'letsEncrypt',
            options: ['letsEncrypt', 'custom'],
            enabled: true,
        },
        letsEncryptEmail: {
            default: '',
            enabled: true,
        },
        sslCertificate: {
            default: '',
            enabled: false,
        },
        sslCertificateKey: {
            default: '',
            enabled: false,
        },
    };

    export default {
        name: 'DomainHTTPS',                        // Component name
        display: 'HTTPS',                           // Display name for tab
        key: 'https',                               // Key for data in parent
        delegated: delegatedFromDefaults(defaults), // Data the parent will present here
        props: {
            data: Object,                           // Data delegated back to us from parent
        },
        data () {
            return {
                i18n,
            };
        },
        computed: computedFromDefaults(defaults),   // Getters & setters for the delegated data
    };
</script>
