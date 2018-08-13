/* eslint-disable no-unused-expressions */

import Vue from 'vue'

import ContentItem from '@/components/content/Item'

describe('Content', function () {
  /**
   * Item
   */
  describe('Item', function () {
    it('has expected data structure', () => {
      const data = ContentItem.data()
      expect(data).to.have.a.property('componentClassObject')
      expect(data.componentClassObject).to.have.a.property('selected')
    })
    it('allows setting and getting selected property', () => {
      const Constructor = Vue.extend(ContentItem)
      const component = new Constructor({
        propsData: {
          value: 'hello'
        }
      })
      expect(component).to.have.a.property('selected', false)
      expect(component.componentClassObject).to.have.a.property('selected', false)
      component.selected = true
      expect(component).to.have.a.property('selected', true)
      expect(component.componentClassObject).to.have.a.property('selected', true)
    })
  })
})
