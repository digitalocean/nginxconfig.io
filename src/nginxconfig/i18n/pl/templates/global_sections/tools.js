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

import common from '../../common';

export default {
    modularizedStructure: 'Struktura modułowa',
    enableModularizedConfigFiles: `${common.enable} pliki w strukturze modułowej`,
    symlinkVhost: 'Symlink vhost',
    enableSymLinksFrom: `${common.enable} symlinki z`,
    to: 'do',
    shareConfiguration: 'Udostępnij konfigurację',
    resetConfiguration: 'Zresetuj konfigurację',
    resetGlobalConfig: 'Zresetuj globalną konfigurację',
    resetAllDomains: 'Zresetuj wszystkie domeny',
    removeAllDomains: 'Usuń wszystkie domeny',
    resetAllDomainsConfig: 'Zresetuj wszystkie konfiguracje domen',
    resetDomainConfig: 'Zresetuj konfigurację domeny',
    removeDomain: 'Usuń domenę',
    yesImSure: 'Tak, jestem pewien',
    noCancel: 'Nie, poniechaj',
    tools: 'Narzędzia',
    resetGlobalConfigBody:
        'Czy na pewno chcesz zresetować wszystkie opcje konfiguracji w sekcji konfiguracji globalnej?',
    resetAllDomainsConfigBody: 'Czy na pewno chcesz zresetować konfigurację WSZYSTKICH domen?',
    removeAllDomainsBody: 'Czy na pewno chcesz usunąć WSZYSTKIE konfiguracje domeny?',
    areYouSureYouWantToResetAllConfigurationOptionsForThe:
        'Czy na pewno chcesz zresetować wszystkie opcje konfiguracji domeny',
    domain: '?',
    areYouSureYouWantToRemoveThe: 'Czy napewno chcesz usunąć konfigurację dla domeny ',
    domainConfiguration: '?',
};
