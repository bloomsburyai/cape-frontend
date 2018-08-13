/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import {expect} from 'chai'
import moxios from 'moxios'
import JSON from 'JSON'

import map from '../../src/map'
import Client from '../../src/cape'
import Query from '../../src/resources/Query'
import * as configuration from '../configuration'
import * as response from '../response'

describe('Query', function () {
  /**
   * Prepare
   */
  describe('prepare', function () {
    it('returns new launcher instance', (done) => {
      const resource = new Query(new Client(configuration.EMPTY))
      const launcher = resource.prepare({
        content: 'content'
      })
      expect(launcher).is.not.null
      expect(launcher).is.an.instanceof(Query.Launcher)
      done()
    })
  })
  /**
   *
   * Launcher
   *
   */
  describe('Launcher', function () {
    /**
     * Paginate
     */
    describe('paginate', function () {
      beforeEach(() => {
        this.model = map.query.paginate
        this.inputPrepare = {
          content: 'content',
          threshold: Client.THRESHOLD_MEDIUM,
          // documentIDs: ['id1', 'id2'],
          source: Client.SOURCE_ALL,
          mode: Client.MODE_BALANCED
        }
        this.inputPaginate = {
          size: 1,
          number: 0
        }
      })
      it('sets correct request configuration', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new Query(client)
        resource.prepare(this.inputPrepare).paginate(this.inputPaginate)
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          expect(request.config.url).to.include(this.model.path)
          expect(request.config.method).to.equal(this.model.method)
          expect(request.config.params).to.include({
            token: configuration.EMPTY.token.query
          })
          expect(JSON.parse(request.config.data)).to.deep.include({
            question: this.inputPrepare.content,
            threshold: this.inputPrepare.threshold,
            // documentIds: this.inputPrepare.documentIDs,
            sourceType: this.inputPrepare.source,
            speedOrAccuracy: this.inputPrepare.mode,
            numberOfItems: this.inputPaginate.size,
            offset: this.inputPaginate.size * this.inputPaginate.number
          })
          moxios.uninstall(client._axios)
          done()
        })
      })
      it('handles "full" response', (done) => {
        const resource = new Query(new Client(configuration.FULL))
        resource.prepare(this.inputPrepare)
          .paginate(this.inputPaginate, (error, data) => {
            expect(error).to.be.null
            expect(data).to.be.an('array').that.is.not.empty
            done()
          })
      })
      it('handles "unlucky" response', (done) => {
        const resource = new Query(new Client(configuration.UNLUCKY))
        resource.prepare(this.inputPrepare)
          .paginate(this.inputPaginate, (error, data) => {
            expect(error).to.be.null
            expect(data).to.be.an('array').that.is.empty
            done()
          })
      })
      it('handles "malformed" response', (done) => {
        const client = new Client(configuration.EMPTY)
        moxios.install(client._axios)
        const resource = new Query(client)
        resource.prepare(this.inputPrepare)
          .paginate(this.inputPaginate, (error, data) => {
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
