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

import qs from 'qs';
import clone from 'clone';
import Domain from '../templates/domain';
import isObject from './is_object';
import backwardsCompatibility from './backwards_compatibility';

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

export default (query, domains, global, nextTick) => {
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
    backwardsCompatibility(data);

    // Handle domains
    if ('domains' in data && isObject(data.domains)) {
        // Work through all valid integer keys in the object
        const keys = Object.keys(data.domains).map(x => parseInt(x)).filter(x => !isNaN(x));
        for (let i = 0; i < Math.max(...keys) + 1; i++) {
            // If the key doesn't exist or this isn't a valid object, assume it was an untouched example domain
            if (!keys.includes(i) || !isObject(data.domains[i])) {
                domains.push(clone(Domain.delegated));
                continue;
            }

            // Create a new domain (assume it has had custom user settings)
            const domainImported = clone(Domain.delegated);
            domainImported.hasUserInteraction = true;
            domains.push(domainImported);

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
};
