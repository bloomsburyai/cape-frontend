import Client from '../../cape-client/dist/cape.js'
import configuration from './configuration'

const client = new Client(configuration.api)

/**
 * Copy constants
 */

// Source
client.SOURCE_ALL = Client.SOURCE_ALL
client.SOURCE_REPLY = Client.SOURCE_REPLY
client.SOURCE_DOCUMENT = Client.SOURCE_DOCUMENT

export default client
