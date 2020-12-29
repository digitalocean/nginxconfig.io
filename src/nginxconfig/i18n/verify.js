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

import { readdirSync } from 'fs';
import chalk from 'chalk';
import { defaultPack } from '../util/language_pack_default';
import { fromSep } from '../util/language_pack_name';

// Load all the packs in
const packs = {};
const packDirectories = readdirSync(__dirname, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
for (const packDirectory of packDirectories)
    packs[fromSep(packDirectory, '-')] = require(`./${packDirectory}/index.js`).default;

// Recursively get all keys in a i18n pack object fragment
const explore = packFragment => {
    const foundKeys = new Set();

    for (const [key, value] of Object.entries(packFragment)) {
        // If this is an actual translation, store the key
        if (typeof value === 'string') {
            foundKeys.add(key);
            continue;
        }

        // Otherwise, assume this is another fragment and explore it recursively
        explore(packFragment[key]).forEach(exploreKey => foundKeys.add(`${key}.${exploreKey}`));
    }

    return foundKeys;
};

// Get all the keys for the default "source" language pack
const defaultKeys = explore(packs[defaultPack]);

// Track if we need to exit with an error
let hadError = false;

// Work through all the packs and compare to default
for (const [pack, packData] of Object.entries(packs)) {
    console.log(chalk.underline(`Language pack \`${pack}\``));

    // We don't need to compare default to itself
    if (pack === defaultPack) {
        console.log(`  Default pack, found ${defaultKeys.size.toLocaleString()} keys`);
        console.log(chalk.reset());
        continue;
    }

    // Get all the keys and the set differences
    const packKeys = explore(packData);
    const missingKeys = [...defaultKeys].filter(x => !packKeys.has(x));
    const extraKeys = [...packKeys].filter(x => !defaultKeys.has(x));

    // Missing keys are errors, extra keys are just warnings
    const errors = missingKeys.map(key => `Missing key \`${key}\``);
    const warnings = extraKeys.map(key => `Unexpected key \`${key}\``);

    // Output the pack results
    if (warnings.length)
        for (const warning of warnings)
            console.log(`  ${chalk.yellow('warning')} ${warning}`);
    if (errors.length)
        for (const error of errors)
            console.log(`  ${chalk.red('error')}   ${error}`);
    if (!errors.length && !warnings.length)
        console.log(`  ${chalk.green('No issues, all keys present with no unexpected keys')}`);

    // If we had errors, script should exit 1
    if (errors.length) hadError = true;

    // Linebreak before next pack or exit
    console.log(chalk.reset());
}

// Exit 1 if we had errors
if (hadError) process.exit(1);
