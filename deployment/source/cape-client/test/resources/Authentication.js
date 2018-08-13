/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import {expect} from 'chai'
import moxios from 'moxios'

import map from '../../src/map'
import Client from '../../src/cape'
import Authentication from '../../src/resources/Authentication'
import * as configuration from '../configuration'
import * as response from '../response'

describe('Authentication', function () {
  /**
   * Login
   */
  describe('login', function () {
    beforeEach(() => {
      this.model = map.authentication.login
      this.input = {
        username: 'username',
        password: 'password'
      }
    })
    it('sets correct request configuragion', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Authentication(client)
      resource.login(this.input)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).includes(this.model.path)
        expect(request.config.method).equals(this.model.method)
        expect(request.config.params).to.include({
          login: this.input.username,
          password: this.input.password
        })
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const resource = new Authentication(new Client(configuration.FULL))
      resource.login(this.input, (error, data) => {
        expect(error).to.be.null
        expect(data).to.have.all.keys('message', 'sessionId', 'adminToken')
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Authentication(new Client(configuration.UNLUCKY))
      resource.login(this.input, (error, data) => {
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
      const resource = new Authentication(client)
      resource.login(this.input, (error, data) => {
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
   * Logout
   */
  describe('logout', function () {
    beforeEach(() => {
      this.model = map.authentication.logout
    })
    it('sets correct request configuration', (done) => {
      const client = new Client(configuration.EMPTY)
      moxios.install(client._axios)
      const resource = new Authentication(client)
      resource.logout()
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        expect(request.config.url).to.include(this.model.path)
        expect(request.config.method).to.equal(this.model.method)
        moxios.uninstall(client._axios)
        done()
      })
    })
    it('handles "full" response', (done) => {
      const resource = new Authentication(new Client(configuration.FULL))
      resource.logout((error, data) => {
        expect(error).to.be.null
        expect(data).to.be.a('string').that.is.not.empty
        done()
      })
    })
    it('handles "unlucky" response', (done) => {
      const resource = new Authentication(new Client(configuration.UNLUCKY))
      resource.logout((error, data) => {
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
      const resource = new Authentication(client)
      resource.logout((error, data) => {
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
   * Platform
   */
  describe('platform', () => {
    it('exposes platform property', () => {
      const resource = new Authentication(new Client(configuration.EMPTY))
      expect(resource).to.have.nested.property('platform.facebook')
      expect(resource).to.have.nested.property('platform.google')
    })
  })
})
