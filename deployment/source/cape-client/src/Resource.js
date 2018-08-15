import _ from 'lodash'
import ClientError from './Error'

class Resource {
  constructor (client, model) {
    this._client = client
    this._model = model
  }

  // _request generates requests calling the
  // callback and passing the right arguments to it.
  _request (options, callback) {
    let configuration = _.defaults(options, {
      method: 'GET',
      path: undefined,
      parameters: undefined,
      data: undefined,
      headers: undefined
    })
    // token authentication
    if (_.has(this._client.configuration, 'token.admin')) {
      configuration.parameters = _.extend(configuration.parameters, {
        adminToken: this._client.configuration.token.admin
      })
    }
    if (_.has(this._client.configuration, 'token.query')) {
      configuration.parameters = _.extend(configuration.parameters, {
        token: this._client.configuration.token.query
      })
    }
    // use the configured axios
    // instance found on client
    this._client._axios.request({
      method: configuration.method,
      url: configuration.path,
      params: configuration.parameters,
      data: configuration.data,
      headers: configuration.headers,
      withCredentials: true
    }).then(function (response) {
      // real success callback
      if (_.has(response, 'data.success') &&
        _.has(response, 'data.result') &&
        response.data.success) {
        callback(null, response.data.result)
        return
      }
      // error (unsuccessful) server response with message
      if (_.has(response, 'data.success') &&
        _.has(response, 'data.result.message') &&
        !response.data.success) {
        callback(ClientError.fromObject({
          type: ClientError.library.server.type,
          message: response.data.result.message
        }), null)
        return
      }
      // unknown error
      callback(ClientError.fromObject(ClientError.library.unknown), null)
    }).catch(function (error) {
      if (_.has(error, 'code') && error.code === 'ECONNABORTED') {
        // timeout error
        callback(ClientError.fromObject(ClientError.library.timeout), null)
      } else if (_.has(error, 'response')) {
        // request made but server responded with status
        // code that falls out of the range of 2xx
        if (_.has(error.response, 'data.result.message')) {
          callback(ClientError.fromObject({
            type: ClientError.library.server.type,
            message: error.response.data.result.message
          }), null)
          return
        }
        // unknown error
        callback(ClientError.fromObject(ClientError.library.failedConnection), null)
      } else if (_.has(error, 'request')) {
        // request made but no response was received
        callback(ClientError.fromObject(ClientError.library.unknown), null)
      } else {
        // something else happened
        callback(ClientError.fromObject(ClientError.library.unknown), null)
      }
    })
  }
}

export default Resource
