/*
Copyright 2020 DigitalOcean

This code is licensed under the MIT License.
You may obtain a copy of the License at
https://github.com/digitalocean/nginxconfig.io/blob/master/LICENSE or https://mit-license.org/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions :

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
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
    exportData.domains = domains
        .map((domain) => categoriesExport(domain[0]))
        .reduce((prev, current, index) => {
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
