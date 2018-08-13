const _ = require('lodash')
const uuid = require('uuid')
const ipsum = require('lorem-ipsum')
const moment = require('moment')
const utilities = require('./utilities')

const model = require('./map').reply

function generateItem (index) {
  // timestamps
  let created = moment().subtract(Math.round(Math.random() * 360), 'days')
  let modified = created.clone()
  if (Math.random() >= 0.5) {
    modified = modified.add(Math.round(Math.random() * 100), 'days')
  }
  // item
  return {
    id: uuid.v1(),
    canonicalQuestion: ipsum({
      count: 1,
      units: 'sentences',
      sentenceLowerBound: 1,
      sentenceUpperBound: 50,
      format: 'plain'
    }),
    answers: [
      {
        id: uuid.v1(),
        answer: ipsum({
          count: 1,
          units: 'sentences',
          sentenceLowerBound: 1,
          sentenceUpperBound: 50,
          format: 'plain'
        }),
      }
    ],
    created: created.unix(),
    modified: modified.unix()
  }
}

let store = [
  {
    'id':'a0bee8c2-c3b1-11e7-a7fe-9801a7ae6c69',
    'canonicalQuestion':'How old are you?',
    'answers':[
      {
        'id': 'a67678b6-c3b1-11e7-abaa-9801a7ae6c69',
        'answer': '18'
      }
    ],
    'paraphraseQuestions':[
      {
        'id': 'aa8061f6-c3b1-11e7-b59b-9801a7ae6c69',
        'question': 'What\'s your age?'
      },
      {
        'id': 'aedfbb18-c3b1-11e7-b7c0-9801a7ae6c69',
        'question': 'What age are you?'
      }
    ],
    'created':1508161734,
    'modified':1508161734
  },
  {
    'id':'b496121c-c3b1-11e7-a59d-9801a7ae6c69',
    'canonicalQuestion':'What colour is the sky?',
    'answers':[
      {
        'id': 'b86a4afa-c3b1-11e7-9e98-9801a7ae6c69',
        'answer': 'Blue'
      }
    ],
    'created':1508161323,
    'modified':1508161323
  }
]

let item = null
for (let i = 0; i < 120; i++) {
  store.push(generateItem(i))
}
store = _.orderBy(store, ['created'], ['desc'])

module.exports = {
  store: store,
  setupRoutes: function (app) {

    app.all(model.paginate.path, function (req, res) {
      let input = utilities.input(req)
      let fields = _.defaults(input, {
        searchTerm: '',
        numberOfItems: 30,
        offset: 0
      })
      let localStore = store
      // search
      if (!_.isEmpty(fields.searchTerm)) {
        let searchTerm = String(fields.searchTerm).toLowerCase()
        localStore = _.filter(localStore, function(item) {
          let content = _.join([
            _.get(item, 'question'),
            _.get(item, 'answers[0].answer')
          ], ' ')
          content = content.toLowerCase()
          const value = _.includes(content, fields.searchTerm)
          return value
        })
      }
      // pagination
      let pageStart = fields.offset
      let pageEnd = fields.offset + fields.numberOfItems
      if (pageEnd > localStore.length) {
        pageEnd = localStore.length
      }
      const items = _.slice(localStore, pageStart, pageEnd)
      utilities.outputOption(res, [
        {
          success: true,
          result: {
            totalItems: localStore.length,
            items: items
          }
        },
        {
          success: true,
          result: {
            totalItems: 0,
            items: []
          }
        },
        utilities.getErrorResponse()
      ])
    })

    app.all(model.create.path, function (req, res) {
      let input = utilities.input(req)
      let timestamp = moment().unix()
      let item = {
        id: uuid.v1(),
        canonicalQuestion: input.question,
        answers: [
          {
            id: uuid.v1(),
            answer: input.answer
          }
        ],
        created: timestamp,
        modified: timestamp
      }
      store.push(item)
      _.delay(function () {
        if (utilities.getErrorStatus()) {
          res.json(utilities.getErrorResponse())
        } else {
          res.json({
            success: true,
            result: {
              replyId: item.id,
              answerId: _.get(item, 'answers[0].id')
            }
          })
        }
      }, utilities.getResponseLatency())
    })

    app.all(model.delete.path, function (req, res) {
      let input = utilities.input(req)
      let item = _.find(store, {id: input.replyId})
      if (!item) {
        res.json(utilities.getErrorResponse())
        return
      }
      store = _.remove(store, function (item) {
        return item.id === input.replyId
      })
      _.delay(function () {
        if (utilities.getErrorStatus()) {
          res.json(utilities.getErrorResponse())
        } else {
          res.json({
            success: true,
            result: {
              replyId: item.id
            }
          })
        }
      }, utilities.getResponseLatency())
    })

    app.all(model.question.canonical.update.path, function (req, res) {
      let input = utilities.input(req)
      let item = _.find(store, {id: input.replyId})
      if (!item) {
        res.json(utilities.getErrorResponse())
        return
      }
      item.canonicalQuestion = input.question
      _.delay(function () {
        if (utilities.getErrorStatus()) {
          res.json(utilities.getErrorResponse())
        } else {
          res.json({
            success: true,
            result: {
              replyId: item.id
            }
          })
        }
      }, utilities.getResponseLatency())
    })

    app.all(model.answer.update.path, function (req, res) {
      let input = utilities.input(req)
      let item = _.find(store, function (model) {
        return _.get(model, 'answers[0].id') === input.answerId
      })
      if (!item) {
        res.json(utilities.getErrorResponse())
        return
      }
      _.set(item, 'answers[0].answer', input.answer)
      _.delay(function () {
        if (utilities.getErrorStatus()) {
          res.json(utilities.getErrorResponse())
        } else {
          res.json({
            success: true,
            result: {
              answerId: input.answerId
            }
          })
        }
      }, utilities.getResponseLatency())
    })

  }
}
