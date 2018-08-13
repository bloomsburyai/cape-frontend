/* global FormData */

import _ from 'lodash'
import map from '../map'
import Resource from '../Resource'
import ClientError from '../Error'

/**
 *
 * Document resource
 *
 */

class Document extends Resource {
  // constructor
  constructor (client) {
    super(client, map.document)
  }
  // paginate returns paged
  // document records
  paginate (fields, callback) {
    // pick known fields and
    // specify default values
    const FIELD_SEARCH = 'search'
    const FIELD_SIZE = 'size'
    const FIELD_NUMBER = 'number'
    fields = _.defaults(_.pick(fields, [
      FIELD_SEARCH,
      FIELD_SIZE,
      FIELD_NUMBER
    ]), {
      [FIELD_SEARCH]: '',
      [FIELD_SIZE]: 30,
      [FIELD_NUMBER]: 0
    })
    // options
    const options = _.extend({
      data: {
        'searchTerm': fields[FIELD_SEARCH],
        'numberOfItems': fields[FIELD_SIZE],
        'offset': fields[FIELD_SIZE] * fields[FIELD_NUMBER]
      }
    }, this._model.paginate)
    // request
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
  // create stores a
  // new document
  create (fields, callback) {
    // pick known fields
    const FIELD_ID = 'id'
    const FIELD_TITLE = 'title'
    const FIELD_ORIGIN = 'origin'
    const FIELD_CONTENT = 'content'
    const FIELD_FILE = 'file'
    const FIELD_REPLACE = 'replace'
    fields = _.pick(fields, [
      FIELD_ID,
      FIELD_TITLE,
      FIELD_ORIGIN,
      FIELD_CONTENT,
      FIELD_FILE,
      FIELD_REPLACE
    ])
    // type
    const TYPE_TEXT = 'text'
    const TYPE_FILE = 'file'
    // headers & data
    let headers
    let data = {
      'documentId': fields[FIELD_ID],
      'title': fields[FIELD_TITLE],
      'origin': fields[FIELD_ORIGIN],
      'replace': fields[FIELD_REPLACE]
    }
    if (_.has(fields, FIELD_CONTENT)) {
      data.type = TYPE_TEXT
      data.text = fields[FIELD_CONTENT]
    } else if (_.has(fields, FIELD_FILE)) {
      data.type = TYPE_FILE
      const formData = new FormData()
      _.each(data, function (value, key) {
        if (value) {
          formData.append(key, value)
        }
      })
      const file = fields[FIELD_FILE]
      if (file.name) {
        formData.append('file', file, file.name)
      } else {
        formData.append('file', file)
      }
      data = formData
      headers = {
        'Content-Type': 'multipart/form-data'
      }
    }
    // options
    const options = _.extend({
      data: data,
      headers: headers
    }, this._model.create)
    // request
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'documentId')) {
          callback(null, data.documentId)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
  // read returns a document
  read (id, callback) {
    const method = this._model.read.method
    const path = this._model.read.path
    const options = {
      method: method,
      path: path,
      data: {
        documentIds: id
      }
    }
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'totalItems') &&
          _.has(data, 'items') &&
          _.isArray(data.items)) {
          if (data.totalItems === 1 && data.items.length === 1) {
            callback(null, data.items[0])
          } else {
            callback(ClientError.fromObject(
              ClientError.library.notFound
            ), null)
          }
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
  // delete removes
  // a document
  delete (id, callback) {
    const options = _.extend({
      data: {
        'documentId': id
      }
    }, this._model.delete)
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'documentId')) {
          callback(null, data.documentId)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

export default Document
