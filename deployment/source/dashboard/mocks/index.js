const bodyParser = require('body-parser')

module.exports = function(app) {
  app.use(bodyParser.json())
  require('./query').setupRoutes(app)
  require('./user').setupRoutes(app)
  require('./inbox').setupRoutes(app)
  require('./replies').setupRoutes(app)
  require('./documents').setupRoutes(app)
}
