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

const path = require('path');
const { LimitChunkCountPlugin } = require('webpack').optimize;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    filenameHashing: false,
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new LimitChunkCountPlugin({
                maxChunks: 1,
            }),
            process.argv.includes('--analyze') && new BundleAnalyzerPlugin(),
            process.argv.includes('--analyze') && new DuplicatePackageCheckerPlugin(),
        ].filter(x => !!x),
    },
    chainWebpack: config => {
        // Use a custom HTML template
        config.plugin('html').tap(options => {
            options[0].template = path.join(__dirname, 'build', 'index.html');
            return options;
        });
    },
};
