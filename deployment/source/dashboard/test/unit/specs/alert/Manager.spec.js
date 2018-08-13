/* eslint-disable no-unused-expressions */

import Vue from 'vue'

import AlertManager from '@/components/alert/Manager'

describe('Alert', function () {
  /**
   * Manager
   */
  describe('Manager', function () {
    it('has expected state constants', () => {
      expect(AlertManager).to.have.a.property('STATE_CLOSED')
      expect(AlertManager).to.have.a.property('STATE_OPENED')
    })
    it('has expected data structure', () => {
      const data = AlertManager.data()
      expect(data).to.have.a.property('STATE_CLOSED', AlertManager.STATE_CLOSED)
      expect(data).to.have.a.property('STATE_OPENED', AlertManager.STATE_OPENED)
      expect(data).to.have.a.property('state', AlertManager.STATE_CLOSED)
    })
    it('has default opened value', () => {
      const component = new Vue(AlertManager)
      expect(component).to.have.a.property('opened', false)
    })
    it('updates state value when open is called', () => {
      const component = new Vue(AlertManager).$mount()
      expect(component).to.have.a.property('state', AlertManager.STATE_CLOSED)
      component.open()
      expect(component).to.have.a.property('state', AlertManager.STATE_OPENED)
    })
    it('updates state value when close is called', () => {
      const component = new Vue(AlertManager).$mount()
      expect(component).to.have.a.property('state', AlertManager.STATE_CLOSED)
      component.open()
      expect(component).to.have.a.property('state', AlertManager.STATE_OPENED)
      component.close()
      expect(component).to.have.a.property('state', AlertManager.STATE_CLOSED)
    })
    it('updates state to close on alert message close event', () => {
      const component = new Vue(AlertManager)
      component.state = AlertManager.STATE_OPENED
      component.$mount()
      expect(component).to.have.a.property('state', AlertManager.STATE_OPENED)
      expect(component.$refs).to.have.a.property('message')
      component.$refs.message.$emit('close')
      expect(component).to.have.a.property('state', AlertManager.STATE_CLOSED)
    })
  })
})
