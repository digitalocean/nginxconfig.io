export default (defaults) => {
    return Object.keys(defaults).reduce((prev, key) => {
        prev[key] = {
            get() {
                return this.$props.data[key].value;
            },
            set (value) {
                this.$props.data[key].value = value;
                this.$props.data[key].computed = value;
            },
        };
        return prev;
    }, {});
};
