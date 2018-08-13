/* eslint-disable no-unused-expressions */

import SearchLayout from '@/components/search/Layout'

describe.only('Search', function () {
  /**
   * Layout
   */
  describe('Layout', function () {
    it('has expected state constants', () => {
      expect(SearchLayout).to.have.a.property('STATE_CLOSED')
      expect(SearchLayout).to.have.a.property('STATE_OPENED')
    })
    it('has expected data structure', () => {
      const data = SearchLayout.data()
      expect(data).to.have.a.property('STATE_CLOSED', SearchLayout.STATE_CLOSED)
      expect(data).to.have.a.property('STATE_OPENED', SearchLayout.STATE_OPENED)
      expect(data).to.have.a.property('state', SearchLayout.STATE_CLOSED)
      expect(data).to.have.a.property('inputValue')
    })
  })
})
