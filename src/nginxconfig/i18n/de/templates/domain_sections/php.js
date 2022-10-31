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

import common from '../../common';

export default {
    phpIsDisabled: `${common.php} ist deaktiviert.`,
    phpCannotBeEnabledWithReverseProxy: `${common.php} kann nicht aktiviert werden, während ein Reverse Proxy aktiviert ist.`,
    phpCannotBeEnabledWithPython: `${common.php} kann nicht aktiviert werden, während ${common.python} aktiviert ist.`,
    enablePhp: `${common.enable} ${common.php}`,
    wordPressRules: `${common.wordPress} Regeln`,
    enableWordPressRules: `${common.enable} ${common.wordPress}-spezifische Regeln`,
    drupalRules: `${common.drupal} Regeln`,
    enableDrupalRules: `${common.enable} ${common.drupal}-spezifische Regeln`,
    magentoRules: `${common.magento} Regeln`,
    enableMagentoRules: `${common.enable} ${common.magento}-spezifische Regeln`,
    joomlaRules: `${common.joomla} Regeln`,
    enableJoomlaRules: `${common.enable} ${common.joomla}-spezifische Regeln`,
    phpServer: `${common.php} Server`,
    phpBackupServer: `${common.php} Backup Server`,
    tcp: 'TCP',
    hhvmSocket: 'HHVM Socket',
    php70Socket: '7.0 Socket',
    php71Socket: '7.1 Socket',
    php72Socket: '7.2 Socket',
    php73Socket: '7.3 Socket',
    php74Socket: '7.4 Socket',
    php80Socket: '8.0 Socket',
    php81Socket: '8.1 Socket',
    php82Socket: '8.2 Socket',
    phpSocket: 'PHP Socket',
    custom: 'Benutzerdefiniert',
    disabled: 'Deaktiviert',
};
