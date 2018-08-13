/* eslint-disable no-unused-expressions */

import $ from 'jquery'
import moxios from 'moxios'
import Vue from 'vue'

import router from '@/router'
import * as configuration from '../configuration'
import client from '@/client'
import Layout from '@/components/assistant/Layout'

describe('Assistant', function () {
  /**
   * Layout
   */
  describe('Layout.vue', function () {
    it('has expected data structure', () => {
      const data = Layout.data()
      // state
      expect(data).to.have.a.property('STATE_PROGRESS')
      expect(data).to.have.a.property('STATE_ERROR')
      expect(data).to.have.a.property('STATE_EMPTY')
      expect(data).to.have.a.property('STATE_COMPLETE')
      expect(data).to.have.a.property('state').that.is.empty
      // error
      expect(data).to.have.a.property('errorMessage').that.is.empty
      // // header
      // expect(data).to.have.a.property('headerWrapperStyleObject').that.is.empty
      // input
      expect(data).to.have.a.property('INPUT_PLACEHOLDER')
      expect(data).to.have.a.property('inputValue')
      // list
      expect(data).to.have.a.property('scrollbarWidth')
      // panel
      expect(data).to.have.a.property('panelVisible')
      expect(data).to.have.a.property('panelModel')
      // query
      expect(data).to.have.a.property('queryCollection')
    })
    it('has input component', () => {
      client.configuration = configuration.EMPTY
      const Constructor = Vue.extend(Layout)
      const component = new Constructor({router}).$mount()
      component._queryClient = sinon.spy()
      const inputSelection = $('.cape-dashboard-assistant-input', component.$el)
      expect(inputSelection).not.to.be.empty
      expect(inputSelection).to.have.a.property('0')
      expect(inputSelection[0]).not.to.be.empty
    })
    it('queries client on input change', () => {
      const want = 'query'
      const queryCallback = sinon.spy()
      const Constructor = Vue.extend(Layout)
      const component = new Constructor({router}).$mount()
      component._queryClient = queryCallback
      const input = component.$refs.input
      input.$emit('input', want)
      expect(queryCallback.called).to.be.true
      expect(queryCallback.calledWith(want)).to.be.true
    })
    it('updates state to progress on input change', () => {
      client.configuration = configuration.EMPTY
      moxios.install(client._axios)
      const Constructor = Vue.extend(Layout)
      const component = new Constructor({router}).$mount()
      const input = component.$refs.input
      input.$emit('input', 'query')
      expect(component.state).to.equal(Layout.STATE_PROGRESS)
      moxios.uninstall(client._axios)
    })
    it('updates state to error', (done) => {
      client.configuration = configuration.EMPTY
      moxios.install(client._axios)
      const Constructor = Vue.extend(Layout)
      const component = new Constructor({router}).$mount()
      const input = component.$refs.input
      input.$emit('input', 'query')
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 500
        }).then(() => {
          expect(component.state).to.equal(Layout.STATE_ERROR)
          moxios.uninstall(client._axios)
          done()
        })
      })
    })
    it('updates state to empty', (done) => {
      client.configuration = configuration.EMPTY
      moxios.install(client._axios)
      const Constructor = Vue.extend(Layout)
      const component = new Constructor({router}).$mount()
      const input = component.$refs.input
      input.$emit('input', 'query')
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: {
            success: true,
            result: {items: []}
          }
        }).then(() => {
          expect(component.state).to.equal(Layout.STATE_EMPTY)
          moxios.uninstall(client._axios)
          done()
        })
      })
    })
    it('updates state to complete', (done) => {
      client.configuration = configuration.EMPTY
      moxios.install(client._axios)
      const Constructor = Vue.extend(Layout)
      const component = new Constructor({router}).$mount()
      const input = component.$refs.input
      input.$emit('input', 'query')
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: {
            success: true,
            result: {
              items: [
                {
                  answerText: 'hello',
                  confidence: 1,
                  sourceType: 'saved_reply',
                  sourceId: 'a68cfb661413484e8898955451a71bda',
                  matchedQuestion: 'hi'
                }
              ]
            }
          }
        }).then(() => {
          expect(component.state).to.equal(Layout.STATE_COMPLETE)
          moxios.uninstall(client._axios)
          done()
        })
      })
    })
  })
})
