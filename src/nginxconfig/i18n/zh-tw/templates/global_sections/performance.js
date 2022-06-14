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
    disableHtmlCaching: 'Disable HTML caching', // TODO: translate
    enableDisableHtmlCaching: 'disable HTML caching', // TODO: translate
    gzipCompression: 'Gzip 壓縮',
    enableGzipCompression: `${common.enable} Gzip 壓縮`,
    brotliCompression: 'Brotli 壓縮',
    enableBrotliCompression: `${common.enable} brotli 壓縮`,
    brotliIsANonStandardModule: 'Brotli 不是標準的 NGINX 模組，請參考 ',
    brotliGoogleNgxBrotliProject: 'Google 的 ngx_brotli 專案',
    brotliForBuildingNginxWithBrotli: ' 來了解如何建置支援 Brotli 的 NGINX!',
    expirationForAssets: '資源有效期',
    expirationForMedia: '媒體資源有效期',
    expirationForSvgs: 'SVG 有效期',
    expirationForFonts: '字體有效期',
    performance: '效能',
};
