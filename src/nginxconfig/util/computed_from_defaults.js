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
        prev[key + 'Default'] = {
            get() {
                return this.$props.data[key].default;
            },
        };
        prev[key + 'Enabled'] = {
            get() {
                return this.$props.data[key].enabled;
            },
        };
        prev[key + 'Changed'] = {
            get() {
                return this.$props.data[key].enabled && this.$props.data[key].value !== this.$props.data[key].default;
            },
        };
        return prev;
    }, {});
};
