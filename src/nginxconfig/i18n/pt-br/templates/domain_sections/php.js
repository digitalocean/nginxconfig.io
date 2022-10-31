/*
Copyright 2022 DigitalOcean

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
    phpIsDisabled: `O ${common.php} está desabilitado.`,
    phpCannotBeEnabledWithReverseProxy: `O ${common.php} não pode ser habilitado enquanto o proxy reverso estiver habilitado.`,
    phpCannotBeEnabledWithPython: `O ${common.php} não pode ser habilitado enquanto o ${common.python} estiver habilitado.`,
    enablePhp: `${common.enable} ${common.php}`,
    wordPressRules: `Regras do ${common.wordPress}`,
    enableWordPressRules: `${common.enable} regras específicas do ${common.wordPress}`,
    drupalRules: `Regras do ${common.drupal}`,
    enableDrupalRules: `${common.enable} regras específicas do ${common.drupal}`,
    magentoRules: `Regras do ${common.magento}`,
    enableMagentoRules: `${common.enable} regras específicas do ${common.magento}`,
    joomlaRules: `Regras do ${common.joomla}`,
    enableJoomlaRules: `${common.enable} regras específicas do ${common.joomla}`,
    phpServer: `Servidor ${common.php}`,
    phpBackupServer: `Servidor de backup ${common.php}`,
    tcp: 'TCP',
    hhvmSocket: 'Socket HHVM',
    php70Socket: 'Socket 7.0',
    php71Socket: 'Socket 7.1',
    php72Socket: 'Socket 7.2',
    php73Socket: 'Socket 7.3',
    php74Socket: 'Socket 7.4',
    php80Socket: 'Socket 8.0',
    php81Socket: 'Socket 8.1',
    php82Socket: 'Socket 8.2',
    phpSocket: 'Socket PHP',
    custom: 'Custom', // TODO: translate
    disabled: 'Desabilitado',
};
