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

export default {
    downloadTheGeneratedConfig: '<b>Download</b> the generated config:',
    andUploadItToYourServers: 'and <b>upload</b> it to your server\'s',
    directory: 'directory.',
    or: 'or, ',
    copyBase64StringOfCompressedConfig: 'Copy a base64 string of the compressed config',
    pasteItInYourServersCommandLineAndExecute: ', paste it in your server\'s command line and execute it.',
    navigateToYourNginxConfigurationDirectoryOnYourServer: `Navigate to your ${common.nginx} <b>configuration directory</b> on your server:`,
    createABackupOfYourCurrentNginxConfiguration: `Create a <b>backup</b> of your current ${common.nginx} configuration:`,
    extractTheNewCompressedConfigurationArchiveUsingTar: '<b>Extract</b> the new compressed configuration archive using tar:',
    download: 'Download',
};
