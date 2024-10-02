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

import isObject from './is_object.js';
import deepMerge from './deep_merge.js';
import {
    accessLogPathDefault,
    accessLogParamsDefault,
    errorLogPathDefault,
    errorLogPathDisabled,
    errorLogLevelDefault,
} from './logging.js';
import { serverDomainDefault } from './defaults.js';

// Migrate old logging settings to new ones
const migrateLogging = (data) => {
    if (Object.keys(data).length === 0) return;

    const globalLogging =
        'logging' in data.global && isObject(data.global.logging) ? data.global.logging : {};

    // global access_log
    const [globalAccessLogPath, ...globalAccessLogParameters] = (
        globalLogging.accessLog || accessLogPathDefault
    ).split(' ');
    const globalAccessLogEnabled =
        !('accessLog' in globalLogging) || // accessLog was enabled by default and might not appear at all
        (globalAccessLogPath !== '' && globalAccessLogPath !== 'off'); // *or* someone turned it off explicitly

    // global error_log
    const [globalErrorLogPath, ...globalErrorLogLevel] = (
        globalLogging.errorLog || `${errorLogPathDefault} ${errorLogLevelDefault}`
    ).split(' ');
    const globalErrorLogEnabled =
        !('errorLog' in globalLogging) || // errorLog was enabled by default and might not appear at all
        (globalErrorLogPath !== '' && globalErrorLogPath !== errorLogPathDisabled); // *or* someone turned it off explicitly

    // set global access_log / error_log files for every domain UNLESS it was explicitly
    // enabled for the domain
    for (const key in data.domains) {
        if (!Object.prototype.hasOwnProperty.call(data.domains, key)) continue;

        const perDomainServer = {
            domain: serverDomainDefault,
            ...('server' in data.domains[key] && isObject(data.domains[key].server)
                ? data.domains[key].server
                : {}),
        };
        const perDomainLogging =
            'logging' in data.domains[key] && isObject(data.domains[key].logging)
                ? data.domains[key].logging
                : {};

        // access_log
        let accessLogEnabled = globalAccessLogEnabled,
            accessLogPath = globalAccessLogPath;
        const accessLogParameters = globalAccessLogParameters.join(' ') || accessLogParamsDefault;

        const perDomainAccessLogEnabled = !!perDomainLogging.accessLog;
        if (perDomainAccessLogEnabled) {
            accessLogEnabled = true;
            accessLogPath = accessLogPath.replace(
                /([^/]+)\.log$/,
                `${perDomainServer.domain}.$1.log`,
            );
        }

        // error_log
        let errorLogEnabled = globalErrorLogEnabled,
            errorLogPath = globalErrorLogPath;
        const errorLogLevel = globalErrorLogLevel.join(' ') || errorLogLevelDefault;

        const perDomainErrorLogEnabled = !!perDomainLogging.errorLog;
        if (perDomainErrorLogEnabled) {
            errorLogEnabled = true;
            errorLogPath = errorLogPath.replace(
                /([^/]+)\.log$/,
                `${perDomainServer.domain}.$1.log`,
            );
        }

        data.domains[key].logging = {
            accessLogEnabled,
            accessLogPath,
            accessLogParameters,
            errorLogEnabled,
            errorLogPath,
            errorLogLevel,
            ...perDomainLogging,
        };
    }
};

// Handle converting the old query format to our new query params
export default (data) => {
    // Handle converting old domain settings to new ones
    if ('global' in data && isObject(data.global)) {
        // Handle specifics global data
        const mappedData = {
            php: {},
        };

        // Keys to map
        const keysToMap = {
            php: ['phpServer', 'phpServerCustom', 'phpBackupServer', 'phpBackupServerCustom'],
        };

        for (const key in data.global) {
            if (!Object.prototype.hasOwnProperty.call(data.global, key)) continue;

            // Skip if key doesn't need to be mapped
            if (!Object.prototype.hasOwnProperty.call(keysToMap, key)) continue;

            for (const key2 in data.global[key]) {
                if (!Object.prototype.hasOwnProperty.call(data.global[key], key2)) continue;

                if (keysToMap[key].includes(key2)) {
                    mappedData[key][key2] = data.global[key][key2];
                }
            }
        }

        for (const key in data.domains) {
            if (!Object.prototype.hasOwnProperty.call(data.domains, key)) continue;

            // Deep merge the mapped data
            deepMerge(data.domains[key], mappedData);
        }
    }

    migrateLogging(data);
};
