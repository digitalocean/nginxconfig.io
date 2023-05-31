/*
Copyright 2023 DigitalOcean

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

const certbot = 'Certbot';

export default {
    commentOutSslDirectivesInConfiguration: `Commentez les directives relatives à ${common.ssl}:`,
    sslOffDeprecationWarning: `Cette commande ajoutera une directive temporaire <code class="slim">ssl off</code> pour s'assurer que les directives ${common.ssl} ne sont pas actives. Cela peut amener ${common.nginx} à émettre un avertissement, qui peut être ignoré en toute sécurité. La directive sera supprimée une fois que ${certbot} sera configuré.`,
    reloadYourNginxServer: `Relancez le serveur ${common.nginx}:`,
    obtainSslCertificatesFromLetsEncrypt: `Obtenez les certificats ${common.ssl} de ${common.letsEncrypt} à l'aide de ${certbot}:`,
    uncommentSslDirectivesInConfiguration: `Décommentez les directives relatives à ${common.ssl}:`,
    configureCertbotToReloadNginxOnCertificateRenewal: `Configurez ${certbot} pour relancer ${common.nginx} lors du renouvellement des certificats:`,
    certbotDoesNotNeedToBeSetupForYourConfiguration: `Il est inutile de configurer ${certbot} pour votre configuration ${common.nginx}.`,
    certbot,
};
