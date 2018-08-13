/* eslint-disable no-unused-expressions */

import $ from 'jquery'
import Vue from 'vue'

import ProgressLabelButton from '@/components/button/ProgressLabel'

describe('Button', function () {
  /**
   * Progress label
   */
  describe('ProgressLabel', function () {
    it('updates component class object', () => {
      const props = {
        block: true,
        progress: true
      }
      const Constructor = Vue.extend(ProgressLabelButton)
      const component = new Constructor({
        propsData: props
      })
      expect(component.componentClassObject).to.include({
        block: true,
        progress: true
      })
    })
    it('updates label in dom', () => {
      const props = {
        label: 'hello'
      }
      const Constructor = Vue.extend(ProgressLabelButton)
      const component = new Constructor({
        propsData: props
      }).$mount()
      expect($('.label', component.$el).text()).to.include(props.label)
    })
  })
})
