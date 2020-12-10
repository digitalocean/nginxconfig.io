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

import common from '../../common';

export default {
    phpIsDisabled: `${common.php}已禁用。`,
    phpCannotBeEnabledWithReverseProxy: `${common.php}在启用${common.reverseProxy}时无法启用。`,
    phpCannotBeEnabledWithPython: `${common.php} 在启用${common.python}时无法启用。`,
    enablePhp: `${common.enable} ${common.php}`,
    wordPressRules: `${common.wordPress} 规则`,
    enableWordPressRules: `${common.enable} ${common.wordPress}专属规则`,
    drupalRules: `${common.drupal} 规则`,
    enableDrupalRules: `${common.enable} ${common.drupal}专属规则`,
    magentoRules: `${common.magento} 规则`,
    enableMagentoRules: `${common.enable} ${common.magento}专属规则`,
    joomlaRules: `${common.joomla} 规则`,
    enableJoomlaRules: `${common.enable} ${common.joomla}专属规则`,
};
