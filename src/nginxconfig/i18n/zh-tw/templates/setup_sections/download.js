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
    downloadTheGeneratedConfig: '<b>下載</b>產生的設定：',
    andUploadItToYourServers: '然後<b>上傳</b>到您的伺服器的',
    directory: '目錄。',
    or: '或',
    copyBase64StringOfCompressedConfig: '複製壓縮過的設定的 base64 字串',
    pasteItInYourServersCommandLineAndExecute: '，將其貼到伺服器的命令列並執行。',
    navigateToYourNginxConfigurationDirectoryOnYourServer: `前往您的 ${common.nginx} 伺服器的<b>設定資料夾</b>：`,
    createABackupOfYourCurrentNginxConfiguration: `建立${common.nginx} 目前設定的<b>備份</b>：`,
    extractTheNewCompressedConfigurationArchiveUsingTar: '使用 tar <b>解壓縮</b>新的設定：',
    download: '下載',
};
