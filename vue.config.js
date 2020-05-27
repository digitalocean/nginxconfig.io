const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    filenameHashing: false,
    productionSourceMap: false,
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
