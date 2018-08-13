/* eslint-disable no-unused-expressions */

import $ from 'jquery'
import Vue from 'vue'

import AlertMessage from '@/components/alert/Message'

describe('Alert', function () {
  /**
   * Message
   */
  describe('Message', function () {
    it('has expected type constants', () => {
      expect(AlertMessage).to.have.a.property('TYPE_INFORM')
      expect(AlertMessage).to.have.a.property('TYPE_ERROR')
      expect(AlertMessage).to.have.a.property('TYPE_SUCCESS')
    })
    it('has expected data structure', () => {
      const data = AlertMessage.data()
      expect(data).to.have.a.property('type', '')
      expect(data).to.have.a.property('label', '')
    })
    it('updates component class object to reflect type', () => {
      const component = new Vue(AlertMessage)
      component.type = AlertMessage.TYPE_INFORM
      expect(component.componentClassObject).to.have.a.property('inform')
      component.type = AlertMessage.TYPE_ERROR
      expect(component.componentClassObject).to.have.a.property('error')
      component.type = AlertMessage.TYPE_SUCCESS
      expect(component.componentClassObject).to.have.a.property('success')
    })
    it('emits close event', (done) => {
      const callback = sinon.spy()
      const component = new Vue(AlertMessage).$mount()
      component.$on('close', callback)
      const $button = $('.cape-dashboard-icon-button', component.$el)
      $button.click()
      component.$nextTick(() => {
        expect(callback.called).to.be.true
        done()
      })
    })
    it('updates rendered label', (done) => {
      const component = new Vue(AlertMessage).$mount()
      component.label = 'hello'
      component.$nextTick(() => {
        expect($('.label', component.$el).text()).to.include(component.label)
        done()
      })
    })
  })
})
