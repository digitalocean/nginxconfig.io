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

const certbot = 'Certbot';

export default {
    commentOutSslDirectivesInConfiguration: `設定中の ${common.ssl} 関連ディレクティブをコメントアウトします:`,
    sslOffDeprecationWarning: `This command will add a temporary <code class="slim">ssl off</code> directive to ensure that ${common.ssl} directives are not active. This may cause ${common.nginx} to emit a warning, which is safe to ignore. The directive will be removed once ${certbot} is configured.`, // TODO: translate
    reloadYourNginxServer: `${common.nginx} サーバをリロードします:`,
    obtainSslCertificatesFromLetsEncrypt: `${certbot} を利用して、 ${common.ssl} 証明書を ${common.letsEncrypt} から取得します:`,
    uncommentSslDirectivesInConfiguration: `設定中の ${common.ssl} 関連ディレクティブのコメントアウトを外します:`,
    configureCertbotToReloadNginxOnCertificateRenewal: `証明書の更新に成功したら ${certbot} が ${common.nginx} をリロードするように設定します:`,
    certbotDoesNotNeedToBeSetupForYourConfiguration: `${certbot} は、${common.nginx}の設定に合わせて設定する必要はありません。`,
    certbot,
};
