const utilities = require('../utilities')

module.exports = {
  label: 'login-progress',
  url: utilities.url('login', utilities.CONFIGURATION_PROGRESS),
  selectors: ['.cape-authentication-login'],
  onReadyScript: 'login-progress/ready.js'
}
