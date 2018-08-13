const _ = require('lodash')
const uuid = require('uuid')
const ipsum = require('lorem-ipsum')
const moment = require('moment')
const utilities = require('./utilities')

const model = require('./map').inbox

function generateItem (index) {
  const item = {
    id: uuid.v1(),
    answered: (Math.random() >= 0.5),
    read: (Math.random() >= 0.5),
    question: ipsum({
      count: 1,
      units: 'sentences',
      sentenceLowerBound: 1,
      sentenceUpperBound: 50,
      format: 'plain'
    }),
    questionSource: 'API',
    created: moment().subtract(Math.round(Math.random() * 360), 'days').unix(),
  }
  if (item.answered) {
    const answer = ipsum({
      count: 1,
      units: 'sentences',
      sentenceLowerBound: 1,
      sentenceUpperBound: 50,
      format: 'plain'
    })
    _.set(item, 'answers[0].text', answer)
  }
  if (Math.random() >= 0.5) {
    let source = ipsum({
      count: 1,
      units: 'sentences',
      sentenceLowerBound: 1,
      sentenceUpperBound: 10,
      format: 'plain'
    })
    let methods = [
      _.camelCase,
      _.kebabCase
    ]
    let method = methods[Math.round(Math.random() * (methods.length - 1))]
    source = method(source) + '.txt'
    item.answerSource = source
  }
  return item
}

let store = [
  {
    'id':'4124',
    'answered':false,
    'read':false,
    'question':'Who are you?',
    'questionSource':'API',
    'created':1508162032,
    'answers':[]
  },
  {
    'id':'4123',
    'answered':true,
    'read':false,
    'question':'How easy is the API to use?',
    'questionSource':'API',
    'created':1508161834,
    'answers':[
      {
        'text':'Hopefully it\'s pretty easy',
        'confidence':0.75,
        'sourceType':'document',
        'sourceId':'358e1b77c9bcc353946dfe107d6b32ff',
        'startOffset':30,
        'endOffset':56
      }
    ]
  }
]

let item = null
for (let i = 0; i < 200; i++) {
  item = generateItem(i)
  store.push(item)
}
store = _.orderBy(store, ['created'], ['desc'])

module.exports = {
  store: store,
  setupRoutes: function (app) {

    app.all(model.paginate.path, function (req, res) {
      // let fields = _.defaults(req.body, {
      let input = utilities.input(req)
      let fields = _.defaults(input, {
        read: 'both',
        answered: 'both',
        searchTerm: '',
        numberOfItems: 30,
        offset: 0
      })
      let localStore = store
      // filters
      let filters = {}
      if (fields.read !== 'both') {
        filters.read = (fields.read === 'true')
      }
      if (fields.answered !== 'both') {
        filters.answered = (fields.answered === 'true')
      }
      if (!_.isEmpty(filters)) {
        localStore = _.filter(store, filters)
      }
      // search
      if (!_.isEmpty(fields.searchTerm)) {
        let searchTerm = String(fields.searchTerm).toLowerCase()
        localStore = _.filter(localStore, function(item) {
          let content = ''
          if (item.question) {
            content += item.question
          }
          if (item.answer) {
            content += item.answer
          }
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

    app.all(model.markAsRead.path, function (req, res) {
      console.log('mark-inbox-read')
      let input = utilities.input(req)
      let id = _.toInteger(input.inboxId)
      console.log(id)
      if (!id) {
        res.json()
        return
      }
      let item = _.find(store, {id: id})
      if (!item) {
        res.json()
        return
      }
      item.read = true
      _.delay(function () {
        res.json({
          success: true,
          result: {
            inboxId: item.id
          }
        })
      }, utilities.getResponseLatency())
    })

  }
}
