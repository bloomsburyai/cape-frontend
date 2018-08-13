/* eslint-disable no-unused-expressions */

import Vue from 'vue'

import HeaderContentLayout from '@/components/layout/HeaderContent'

describe('Layout', function () {
  /**
   * Header content
   */
  describe('HeaderContent', function () {
    it('has expected data structure', () => {
      const data = HeaderContentLayout.data()
      expect(data).to.have.a.property('componentClassObject')
      expect(data).to.have.a.property('contentStyleObject')
    })
    it('propagates properties to component class object', () => {
      const Constructor = Vue.extend(HeaderContentLayout)
      const component1 = new Constructor()
      const component2 = new Constructor({
        propsData: {
          hasScrollingRegion: true,
          fullbleed: true
        }
      })
      expect(component1.componentClassObject).to.include({
        'has-scrolling-region': false,
        'fullbleed': false
      })
      expect(component2.componentClassObject).to.include({
        'has-scrolling-region': true,
        'fullbleed': true
      })
    })
  })
})
