/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import {expect} from 'chai'
import moxios from 'moxios'
import JSON from 'JSON'

import map from '../../src/map'
import Client from '../../src/cape'
import Inbox from '../../src/resources/Inbox'
import * as configuration from '../configuration'
import * as response from '../response'

describe('Inbox', function () {
  /**
   * Paginate
   */
  describe('paginate', () => {
    it('sets correct request configuration', (done) => {
      const input = {
        read: 'true',
        answered: 'true',
        search: 'search',
        size: 30,
        number: 0
      }
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Inbox(client)
      resource.paginate(input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(map.inbox.paginate.path)
        expect(request.config.method).equals(map.inbox.paginate.method)
        expect(JSON.parse(request.config.data)).to.include({
          read: input.read,
          answered: input.answered,
          searchTerm: input.search,
          numberOfItems: input.size,
          offset: input.size * input.number
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const resource = new Inbox(new Client(configuration.FULL))
      resource.paginate(null, (error, data) => {
        expect(error).to.be.null
        expect(data).to.have.all.keys('totalItems', 'items')
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Inbox(new Client(configuration.UNLUCKY))
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
      const resource = new Inbox(client)
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
   * Mark as read
   */
  describe('markAsRead', () => {
    it('sets correct request configuration', (done) => {
      const input = '7e94dfae-c3b1-11e7-a15b-9801a7ae6c69'
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Inbox(client)
      resource.markAsRead(input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(map.inbox.markAsRead.path)
        expect(request.config.method).equals(map.inbox.markAsRead.method)
        expect(JSON.parse(request.config.data)).to.include({
          inboxId: input
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const input = '7e94dfae-c3b1-11e7-a15b-9801a7ae6c69'
      const resource = new Inbox(new Client(configuration.FULL))
      resource.markAsRead(input, (error, data) => {
        expect(error).to.be.null
        expect(data).to.equal(input)
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const input = '7e94dfae-c3b1-11e7-a15b-9801a7ae6c69'
      const resource = new Inbox(new Client(configuration.UNLUCKY))
      resource.markAsRead(input, (error, data) => {
        expect(error).not.to.be.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.have.a.property('message')
        expect(error).to.have.a.property('type', Client.Error.library.server.type)
        expect(data).to.be.null
        done()
      })
    })
    it('handles "malformed" response', (done) => {
      const input = '7e94dfae-c3b1-11e7-a15b-9801a7ae6c69'
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Inbox(client)
      resource.markAsRead(input, (error, data) => {
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
   * Archive
   */
  describe('archive', () => {
    it('sets correct request configuration', (done) => {
      const input = '7e94dfae-c3b1-11e7-a15b-9801a7ae6c69'
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Inbox(client)
      resource.archive(input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(map.inbox.archive.path)
        expect(request.config.method).equals(map.inbox.archive.method)
        expect(JSON.parse(request.config.data)).to.include({
          inboxId: input
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const input = '7e94dfae-c3b1-11e7-a15b-9801a7ae6c69'
      const resource = new Inbox(new Client(configuration.FULL))
      resource.archive(input, (error, data) => {
        expect(error).to.be.null
        expect(data).to.equal(input)
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const input = '7e94dfae-c3b1-11e7-a15b-9801a7ae6c69'
      const resource = new Inbox(new Client(configuration.UNLUCKY))
      resource.archive(input, (error, data) => {
        expect(error).not.to.be.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.have.a.property('message')
        expect(error).to.have.a.property('type', Client.Error.library.server.type)
        expect(data).to.be.null
        done()
      })
    })
    it('handles "malformed" response', (done) => {
      const input = '7e94dfae-c3b1-11e7-a15b-9801a7ae6c69'
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Inbox(client)
      resource.archive(input, (error, data) => {
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
