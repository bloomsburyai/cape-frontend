/* eslint-disable no-unused-expressions */

import Vue from 'vue'

import CircleProgress from '@/components/progress/Circle'

describe('Progress', function () {
  /**
   * Circle
   */
  describe('Circle', function () {
    it('updates component class object', () => {
      const Constructor = Vue.extend(CircleProgress)
      const component1 = new Constructor()
      const component2 = new Constructor({
        propsData: {
          active: false
        }
      })
      expect(component1.componentClassObject).to.have.a.property('active', true)
      expect(component2.componentClassObject).to.have.a.property('active', false)
    })
    it('updates component style object', () => {
      const props = {
        size: 3
      }
      const Constructor = Vue.extend(CircleProgress)
      const component = new Constructor({
        propsData: props
      })
      expect(component.componentStyleObject).to.include({
        width: props.size + 'rem',
        height: props.size + 'rem'
      })
    })
  })
})
