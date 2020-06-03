/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    filenameHashing: false,
    //productionSourceMap: false,
    configureWebpack: {
        plugins: [
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
