const _ = require('lodash')

module.exports = {
  input: function(req) {
    return _.extend({}, req.query, req.body)
  },
  outputOption: function (res, options) {
    console.log('--')
    console.log('outputOption')
    let index = Math.round(Math.random() * (options.length - 1))
    console.log('index')
    console.log(index)
    _.delay(function () {
      res.json(options[index])
    }, this.getResponseLatency())
  },
  getResponseLatency: function () {
    // return 1000 + Math.random() * 2000
    return 1000
  },
  getErrorStatus: function () {
    return Math.random() >= 0.5
    // return false
  },
  getErrorResponse: function () {
    return {
      success: false,
      result: {
        message: 'Something went wrong while processing the request.'
      }
    }
  }
}
