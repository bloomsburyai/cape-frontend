/* eslint-disable no-unused-expressions */

import $ from 'jquery'
import moxios from 'moxios'
import Vue from 'vue'

import * as configuration from '../configuration'
import client from '@/client'
import HeaderLayout from '@/components/header/Layout'

describe('Header', function () {
  /**
   * Layout
   */
  describe('Layout', function () {
    it('emits toggle event', (done) => {
      client.configuration = configuration.EMPTY
      moxios.install(client._axios)
      moxios.stubRequest(/user/, {status: 200})
      const callback = sinon.spy()
      const component = new Vue(HeaderLayout).$mount()
      component.$on('toggle', callback)
      const $button = $('.cape-dashboard-icon-button', component.$el)
      $button.click()
      component.$nextTick(() => {
        expect(callback.called).to.be.true
        moxios.uninstall(client._axios)
        done()
      })
    })
  })
})
