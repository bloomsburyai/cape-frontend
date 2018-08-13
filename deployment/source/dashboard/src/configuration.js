import _ from 'lodash'
import URI from 'urijs'
import JSON from 'JSON'

import globalConfiguration from '../../configuration'

// Parse url
const uri = new URI()
const query = uri.search(true)

// Runtime configuration passes
// as query string param.
// JSON is expected.
let runtime = ''
if (_.has(query, 'configuration')) {
  try {
    runtime = JSON.parse(query.configuration)
  } catch (e) {

  }
}

// Test configuration
if (process && process.env && process.env.NODE_ENV === 'testing') {
  runtime = {
    api: {
      backendURL: '',
      timeout: 1000
    }
  }
}
// // Development configuration
// if (process && process.env && process.env.NODE_ENV === 'development') {}

const authenticationURL = globalConfiguration.frontend.url + '/authentication.html'

// Configuration object
export default _.defaults(runtime, {
  api: null, // use "cape-client" default configuration
  authentication: {
    failure: {
      redirectURL: authenticationURL
    },
    logout: {
      redirectURL: authenticationURL
    }
  },
  links: {
    documentationURL: globalConfiguration.frontend.url + '/documentation/index.html',
    issueTrackerURL: 'https://github.com/bloomsburyai/cape-issue-tracker/issues',
    pythonClientURL: 'http://cape-client.readthedocs.io/'
  }
})
