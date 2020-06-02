/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import common from '../../common';

const certbot = 'Certbot';

export default {
    commentOutSslDirectivesInConfiguration: `Comment out ${common.ssl} related directives in the configuration:`,
    reloadYourNginxServer: `Reload your ${common.nginx} server:`,
    obtainSslCertificatesFromLetsEncrypt: `Obtain ${common.ssl} certificates from ${common.letsEncrypt} using ${certbot}:`,
    uncommentSslDirectivesInConfiguration: `Uncomment ${common.ssl} related directives in the configuration:`,
    configureCertbotToReloadNginxOnCertificateRenewal: `Configure ${certbot} to reload ${common.nginx} when it successfully renews certificates:`,
    certbotDoesNotNeedToBeSetupForYourConfiguration: `${certbot} does not need to be set up for your ${common.nginx} configuration.`,
    certbot,
};
