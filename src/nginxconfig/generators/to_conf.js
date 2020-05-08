import isObject from '../util/is_object';

const recurse = (entriesOrObject, depth) => {
    // Support an object or kv array entries
    // Convert to entries if given an object
    const entries = isObject(entriesOrObject) ? Object.entries(entriesOrObject) : entriesOrObject;

    // If not a valid kv entries array, return
    if (!Array.isArray(entries) || !entries.every(i => Array.isArray(i) && i.length === 2)) return '';

    // Initial values
    let retVal = '';
    const longestKeyLen = entries.reduce((prev, current) => {
        if (!current[0].startsWith('#') && current[0].length > prev)
            return current[0].length;
        return prev;
    }, 0);
    const indent = ('    ').repeat(depth);

    // Loop over every kv pair
    for (const item of entries) {
        // If an object, or kv entries, recurse
        if (isObject(item[1]) || (Array.isArray(item[1]) && item[1].every(i => Array.isArray(i) && i.length === 2))) {
            // Recurse
            retVal += '\n' + indent + item[0] + ' {\n';
            retVal += recurse(item[1], depth + 1);
            retVal += indent + '}\n\n';

            // Done
            continue;
        }

        // Otherwise, assume it can be made a string
        // Ensure we're working with an array
        const val = Array.isArray(item[1]) ? item[1] : [item[1]];

        // Calculate spacing
        const keyValSpacing = (longestKeyLen - item[0].length) + 4;
        const keyValIndent = (' ').repeat(Math.max(keyValSpacing, 0));

        // Work through each item in the array
        val.forEach(subVal => {
            const val = subVal.toString();
            retVal += indent + (item[0] + keyValIndent + val).trim() + (item[0].startsWith('#') ? '' : ';') + '\n';
        });
    }

    return retVal.replace(/\n\n\n/g, '\n\n');
}

export default entriesOrObject => recurse(entriesOrObject, 0);
