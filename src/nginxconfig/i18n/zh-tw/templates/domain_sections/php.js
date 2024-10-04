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
    phpIsDisabled: `${common.php} 已停用。`,
    phpCannotBeEnabledWithReverseProxy: `${common.php} 無法與${common.reverseProxy} 同時啟用。`,
    phpCannotBeEnabledWithPython: `${common.php} 無法與 ${common.python} 同時啟用。`,
    enablePhp: `${common.enable} ${common.php}`,
    wordPressRules: `${common.wordPress} 規則`,
    enableWordPressRules: `${common.enable} ${common.wordPress} 專屬規則`,
    drupalRules: `${common.drupal} 規則`,
    enableDrupalRules: `${common.enable} ${common.drupal} 專屬規則`,
    magentoRules: `${common.magento} 規則`,
    enableMagentoRules: `${common.enable} ${common.magento} 專屬規則`,
    joomlaRules: `${common.joomla} 規則`,
    enableJoomlaRules: `${common.enable} ${common.joomla} 專屬規則`,
    phpServer: `${common.php} 伺服器`,
    phpBackupServer: `${common.php} 備份伺服器`,
    tcp: 'TCP',
    hhvmSocket: 'HHVM 通訊端',
    php70Socket: '7.0 通訊端',
    php71Socket: '7.1 通訊端',
    php72Socket: '7.2 通訊端',
    php73Socket: '7.3 通訊端',
    php74Socket: '7.4 通訊端',
    php80Socket: '8.0 通訊端',
    php81Socket: '8.1 通訊端',
    php82Socket: '8.2 通訊端',
    phpSocket: 'PHP 通訊端',
    custom: '自訂',
    disabled: '停用',
};
