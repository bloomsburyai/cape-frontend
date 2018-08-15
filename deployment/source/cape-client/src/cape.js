import _ from 'lodash'
import axios from 'axios'

import globalConfiguration from '../../configuration'
import * as constants from './constants'
import ClientError from './Error'

import Authentication from './resources/Authentication'
import Document from './resources/Document'
import Inbox from './resources/Inbox'
import Query from './resources/Query'
import Reply from './resources/Reply'
import User from './resources/User'
import Annotation from './resources/Annotation'
import Log from './resources/Log'

// List of resources that the API exposes
const resources = {
  authentication: Authentication,
  document: Document,
  inbox: Inbox,
  query: Query,
  reply: Reply,
  user: User,
  annotation: Annotation,
  log: Log
}

// Default API configuration
const defaultConfiguration = {
  backendURL: globalConfiguration.backend.url,
  timeout: 60000,
}

// Client class
class Client {
  constructor (configuration) {
    this._configuration = null
    this._axios = null
    this.configuration = configuration
    this._setupResources()
  }
  // configuration setter
  // once a new value is received, it is merged
  // with the default one and a new instance of
  // axios is generated
  set configuration (value) {
    this._configuration = _.defaultsDeep(value, defaultConfiguration)
    this._axios = axios.create({
      baseURL: this._configuration.backendURL,
      timeout: this._configuration.timeout,
      withCredentials: true
    })
  }
  // configuration getter
  get configuration () {
    return this._configuration
  }
  // _setupResources iterates over the listed resources,
  // intantiates them passing a reference to this object
  // and defines a property where the resource can be
  // accessed from
  _setupResources () {
    let Resource = null
    for (let key in resources) {
      Resource = resources[key]
      this[key] = new Resource(this)
    }
  }
}

// Expose constants
_.extend(Client, constants)

// Expose ClientError class
Client.Error = ClientError

export default Client
