/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import {expect} from 'chai'
import moxios from 'moxios'
import JSON from 'JSON'

import map from '../../src/map'
import Client from '../../src/cape'
import User from '../../src/resources/User'
import * as configuration from '../configuration'
import * as response from '../response'

describe('User', function () {
  /**
   *
   * Profile
   *
   */
  describe('Profile', function () {
    /**
     * Get
     */
    describe('get', function () {
      beforeEach(() => {
        this.model = map.user.profile.get
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new User(client)
        resource.profile.get()
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).includes(this.model.path)
          expect(request.config.method).equals(this.model.method)
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new User(new Client(configuration.FULL))
        resource.profile.get((error, data) => {
          expect(error).to.be.null
          expect(data).to.have.all.keys(
            'username',
            'plan',
            'termsAgreed',
            'onboardingCompleted',
            'forwardEmail',
            'forwardEmailVerified'
          )
          done()
        })
      })
      it('handles "unlucky" response', (done) => {
        const resource = new User(new Client(configuration.UNLUCKY))
        resource.profile.get((error, data) => {
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
        const resource = new User(client)
        resource.profile.get((error, data) => {
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
   *
   * Threshold
   *
   */
  describe('Threshold', function () {
    /**
     * Get
     */
    describe('get', function () {
      beforeEach(() => {
        this.model = map.user.threshold.get
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new User(client)
        resource.threshold.get()
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).includes(this.model.path)
          expect(request.config.method).equals(this.model.method)
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new User(new Client(configuration.FULL))
        resource.threshold.get((error, data) => {
          expect(error).to.be.null
          expect(data).to.be.a('string').that.is.not.empty
          done()
        })
      })
      it('handles "unlucky" response', (done) => {
        const resource = new User(new Client(configuration.UNLUCKY))
        resource.threshold.get((error, data) => {
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
        const resource = new User(client)
        resource.threshold.get((error, data) => {
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
     * Set
     */
    describe('set', function () {
      beforeEach(() => {
        this.model = map.user.threshold.set
        this.input = Client.THRESHOLD_HIGH
      })
      it('sets correct request configuration & request is sent when called without callback', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new User(client)
        resource.threshold.set(this.input)
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).includes(this.model.path)
          expect(request.config.method).equals(this.model.method)
          expect(JSON.parse(request.config.data)).to.include({
            threshold: this.input
          })
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new User(new Client(configuration.FULL))
        resource.threshold.set(this.input, (error, data) => {
          expect(error).to.be.null
          expect(data).to.equal(this.input)
          done()
        })
      })
      it('handles "unlucky" response', (done) => {
        const resource = new User(new Client(configuration.UNLUCKY))
        resource.threshold.set(this.input, (error, data) => {
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
        const resource = new User(client)
        resource.threshold.set(this.input, (error, data) => {
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
   *
   * Forward email
   *
   */
  describe('Forward email', function () {
    /**
     * Set
     */
    describe('set', function () {
      beforeEach(() => {
        this.model = map.user.forwardEmail.set
        this.input = 'test@bloomsbury.ai'
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new User(client)
        resource.forwardEmail.set(this.input)
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).includes(this.model.path)
          expect(request.config.method).equals(this.model.method)
          expect(JSON.parse(request.config.data)).to.include({
            email: this.input
          })
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new User(new Client(configuration.FULL))
        resource.forwardEmail.set(this.input, (error, data) => {
          expect(error).to.be.null
          expect(data).to.equal(this.input)
          done()
        })
      })
      it('handles "unlucky" response', (done) => {
        const resource = new User(new Client(configuration.UNLUCKY))
        resource.forwardEmail.set(this.input, (error, data) => {
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
        const resource = new User(client)
        resource.forwardEmail.set(this.input, (error, data) => {
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
   *
   * Token
   *
   */
  describe('Token', function () {
    /**
     * Get
     */
    describe('get', function () {
      beforeEach(() => {
        this.collection = map.user.token
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new User(client)
        const types = []
        for (let type in this.collection) {
          resource.token[type].get()
          types.push(type)
        }
        moxios.wait(() => {
          let request = null
          let model = null
          for (let i = 0; i < types.length; i++) {
            request = moxios.requests.at(i)
            model = this.collection[types[i]]
            expect(request).to.exist
            expect(model).to.exist
            expect(request.config.url).includes(model.get.path)
            expect(request.config.method).equals(model.get.method)
          }
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new User(new Client(configuration.FULL))
        let callCount = 0
        for (let type in this.collection) {
          resource.token[type].get((error, data) => {
            expect(error).to.be.null
            expect(data).to.be.a('string').that.is.not.empty
            callCount--
            if (callCount === 0) {
              done()
            }
          })
          callCount++
        }
      })
      it('handles "unlucky" response', (done) => {
        const resource = new User(new Client(configuration.UNLUCKY))
        let callCount = 0
        for (let type in this.collection) {
          resource.token[type].get((error, data) => {
            expect(error).not.to.be.null
            expect(error).to.be.an.instanceof(Client.Error)
            expect(error).to.have.a.property('message')
            expect(error).to.have.a.property('type', Client.Error.library.server.type)
            expect(data).to.be.null
            callCount--
            if (callCount === 0) {
              done()
            }
          })
          callCount++
        }
      })
      it('handles "malformed" response', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new User(client)
        let callCount = 0
        for (let type in this.collection) {
          resource.token[type].get((error, data) => {
            expect(error).not.to.be.null
            expect(error).to.be.an.instanceof(Client.Error)
            expect(error).to.include(Client.Error.library.malformedResponse)
            expect(data).to.be.null
            callCount--
            if (callCount === 0) {
              moxios.uninstall(client._axios)
              done()
            }
          })
          callCount++
        }
        moxios.wait(() => {
          let request = null
          for (let i = 0; i < moxios.requests.count(); i++) {
            request = moxios.requests.at(i)
            request.respondWith(response.MALFORMED)
          }
        })
      })
    })
  })
  /**
   *
   * Plan
   *
   */
  describe('Plan', function () {
    /**
     * Set
     */
    describe('set', function () {
      beforeEach(() => {
        this.model = map.user.plan.set
        this.input = Client.PLAN_BASIC
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new User(client)
        resource.plan.set(this.input)
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).include(this.model.path)
          expect(request.config.method).equals(this.model.method)
          expect(JSON.parse(request.config.data)).to.include({
            plan: this.input
          })
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new User(new Client(configuration.FULL))
        resource.plan.set(this.input, (error, data) => {
          expect(error).to.be.null
          expect(data).to.equal(this.input)
          done()
        })
      })
      it('handles "unlucky" response')
      it('handles "malformed" response', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new User(client)
        resource.plan.set(this.input, (error, data) => {
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
   *
   * Terms
   *
   */
  describe('Terms', function () {
    /**
     * Agree
     */
    describe('agree', function () {
      beforeEach(() => {
        this.model = map.user.terms.agree
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new User(client)
        resource.terms.agree()
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).includes(this.model.path)
          expect(request.config.method).equals(this.model.method)
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new User(new Client(configuration.FULL))
        resource.terms.agree((error, data) => {
          expect(error).to.be.null
          expect(data).to.be.true
          done()
        })
      })
    })
  })
  /**
   *
   * Onboarding
   *
   */
  describe('Onboarding', function () {
    /**
     * Complete
     */
    describe('complete', function () {
      beforeEach(() => {
        this.model = map.user.onboarding.complete
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new User(client)
        resource.onboarding.complete()
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).includes(this.model.path)
          expect(request.config.method).equals(this.model.method)
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new User(new Client(configuration.FULL))
        resource.onboarding.complete((error, data) => {
          expect(error).to.be.null
          expect(data).to.be.true
          done()
        })
      })
    })
  })
  /**
   *
   * Statistics
   *
   */
  describe('Statistics', function () {
    /**
     * Get
     */
    describe('get', function () {
      beforeEach(() => {
        this.model = map.user.statistics.get
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new User(client)
        resource.statistics.get()
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).includes(this.model.path)
          expect(request.config.method).equals(this.model.method)
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response')
    })
  })
})
