/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import {expect} from 'chai'
import moxios from 'moxios'
import JSON from 'JSON'

import map from '../../src/map'
import Client from '../../src/cape'
import Document from '../../src/resources/Document'
import * as configuration from '../configuration'
import * as response from '../response'

describe('Documents', function () {
  /**
   * Paginate
   */
  describe('paginate', () => {
    it('sets correct request configuration', (done) => {
      const input = {
        search: 'lorem',
        size: 30,
        number: 0
      }
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Document(client)
      resource.paginate(input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(map.document.paginate.path)
        expect(request.config.method).equals(map.document.paginate.method)
        expect(JSON.parse(request.config.data)).to.include({
          searchTerm: input.search,
          numberOfItems: input.size,
          offset: input.size * input.number
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const resource = new Document(new Client(configuration.FULL))
      resource.paginate(null, (error, data) => {
        expect(error).to.be.null
        expect(data).to.have.all.keys('totalItems', 'items')
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Document(new Client(configuration.UNLUCKY))
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
      const resource = new Document(client)
      resource.paginate({}, (error, data) => {
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
  describe('create', () => {
    it('sets correct request configuration - text', (done) => {
      const input = {
        id: 'id',
        title: 'title',
        origin: 'origin',
        content: 'content',
        replace: true
      }
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Document(client)
      resource.create(input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(map.document.create.path)
        expect(request.config.method).equals(map.document.create.method)
        expect(JSON.parse(request.config.data)).to.include({
          documentId: input.id,
          title: input.title,
          origin: input.origin,
          text: input.content,
          replace: input.replace,
          type: 'text'
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    // TODO: fill in test when moving to Karma
    it('sets correct request configuration - file')
    it('handles "full" response', (done) => {
      const input = {
        id: 'id',
        title: 'title',
        origin: 'origin',
        content: 'content',
        replace: false
      }
      const resource = new Document(new Client(configuration.FULL))
      resource.create(input, (error, id) => {
        expect(error).to.be.null
        expect(id).to.equal(input.id)
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Document(new Client(configuration.UNLUCKY))
      resource.create({
        id: 'id',
        title: 'title',
        origin: 'origin',
        content: 'content',
        replace: false
      }, (error, data) => {
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
      const resource = new Document(client)
      resource.create({}, (error, data) => {
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
      this.model = map.document.read
      this.input = '358e1b77c9bcc353946dfe107d6b32ff'
    })
    it('sets correct request configuration', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Document(client)
      resource.read(this.input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).to.include(this.model.path)
        expect(request.config.method).to.equal(this.model.method)
        expect(JSON.parse(request.config.data)).to.deep.include({
          documentIds: this.input
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const resource = new Document(new Client(configuration.FULL))
      resource.read(this.input, (error, data) => {
        expect(error).to.be.null
        expect(data).to.be.an('object').that.is.not.empty
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Document(new Client(configuration.UNLUCKY))
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
      const resource = new Document(client)
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
  describe('delete', () => {
    it('sets correct request configuration', (done) => {
      const input = '358e1b77c9bcc353946dfe107d6b32ff'
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Document(client)
      resource.delete(input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(map.document.delete.path)
        expect(request.config.method).equals(map.document.delete.method)
        expect(JSON.parse(request.config.data)).to.include({
          documentId: input
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const input = '358e1b77c9bcc353946dfe107d6b32ff'
      const resource = new Document(new Client(configuration.FULL))
      resource.delete(input, (error, data) => {
        expect(error).to.be.null
        expect(data).to.equal(input)
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const input = '358e1b77c9bcc353946dfe107d6b32ff'
      const resource = new Document(new Client(configuration.UNLUCKY))
      resource.delete(input, (error, data) => {
        expect(error).not.to.be.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.have.a.property('message')
        expect(error).to.have.a.property('type', Client.Error.library.server.type)
        expect(data).to.be.null
        done()
      })
    })
    it('handles "malformed" response', (done) => {
      const input = '358e1b77c9bcc353946dfe107d6b32ff'
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Document(client)
      resource.delete(input, (error, data) => {
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
