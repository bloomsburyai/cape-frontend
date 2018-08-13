/* eslint-disable no-unused-expressions */

import Vue from 'vue'

import IconButton from '@/components/button/Icon'

describe('Button', function () {
  /**
   * Icon
   */
  describe('Icon', function () {
    it('has expected data structure', () => {
      const data = IconButton.data()
      expect(data).to.have.a.property('componentStyleObject')
      expect(data).to.have.a.property('iconStyleObject')
    })
    it('sets icon class', () => {
      const Constructor = Vue.extend(IconButton)
      const component = new Constructor({
        propsData: {
          icon: 'test'
        }
      })
      expect(component).to.have.a.property('iconClass', 'fa test')
    })
    it('updates style objects', () => {
      const want = {
        iconSize: 2,
        size: 2.5
      }
      const Constructor = Vue.extend(IconButton)
      const component = new Constructor({
        propsData: want
      })
      expect(component.componentStyleObject).to.include({
        'padding': ((want.size - want.iconSize) / 2) + 'rem',
        'font-size': want.iconSize + 'rem',
        'line-height': want.iconSize + 'rem',
        'width': want.size + 'rem',
        'height': want.size + 'rem'
      })
      expect(component.iconStyleObject).to.include({
        'width': want.iconSize + 'rem',
        'height': want.iconSize + 'rem'
      })
    })
  })
})
