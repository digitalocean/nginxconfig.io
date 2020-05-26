<template>
    <div :class="`column ${half ? 'is-half' : 'is-full'} is-full-mobile is-full-tablet`">
        <h3>{{ name }}</h3>
        <pre><code class="language-nginx" v-html="conf"></code></pre>
    </div>
</template>

<script>
    import Prism from 'prismjs';

    export default {
        name: 'NginxPrism',
        props: {
            name: String,
            conf: String,
            half: Boolean,
        },
        mounted() {
            console.info(`Highlighting ${this.$props.name}...`);
            Prism.highlightAllUnder(this.$el);
        },
    };
</script>
