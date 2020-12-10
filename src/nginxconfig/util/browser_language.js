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

import * as i18nPacks from '../i18n';

const toPack = locale => locale.split('-', 2)[0].toLowerCase() + (locale.split('-', 2)[1] || '').toUpperCase();

export default () => {
    if (typeof window === 'object' && typeof window.navigator === 'object') {
        const userLocales = new Set();

        // Get the user languages
        if (Array.isArray(window.navigator.languages))
            window.navigator.languages.forEach(locale => userLocales.add(locale));
        if (typeof window.navigator.language === 'string')
            userLocales.add(window.navigator.language);
        if (Intl && 'DateTimeFormat' in Intl)
            userLocales.add(Intl.DateTimeFormat().resolvedOptions().locale);

        // Try to find an exact region/language match
        const i18nPackLocales = Object.keys(i18nPacks);
        const exactMatch = [...userLocales.values()].find(locale => i18nPackLocales.includes(toPack(locale)));
        if (exactMatch) return exactMatch;

        // Build a map of languages to pack
        const i18nPackLanguages = i18nPackLocales.reduce((map, pack) => {
            const lang = pack.match(/^[a-z]+/)[0];
            if (!(lang in map)) map[lang] = pack;
            return map;
        }, {});

        // Try to match a user language to a pack language
        const langMatch = [...userLocales.values()].find(x => i18nPackLanguages.includes(x.split('-')[0].toLowerCase()));
        if (langMatch) return i18nPackLanguages[langMatch];
    }
};
