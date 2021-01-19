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
    modularizedStructure: 'Structure modulaire',
    enableModularizedConfigFiles: `${common.enable} les fichiers de configuration modulaires`,
    symlinkVhost: 'Lien symbolique pour vhost',
    enableSymLinksFrom: `${common.enable} les liens symboliques depuis`,
    to: 'vers',
    shareConfiguration: 'Partager la configuration',
    resetConfiguration: 'Réinitialiser la configuration',
    resetGlobalConfig: 'Réinitialiser la configuration globale',
    resetAllDomains: 'Réinitialiser tous les domaines',
    removeAllDomains: 'Supprimer tous les domaines',
    resetAllDomainsConfig: 'Réinitialiser la configuration de tous les domaines',
    resetDomainConfig: 'Réinitialiser la configuration du domaine',
    removeDomain: 'Supprimer le domaine',
    yesImSure: 'Oui, je suis sûr(e)',
    noCancel: 'Non, annuler',
    tools: 'Outils',
    resetGlobalConfigBody: 'Voulez-vous vraiment réinitialiser toutes les options de configuration globales?',
    resetAllDomainsConfigBody: 'Voulez-vous vraiment réinitialiser les configurations de TOUS les domaines?',
    removeAllDomainsBody: 'Voulez-vous vraiment supprimer les configurations de TOUS les domaines?',
    areYouSureYouWantToResetAllConfigurationOptionsForThe: 'Voulez-vous vraiment réinitialiser toutes les options de configuration pour',
    domain: '?',
    areYouSureYouWantToRemoveThe: 'Voulez-vous vraiment supprimer',
    domainConfiguration: '?',
};
