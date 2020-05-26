<template>
    <div>
        <pre><code class="language-bash">{{ cmd }}</code></pre>
    </div>
</template>

<script>
    import Prism from 'prismjs';

    export default {
        name: 'BashPrism',
        props: {
            cmd: String,
        },
        mounted() {
            console.info(`Highlighting ${this.$props.cmd}...`);
            Prism.highlightAllUnder(this.$el);
        },
    };
</script>
