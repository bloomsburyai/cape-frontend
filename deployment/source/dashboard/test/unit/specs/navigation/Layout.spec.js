/* eslint-disable no-unused-expressions */

import Vue from 'vue'

import router from '@/router'
import NavigationLayout from '@/components/navigation/Layout'

describe('Navigation', function () {
  /**
   * Layout
   */
  describe('Layout', function () {
    it('has expected data structure', () => {
      const data = NavigationLayout.data()
      expect(data).to.have.a.property('page', '')
    })
    it('has default page value', () => {
      const Constructor = Vue.extend(NavigationLayout)
      const component = new Constructor({router})
      expect(component).to.have.a.property('page').that.is.not.empty
    })
    it('updates page with route', () => {
      const Constructor = Vue.extend(NavigationLayout)
      const component = new Constructor({router})
      expect(component).to.have.a.property('page', 'assistant')
      router.push('integrations')
      component.$nextTick(() => {
        expect(component).to.have.a.property('page', 'integrations')
      })
    })
  })
})
