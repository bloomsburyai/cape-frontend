/**
 * Store
 */

const TOOL_SELECTION = 'toolSelection'
const TOOL_RECTANGLE = 'toolRectangle'

const store = {
  // tool repository
  TOOL_SELECTION,
  TOOL_RECTANGLE,
  // current tool
  tool: TOOL_SELECTION,
  // panel
  panel: {
    annotation: {
      opened: false,
      model: null,
      target: null
    }
  }
}

/**
 * Export
 */

export default store
