/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai'
import moxios from 'moxios'
import sinon from 'sinon'
import Client from '../src/cape'
import Resource from '../src/Resource'

describe('Resource', function () {
  beforeEach(function () {
    this.client = new Client({backendURL: ''})
    moxios.install(this.client._axios)
  })
  afterEach(function () {
    moxios.uninstall(this.client._axios)
  })
  it('handles successfull response', function (done) {
    let callback = sinon.spy()
    let resource = new Resource(this.client)
    resource._request({}, callback)
    moxios.wait(function () {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          success: true,
          result: {message: 'hello'}
        }
      }).then(function () {
        sinon.assert.called(callback)
        sinon.assert.calledWith(callback, null, {message: 'hello'})
        done()
      })
    })
  })
  it('handles success response that has body success set to false', function (done) {
    let callback = sinon.spy()
    let resource = new Resource(this.client)
    resource._request({}, callback)
    moxios.wait(function () {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          success: false,
          result: {message: 'error'}
        }
      }).then(function () {
        sinon.assert.called(callback)
        let error = callback.getCall(0).args[0]
        let data = callback.getCall(0).args[1]
        expect(error).to.be.not.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.have.a.property('type', Client.Error.library.server.type)
        expect(error).to.have.a.property('message', 'error')
        expect(data).to.be.null
        done()
      })
    })
  })
  it('handles success response that is not properly formated', function (done) {
    let callback = sinon.spy()
    let resource = new Resource(this.client)
    resource._request({}, callback)
    moxios.wait(function () {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          foo: 'bar'
        }
      }).then(function () {
        sinon.assert.called(callback)
        let error = callback.getCall(0).args[0]
        let data = callback.getCall(0).args[1]
        expect(error).to.be.not.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.have.a.property('type', Client.Error.library.unknown.type)
        expect(error).to.have.a.property('message', Client.Error.library.unknown.message)
        expect(data).to.be.null
        done()
      })
    })
  })
  it('handles timeout errors', function (done) {
    let callback = sinon.spy()
    moxios.stubTimeout('/timeout')
    let resource = new Resource(this.client)
    resource._request({
      path: '/timeout'
    }, callback)
    moxios.wait(function () {
      sinon.assert.called(callback)
      let error = callback.getCall(0).args[0]
      let data = callback.getCall(0).args[1]
      expect(error).to.be.not.null
      expect(error).to.be.an.instanceof(Client.Error)
      expect(error).to.have.a.property('type', Client.Error.library.timeout.type)
      expect(error).to.have.a.property('message', Client.Error.library.timeout.message)
      expect(data).to.be.null
      done()
    })
  })
  it('handles server errors with messages', function (done) {
    let callback = sinon.spy()
    let resource = new Resource(this.client)
    resource._request({}, callback)
    moxios.wait(function () {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
        response: {
          result: {message: 'not found'}
        }
      }).then(function () {
        sinon.assert.called(callback)
        let error = callback.getCall(0).args[0]
        let data = callback.getCall(0).args[1]
        expect(error).not.to.be.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.have.a.property('type', Client.Error.library.server.type)
        expect(error).to.have.a.property('message', 'not found')
        expect(data).to.be.null
        done()
      })
    })
  })
  it('handles server error', function (done) {
    let callback = sinon.spy()
    let resource = new Resource(this.client)
    resource._request({}, callback)
    moxios.wait(function () {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404
      }).then(function () {
        sinon.assert.called(callback)
        let error = callback.getCall(0).args[0]
        let data = callback.getCall(0).args[1]
        expect(error).not.to.be.null
        expect(error).to.be.an.instanceof(Client.Error)
        expect(error).to.have.a.property('type', Client.Error.library.unknown.type)
        expect(error).to.have.a.property('message', Client.Error.library.unknown.message)
        expect(data).to.be.null
        done()
      })
    })
  })
})
