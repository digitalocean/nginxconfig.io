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

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { defaultPack, defaultPackData } from '../util/language_pack_default';
import { toSep } from '../util/language_pack_name';
import { languagePackContext, availablePacks } from '../util/language_pack_context';

Vue.use(VueI18n);

// Load in the full default pack
const i18nPacks = {};
i18nPacks[defaultPack] = defaultPackData;
const loadedI18nPacks = [defaultPack];

// Load in languages data from other packs
// Use webpack magic to only build chunks for lang/languages.js
const languagesContext = require.context('.', true, /^\.\/[^/]+\/languages\.js$/, 'sync');
for (const availablePack of availablePacks) {
    if (availablePack === defaultPack) continue;
    i18nPacks[availablePack] = { languages: languagesContext(`./${toSep(availablePack, '-')}/languages.js`).default };
}

export const i18n = new VueI18n({
    locale: defaultPack,
    fallbackLocale: defaultPack,
    messages: i18nPacks,
});

const loadLanguagePack = pack => {
    // If same language, do nothing
    if (i18n.locale === pack) return;

    // If language already loaded, do nothing
    if (loadedI18nPacks.includes(pack)) return;

    // Load the pack with webpack magic
    return languagePackContext(`./${toSep(pack, '-')}/index.js`).then(packData => i18nPacks[pack] = packData.default);
};

export const setLanguagePack = async pack => {
    await loadLanguagePack(pack);
    i18n.locale = pack;
};
