<template>
    <div>
        Hello world server
        <input type="text" v-model="domain" />
    </div>
</template>

<script>
    import i18n from '../../i18n';

    const defaults = {
        domain: 'example.com',
        path: '',
        documentRoot: '',
        wwwSubdomain: false,
        cdnSubdomain: false,
        redirectSubdomains: true,
    };

    export default {
        name: 'DomainServer',
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
            changes() {
                return Object.keys(defaults).filter(key => defaults[key] !== this.$data[key]).length;
            },
        },
    };
</script>
