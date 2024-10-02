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
    modularizedStructure: '模組化結構',
    enableModularizedConfigFiles: `${common.enable}模組化的設定檔案`,
    symlinkVhost: '符號連結 vhost',
    enableSymLinksFrom: `${common.enable}符號連結`,
    to: '到',
    shareConfiguration: '分享設定',
    resetConfiguration: '重置設定',
    resetGlobalConfig: '重置全域設定',
    resetAllDomains: '重置所有網域',
    removeAllDomains: '移除所有網域',
    resetAllDomainsConfig: '重置所有網域',
    resetDomainConfig: '重置網域設定',
    removeDomain: '移除網域',
    yesImSure: '是，我確定',
    noCancel: '取消',
    tools: '工具',
    resetGlobalConfigBody: '您確定要重置全域設定中的所有設定嗎？',
    resetAllDomainsConfigBody: '您確定要重置所有網域的設定嗎？',
    removeAllDomainsBody: '您確定要移除所有網域的設定嗎？',
    areYouSureYouWantToResetAllConfigurationOptionsForThe: '您確定要重置',
    domain: '網域的所有設定嗎？',
    areYouSureYouWantToRemoveThe: '您確定要移除',
    domainConfiguration: '的網域設定嗎？',
};
