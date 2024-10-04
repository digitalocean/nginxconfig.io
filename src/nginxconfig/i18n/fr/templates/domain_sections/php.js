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

import common from '../../common.js';

export default {
    phpIsDisabled: `${common.php} est désactivé.`,
    phpCannotBeEnabledWithReverseProxy: `${common.php} ne peut pas être activé en même temps que le ${common.reverseProxyLower}.`,
    phpCannotBeEnabledWithPython: `${common.php} ne peut pas être activé en même temps que ${common.python}.`,
    enablePhp: `${common.enable} ${common.php}`,
    wordPressRules: `Règles ${common.wordPress}`,
    enableWordPressRules: `${common.enable} les règles spécifiques à ${common.wordPress}`,
    drupalRules: `Règles ${common.drupal}`,
    enableDrupalRules: `${common.enable} les règles spécifiques à ${common.drupal}`,
    magentoRules: `Règles ${common.magento}`,
    enableMagentoRules: `${common.enable} les règles spécifiques à ${common.magento}`,
    joomlaRules: `Règles ${common.joomla}`,
    enableJoomlaRules: `${common.enable} les règles spécifiques à ${common.joomla}`,
    phpServer: `Serveur ${common.php}`,
    phpBackupServer: `Serveur de sauvegarde ${common.php}`,
    tcp: 'TCP',
    hhvmSocket: 'Socket HHVM',
    php70Socket: 'Socket 7.0',
    php71Socket: 'Socket 7.1',
    php72Socket: 'Socket 7.2',
    php73Socket: 'Socket 7.3',
    php74Socket: 'Socket 7.4',
    php80Socket: 'Socket 8.0',
    php81Socket: 'Socket 8.1',
    php82Socket: 'Socket 8.2',
    phpSocket: 'Socket PHP',
    custom: 'Custom',
    disabled: 'Désactivé',
};
