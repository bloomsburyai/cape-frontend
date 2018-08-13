/* eslint-disable no-unused-expressions */

import Vue from 'vue'

import DrawerContentLayout from '@/components/layout/DrawerContent'

describe('Layout', function () {
  /**
   * Drawer content
   */
  describe('DrawerContent', function () {
    it('has expected data structure', () => {
      const data = DrawerContentLayout.data()
      expect(data).to.have.a.property('componentClassObject')
      expect(data).to.have.a.property('drawerStyleObject')
      expect(data).to.have.a.property('contentStyleObject')
    })
    it('propagates fullbleed property to component class object', () => {
      const Constructor = Vue.extend(DrawerContentLayout)
      const component1 = new Constructor()
      const component2 = new Constructor({
        propsData: {
          fullbleed: true
        }
      })
      expect(component1.componentClassObject).to.have.a.property('fullbleed', false)
      expect(component2.componentClassObject).to.have.a.property('fullbleed', true)
    })
  })
})
