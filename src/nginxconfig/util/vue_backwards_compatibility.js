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
// Handle converting the old query format to our new query params
export default (data, domains) => {
    // Handle converting domain settings
    if ('global' in data && isObject(data.global)) {
        for (const key in data.global) {
            // Don't include inherited props
            if (!Object.prototype.hasOwnProperty.call(data.global, key)) continue;

            // Check this is an object
            if (!isObject(data.global[key])) continue;

            for (const index in domains) {
                // Handle converting old domain settings to new ones
                if (isObject(data.global.php)) {
                    if(data.global.php.phpServer)  domains[index].php.phpServer.value = data.global.php.phpServer;
                    if(data.global.php.phpServerCustom)  domains[index].php.phpServerCustom.value = data.global.php.phpServerCustom;
                    if(data.global.php.phpBackupServer)  domains[index].php.phpBackupServer.value = data.global.php.phpBackupServer;
                    if(data.global.php.phpBackupServerCustom)  domains[index].php.phpBackupServerCustom.value = data.global.php.phpBackupServerCustom;
                }
            }
        }
    }
};
