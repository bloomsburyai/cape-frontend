import _ from 'lodash'
import map from '../map'
import Resource from '../Resource'
import ClientError from '../Error'

class Launcher extends Resource {
  // constructor
  constructor (client, model, fields) {
    super(client, model)
    this._fields = fields
  }
  // paginate
  paginate (fields, callback) {
    const method = this._model.paginate.method
    const path = this._model.paginate.path
    fields = _.pick(fields, [
      'size',
      'number'
    ])
    fields = _.defaults(fields, {
      size: 1,
      number: 0
    })
    const options = {
      method: method,
      path: path,
      data: {
        question: this._fields.content,
        text: this._fields.target,
        threshold: this._fields.threshold,
        documentIds: this._fields.documentIDs,
        sourceType: this._fields.source,
        speedOrAccuracy: this._fields.mode,
        numberOfItems: fields.size,
        offset: fields.size * fields.number
      }
    }
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'items')) {
          callback(null, data.items)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

class Query extends Resource {
  // constructor
  constructor (client) {
    super(client, map.query)
  }
  // prepare stores strictly
  // query related fields
  prepare (fields) {
    fields = _.pick(fields, [
      'target',
      'content',
      'threshold',
      'documentIDs',
      'source',
      'mode'
    ])
    return new Launcher(this._client, this._model, fields)
  }
}

Query.Launcher = Launcher

export default Query
