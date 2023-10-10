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

export const accessLogPathDefault = '/var/log/nginx/access.log';
export const accessLogParamsDefault = 'buffer=512k flush=1m';

export const errorLogPathDefault = '/var/log/nginx/error.log';
export const errorLogPathDisabled = '/dev/null';
export const errorLogLevelDefault = 'warn';
export const errorLogLevelOptions = Object.freeze([
    'debug',
    'info',
    'notice',
    'warn',
    'error',
    'crit',
    'alert',
    'emerg',
]);
export const errorLogLevelDisabled = 'none';

export const getDomainAccessLog = (domain, global) => {
    let path = domain.logging.accessLogPath.computed.trim();
    if (!path) {
        path = accessLogPathDefault;
    }

    return (
        path +
        (global.logging.cloudflare.computed ? ' cloudflare' : ' combined') +
        (domain.logging.accessLogParameters.computed.trim()
            ? ` ${domain.logging.accessLogParameters.computed.trim()}`
            : '')
    );
};

export const getDomainErrorLog = (domain) => {
    let path = domain.logging.errorLogPath.computed.trim();
    if (!path) {
        path = errorLogPathDefault;
    }

    const errorLogLevel = errorLogLevelOptions.includes(domain.logging.errorLogLevel.computed)
        ? ` ${domain.logging.errorLogLevel.computed}`
        : '';
    return `${path}${errorLogLevel}`;
};
