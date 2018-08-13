const utilities = require('../utilities')

module.exports = {
  label: 'login-error',
  url: utilities.url('login', utilities.CONFIGURATION_ERROR),
  selectors: ['.cape-authentication-login'],
  onReadyScript: 'login-error/ready.js'
}
