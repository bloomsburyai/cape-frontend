
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/dashboard.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'dashboard',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      /*
      '**': {
        target: 'https://ui.thecape.ai/mock/full/api/0.1',
        changeOrigin: true,
        filter: function(pathname, req) {
          return
            // inbox
            pathname.match('^/get-inbox') ||
            pathname.match('^/mark-inbox-read') ||
            pathname.match('^/link-inbox-to-reply') ||
            pathname.match('^/unlink-inbox-from-reply') ||
            // saved replies
            pathname.match('^/get-saved-replies') ||
            pathname.match('^/create-saved-reply') ||
            pathname.match('^/delete-saved-reply') ||
            // documents
            pathname.match('^/get-documents') ||
            pathname.match('^/upload-document') ||
            pathname.match('^/delete-document')
        }
      }
      */
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
