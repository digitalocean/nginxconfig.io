export default (defaults) => {
    return Object.keys(defaults).reduce((prev, key) => {
        prev[key] = {
            value: defaults[key].default,
            computed: defaults[key].default,
            ...defaults[key],
        };
        return prev;
    }, {});
};
