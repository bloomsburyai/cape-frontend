const globalConfiguration = require('../../../../configuration')

let baseURL = globalConfiguration.frontend.url + '/authentication.html'

function configuration(type) {
  let timeout = 1000
  if (type === 'progress') {
    type = 'timeout'
    timeout = 10000
  }
  return {
    api: {
      backendURL: globalConfiguration.mock[type].url,
      timeout: timeout
    },
    authentication: {
      logo: {
        url: '#'
      },
      login: {
        redirectURL: ''
      }
    }
  }
}

function url(path, configuration) {
  let url = baseURL
  if (configuration) {
    url += '?configuration=' + encodeURIComponent(JSON.stringify(configuration))
  }
  if (!path) {
    path = ''
  }
  url += '#/' + path
  return url
}

module.exports = {
  url: url,
  CONFIGURATION_UNLUCKY: configuration('unlucky'),
  CONFIGURATION_ERROR: configuration('error'),
  CONFIGURATION_FULL: configuration('full'),
  CONFIGURATION_TIMEOUT: configuration('timeout'),
  CONFIGURATION_PROGRESS: configuration('progress')

}
