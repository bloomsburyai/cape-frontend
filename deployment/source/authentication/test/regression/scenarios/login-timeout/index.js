const utilities = require('../utilities')

module.exports = {
  label: 'login-timeout',
  url: utilities.url('login', utilities.CONFIGURATION_TIMEOUT),
  selectors: ['.cape-authentication-login'],
  onReadyScript: 'login-timeout/ready.js'
}
