const utilities = require('./utilities')

const model = require('./map').user

module.exports = {
  setupRoutes: function (app) {
    app.all(model.token.query.get.path, function (req, res) {
      utilities.outputOption(res, [
        {
          success: true,
          result: {
            userToken: 'oatQ7nJPwmSrBMZ9MYniycS8tduZTES3o0WU717Qea4'
          }
        }
      ])
    })
  }
}
