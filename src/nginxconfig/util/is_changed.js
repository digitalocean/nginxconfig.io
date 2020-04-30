export default (prop, cat, key) => {
    // Show as changed when enabled & not default
    // Show php as changed when completely disabled (by reverse proxy or python)
    return (prop.enabled && prop.value !== prop.default)
        || (cat === 'php' && key === 'php' && prop.computed !== prop.default);
};
