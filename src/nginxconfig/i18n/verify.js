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

import { readdirSync, readFileSync } from 'fs';
import { join, sep } from 'path';
import chalk from 'chalk';
import { defaultPack } from '../util/language_pack_default';
import { toSep, fromSep } from '../util/language_pack_name';
import snakeToCamel from '../util/snake_to_camel';

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

// Recursively get all the files in a i18n pack directory
const files = directory => {
    const foundFiles = new Set();

    for (const dirent of readdirSync(join(__dirname, directory), { withFileTypes: true })) {
        const base = join(directory, dirent.name);

        // If this is a file, store it
        if (dirent.isFile()) {
            foundFiles.add(base);
            continue;
        }

        // If this is a directory, recurse
        if (dirent.isDirectory()) {
            files(base).forEach(recurseFile => foundFiles.add(recurseFile));
        }

        // Otherwise, ignore this
    }

    return foundFiles;
};

// Get all the todo items in a file
const todos = file => {
    const content = readFileSync(join(__dirname, file), 'utf8');
    const lines = content.split('\n');
    const items = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(/\/\/\s*todo([([].*?[)\]])?\s*:?\s*(.*)/i);
        if (match) items.push([i + 1, line, match[0], match[1], match[2]]);
    }

    return items;
};

// Convert a pack file to a pack object key
const fileToObject = file => file
    // Drop language pack prefix
    .split(sep).slice(1).join(sep)
    // Drop js extension
    .split('.').slice(0, -1).join('.')
    // Replace sep with period and use camelCase
    .split(sep).map(dir => snakeToCamel(dir)).join('.');

// Get all the keys for the default "source" language pack
const defaultKeys = explore(packs[defaultPack]);

// Track if we need to exit with an error
let hadError = false;

// Work through all the packs and compare to default
for (const [pack, packData] of Object.entries(packs)) {
    console.log(chalk.underline(`Language pack \`${pack}\``));

    // Get the base data
    const packKeys = explore(packData);
    const packFiles = files(toSep(pack, '-'));
    console.log(`  Found ${packKeys.size.toLocaleString()} keys, ${packFiles.size.toLocaleString()} files`);

    // Track all our errors and warnings
    const errors = [], warnings = [];

    // Get all the keys and the set differences
    const missingKeys = [...defaultKeys].filter(x => !packKeys.has(x));
    const extraKeys = [...packKeys].filter(x => !defaultKeys.has(x));

    // Missing keys and extra keys are errors
    missingKeys.forEach(key => errors.push(`Missing key \`${key}\``));
    extraKeys.forEach(key => errors.push(`Unexpected key \`${key}\``));

    // Get all the files in the pack directory
    const packKeyFiles = new Set([...packFiles].filter(file => file.split(sep).slice(-1)[0] !== 'index.js'));

    // Get the objects from the pack keys
    const packKeyObjects = new Set([...packKeys]
        .map(key => key.split('.').slice(0, -1).join('.')));

    // Warn for any files that aren't used as pack objects
    [...packKeyFiles].filter(file => !packKeyObjects.has(fileToObject(file)))
        .forEach(file => warnings.push(`Unused file \`${file}\``));

    // Locate any todos in each file as a warning
    for (const file of packFiles)
        todos(file).forEach(todo => warnings.push(`TODO in \`${file}\` on line ${todo[0]}`));

    // Output the pack results
    if (warnings.length)
        for (const warning of warnings)
            console.log(`  ${chalk.yellow('warning')} ${warning}`);
    if (errors.length)
        for (const error of errors)
            console.log(`  ${chalk.red('error')}   ${error}`);
    if (!errors.length && !warnings.length)
        console.log(`  ${chalk.green('No issues')}`);

    // If we had errors, script should exit 1
    if (errors.length) hadError = true;

    // Linebreak before next pack or exit
    console.log(chalk.reset());
}

// Exit 1 if we had errors
if (hadError) process.exit(1);
