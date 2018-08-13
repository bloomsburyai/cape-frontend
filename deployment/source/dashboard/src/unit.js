import _ from 'lodash'

/**
 *
 * Unit utility methods
 *
 */

const REM_TO_PIXEL_RATIO = 16

export default {
  convertRemToPixels (input) {
    if (!_.isNumber(input)) {
      return 0
    }
    return input * REM_TO_PIXEL_RATIO
  },
  convertPixelsToRem (input) {
    if (!_.isNumber(input)) {
      return 0
    }
    return input / REM_TO_PIXEL_RATIO
  },
  convertDegreesToRadians (input) {
    if (!_.isNumber(input)) {
      return 0
    }
    return input * Math.PI / 180
  },
  convertRadiansToDegrees (input) {
    if (!_.isNumber(input)) {
      return 0
    }
    return input * 180 / Math.PI
  }
}
