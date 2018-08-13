/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import {expect} from 'chai'
import moxios from 'moxios'
import JSON from 'JSON'

import map from '../../src/map'
import Client from '../../src/cape'
import Reply from '../../src/resources/Reply'
import * as configuration from '../configuration'
import * as response from '../response'

describe('Reply', function () {
  /**
   * Paginate
   */
  describe('paginate', function () {
    beforeEach(() => {
      this.model = map.reply.paginate
      this.input = {
        search: 'search',
        size: 30,
        number: 0
      }
    })
    it('sets correct request configuration', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Reply(client)
      resource.paginate(this.input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(this.model.path)
        expect(request.config.method).equals(this.model.method)
        expect(JSON.parse(request.config.data)).to.include({
          searchTerm: this.input.search,
          numberOfItems: this.input.size,
          offset: this.input.size * this.input.number
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const resource = new Reply(new Client(configuration.FULL))
      resource.paginate(null, (error, data) => {
        expect(error).to.be.null
        expect(data).to.have.all.keys('totalItems', 'items')
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Reply(new Client(configuration.UNLUCKY))
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
      const resource = new Reply(client)
      resource.paginate(this.input, (error, data) => {
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
      this.model = map.reply.create
      this.input = {
        question: 'question',
        answer: 'answer'
      }
    })
    it('sets correct request configuration', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Reply(client)
      resource.create(this.input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(this.model.path)
        expect(request.config.method).equals(this.model.method)
        expect(JSON.parse(request.config.data)).to.include({
          question: this.input.question,
          answer: this.input.answer
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const resource = new Reply(new Client(configuration.FULL))
      resource.create(this.input, (error, data) => {
        expect(error).to.be.null
        expect(data).to.have.all.keys('replyId', 'answerId')
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Reply(new Client(configuration.UNLUCKY))
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
      const resource = new Reply(client)
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
   * Read
   */
  describe('read', function () {
    beforeEach(() => {
      this.model = map.reply.read
      this.input = 'd27b6285-c3c3-11e7-8d29-d15d28ee5381'
    })
    it('sets correct request configuration', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Reply(client)
      resource.read(this.input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).to.include(this.model.path)
        expect(request.config.method).to.equal(this.model.method)
        expect(JSON.parse(request.config.data)).to.deep.include({
          savedReplyIds: this.input
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const resource = new Reply(new Client(configuration.FULL))
      resource.read(this.input, (error, data) => {
        expect(error).to.be.null
        expect(data).to.be.an('object').that.is.not.empty
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Reply(new Client(configuration.UNLUCKY))
      resource.read(this.input, (error, data) => {
        expect(error).not.to.be.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.include(Client.Error.library.notFound)
        expect(data).to.be.null
        done()
      })
    })
    it('handles "malformed" response', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Reply(client)
      resource.read(this.input, (error, data) => {
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
      this.model = map.reply.delete
      this.input = 'f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69'
    })
    it('sets correct request configuration', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Reply(client)
      resource.delete(this.input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(this.model.path)
        expect(request.config.method).equals(this.model.method)
        expect(JSON.parse(request.config.data)).to.include({
          replyId: this.input
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const resource = new Reply(new Client(configuration.FULL))
      resource.delete(this.input, (error, data) => {
        expect(error).to.be.null
        expect(data).to.equal(this.input)
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Reply(new Client(configuration.UNLUCKY))
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
      const resource = new Reply(client)
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
          this.model = map.reply.question.canonical.update
          this.input = {
            replyID: 'f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69',
            content: 'content'
          }
        })
        it('sets correct request configuration', (done) => {
          const client = new Client(configuration.EMPTY)
          moxios.install(client._axios)
          const resource = new Reply(client)
          resource.question.canonical.update(this.input)
          moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            expect(request.config.url).to.include(this.model.path)
            expect(request.config.method).to.equal(this.model.method)
            expect(JSON.parse(request.config.data)).to.include({
              replyId: this.input.replyID,
              question: this.input.content
            })
            moxios.uninstall(client._axios)
            done()
          })
        })
        it('handles "full" response', (done) => {
          const resource = new Reply(new Client(configuration.FULL))
          resource.question.canonical.update(this.input, (error, data) => {
            expect(error).to.be.null
            expect(data).to.equal(this.input.replyID)
            done()
          })
        })
        it('handles "unlucky" response', (done) => {
          const resource = new Reply(new Client(configuration.UNLUCKY))
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
          const resource = new Reply(client)
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
          this.model = map.reply.question.paraphrase.create
          this.input = {
            replyID: 'f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69',
            content: 'content?'
          }
        })
        it('sets correct request configuration', (done) => {
          const client = new Client(configuration.EMPTY)
          moxios.install(client._axios)
          const resource = new Reply(client)
          resource.question.paraphrase.create(this.input)
          moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            expect(request.config.url).includes(this.model.path)
            expect(request.config.method).equals(this.model.method)
            expect(JSON.parse(request.config.data)).to.include({
              replyId: this.input.replyID,
              question: this.input.content
            })
            moxios.uninstall(client._axios)
            done()
          })
        })
        it('handles "full" response', (done) => {
          const resource = new Reply(new Client(configuration.FULL))
          resource.question.paraphrase.create(this.input, (error, data) => {
            expect(error).to.be.null
            expect(data).to.be.a('string').that.is.not.empty
            done()
          })
        })
        it('handles "unlucky" response', (done) => {
          const resource = new Reply(new Client(configuration.UNLUCKY))
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
          const resource = new Reply(client)
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
          this.model = map.reply.question.paraphrase.update
          this.input = {
            id: '21e9689e-c3b2-11e7-8a22-9801a7ae6c69',
            content: 'content'
          }
        })
        it('sets correct request configuration', (done) => {
          const client = new Client(configuration.EMPTY)
          moxios.install(client._axios)
          const resource = new Reply(client)
          resource.question.paraphrase.update(this.input)
          moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            expect(request.config.url).to.include(this.model.path)
            expect(request.config.method).equals(this.model.method)
            expect(JSON.parse(request.config.data)).to.include({
              questionId: this.input.id,
              question: this.input.content
            })
            moxios.uninstall(client._axios)
            done()
          })
        })
        it('handles "full" response', (done) => {
          const resource = new Reply(new Client(configuration.FULL))
          resource.question.paraphrase.update(this.input, (error, data) => {
            expect(error).to.be.null
            expect(data).to.equal(this.input.id)
            done()
          })
        })
        it('handles "unlucky" response', (done) => {
          const resource = new Reply(new Client(configuration.UNLUCKY))
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
          const resource = new Reply(client)
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
          this.model = map.reply.question.paraphrase.delete
          this.input = '21e9689e-c3b2-11e7-8a22-9801a7ae6c69'
        })
        it('sets correct request configuration', (done) => {
          const client = new Client(configuration.EMPTY)
          moxios.install(client._axios)
          const resource = new Reply(client)
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
          const resource = new Reply(new Client(configuration.FULL))
          resource.question.paraphrase.delete(this.input, (error, data) => {
            expect(error).to.be.null
            expect(data).to.equal(this.input)
            done()
          })
        })
        it('handles "unlucky" response', (done) => {
          const resource = new Reply(new Client(configuration.UNLUCKY))
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
          const resource = new Reply(client)
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
        this.model = map.reply.answer.create
        this.input = {
          replyID: '68c445cc-c3b2-11e7-8a88-9801a7ae6c69',
          content: 'content'
        }
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new Reply(client)
        resource.answer.create(this.input)
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).to.include(this.model.path)
          expect(request.config.method).to.equal(this.model.method)
          expect(JSON.parse(request.config.data)).to.include({
            replyId: this.input.replyID,
            answer: this.input.content
          })
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new Reply(new Client(configuration.FULL))
        resource.answer.create(this.input, (error, data) => {
          expect(error).to.be.null
          expect(data).to.be.a('string').that.is.not.empty
          done()
        })
      })
      it('handles "unlucky" response', (done) => {
        const resource = new Reply(new Client(configuration.UNLUCKY))
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
        const resource = new Reply(client)
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
        this.model = map.reply.answer.update
        this.input = {
          id: '703acab4-c3b2-11e7-b8b1-9801a7ae6c69',
          content: 'content'
        }
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new Reply(client)
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
        const resource = new Reply(new Client(configuration.FULL))
        resource.answer.update(this.input, (error, data) => {
          expect(error).to.be.null
          expect(data).to.equal(this.input.id)
          done()
        })
      })
      it('handles "unlucky" response', (done) => {
        const resource = new Reply(new Client(configuration.UNLUCKY))
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
        const resource = new Reply(client)
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
        this.model = map.reply.answer.delete
        this.input = '703acab4-c3b2-11e7-b8b1-9801a7ae6c69'
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new Reply(client)
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
        const resource = new Reply(new Client(configuration.FULL))
        resource.answer.delete(this.input, (error, data) => {
          expect(error).to.be.null
          expect(data).to.equal(this.input)
          done()
        })
      })
      it('handles "unlucky" response', (done) => {
        const resource = new Reply(new Client(configuration.UNLUCKY))
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
        const resource = new Reply(client)
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
