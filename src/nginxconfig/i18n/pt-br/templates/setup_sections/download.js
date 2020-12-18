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
    downloadTheGeneratedConfig: '<b>Baixar</b> a configuração gerada:',
    andUploadItToYourServers: 'e <b>carregá-la</b> para o',
    directory: 'diretório.',
    or: 'ou, ',
    copyBase64StringOfCompressedConfig: 'Copiar uma string base64 da configuração compactado',
    pasteItInYourServersCommandLineAndExecute: ', colá-la na linha de comando do seu servidor e executá-la.',
    navigateToYourNginxConfigurationDirectoryOnYourServer: `Navegar até o <b>diretório de configuração</b> do ${common.nginx} em seu servidor:`,
    createABackupOfYourCurrentNginxConfiguration: `Criar um <b>backup</b> da sua configuração atual do ${common.nginx}:`,
    extractTheNewCompressedConfigurationArchiveUsingTar: '<b>Extrair</b> o novo arquivo de configuração compactado usando tar:',
    download: 'Baixar',
};
