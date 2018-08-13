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
  // create stores
  // a new question
  create (fields, callback) {
    if (!this._model.create) {
      return
    }
    const method = this._model.create.method
    const path = this._model.create.path
    fields = _.pick(fields, [
      'replyID',
      'content'
    ])
    const options = {
      method: method,
      path: path,
      data: {
        replyId: fields.replyID,
        question: fields.content
      }
    }
    this._request(options, (error, data) => {
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
  // update stores
  // question changes
  update (fields, callback) {
    const method = this._model.update.method
    const path = this._model.update.path
    fields = _.pick(fields, [
      'id',
      'replyID',
      'content'
    ])
    const options = {
      method: method,
      path: path,
      data: {
        questionId: fields.id,
        replyId: fields.replyID,
        question: fields.content
      }
    }
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        const interests = ['questionId', 'replyId']
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
  // delete removes
  // a question
  delete (id, callback) {
    if (!this._model.delete) {
      return
    }
    const method = this._model.delete.method
    const path = this._model.delete.path
    const options = {
      method: method,
      path: path,
      data: {
        questionId: id
      }
    }
    this._request(options, (error, data) => {
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
  // create stores
  // a new answer
  create (fields, callback) {
    const method = this._model.create.method
    const path = this._model.create.path
    fields = _.pick(fields, [
      'replyID',
      'content'
    ])
    const options = {
      method: method,
      path: path,
      data: {
        replyId: fields.replyID,
        answer: fields.content
      }
    }
    this._request(options, (error, data) => {
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
  // update changes
  // the answer
  update (fields, callback) {
    const method = this._model.update.method
    const path = this._model.update.path
    fields = _.pick(fields, [
      'id',
      'content'
    ])
    const options = {
      method: method,
      path: path,
      data: {
        answerId: fields.id,
        answer: fields.content
      }
    }
    this._request(options, (error, data) => {
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
  // delete removes
  // an answer
  delete (id, callback) {
    const method = this._model.delete.method
    const path = this._model.delete.path
    const options = {
      method: method,
      path: path,
      data: {
        answerId: id
      }
    }
    this._request(options, (error, data) => {
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
 * Reply
 *
 */

class Reply extends Resource {
  // constructor
  constructor (client) {
    super(client, map.reply)
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
  // that enables accessing answer resource
  // methods
  _setupAnswer () {
    const model = this._model.answer
    if (!model) {
      return
    }
    this.answer = new Answer(this._client, model)
  }
  // paginate returns paged
  // reply records
  paginate (fields, callback) {
    const method = this._model.paginate.method
    const path = this._model.paginate.path
    fields = _.pick(fields, [
      'search',
      'size',
      'number'
    ])
    fields = _.defaults(fields, {
      search: '',
      size: 30,
      number: 0
    })
    const options = {
      method: method,
      path: path,
      data: {
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
  // create stores a new reply
  create (fields, callback) {
    const method = this._model.create.method
    const path = this._model.create.path
    fields = _.pick(fields, [
      'question',
      'answer'
    ])
    const options = {
      method: method,
      path: path,
      data: fields
    }
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'replyId') && _.has(data, 'answerId')) {
          callback(null, data)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
  // read returns a reply
  read (id, callback) {
    const method = this._model.read.method
    const path = this._model.read.path
    const options = {
      method: method,
      path: path,
      data: {
        savedReplyIds: id
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
  // delete removes a reply
  delete (id, callback) {
    const method = this._model.delete.method
    const path = this._model.delete.path
    const options = {
      method: method,
      path: path,
      data: {
        replyId: id
      }
    }
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'replyId')) {
          callback(null, data.replyId)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }

  scrape (url, callback) {
    const method = this._model.scrape.method
    const path = this._model.scrape.path
    const options = {
      method: method,
      path: path,
      data: {
        url: decodeURIComponent(url)
      }
    }
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

export default Reply
