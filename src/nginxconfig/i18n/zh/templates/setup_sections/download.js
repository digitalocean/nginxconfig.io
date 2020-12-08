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
    downloadTheGeneratedConfig: '<b>下载</b> 生成的配置:',
    andUploadItToYourServers: '然后 <b>上传</b> 到你的服务器的',
    directory: '目录.',
    or: '或, ',
    copyBase64StringOfCompressedConfig: '复制压缩配置的base64字符串',
    pasteItInYourServersCommandLineAndExecute: '，将其粘贴到服务器的命令行并执行。',
    navigateToYourNginxConfigurationDirectoryOnYourServer: `进入你的 ${common.nginx}服务器上的<b>配置目录</b>:`,
    createABackupOfYourCurrentNginxConfiguration: `创建当前${common.nginx}配置的<b>备份</b>:`,
    extractTheNewCompressedConfigurationArchiveUsingTar: '使用tar<b>解压</b>新的压缩配置',
    download: '下载',
};
