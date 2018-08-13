const utilities = require('../utilities')

module.exports = {
  label: 'login-unlucky',
  url: utilities.url('login', utilities.CONFIGURATION_UNLUCKY),
  selectors: ['.cape-authentication-login'],
  onReadyScript: 'login-unlucky/ready.js'
}
