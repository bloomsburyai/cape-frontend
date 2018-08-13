/* eslint-disable no-unused-expressions */

import $ from 'jquery'
import Vue from 'vue'

import TermsAlert from '@/components/terms/Alert'

describe('Terms', function () {
  /**
   * Alert
   */
  describe('Alert', function () {
    it('emits open event', (done) => {
      const callback = sinon.spy()
      const component = new Vue(TermsAlert).$mount()
      component.$on('open', callback)
      const $link = $('a', component.$el)[0]
      $link.click()
      component.$nextTick(() => {
        expect(callback.called).to.be.true
        done()
      })
    })
    it('emits close event', (done) => {
      const callback = sinon.spy()
      const component = new Vue(TermsAlert).$mount()
      component.$on('close', callback)
      const $button = $('.cape-dashboard-icon-button', component.$el)
      $button.click()
      component.$nextTick(() => {
        expect(callback.called).to.be.true
        done()
      })
    })
  })
})
