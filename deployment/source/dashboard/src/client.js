import Client from '../../cape-client/dist/cape.js'
import configuration from './configuration'

const client = new Client(configuration.api)

/**
 * Copy constants
 */

// Threshold
client.THRESHOLD_VERY_LOW = Client.THRESHOLD_VERY_LOW
client.THRESHOLD_LOW = Client.THRESHOLD_LOW
client.THRESHOLD_MEDIUM = Client.THRESHOLD_MEDIUM
client.THRESHOLD_HIGH = Client.THRESHOLD_HIGH
client.THRESHOLD_VERY_HIGH = Client.THRESHOLD_VERY_HIGH

// Plan
client.PLAN_FREE = Client.PLAN_FREE
client.PLAN_BASIC = Client.PLAN_BASIC
client.PLAN_PRO = Client.PLAN_PRO

export default client
