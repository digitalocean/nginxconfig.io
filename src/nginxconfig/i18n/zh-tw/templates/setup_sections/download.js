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
    downloadTheGeneratedConfig: '<b>下載</b> 產生的配置：',
    andUploadItToYourServers: '然後<b>上傳</b>到你的伺服器的',
    directory: '目錄.',
    or: '或, ',
    copyBase64StringOfCompressedConfig: '複製壓縮配置的base64字串',
    pasteItInYourServersCommandLineAndExecute: '，將其粘貼到伺服器的命令列並執行。',
    navigateToYourNginxConfigurationDirectoryOnYourServer: `進入你的${common.nginx}伺服器上的<b>配置資料夾</b>:`,
    createABackupOfYourCurrentNginxConfiguration: `創建當前${common.nginx}配置的<b>備份</b>:`,
    extractTheNewCompressedConfigurationArchiveUsingTar: '使用tar<b>解壓</b>新的壓縮配置',
    download: '下載',
};
