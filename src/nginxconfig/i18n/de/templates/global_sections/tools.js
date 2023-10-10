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
    modularizedStructure: 'Modularisierte Struktur',
    enableModularizedConfigFiles: `${common.enable} modularisierte Konfigurationsdateien`,
    symlinkVhost: 'Symlink VHost',
    enableSymLinksFrom: `${common.enable} Symlinks von`,
    to: 'zu',
    shareConfiguration: 'Konfiguration teilen',
    resetConfiguration: 'Konfiguration zurücksetzen',
    resetGlobalConfig: 'Globale Konfiguration zurücksetzen',
    resetAllDomains: 'Alle Domains zurücksetzen',
    removeAllDomains: 'Alle Domains entfernen',
    resetAllDomainsConfig: 'Alle Domain-Konfigurationen entfernen',
    resetDomainConfig: 'Konfiguration zurücksetzen',
    removeDomain: 'Domain entfernen',
    yesImSure: 'Ja, ich bin sicher',
    noCancel: 'Nein, abbrechen',
    tools: 'Tools',
    resetGlobalConfigBody:
        'Bist du dir sicher, dass du alle Optionen im Bereich "Globale Konfiguration" zurücksetzen möchtest?',
    resetAllDomainsConfigBody:
        'Bist du dir sicher, dass du die Konfiguration ALLER Domains zurücksetzen möchtest?',
    removeAllDomainsBody: 'Bist du dir sicher, dass du ALLE Domains entfernen möchtest?',
    areYouSureYouWantToResetAllConfigurationOptionsForThe:
        'Bist du dir sicher, dass du die Konfiguration von',
    domain: 'zurücksetzen möchtest?',
    areYouSureYouWantToRemoveThe: 'Bist du dir sicher, dass du die Domain ',
    domainConfiguration: 'entfernen möchtest?',
};
