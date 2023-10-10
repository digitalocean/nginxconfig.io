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

import { promises as fs } from 'fs';
import { URL } from 'url';
import fetch from 'node-fetch';

const main = async () => {
    const resp = await fetch('https://assets.digitalocean.com/prism/prism.css');
    const text = await resp.text();

    // Fix $676767 -> #676767
    const fixed = text.replace(/:\s*\$((?:[0-9a-fA-F]{3}){1,2});/g, ':#$1;');

    const buildDir = '../../../build';
    await fs.writeFile(new URL(`${buildDir}/prism.css`, import.meta.url), fixed);
};

main()
    .then(() => {})
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
