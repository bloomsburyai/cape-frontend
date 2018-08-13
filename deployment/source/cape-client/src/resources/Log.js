import _ from 'lodash'
import map from '../map'
import Resource from '../Resource'
import ClientError from '../Error'

class Log extends Resource {
  // constructor
  constructor (client) {
    super(client, map.log)
  }
  // event
  event (fields, callback) {
    const method = this._model.event.method
    const path = this._model.event.path
    this._request({
      method: method,
      path: path,
      data: fields
    }, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        callback(null, data)
      }
    })
  }
}

export default Log
