const categoriesExport = (categories) => {
    const categoriesData = {};

    // Work through each category
    for (const category in categories) {
        // Ignore presets
        if (category === 'presets') continue;
        const categoryData = {};

        // Go over each property in the category
        for (const property in categories[category]) {

            // If the user input differs from the default, they changed it, so we save it
            const propertyData = categories[category][property];
            if (propertyData.value !== propertyData.default) {
                categoryData[property] = propertyData.value;
            }
        }

        // If there were any property changes, save the category
        if (Object.keys(categoryData).length) {
            categoriesData[category] = categoryData;
        }
    }

    return categoriesData;
};

export default (domains, global) => {
    const exportData = {};

    // Handle domains
    // Always save changes, even if none, so we can replicate the correct number of domains
    exportData.domains = domains.map(domain => categoriesExport(domain[0])).reduce((prev, current, index) => {
        prev[index] = current;
        return prev;
    }, {});

    // Handle global
    // If there were any category changes, save global changes
    const globalData = categoriesExport(global);
    if (Object.keys(globalData).length) {
        exportData.global = globalData;
    }

    return exportData;
};
