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
    modularizedStructure: '模块化结构',
    enableModularizedConfigFiles: `${common.enable}模块化的配置文件`,
    symlinkVhost: '符号链接 vhost',
    enableSymLinksFrom: `${common.enable}符号链接`,
    to: '到',
    shareConfiguration: '分享配置',
    resetConfiguration: '重置配置',
    resetGlobalConfig: '重置全局配置',
    resetAllDomains: '重置所有站点',
    resetAllDomainsConfig: '重置所有站点',
    removeAllDomains: '删除所有站点',
    resetDomainConfig: '重置站点配置',
    removeDomain: '删除站点',
    yesImSure: '好的',
    noCancel: '取消',
    tools: '工具',
    resetGlobalConfigBody: '您确定要重置全局配置部分中的所有配置选项吗?',
    resetAllDomainsConfigBody: '您确定要重置所有站点的配置吗?',
    removeAllDomainsBody: '您确定要删除所有站点的配置吗?',
    areYouSureYouWantToResetAllConfigurationOptionsForThe: '您确定要重置',
    domain: '站点的所有配置选项吗?',
    areYouSureYouWantToRemoveThe: '你确定要删除',
    domainConfiguration: '的站点配置吗？',
};
