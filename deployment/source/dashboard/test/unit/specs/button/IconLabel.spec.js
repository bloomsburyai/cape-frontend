/* eslint-disable no-unused-expressions */

import $ from 'jquery'
import Vue from 'vue'

import IconLabelButton from '@/components/button/IconLabel'

describe('Button', function () {
  /**
   * Icon label
   */
  describe('IconLabel', function () {
    it('sets icon class', () => {
      const Constructor = Vue.extend(IconLabelButton)
      const component = new Constructor({
        propsData: {
          icon: 'test'
        }
      })
      expect(component).to.have.a.property('iconClass', 'fa test')
    })
    it('updates class and style objects', () => {
      const props = {
        iconSize: 1.75,
        iconColor: 'red',
        labelColor: 'blue',
        block: true
      }
      const Constructor = Vue.extend(IconLabelButton)
      const component = new Constructor({
        propsData: props
      })
      expect(component.componentClassObject).to.include({
        'block': props.block
      })
      expect(component.iconStyleObject).to.include({
        'width': props.iconSize + 'rem',
        'height': props.iconSize + 'rem',
        'font-size': props.iconSize + 'rem',
        'line-height': props.iconSize + 'rem',
        'color': props.iconColor
      })
      expect(component.labelStyleObject).to.include({
        'color': props.labelColor
      })
    })
    it('updates label in dom', () => {
      const props = {
        label: 'hello'
      }
      const Constructor = Vue.extend(IconLabelButton)
      const component = new Constructor({
        propsData: props
      }).$mount()
      expect($('.label', component.$el).text()).to.include(props.label)
    })
  })
})
