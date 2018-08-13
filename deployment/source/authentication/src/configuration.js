import _ from 'lodash'
import URI from 'urijs'
import JSON from 'JSON'

import globalConfiguration from '../../configuration'

// Parse url
const uri = new URI()
const query = uri.search(true)

// Runtime configuration passed
// as query string param.
// JSON is expected.
let runtime = ''
if (_.has(query, 'configuration')) {
  try {
    runtime = JSON.parse(query.configuration)
  } catch (e) {

  }
}

// Configuration object
export default _.defaults(runtime, {
  api: null, // use "cape-client" default configuration
  authentication: {
    logo: {
      url: globalConfiguration.frontend.url
    },
    login: {
      redirectURL: globalConfiguration.frontend.url + '/dashboard.html'
    },
    register: {
      redirectURL: globalConfiguration.frontend.url + '/authentication.html'
    },
    oauth: {
      error: {
        redirectURL: globalConfiguration.frontend.url + '/authentication.html#/login/error'
      },
      success: {
        redirectURL: globalConfiguration.frontend.url + '/dashboard.html'
      }
    }
  }
})
