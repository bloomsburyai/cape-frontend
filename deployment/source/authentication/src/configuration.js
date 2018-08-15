import _ from 'lodash'
import URI from 'urijs'
import JSON from 'JSON'

// import globalConfiguration from '../../configuration'

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
      url: '/?configuration=' + JSON.stringify(runtime)
    },
    login: {
      redirectURL: '/dashboard.html?configuration=' + JSON.stringify(runtime)
    },
    register: {
      redirectURL: '/authentication.html?configuration=' + JSON.stringify(runtime)
    },
    oauth: {
      error: {
        redirectURL: '/authentication.html#/login/error?configuration=' + JSON.stringify(runtime)
      },
      success: {
        redirectURL: '/dashboard.html?configuration=' + JSON.stringify(runtime)
      }
    }
  }
})
