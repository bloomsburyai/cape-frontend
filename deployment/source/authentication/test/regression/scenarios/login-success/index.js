const utilities = require('../utilities')

module.exports = {
  label: 'login-success',
  url: utilities.url('login', utilities.CONFIGURATION_FULL),
  selectors: ['.cape-authentication-login'],
  onReadyScript: 'login-success/ready.js'
}
