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
    if ('domains' in data) {
        // Check its an array or object
        if (Array.isArray(data.domains) || isObject(data.domains)) {
            // Ensure we're working with an array
            const values = isObject(data.domains) ? Object.values(data.domains) : data.domains;

            // Work through each potential domain
            for (const domainData of values) {
                // Check this is an object
                if (!isObject(domainData)) continue;

                // Create a new domain (assume it has had custom user settings)
                const domainImported = clone(Domain.delegated);
                domainImported.hasUserInteraction = true;
                domains.push(domainImported);

                // Apply the initial values on the next Vue tick, once the watchers are ready
                nextTick(() => applyCategories(domainData, domainImported));
            }
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
