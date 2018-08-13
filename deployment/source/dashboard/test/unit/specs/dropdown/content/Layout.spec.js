/* eslint-disable no-unused-expressions */

import $ from 'jquery'
import Vue from 'vue'

import DropdownContentLayout from '@/components/dropdown/content/Layout'

describe('Dropdown', function () {
  /**
   * Content
   */
  describe('Content', function () {
    /**
     * Layout
     */
    describe('Layout', function () {
      it('has expected data structure', () => {
        const data = DropdownContentLayout.data()
        expect(data).to.have.a.property('componentClassObject')
        expect(data).to.have.a.property('contentStyleObject')
      })
      it('updates component class object when open, close and toggle', () => {
        const Constructor = Vue.extend(DropdownContentLayout)
        const component = new Constructor({
          propsData: {
            horizontalAlign: 'left',
            verticalAlign: 'top'
          }
        })
        expect(component.componentClassObject).to.have.a.property('active', false)
        component.toggle()
        expect(component.componentClassObject).to.have.a.property('active', true)
        component.close()
        expect(component.componentClassObject).to.have.a.property('active', false)
        component.open()
        expect(component.componentClassObject).to.have.a.property('active', true)
      })
      it('closes when document gets clicked', () => {
        const Constructor = Vue.extend(DropdownContentLayout)
        const component = new Constructor({
          propsData: {
            horizontalAlign: 'left',
            verticalAlign: 'top'
          }
        })
        expect(component).to.have.a.property('opened', false)
        component.open()
        expect(component).to.have.a.property('opened', true)
        $(document, component.$el).click()
        expect(component).to.have.a.property('opened', false)
      })
      it('emits event when opened, closed or toggle', () => {
        const Constructor = Vue.extend(DropdownContentLayout)
        const component = new Constructor({
          propsData: {
            horizontalAlign: 'left',
            verticalAlign: 'top'
          }
        })
        const callback = sinon.spy()
        component.$on('stateChange', callback)
        component.open()
        component.close()
        component.toggle()
        expect(callback.called).to.be.true
        expect(callback.callCount).to.equal(3)
      })
    })
  })
})
