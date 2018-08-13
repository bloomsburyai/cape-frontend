import _ from 'lodash'
import map from '../map'
import Resource from '../Resource'
import ClientError from '../Error'

/**
 *
 * Platform resource
 *
 */

class Platform extends Resource {
  // login redirects the user to
  // the platform authorization
  // screen
  login (fields) {
    // make sure we're in a browser
    if (!document) {
      return
    }
    const options = this._model.login
    if (!options) {
      return
    }
    // constants
    const FIELD_SUCCESS = 'successRedirectURL'
    const FIELD_ERROR = 'errorRedirectURL'
    // pick only known fields
    fields = _.pick(fields, [
      FIELD_SUCCESS,
      FIELD_ERROR
    ])
    // form
    const url = this._client.configuration.backendURL + options.path
    const form = document.createElement('form')
    form.setAttribute('method', options.method)
    form.setAttribute('action', url)
    // inputs
    const fieldToInputNameMap = {
      [FIELD_SUCCESS]: 'successCallback',
      [FIELD_ERROR]: 'errorCallback'
    }
    let inputName = ''
    let inputValue = ''
    let input = null
    for (let key in fields) {
      inputName = fieldToInputNameMap[key]
      inputValue = fields[key]
      input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', inputName)
      input.setAttribute('value', inputValue)
      form.appendChild(input)
    }
    document.body.appendChild(form)
    form.submit()
  }
}

/**
 *
 * Authentication resource
 *
 */

class Authentication extends Resource {
  // constructor
  constructor (client) {
    super(client, map.authentication)
    this._setupPlatform(client)
  }
  // _setupPlatform declares a "platform" property
  // that enable accessing different platforms
  _setupPlatform (client) {
    const collection = this._model.platform
    if (!collection) {
      return
    }
    this.platform = {}
    _.each(collection, (model, key) => {
      this.platform[key] = new Platform(client, model)
    })
  }
  // login attempts to sign in
  // a user using the provided
  // fields
  login (fields, callback) {
    const method = this._model.login.method
    const path = this._model.login.path
    fields = _.pick(fields, [
      'username',
      'password'
    ])
    const options = {
      method: method,
      path: path,
      parameters: {
        login: fields.username,
        password: fields.password
      }
    }
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'message') &&
          _.has(data, 'sessionId') &&
          _.has(data, 'adminToken')) {
          callback(null, data)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
  // logout signs the user out
  // of the application
  logout (callback) {
    const options = this._model.logout
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'message')) {
          callback(null, data.message)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

export default Authentication
