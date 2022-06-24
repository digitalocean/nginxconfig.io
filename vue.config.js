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

import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import WebpackRequireFrom from 'webpack-require-from';
import { URL, fileURLToPath } from 'url';

export default {
    publicPath: './',
    outputDir: 'dist',
    filenameHashing: false, // Don't hash the output, so we can embed on the DigitalOcean Community
    productionSourceMap: false,
    devServer: {
        historyApiFallback: false, // Don't serve index.html for 404s in dev
    },
    configureWebpack: {
        node: false, // Disable Node.js polyfills (Buffer etc.) -- This will be default in Webpack 5
        plugins: [
            // Fix dynamic imports from CDN (inject as first entry point before any imports can happen)
            { apply: compiler => {
                compiler.options.entry.app.import.unshift(
                    fileURLToPath(new URL('src/nginxconfig/build/webpack-dynamic-import.js', import.meta.url)),
                );
            } },
            new WebpackRequireFrom({ methodName: '__webpackDynamicImportURL', suppressErrors: true }),
            // Pass the env in for logging
            new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
            // Analyze the bundle
            new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
            new DuplicatePackageCheckerPlugin(),
        ],
    },
    chainWebpack: config => {
        // Inject resolve-url-loader into the SCSS loader rules (to allow relative fonts in do-bulma to work)
        for (const rule of ['vue-modules', 'vue', 'normal-modules', 'normal']) {
            config.module.rule('scss')
                .oneOf(rule)
                .use('resolve-url-loader')
                .loader('resolve-url-loader')
                .before('sass-loader')
                .end()
                .use('sass-loader')
                .loader('sass-loader')
                .tap(options => ({ ...options, sourceMap: true }));
        }

        // Use a custom HTML template
        config.plugin('html').tap(options => {
            options[0].template = fileURLToPath(new URL('build/index.html', import.meta.url));
            return options;
        });
    },
};
