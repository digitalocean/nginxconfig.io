const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    filenameHashing: false,
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            process.argv.includes('--analyze') && new BundleAnalyzerPlugin(),
        ].filter(x => !!x),
    },
    chainWebpack: config => {
        // Use a custom HTML template
        config.plugin('html').tap(options => {
            options[0].template = path.join(__dirname, 'build', 'index.html');
            return options;
        });
    },
}
