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

import { createI18n } from 'vue-i18n';
import { defaultPack, defaultPackData, toSep, availablePacks } from '../util/language_packs.js';

// Load in the full default pack
const i18nPacks = {};
i18nPacks[defaultPack] = defaultPackData;
const loadedI18nPacks = [defaultPack];

// Cache the i18n instance
let i18n = null;

export const getI18n = async () => {
    // Use cached if available
    if (i18n) return i18n;

    // Load in languages data from other packs
    // Use webpack magic to only build chunks for lang/languages.js
    // These are eagerly loaded by Webpack, so don't generate extra chunks, and return an already resolved Promise
    for (const availablePack of availablePacks) {
        if (availablePack === defaultPack) continue;
        if (i18nPacks[availablePack]) continue;
        const { default: languageData } = await import(
            /* webpackInclude: /i18n[\/\\][^\/\\]+[\/\\]languages\.js$/ */
            /* webpackMode: "eager" */
            `./${toSep(availablePack, '-')}/languages.js`
        );
        i18nPacks[availablePack] = { languages: languageData };
    }

    // Store and return the i18n instance with the loaded packs
    i18n = createI18n({
        locale: defaultPack,
        fallbackLocale: defaultPack,
        messages: i18nPacks,
    });
    return i18n;
};

const loadLanguagePack = async (pack) => {
    // If same language, do nothing
    if (i18n.locale === pack) return;

    // If language already loaded, do nothing
    if (loadedI18nPacks.includes(pack)) return;

    // Load in the full pack
    // Use webpack magic to only build chunks for lang/index.js
    const { default: packData } = await import(
        /* webpackInclude: /i18n[\/\\][^\/\\]+[\/\\]index\.js$/ */
        /* webpackMode: "lazy" */
        `./${toSep(pack, '-')}/index.js`
    );
    i18nPacks[pack] = packData;
};

export const setLanguagePack = async (pack) => {
    // If i18n not loaded, do nothing
    if (!i18n) return;

    // Load the pack if not already loaded, and set it as active
    await loadLanguagePack(pack);
    i18n.global.locale = pack;
};
