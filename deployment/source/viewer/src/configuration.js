import _ from 'lodash'
// import globalConfiguration from '../../configuration'

const runtime = {}

// Configuration object
export default _.defaults(runtime, {
  api: null // use "cape-client" default configuration
})
