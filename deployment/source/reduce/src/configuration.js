import _ from 'lodash'
import URI from 'urijs'
import JSON from 'JSON'

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

// Configuration object
export default _.defaults(runtime, {
  api: null, // use "cape-client" default configuration
  query: null
})
