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

import { diffLines } from 'diff';
import escape from 'escape-html';

export default (newConfFile, oldConfFile) => {
    // Get the diff
    const diff = diffLines(oldConfFile, newConfFile);

    // Wrap additions in <mark>, drop removals
    return diff.map((change, index, array) => {
        if (change.removed) return '';

        const escaped = escape(change.value);

        // Don't mark as diff if nothing changed
        if (!change.added) return escaped;

        // Don't mark as diff if only whitespace changed
        if (index > 0 && array[index - 1].removed) {
            if (array[index - 1].value.replace(/\s/g, '') === change.value.replace(/\s/g, '')) {
                return escaped;
            }
        }
        if (index < array.length - 1 && array[index + 1].removed) {
            if (array[index + 1].value.replace(/\s/g, '') === change.value.replace(/\s/g, '')) {
                return escaped;
            }
        }

        // Mark the diff, without highlighting whitespace
        return escaped
            .split('\n')
            .map(part => part.replace(/^(\s*)(.*)(\s*)$/, '$1<mark>$2</mark>$3'))
            .join('\n');
    }).join('');
};
