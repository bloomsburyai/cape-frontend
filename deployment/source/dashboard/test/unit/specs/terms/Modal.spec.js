/* eslint-disable no-unused-expressions */

import $ from 'jquery'
import moxios from 'moxios'
import Vue from 'vue'

import * as configuration from '../configuration'
import client from '@/client'
import TermsModal from '@/components/terms/Modal'

describe('Terms', function () {
  /**
   * Modal
   */
  describe('Modal', function () {
    it('has expected data structure', () => {
      const data = TermsModal.data()
      expect(data).to.have.a.property('scrollbarWidth', 0)
    })
    it('emits close event', (done) => {
      const callback = sinon.spy()
      const component = new Vue(TermsModal).$mount()
      component.$on('close', callback)
      const $button = $('.cape-dashboard-icon-button', component.$el)
      $button.click()
      component.$nextTick(() => {
        expect(callback.called).to.be.true
        done()
      })
    })
    it('emits agree event', (done) => {
      client.configuration = configuration.EMPTY
      moxios.install(client._axios)
      moxios.stubRequest(/terms/, {status: 200})
      const callback = sinon.spy()
      const component = new Vue(TermsModal).$mount()
      component.$on('agree', callback)
      const $button = $('.cape-dashboard-label-button', component.$el)
      $button.click()
      component.$nextTick(() => {
        expect(callback.called).to.be.true
        moxios.uninstall(client._axios)
        done()
      })
    })
  })
})
