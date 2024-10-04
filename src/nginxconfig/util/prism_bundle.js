/*
Copyright 2024 DigitalOcean

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

import Clipboard from 'clipboard';
import Prism from 'prismjs';
import 'prismjs/components/prism-nginx.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/plugins/keep-markup/prism-keep-markup.js';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/toolbar/prism-toolbar.css';

import { warn } from './log.js';

// Custom copy to clipboard (based on the Prism one)
const copyToClipboard = () => {
    if (!Prism.plugins.toolbar) {
        warn('Copy to Clipboard loaded before Toolbar.');
        return;
    }

    Prism.plugins.toolbar.registerButton('copy-to-clipboard', (env) => {
        const linkCopy = document.createElement('button');
        linkCopy.textContent = 'Copy';

        const element = env.element;
        const clip = new Clipboard(linkCopy, {
            text: () => element.textContent,
        });

        const resetText = () => {
            setTimeout(() => {
                linkCopy.textContent = 'Copy';
            }, 5000);
        };

        const emitEvent = () => {
            linkCopy.dispatchEvent(
                new CustomEvent('copied', {
                    bubbles: true,
                    detail: { text: element.textContent },
                }),
            );
        };

        clip.on('success', () => {
            linkCopy.textContent = 'Copied!';
            emitEvent();
            resetText();
        });

        clip.on('error', () => {
            const isMac = navigator.platform.includes('Mac');
            linkCopy.textContent = `Press ${isMac ? 'Cmd' : 'Ctrl'}+C to copy`;
            resetText();
        });

        return linkCopy;
    });
};

copyToClipboard();
