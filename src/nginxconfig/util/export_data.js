/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
