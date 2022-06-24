/*
Copyright 2021 DigitalOcean

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

import isObject from './is_object';
import deepMerge from './deep_merge';

// Handle converting the old query format to our new query params
export default data => {
    // Handle converting old domain settings to new ones
    if ('global' in data && isObject(data.global)) {
        // Handle specifics global data
        const mappedData = {
            php: {},
        };

        // Keys to map
        const keysToMap = {
            php: [
                'phpServer',
                'phpServerCustom',
                'phpBackupServer',
                'phpBackupServerCustom',
            ],
        };

        for (const key in data.global) {
            if (!Object.prototype.hasOwnProperty.call(data.global, key)) continue;

            // Skip if key doesn't need to be mapped
            if (!Object.prototype.hasOwnProperty.call(keysToMap, key)) continue;

            for (const key2 in data.global[key]) {
                if (!Object.prototype.hasOwnProperty.call(data.global[key], key2)) continue;

                if (keysToMap[key].includes(key2)) {
                    mappedData[key][key2] = data.global[key][key2];
                }
            }
        }

        for (const key in data.domains) {
            if (!Object.prototype.hasOwnProperty.call(data.domains, key)) continue;

            // Deep merge the mapped data
            deepMerge(data.domains[key], mappedData);
        }
    }
};
