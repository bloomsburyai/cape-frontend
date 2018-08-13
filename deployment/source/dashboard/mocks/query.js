const _ = require('lodash')
const uuid = require('uuid')
const ipsum = require('lorem-ipsum')
const moment = require('moment')
const utilities = require('./utilities')

const model = require('./map').query

function generateItem (index) {
  let context = ipsum({
    count: 1,
    units: 'sentences',
    sentenceLowerBound: 1,
    sentenceUpperBound: 30,
    format: 'plain'
  })
  let words = _.words(context)
  let startIndex = Math.floor(Math.random() * Math.floor(words.length / 2))
  let endIndex = startIndex + Math.floor(Math.random() * Math.floor(words.length / 2))
  let answer = _.join(_.slice(words, startIndex, endIndex), ' ')
  let startOffset = 0
  let endOffset = 0
  for (let i = 0; i < endIndex; i++) {
    if (i < startIndex) {
      startOffset += words[i].length + 1
    }
    endOffset += words[i].length + 1
  }
  let contextStartOffset = 0//Math.floor(Math.random() * 300)
  let answerContextStartOffset = contextStartOffset
  let answerContextEndOffset = answerContextStartOffset + context.length
  let answerTextStartOffset = answerContextStartOffset + startOffset
  let answerTextEndOffset = answerTextStartOffset + answer.length
  // let answerContextStartOffset = answerTextStartOffset
  // let answerContextEndOffset = answerTextEndOffset
  return {
    answerText: answer,
    answerContext: context,
    confidence: Math.random(),
    sourceType: 'document',
    sourceId: uuid.v1(),
    answerTextStartOffset: answerTextStartOffset,
    answerTextEndOffset: answerTextEndOffset,
    answerContextStartOffset: answerContextStartOffset,
    answerContextEndOffset: answerContextEndOffset
  }
}

let store = [
  {
    "answerText":"Hopefully it's pretty easy",
    "answerContext":"in the instructions. Hopefully it's pretty easy. We think that then you can ",
    "confidence":0.75,
    "sourceType":"document",
    "sourceId":"358e1b77c9bcc353946dfe107d6b32ff",
    "answerTextStartOffset":30,
    "answerTextEndOffset":56,
    "answerContextStartOffset":17,
    "answerContextEndOffset":98
  }
]

for (let i = 0; i < 5; i++) {
  store.push(generateItem(i))
}
store = _.orderBy(store, ['confidence'])

module.exports = {
  setupRoutes: function (app) {
    app.all(model.paginate.path, function (req, res) {
      console.log('query.paginate')
      let input = utilities.input(req)
      console.log(input)
      let fields = _.defaults(input, {
        numberOfItems: 1,
        offset: 0
      })
      console.log(fields)
      let localStore = store
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
            items: items
          }
        }
      ])
    })
  }
}
