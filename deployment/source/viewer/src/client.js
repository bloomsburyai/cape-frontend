import Client from '../../cape-client/dist/cape.js'
import configuration from './configuration'

const client = new Client(configuration.api)

export default client
