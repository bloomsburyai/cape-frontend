import _ from 'lodash'
import map from '../map'
import Resource from '../Resource'
import ClientError from '../Error'

/**
 *
 * Inbox resource
 *
 */

class Inbox extends Resource {
  // constructor
  constructor (client) {
    super(client, map.inbox)
  }
  // paginate returns
  // paged inbox records
  paginate (fields, callback) {
    const method = this._model.paginate.method
    const path = this._model.paginate.path
    fields = _.pick(fields, [
      'read',
      'answered',
      'search',
      'size',
      'number'
    ])
    fields = _.defaults(fields, {
      read: 'both',
      answered: 'both',
      search: '',
      size: 30,
      number: 0
    })
    const options = {
      method: method,
      path: path,
      data: {
        read: fields.read,
        answered: fields.answered,
        searchTerm: fields.search,
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
        if (_.has(data, 'totalItems') && _.has(data, 'items')) {
          callback(null, data)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
  // markAsRead
  markAsRead (id, callback) {
    const method = this._model.markAsRead.method
    const path = this._model.markAsRead.path
    const options = {
      method: method,
      path: path,
      data: {
        inboxId: id
      }
    }
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'inboxId')) {
          callback(null, data.inboxId)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
  // archive
  archive (id, callback) {
    const method = this._model.archive.method
    const path = this._model.archive.path
    const options = {
      method: method,
      path: path,
      data: {
        inboxId: id
      }
    }
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'inboxId')) {
          callback(null, data.inboxId)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

export default Inbox
