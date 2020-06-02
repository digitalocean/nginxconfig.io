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

export default {
    commentOutSslDirectivesInConfiguration: 'Comment out SSL related directives in the configuration:',
    reloadYourNginxServer: 'Reload your NGINX server:',
    obtainSslCertificatesFromLetsEncrypt: 'Obtain SSL certificates from Let\'s Encrypt using Certbot:',
    uncommentSslDirectivesInConfiguration: 'Uncomment SSL related directives in the configuration:',
    configureCertbotToReloadNginxOnCertificateRenewal: 'Configure Certbot to reload NGINX when it successfully renews certificates:',
    certbotDoesNotNeedToBeSetupForYourConfiguration: 'Certbot does not need to be set up for your NGINX configuration.',
    certbot: 'Certbot',
};
