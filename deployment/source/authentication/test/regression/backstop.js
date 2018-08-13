const nodePath = require('path')
const JSON = require('JSON')

const scenarios = require('./scenarios')

function path(dir) {
  return nodePath.join('test/regression', dir).toString()
}

let configuration = {
  id: 'cape-authentication',
  viewports: [
    {
      label: 'xl',
      width: 1440,
      height: 900
    }
  ],
  onBeforeScript: 'before.js',
  onReadyScript: 'ready.js',
  scenarios: scenarios,
  paths: {
    bitmaps_reference: path('backstop_data/bitmaps_reference'),
    bitmaps_test: path('backstop_data/bitmaps_test'),
    engine_scripts: path('scenarios'),
    html_report: path('backstop_data/html_report'),
    ci_report: path('backstop_data/ci_report')
  },
  report: ['browser', 'CI'],
  engine: 'chrome', // PhantomJS if empty
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
  ci: {
    testReportFileName: 'test-results',
    testSuiteName: 'Visual regression'
  }
}

module.exports = configuration
