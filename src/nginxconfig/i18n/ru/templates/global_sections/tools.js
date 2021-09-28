/*
Copyright 2021 DigitalOcean

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
    modularizedStructure: 'Модульная структура',
    enableModularizedConfigFiles: `${common.enable} модульную структуру для файлов конфигурации`,
    symlinkVhost: 'Symlink vhost',
    enableSymLinksFrom: `${common.enable} symlinks из`,
    to: 'в',
    shareConfiguration: 'Поделиться конфигурацией',
    resetConfiguration: 'Сбросить конфигурацию',
    resetGlobalConfig: 'Сбросить глобальную конфигурацию',
    resetAllDomains: 'Сбросить все домены',
    removeAllDomains: 'Удалить все домены',
    resetAllDomainsConfig: 'Сбросить конфигурации всех доменов',
    resetDomainConfig: 'Сбросить конфигурацию домена',
    removeDomain: 'Удалить домен',
    yesImSure: 'Да, я уверен',
    noCancel: 'Нет, отменить',
    tools: 'Инструменты',
    resetGlobalConfigBody: 'Вы уверены, что хотите сбросить все параметры конфигурации в разделе глобальной конфигурации?',
    resetAllDomainsConfigBody: 'Вы уверены, что хотите сбросить конфигурацию ВСЕХ доменов?',
    removeAllDomainsBody: 'Вы действительно хотите удалить ВСЕ конфигурации домена?',
    areYouSureYouWantToResetAllConfigurationOptionsForThe: 'Вы действительно хотите сбросить все параметры конфигурации для',
    domain: 'домена?',
    areYouSureYouWantToRemoveThe: 'Вы уверены, что желаете удалить ',
    domainConfiguration: 'конфигурацию домена?',
};
