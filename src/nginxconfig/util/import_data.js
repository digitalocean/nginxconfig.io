/*
Copyright 2022 DigitalOcean

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

import qs from 'qs';
import clone from 'clone';
import Domain from '../templates/domain';
import isObject from './is_object';
import angularBackwardsCompatibility from './angular_backwards_compatibility';
import vueBackwardsCompatibility from './vue_backwards_compatibility';

const applyCategories = (categories, target) => {
    // Work through each potential category
    for (const category in categories) {
        // Avoid inheritance
        if (!Object.prototype.hasOwnProperty.call(categories, category)) continue;

        // Ignore presets
        if (category === 'presets') continue;

        // Check this is a real category
        if (!(category in target)) continue;

        // Check this is an object
        if (!isObject(categories[category])) continue;

        // Work through each potential setting in this category
        for (const key in categories[category]) {
            // Avoid inheritance
            if (!Object.prototype.hasOwnProperty.call(categories[category], key)) continue;

            // Check this is a real key
            if (!(key in target[category])) continue;

            // Apply the value
            target[category][key].value = categories[category][key];
            target[category][key].computed = categories[category][key];
        }
    }
};

export default (query, domains, global, nextTick) =>
    new Promise((resolve) => {
        const data = qs.parse(query, {
            ignoreQueryPrefix: true,
            allowDots: true,
            parseArrays: false,
            decoder(value) {
                value = decodeURIComponent(value);

                // If it's a set of digits, parse it as a float
                if (/^(\d+|\d*\.\d+)$/.test(value)) return parseFloat(value);

                // If it matches a keyword, convert it
                let keywords = {
                    true: true,
                    false: false,
                    null: null,
                    undefined: undefined,
                };
                if (value in keywords) return keywords[value];

                // Otherwise, leave it as is
                return value;
            },
        });

        // Handle converting nginxconfig.io-angular params to the current version
        angularBackwardsCompatibility(data);

        // Handle converting vue params to the current version
        vueBackwardsCompatibility(data);

        // Handle domains
        if ('domains' in data && isObject(data.domains)) {
            // Work through all valid integer keys in the object
            const keys = Object.keys(data.domains)
                .map((x) => parseInt(x))
                .filter((x) => !isNaN(x));
            for (let i = 0; i < Math.max(...keys) + 1; i++) {
                // If the key doesn't exist or this isn't a valid object, assume it was an untouched example domain
                if (!keys.includes(i) || !isObject(data.domains[i])) {
                    domains.push(clone(Domain.delegated));
                    continue;
                }

                // Create a new domain (assume it has had custom user settings)
                // Push transforms the object to a proxy, so re-fetch the proxy from the array
                const domainImported = domains[domains.push(clone(Domain.delegated)) - 1];
                domainImported.hasUserInteraction = true;

                // Apply the initial values on the next Vue tick, once the watchers are ready
                nextTick(() => applyCategories(data.domains[i], domainImported));
            }
        } else {
            // If no configured domains, add a single default
            domains.push(clone(Domain.delegated));
        }

        // Handle global settings
        if ('global' in data) {
            // If this is an object, apply any potential data
            if (isObject(data.global)) applyCategories(data.global, global);
        }

        // Resolve after everything has updated
        nextTick(() => nextTick(() => resolve(data)));
    });
