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
    modularizedStructure: 'Estructura modularizada',
    enableModularizedConfigFiles: `${common.enable} archivos de configuración modularizado`,
    symlinkVhost: 'Enlaces simbólicos de vhost',
    enableSymLinksFrom: `${common.enable} enlaces simbólicos de`,
    to: 'para',
    shareConfiguration: 'Compartir configuración',
    resetConfiguration: 'Reiniciar configuración',
    resetGlobalConfig: 'Reiniciar configuración global',
    resetAllDomains: 'Reiniciar todos los dominios',
    removeAllDomains: 'Quitar todos los dominios',
    resetAllDomainsConfig: 'Reiniciar todas las configuraciones de los dominions',
    resetDomainConfig: 'Reiniciar la configuración del dominio',
    removeDomain: 'Quitar dominio',
    yesImSure: 'Si, Estoy seguro',
    noCancel: 'No, cancelar',
    tools: 'Herramientas',
    resetGlobalConfigBody:
        '¿Estás seguro de que desea reiniciar todas las opciones de configuración en la sección de configuración global?',
    resetAllDomainsConfigBody:
        '¿Estás seguro de que desea reiniciar la configuración de TODOS los dominios?',
    removeAllDomainsBody: '¿Estás seguro de que desea quitar TODAS las configuraciones de dominio?',
    areYouSureYouWantToResetAllConfigurationOptionsForThe:
        '¿Estás seguro de que desea reiniciar todas las opciones de configuración del',
    domain: 'dominio?',
    areYouSureYouWantToRemoveThe: '¿Estás seguro de que quieres quitar la ',
    domainConfiguration: 'configuración de dominio?',
};
