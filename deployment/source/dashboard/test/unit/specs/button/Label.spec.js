/* eslint-disable no-unused-expressions */

import Vue from 'vue'

import LabelButton from '@/components/button/Label'

describe('Button', function () {
  /**
   * Label
   */
  describe('Label', function () {
    it('has expected data structure', () => {
      const data = LabelButton.data()
      expect(data).to.have.a.property('componentClassObject')
    })
    it('updates class object', () => {
      const Constructor = Vue.extend(LabelButton)
      const component1 = new Constructor()
      const component2 = new Constructor({
        propsData: {
          block: true
        }
      })
      expect(component1.componentClassObject).to.have.a.property('block', false)
      expect(component2.componentClassObject).to.have.a.property('block', true)
    })
    it('updates label in dom', () => {
      const props = {
        label: 'hello'
      }
      const Constructor = Vue.extend(LabelButton)
      const component = new Constructor({
        propsData: props
      }).$mount()
      expect(component.$el.textContent).to.include(props.label)
    })
  })
})
