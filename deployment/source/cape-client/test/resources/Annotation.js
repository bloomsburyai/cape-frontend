/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import {expect} from 'chai'
import moxios from 'moxios'
import JSON from 'JSON'

import map from '../../src/map'
import Client from '../../src/cape'
import Annotation from '../../src/resources/Annotation'
import * as configuration from '../configuration'
import * as response from '../response'

describe('Annotation', function () {
  /**
   * Paginate
   */
  describe('paginate', function () {
    beforeEach(() => {
      this.model = map.annotation.paginate
    })
    it('sets correct request configuration (partial)', (done) => {
      const input = {
        search: 'search',
        size: 10,
        number: 0
      }
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Annotation(client)
      resource.paginate(input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(this.model.path)
        expect(request.config.method).equals(this.model.method)
        expect(JSON.parse(request.config.data)).to.include({
          searchTerm: input.search,
          numberOfItems: input.size,
          offset: input.size * input.number
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('sets correct request configuration (complete)', (done) => {
      const input = {
        annotationIDs: ['b496121c-c3b1-11e7-a59d-9801a7ae6c69'],
        documentIDs: ['e453211f-f3b5-12b4-a59d-1143a7fb6a78'],
        search: 'search',
        size: 10,
        number: 0
      }
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Annotation(client)
      resource.paginate(input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(this.model.path)
        expect(request.config.method).equals(this.model.method)
        expect(JSON.parse(request.config.data)).to.deep.include({
          annotationIds: input.annotationIDs,
          documentIds: input.documentIDs,
          searchTerm: input.search,
          numberOfItems: input.size,
          offset: input.size * input.number
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const resource = new Annotation(new Client(configuration.FULL))
      resource.paginate(null, (error, data) => {
        expect(error).to.be.null
        expect(data).to.have.all.keys('totalItems', 'items')
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Annotation(new Client(configuration.UNLUCKY))
      resource.paginate(null, (error, data) => {
        expect(error).to.be.null
        expect(data).to.have.a.property('totalItems', 0)
        expect(data).to.have.a.property('items').that.is.an('array').empty
        done()
      })
    })
    it('handles "malformed" response', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Annotation(client)
      resource.paginate(null, (error, data) => {
        expect(error).not.to.be.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.include(Client.Error.library.malformedResponse)
        expect(data).to.be.null
        moxios.uninstall(client._axios)
        done()
      })
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith(response.MALFORMED)
      })
    })
  })
  /**
   * Create
   */
  describe('create', function () {
    beforeEach(() => {
      this.model = map.annotation.create
      this.input = {
        question: 'question',
        answer: 'answer',
        documentID: 'e453211f-f3b5-12b4-a59d-1143a7fb6a78',
        startOffset: 12,
        endOffset: 24,
        page: 1,
        boundingBoxes: [{
          x1: 432,
          y1: 145,
          x2: 587,
          y2: 354
        }]
      }
    })
    it('sets correct request configuration', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Annotation(client)
      resource.create(this.input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(this.model.path)
        expect(request.config.method).equals(this.model.method)
        expect(JSON.parse(request.config.data)).to.deep.include({
          question: this.input.question,
          answer: this.input.answer,
          documentId: this.input.documentID,
          startOffset: this.input.startOffset,
          endOffset: this.input.endOffset,
          page: this.input.page,
          boundingBoxes: this.input.boundingBoxes
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const resource = new Annotation(new Client(configuration.FULL))
      resource.create(this.input, (error, data) => {
        expect(error).to.be.null
        expect(data).to.have.all.keys('annotationId', 'answerId')
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Annotation(new Client(configuration.UNLUCKY))
      resource.create(this.input, (error, data) => {
        expect(error).not.to.be.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.have.a.property('message')
        expect(error).to.have.a.property('type', Client.Error.library.server.type)
        expect(data).to.be.null
        done()
      })
    })
    it('handles "malformed" response', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Annotation(client)
      resource.create(this.input, (error, data) => {
        expect(error).not.to.be.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.include(Client.Error.library.malformedResponse)
        expect(data).to.be.null
        moxios.uninstall(client._axios)
        done()
      })
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith(response.MALFORMED)
      })
    })
  })
  /**
   * Delete
   */
  describe('delete', function () {
    beforeEach(() => {
      this.model = map.annotation.delete
      this.input = 'f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69'
    })
    it('sets correct request configuration', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Annotation(client)
      resource.delete(this.input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(this.model.path)
        expect(request.config.method).equals(this.model.method)
        expect(JSON.parse(request.config.data)).to.include({
          annotationId: this.input
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const resource = new Annotation(new Client(configuration.FULL))
      resource.delete(this.input, (error, data) => {
        expect(error).to.be.null
        expect(data).to.equal(this.input)
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Annotation(new Client(configuration.UNLUCKY))
      resource.delete(this.input, (error, data) => {
        expect(error).not.to.be.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.have.a.property('message')
        expect(error).to.have.a.property('type', Client.Error.library.server.type)
        expect(data).to.be.null
        done()
      })
    })
    it('handles "malformed" response', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Annotation(client)
      resource.delete(this.input, (error, data) => {
        expect(error).not.to.be.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.include(Client.Error.library.malformedResponse)
        expect(data).to.be.null
        moxios.uninstall(client._axios)
        done()
      })
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith(response.MALFORMED)
      })
    })
  })
  /**
   *
   * Question
   *
   */
  describe('Question', function () {
    /**
     * Canonical
     */
    describe('canonical', function () {
      /**
       * Update
       */
      describe('update', function () {
        beforeEach(() => {
          this.model = map.annotation.question.canonical.update
          this.input = {
            annotationID: 'f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69',
            content: 'What age are you?'
          }
        })
        it('sets correct request configuration', (done) => {
          const client = new Client(configuration.EMPTY)
          moxios.install(client._axios)
          const resource = new Annotation(client)
          resource.question.canonical.update(this.input)
          moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            expect(request.config.url).to.include(this.model.path)
            expect(request.config.method).to.equal(this.model.method)
            expect(JSON.parse(request.config.data)).to.include({
              annotationId: this.input.annotationID,
              question: this.input.content
            })
            moxios.uninstall(client._axios)
            done()
          })
        })
        it('handles "full" response', (done) => {
          const resource = new Annotation(new Client(configuration.FULL))
          resource.question.canonical.update(this.input, (error, data) => {
            expect(error).to.be.null
            expect(data).to.equal(this.input.annotationID)
            done()
          })
        })
        it('handles "unlucky" response', (done) => {
          const resource = new Annotation(new Client(configuration.UNLUCKY))
          resource.question.canonical.update(this.input, (error, data) => {
            expect(error).not.to.be.null
            expect(error).to.be.an.instanceof(Client.Error)
            expect(error).to.have.a.property('message')
            expect(error).to.have.a.property('type', Client.Error.library.server.type)
            expect(data).to.be.null
            done()
          })
        })
        it('handles "malformed" response', (done) => {
          const client = new Client(configuration.EMPTY)
          moxios.install(client._axios)
          const resource = new Annotation(client)
          resource.question.canonical.update(this.input, (error, data) => {
            expect(error).not.to.be.null
            expect(error).to.be.an.instanceof(Client.Error)
            expect(error).to.include(Client.Error.library.malformedResponse)
            expect(data).to.be.null
            moxios.uninstall(client._axios)
            done()
          })
          moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith(response.MALFORMED)
          })
        })
      })
    })
    /**
     * Paraphrase
     */
    describe('paraphrase', function () {
      /**
       * Create
       */
      describe('create', function () {
        beforeEach(() => {
          this.model = map.annotation.question.paraphrase.create
          this.input = {
            annotationID: 'f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69',
            content: 'What is your age?'
          }
        })
        it('sets correct request configuration', (done) => {
          const client = new Client(configuration.EMPTY)
          moxios.install(client._axios)
          const resource = new Annotation(client)
          resource.question.paraphrase.create(this.input)
          moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            expect(request.config.url).to.include(this.model.path)
            expect(request.config.method).to.equal(this.model.method)
            expect(JSON.parse(request.config.data)).to.include({
              annotationId: this.input.annotationID,
              question: this.input.content
            })
            moxios.uninstall(client._axios)
            done()
          })
        })
        it('handles "full" response', (done) => {
          const resource = new Annotation(new Client(configuration.FULL))
          resource.question.paraphrase.create(this.input, (error, data) => {
            expect(error).to.be.null
            expect(data).to.be.a('string').that.is.not.empty
            done()
          })
        })
        it('handles "unlucky" response', (done) => {
          const resource = new Annotation(new Client(configuration.UNLUCKY))
          resource.question.paraphrase.create(this.input, (error, data) => {
            expect(error).not.to.be.null
            expect(error).to.be.an.instanceof(Client.Error)
            expect(error).to.have.a.property('message')
            expect(error).to.have.a.property('type', Client.Error.library.server.type)
            expect(data).to.be.null
            done()
          })
        })
        it('handles "malformed" response', (done) => {
          const client = new Client(configuration.EMPTY)
          moxios.install(client._axios)
          const resource = new Annotation(client)
          resource.create(this.input, (error, data) => {
            expect(error).not.to.be.null
            expect(error).to.be.an.instanceof(Client.Error)
            expect(error).to.include(Client.Error.library.malformedResponse)
            expect(data).to.be.null
            moxios.uninstall(client._axios)
            done()
          })
          moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith(response.MALFORMED)
          })
        })
      })
      /**
       * Update
       */
      describe('update', function () {
        beforeEach(() => {
          this.model = map.annotation.question.paraphrase.update
          this.input = {
            id: '21e9689e-c3b2-11e7-8a22-9801a7ae6c69',
            content: 'What age are you?'
          }
        })
        it('sets correct request configuration', (done) => {
          const client = new Client(configuration.EMPTY)
          moxios.install(client._axios)
          const resource = new Annotation(client)
          resource.question.paraphrase.update(this.input)
          moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            expect(request.config.url).to.include(this.model.path)
            expect(request.config.method).to.equal(this.model.method)
            expect(JSON.parse(request.config.data)).to.include({
              questionId: this.input.id,
              question: this.input.content
            })
            moxios.uninstall(client._axios)
            done()
          })
        })
        it('handles "full" response', (done) => {
          const resource = new Annotation(new Client(configuration.FULL))
          resource.question.paraphrase.update(this.input, (error, data) => {
            expect(error).to.be.null
            expect(data).to.equal(this.input.id)
            done()
          })
        })
        it('handles "unlucky" response', (done) => {
          const resource = new Annotation(new Client(configuration.UNLUCKY))
          resource.question.paraphrase.update(this.input, (error, data) => {
            expect(error).not.to.be.null
            expect(error).to.be.an.instanceof(Client.Error)
            expect(error).to.have.a.property('message')
            expect(error).to.have.a.property('type', Client.Error.library.server.type)
            expect(data).to.be.null
            done()
          })
        })
        it('handles "malformed" response', (done) => {
          const client = new Client(configuration.EMPTY)
          moxios.install(client._axios)
          const resource = new Annotation(client)
          resource.question.paraphrase.update(this.input, (error, data) => {
            expect(error).not.to.be.null
            expect(error).to.be.an.instanceof(Client.Error)
            expect(error).to.include(Client.Error.library.malformedResponse)
            expect(data).to.be.null
            moxios.uninstall(client._axios)
            done()
          })
          moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith(response.MALFORMED)
          })
        })
      })
      /**
       * Delete
       */
      describe('delete', function () {
        beforeEach(() => {
          this.model = map.annotation.question.paraphrase.delete
          this.input = '21e9689e-c3b2-11e7-8a22-9801a7ae6c69'
        })
        it('sets correct request configuration', (done) => {
          const client = new Client(configuration.EMPTY)
          moxios.install(client._axios)
          const resource = new Annotation(client)
          resource.question.paraphrase.delete(this.input)
          moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            expect(request.config.url).to.include(this.model.path)
            expect(request.config.method).to.equal(this.model.method)
            expect(JSON.parse(request.config.data)).to.include({
              questionId: this.input
            })
            moxios.uninstall(client._axios)
            done()
          })
        })
        it('handles "full" response', (done) => {
          const resource = new Annotation(new Client(configuration.FULL))
          resource.question.paraphrase.delete(this.input, (error, data) => {
            expect(error).to.be.null
            expect(data).to.equal(this.input)
            done()
          })
        })
        it('handles "unlucky" response', (done) => {
          const resource = new Annotation(new Client(configuration.UNLUCKY))
          resource.question.paraphrase.delete(this.input, (error, data) => {
            expect(error).not.to.be.null
            expect(error).to.be.an.instanceof(Client.Error)
            expect(error).to.have.a.property('message')
            expect(error).to.have.a.property('type', Client.Error.library.server.type)
            expect(data).to.be.null
            done()
          })
        })
        it('handles "malformed" response', (done) => {
          const client = new Client(configuration.EMPTY)
          moxios.install(client._axios)
          const resource = new Annotation(client)
          resource.question.paraphrase.delete(this.input, (error, data) => {
            expect(error).not.to.be.null
            expect(error).to.be.an.instanceof(Client.Error)
            expect(error).to.include(Client.Error.library.malformedResponse)
            expect(data).to.be.null
            moxios.uninstall(client._axios)
            done()
          })
          moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith(response.MALFORMED)
          })
        })
      })
    })
  })
  /**
   *
   * Answer
   *
   */
  describe('Answer', function () {
    /**
     * Create
     */
    describe('create', function () {
      beforeEach(() => {
        this.model = map.annotation.answer.create
        this.input = {
          annotationID: '68c445cc-c3b2-11e7-8a88-9801a7ae6c69',
          content: 'Grey'
        }
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new Annotation(client)
        resource.answer.create(this.input)
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).to.include(this.model.path)
          expect(request.config.method).to.equal(this.model.method)
          expect(JSON.parse(request.config.data)).to.include({
            annotationId: this.input.annotationID,
            answer: this.input.content
          })
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new Annotation(new Client(configuration.FULL))
        resource.answer.create(this.input, (error, data) => {
          expect(error).to.be.null
          expect(data).to.be.a('string').that.is.not.empty
          done()
        })
      })
      it('handles "unlucky" response', (done) => {
        const resource = new Annotation(new Client(configuration.UNLUCKY))
        resource.answer.create(this.input, (error, data) => {
          expect(error).not.to.be.null
          expect(error).to.be.an.instanceof(Client.Error)
          expect(error).to.have.a.property('message')
          expect(error).to.have.a.property('type', Client.Error.library.server.type)
          expect(data).to.be.null
          done()
        })
      })
      it('handles "malformed" response', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new Annotation(client)
        resource.answer.create(this.input, (error, data) => {
          expect(error).not.to.be.null
          expect(error).to.be.an.instanceof(Client.Error)
          expect(error).to.include(Client.Error.library.malformedResponse)
          expect(data).to.be.null
          moxios.uninstall(client._axios)
          done()
        })
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          request.respondWith(response.MALFORMED)
        })
      })
    })
    /**
     * Update
     */
    describe('update', function () {
      beforeEach(() => {
        this.model = map.annotation.answer.update
        this.input = {
          id: '703acab4-c3b2-11e7-b8b1-9801a7ae6c69',
          content: 'Blue'
        }
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new Annotation(client)
        resource.answer.update(this.input)
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).to.include(this.model.path)
          expect(request.config.method).to.equal(this.model.method)
          expect(JSON.parse(request.config.data)).to.include({
            answerId: this.input.id,
            answer: this.input.content
          })
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new Annotation(new Client(configuration.FULL))
        resource.answer.update(this.input, (error, data) => {
          expect(error).to.be.null
          expect(data).to.equal(this.input.id)
          done()
        })
      })
      it('handles "unlucky" response', (done) => {
        const resource = new Annotation(new Client(configuration.UNLUCKY))
        resource.answer.update(this.input, (error, data) => {
          expect(error).not.to.be.null
          expect(error).to.be.an.instanceof(Client.Error)
          expect(error).to.have.a.property('message')
          expect(error).to.have.a.property('type', Client.Error.library.server.type)
          expect(data).to.be.null
          done()
        })
      })
      it('handles "malformed" response', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new Annotation(client)
        resource.answer.update(this.input, (error, data) => {
          expect(error).not.to.be.null
          expect(error).to.be.an.instanceof(Client.Error)
          expect(error).to.include(Client.Error.library.malformedResponse)
          expect(data).to.be.null
          moxios.uninstall(client._axios)
          done()
        })
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          request.respondWith(response.MALFORMED)
        })
      })
    })
    /**
     * Delete
     */
    describe('delete', function () {
      beforeEach(() => {
        this.model = map.annotation.answer.delete
        this.input = '703acab4-c3b2-11e7-b8b1-9801a7ae6c69'
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new Annotation(client)
        resource.answer.delete(this.input)
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).to.include(this.model.path)
          expect(request.config.method).to.equal(this.model.method)
          expect(JSON.parse(request.config.data)).to.include({
            answerId: this.input
          })
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new Annotation(new Client(configuration.FULL))
        resource.answer.delete(this.input, (error, data) => {
          expect(error).to.be.null
          expect(data).to.equal(this.input)
          done()
        })
      })
      it('handles "unlucky" response', (done) => {
        const resource = new Annotation(new Client(configuration.UNLUCKY))
        resource.answer.delete(this.input, (error, data) => {
          expect(error).not.to.be.null
          expect(error).to.be.an.instanceof(Client.Error)
          expect(error).to.have.a.property('message')
          expect(error).to.have.a.property('type', Client.Error.library.server.type)
          expect(data).to.be.null
          done()
        })
      })
      it('handles "malformed" response', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new Annotation(client)
        resource.answer.delete(this.input, (error, data) => {
          expect(error).not.to.be.null
          expect(error).to.be.an.instanceof(Client.Error)
          expect(error).to.include(Client.Error.library.malformedResponse)
          expect(data).to.be.null
          moxios.uninstall(client._axios)
          done()
        })
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          request.respondWith(response.MALFORMED)
        })
      })
    })
  })
})
