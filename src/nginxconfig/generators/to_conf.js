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

import isObject from '../util/is_object';

const isBlock = (item) => {
    // If an object, or kv entries, this is considered a block
    return (
        isObject(item) ||
        (Array.isArray(item) && item.every((i) => Array.isArray(i) && i.length === 2))
    );
};

const longestKey = (items) => {
    let longest = 0;

    for (const item of items) {
        // Only consider up to the first block
        if (isBlock(item[1])) return longest;

        // If this is the new longest, and not a comment, use this
        if (item[0].length > longest && !item[0].startsWith('#')) longest = item[0].length;
    }

    // Done!
    return longest;
};

const recurse = (entriesOrObject, depth) => {
    // Support an object or kv array entries
    // Convert to entries if given an object
    const entries = isObject(entriesOrObject) ? Object.entries(entriesOrObject) : entriesOrObject;

    // If not a valid kv entries array, return
    if (!Array.isArray(entries) || !entries.every((i) => Array.isArray(i) && i.length === 2))
        return '';

    // Initial values
    let retVal = '';
    let longestKeyLen = longestKey(entries);
    const indent = '    '.repeat(depth);

    // Track whether the previous was a block, for indentation
    let previousBlock = false;

    // Loop over every kv pair
    for (let i = 0; i < entries.length; i++) {
        const item = entries[i];

        // If a block (object or kv entries), recurse
        if (isBlock(item[1])) {
            // Recurse
            retVal += '\n' + indent + item[0] + ' {\n';
            retVal += recurse(item[1], depth + 1);
            retVal += indent + '}\n\n';

            // Done
            previousBlock = true;
            continue;
        }

        // Update key length if we've just left a block
        if (previousBlock) {
            longestKeyLen = longestKey(entries.slice(i));
            previousBlock = false;
        }

        // Otherwise, assume it can be made a string
        // Ensure we're working with an array
        const val = Array.isArray(item[1]) ? item[1] : [item[1]];

        // Calculate spacing
        const keyValSpacing = longestKeyLen - item[0].length + 1;
        const keyValIndent = ' '.repeat(Math.max(keyValSpacing, 0));

        // Work through each item in the array
        val.forEach((subVal) => {
            const val = subVal.toString();
            retVal +=
                indent +
                (item[0] + keyValIndent + val).trim() +
                (item[0].startsWith('#') ? '' : ';') +
                '\n';
        });
    }

    return retVal;
};

export default (entriesOrObject) => {
    // Generate the conf
    let conf = recurse(entriesOrObject, 0);

    // Do some regex cleanup
    conf = conf
        // Cleanup triple linebreaks
        .replace(/\n\n\n/g, '\n\n')
        // Double linebreak before comment
        .replace(/^([^\S\r\n]*[^#\s].*[^\n])\n([^\S\r\n]*)#/gm, '$1\n\n$2#')
        // Single linebreak between comment and block
        .replace(/^([^\S\r\n]*#.*)(?:\n[^\S\r\n]*)+\n([^\S\r\n]*.*{)/gm, '$1\n$2')
        // Double linebreak after double comment
        .replace(/^([^\S\r\n]*#.*\n[^\S\r\n]*#.*\n)([^\S\r\n]*[^#\s])/gm, '$1\n$2')
        // No newline for empty blocks
        .replace(/^([^\S\r\n]*.*{)\n[^\S\r\n]*(})/gm, '$1$2');

    // Cleanup extra linebreaks between multiple close blocks
    // Use a loop as this has overlapping matches
    let match;
    do {
        match = /^([^\S\r\n]*})(?:\n[^\S\r\n]*)+\n([^\S\r\n]*})/m.exec(conf);
        if (match)
            conf =
                conf.slice(0, match.index) +
                match[1] +
                '\n' +
                match[2] +
                conf.slice(match.index + match[0].length);
    } while (match);

    // Remove initial & trailing whitespace
    return conf.trim();
};
