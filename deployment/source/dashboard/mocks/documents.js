const _ = require('lodash')
const uuid = require('uuid')
const ipsum = require('lorem-ipsum')
const moment = require('moment')
const utilities = require('./utilities')

const multer = require('multer')
const upload = multer({
  dest: './mocks/uploads'
})

const model = require('./map').document

function generateItem (index) {
  // source
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
  // type
  let type = 'text'
  if (Math.random() >= 0.5) {
    type = 'file'
  }
  // timestamps
  let created = moment().subtract(Math.round(Math.random() * 360), 'days')
  let modified = created.clone()
  if (Math.random() >= 0.5) {
    modified = modified.add(Math.round(Math.random() * 100), 'days')
  }
  // item
  return {
    id: uuid.v1(),
    title: source,
    origin: source,
    text: ipsum({
      count: 1,
      units: 'sentences',
      sentenceLowerBound: 1,
      sentenceUpperBound: 500,
      format: 'plain'
    }),
    type: type,
    created: created.unix(),
    modified: modified.unix()
  }
}

let store = [
  {
    "id":"custom_id_2",
    "title":"document2.txt",
    "origin":"document2.txt",
    "text":"This is another document.",
    "type": "text",
    "created":1508169352,
    "modified":1508169352
  },
  {
    "id":"358e1b77c9bcc353946dfe107d6b32ff",
    "title":"cape_api.txt",
    "origin":"cape_api.txt",
    "text":"Welcome to the Cape API 0.1. Hopefully it's pretty easy to use.",
    "type": "file",
    "created":1508161723,
    "modified":1508161723
  }
]

let item = null
for (let i = 0; i < 300; i++) {
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
        localStore = _.filter(localStore, function (item) {
          let content = ''
          if (item.title) {
            content += item.title
          }
          if (item.text) {
            content += item.text
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
    app.all(model.create.path, upload.single('file'), function (req, res) {
      console.log('--')
      console.log('upload-document')
      console.log(req.file)
      let documentId = ''
      if (req.file) {
        documentId = req.file.filename
      } else {
        documentId = uuid.v1().replace(/-/g, '')
      }
      _.delay(function () {
        if (utilities.getErrorStatus()) {
          res.json(utilities.getErrorResponse())
        } else {
          res.json({
            success: true,
            result: {
              documentId: documentId
            }
          })
        }
      }, utilities.getResponseLatency())

    })
    app.all(model.delete.path, function (req, res) {
      let input = utilities.input(req)
      let id = req.documentId
      if (!id) {
        res.json()
        return
      }
      let item = _.find(store, {id: id})
      if (!item) {
        res.json()
        return
      }
      store = _.remove(store, function (item) {
        return item.id === id
      })
      _.delay(function () {
        if (utilities.getErrorStatus()) {
          res.json(utilities.getErrorResponse())
        } else {
          res.json({
            success: true,
            result: {
              documentId: item.id
            }
          })
        }
      }, utilities.getResponseLatency())
    })

  }
}
