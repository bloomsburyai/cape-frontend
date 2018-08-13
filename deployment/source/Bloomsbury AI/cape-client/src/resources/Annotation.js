import _ from 'lodash'
import map from '../map'
import Resource from '../Resource'
import ClientError from '../Error'

/**
 *
 * Question
 *
 */

class Question extends Resource {
  // create stores a new question
  create (fields, callback) {
    if (!this._model.create) {
      return
    }
    const method = this._model.create.method
    const path = this._model.create.path
    fields = _.pick(fields, [
      'annotationID',
      'content'
    ])
    this._request({
      method: method,
      path: path,
      data: {
        annotationId: fields.annotationID,
        question: fields.content
      }
    }, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'questionId')) {
          callback(null, data.questionId)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
  // update stores question changes
  update (fields, callback) {
    const method = this._model.update.method
    const path = this._model.update.path
    fields = _.pick(fields, [
      'id',
      'annotationID',
      'content'
    ])
    this._request({
      method: method,
      path: path,
      data: {
        questionId: fields.id,
        annotationId: fields.annotationID,
        question: fields.content
      }
    }, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        const interests = ['questionId', 'annotationId']
        let interest = ''
        let found = false
        for (let i = 0; i < interests.length; i++) {
          interest = interests[i]
          if (_.has(data, interest)) {
            found = true
            break
          }
        }
        if (found) {
          callback(null, data[interest])
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
  // delete removes a question
  delete (id, callback) {
    if (!this._model.delete) {
      return
    }
    const method = this._model.delete.method
    const path = this._model.delete.path
    this._request({
      method: method,
      path: path,
      data: {
        questionId: id
      }
    }, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'questionId')) {
          callback(null, data.questionId)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

/**
 *
 * Answer
 *
 */

class Answer extends Resource {
  // create stores a new answer
  create (fields, callback) {
    const method = this._model.create.method
    const path = this._model.create.path
    fields = _.pick(fields, [
      'annotationID',
      'content'
    ])
    this._request({
      method: method,
      path: path,
      data: {
        annotationId: fields.annotationID,
        answer: fields.content
      }
    }, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'answerId')) {
          callback(null, data.answerId)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
  // update changes the answer
  update (fields, callback) {
    const method = this._model.update.method
    const path = this._model.update.path
    fields = _.pick(fields, [
      'id',
      'content'
    ])
    this._request({
      method: method,
      path: path,
      data: {
        answerId: fields.id,
        answer: fields.content
      }
    }, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'answerId')) {
          callback(null, data.answerId)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
  // delete removes an answer
  delete (id, callback) {
    const method = this._model.delete.method
    const path = this._model.delete.path
    this._request({
      method: method,
      path: path,
      data: {
        answerId: id
      }
    }, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'answerId')) {
          callback(null, data.answerId)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

/**
 *
 * Annotation
 *
 */

class Annotation extends Resource {
  // constructor
  constructor (client) {
    super(client, map.annotation)
    this._setupQuestion()
    this._setupAnswer()
  }
  // _setupQuestion declares a "question" property
  // that enables accessing different question types
  _setupQuestion () {
    const collection = this._model.question
    if (!collection) {
      return
    }
    this.question = {}
    _.each(collection, (model, key) => {
      this.question[key] = new Question(this._client, model)
    })
  }
  // _setupAnswer declares an "answer" property
  // that enables accessing answer resource methods
  _setupAnswer () {
    const model = this._model.answer
    if (!model) {
      return
    }
    this.answer = new Answer(this._client, model)
  }
  // paginate returns paged annotation records
  paginate (fields, callback) {
    const method = this._model.paginate.method
    const path = this._model.paginate.path
    fields = _.pick(fields, [
      'annotationIDs',
      'documentIDs',
      'search',
      'size',
      'number'
    ])
    fields = _.defaults(fields, {
      search: '',
      size: 5,
      number: 0
    })
    this._request({
      method: method,
      path: path,
      data: {
        annotationIds: fields.annotationIDs,
        documentIds: fields.documentIDs,
        searchTerm: fields.search,
        numberOfItems: fields.size,
        offset: fields.size * fields.number
      }
    }, (error, data) => {
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
  // create stores a new annotation
  create (fields, callback) {
    const method = this._model.create.method
    const path = this._model.create.path
    fields = _.pick(fields, [
      'question',
      'answer',
      'documentID',
      'startOffset',
      'endOffset',
      'page',
      'boundingBoxes',
      'metadata'
    ])
    this._request({
      method: method,
      path: path,
      data: {
        question: fields.question,
        answer: fields.answer,
        documentId: fields.documentID,
        startOffset: fields.startOffset,
        endOffset: fields.endOffset,
        page: fields.page,
        boundingBoxes: fields.boundingBoxes,
        metadata: fields.metadata
      }
    }, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'annotationId') && _.has(data, 'answerId')) {
          callback(null, data)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
  // delete removes an annotation
  delete (id, callback) {
    const method = this._model.delete.method
    const path = this._model.delete.path
    this._request({
      method: method,
      path: path,
      data: {
        annotationId: id
      }
    }, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'annotationId')) {
          callback(null, data.annotationId)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

export default Annotation
