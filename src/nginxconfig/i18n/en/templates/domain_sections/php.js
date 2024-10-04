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
    phpIsDisabled: `${common.php} is disabled.`,
    phpCannotBeEnabledWithReverseProxy: `${common.php} cannot be enabled whilst the reverse proxy is enabled.`,
    phpCannotBeEnabledWithPython: `${common.php} cannot be enabled whilst ${common.python} is enabled.`,
    enablePhp: `${common.enable} ${common.php}`,
    wordPressRules: `${common.wordPress} rules`,
    enableWordPressRules: `${common.enable} ${common.wordPress}-specific rules`,
    drupalRules: `${common.drupal} rules`,
    enableDrupalRules: `${common.enable} ${common.drupal}-specific rules`,
    magentoRules: `${common.magento} rules`,
    enableMagentoRules: `${common.enable} ${common.magento}-specific rules`,
    joomlaRules: `${common.joomla} rules`,
    enableJoomlaRules: `${common.enable} ${common.joomla}-specific rules`,
    phpServer: `${common.php} server`,
    phpBackupServer: `${common.php} backup server`,
    tcp: 'TCP',
    hhvmSocket: 'HHVM socket',
    php70Socket: '7.0 socket',
    php71Socket: '7.1 socket',
    php72Socket: '7.2 socket',
    php73Socket: '7.3 socket',
    php74Socket: '7.4 socket',
    php80Socket: '8.0 socket',
    php81Socket: '8.1 socket',
    php82Socket: '8.2 socket',
    phpSocket: 'PHP socket',
    custom: 'Custom',
    disabled: 'Disabled',
};
