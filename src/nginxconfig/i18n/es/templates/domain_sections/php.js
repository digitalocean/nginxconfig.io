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
    phpIsDisabled: `${common.php} esta desactivado.`,
    phpCannotBeEnabledWithReverseProxy: `${common.php} no se puede habilitar mientras el proxy inverso está habilitado.`,
    phpCannotBeEnabledWithPython: `${common.php} no se puede habilitar mientras ${common.python} está habilitado.`,
    enablePhp: `${common.enable} ${common.php}`,
    wordPressRules: `Reglas de ${common.wordPress}`,
    enableWordPressRules: `${common.enable} reglas especificas de ${common.wordPress}`,
    drupalRules: `Reglas de ${common.drupal}`,
    enableDrupalRules: `${common.enable} reglas especificas de ${common.drupal}`,
    magentoRules: `Reglas de ${common.magento}`,
    enableMagentoRules: `${common.enable} reglas especificas de ${common.magento}`,
    joomlaRules: `Reglas de ${common.joomla}`,
    enableJoomlaRules: `${common.enable} reglas especificas de ${common.joomla}`,
    phpServer: `Servidor ${common.php}`,
    phpBackupServer: `Servidor ${common.php} de respaldo`,
    tcp: 'TCP',
    hhvmSocket: 'HHVM socket',
    php70Socket: '7.0 socket',
    php71Socket: '7.1 socket',
    php72Socket: '7.2 socket',
    php73Socket: '7.3 socket',
    php74Socket: '7.4 socket',
    php80Socket: '8.0 socket',
    php81Socket: '8.1 socket',
    php82Socket: '8.2 socket',
    phpSocket: 'PHP socket',
    custom: 'Personalizado',
    disabled: 'Desactivado',
};
