/* eslint-disable no-unused-expressions */

import ContentSwitcher from '@/components/content/Switcher'

describe('Content', function () {
  /**
   * Switcher
   */
  describe('Switcher', function () {
    it('has expected data structure', () => {
      const data = ContentSwitcher.data()
      expect(data).to.have.a.property('selectedItem', null)
    })
  })
})
