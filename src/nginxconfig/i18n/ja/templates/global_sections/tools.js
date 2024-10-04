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
    modularizedStructure: 'モジュール化された構造',
    enableModularizedConfigFiles: `モジュール化された設定ファイルを${common.enable}`,
    symlinkVhost: 'Symlink vhost',
    enableSymLinksFrom: `シンボリックリンク を${common.enable} from`,
    to: 'to',
    shareConfiguration: '設定を共有する',
    resetConfiguration: '設定をリセットする',
    resetGlobalConfig: 'グローバル設定をリセットする',
    resetAllDomains: '全てのドメインをリセットする',
    removeAllDomains: '全てのドメインを削除する',
    resetAllDomainsConfig: '全てのドメインの設定をリセットする',
    resetDomainConfig: 'ドメインの設定をリセットする',
    removeDomain: 'ドメインを削除する',
    yesImSure: 'はい、大丈夫です',
    noCancel: 'いいえ、キャンセルします',
    tools: 'ツール',
    resetGlobalConfigBody: 'グローバル設定の全ての設定をリセットします、よろしいですか?',
    resetAllDomainsConfigBody: '全てのドメインの設定をリセットします、よろしいですか?',
    removeAllDomainsBody: '全てのドメインを削除します、よろしいですか?',
    areYouSureYouWantToResetAllConfigurationOptionsForThe:
        '次のドメインの設定をリセットします、よろしいですか?',
    domain: '',
    areYouSureYouWantToRemoveThe: '次のドメインの設定を削除します、よろしいですか?',
    domainConfiguration: '',
};
