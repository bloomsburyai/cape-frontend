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

// Configuration object
export default _.defaults(runtime, {
  api: {
    token: {
      query: 'demo'
    }
  },
  repos: {
    cape_client: 'cape-client',
    cape_webservices: 'cape-webservices',
    cape_responder: 'cape-responder',
    cape_machinereader: 'cape-machine-reader',
    cape_docqa: 'cape-document-qa',
    cape_docmanager: 'cape-document-manager',
    cape_splitter: 'cape-splitter',
    cape_apihelpers: 'cape-api-helpers',
    cape_userdb: 'cape-userdb'
  },
  links: {
    dashboardURL: '/dashboard.html',
    authenticationURL: '/authentication.html',
    licensingURL: '#licensing',
    getstartedURL: 'https://github.com/bloomsburyai/cape-webservices#cape-webservices-',
    slackURL: 'http://goo.gl/3nrh3r',
    documentationURL: '/documentation/index.html',
    tutorialReadURL: 'https://medium.com/@jonathan.godwin/91bc061e5619',
    addSlackURL: 'slack.html',
    chromeURL: 'https://chrome.google.com/webstore/detail/cape-super-powered-ctrl-f/ndpjhckhhfpcloemggoacecenhajokml?hl=en-GB&gl=GB',
    dockerhubURL: 'https://hub.docker.com/r/bloomsburyai/cape/',
    githubURL_client: 'https://github.com/bloomsburyai/cape-client',
    githubURL_webservices: 'https://github.com/bloomsburyai/cape-webservices',
    githubURL_responder: 'https://github.com/bloomsburyai/cape-responder',
    githubURL_machinereader: 'https://github.com/bloomsburyai/cape-machine-reader',
    githubURL_docqa: 'https://github.com/bloomsburyai/cape-document-qa',
    githubURL_docmanager: 'https://github.com/bloomsburyai/cape-document-manager',
    githubURL_splitter: 'https://github.com/bloomsburyai/cape-splitter',
    githubURL_apihelpers: 'https://github.com/bloomsburyai/cape-api-helpers',
    githubURL_userdb: 'https://github.com/bloomsburyai/cape-userdb',
    circlebadgeURL_client: 'https://circleci.com/gh/bloomsburyai/cape-client.svg?style=svg',
    circlebadgeURL_webservices: 'https://circleci.com/gh/bloomsburyai/cape-webservices.svg?style=svg',
    circlebadgeURL_responder: 'https://circleci.com/gh/bloomsburyai/cape-responder.svg?style=svg',
    circlebadgeURL_machinereader: 'https://circleci.com/gh/bloomsburyai/cape-machine-reader.svg?style=svg',
    circlebadgeURL_docqa: 'https://circleci.com/gh/bloomsburyai/cape-document-qa.svg?style=svg',
    circlebadgeURL_docmanager: 'https://circleci.com/gh/bloomsburyai/cape-document-manager.svg?style=svg',
    circlebadgeURL_splitter: 'https://circleci.com/gh/bloomsburyai/cape-splitter.svg?style=svg',
    circlebadgeURL_apihelpers: 'https://circleci.com/gh/bloomsburyai/cape-api-helpers.svg?style=svg',
    circlebadgeURL_userdb: 'https://circleci.com/gh/bloomsburyai/cape-userdb.svg?style=svg'
  }
})
