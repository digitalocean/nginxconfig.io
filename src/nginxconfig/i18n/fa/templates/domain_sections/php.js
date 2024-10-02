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
    phpIsDisabled: `${common.php} غیرفعال است.`,
    phpCannotBeEnabledWithReverseProxy: `${common.php} نمی‌تواند هنگامی که پروکسی معکوس فعال است، فعال شود.`,
    phpCannotBeEnabledWithPython: `${common.php} نمی‌تواند هنگامی که ${common.python} فعال است، فعال شود.`,
    enablePhp: `${common.enable} ${common.php}`,
    wordPressRules: `قوانین ${common.wordPress}`,
    enableWordPressRules: `${common.enable} قوانین خاص ${common.wordPress}`,
    drupalRules: `قوانین ${common.drupal}`,
    enableDrupalRules: `${common.enable} قوانین خاص ${common.drupal}`,
    magentoRules: `قوانین ${common.magento}`,
    enableMagentoRules: `${common.enable} قوانین خاص ${common.magento}`,
    joomlaRules: `قوانین ${common.joomla}`,
    enableJoomlaRules: `${common.enable} قوانین خاص ${common.joomla}`,
    phpServer: `سرور ${common.php}`,
    phpBackupServer: `سرور پشتیبان ${common.php}`,
    tcp: 'TCP',
    hhvmSocket: 'سوکت HHVM',
    php70Socket: 'سوکت 7.0',
    php71Socket: 'سوکت 7.1',
    php72Socket: 'سوکت 7.2',
    php73Socket: 'سوکت 7.3',
    php74Socket: 'سوکت 7.4',
    php80Socket: 'سوکت 8.0',
    php81Socket: 'سوکت 8.1',
    php82Socket: 'سوکت 8.2',
    phpSocket: 'سوکت PHP',
    custom: 'سفارشی',
    disabled: 'غیرفعال',
};
