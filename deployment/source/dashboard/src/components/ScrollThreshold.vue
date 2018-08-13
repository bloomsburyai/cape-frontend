<style scoped lang="scss">
  @import "../scss/cape";

  .cape-dashboard-scroll-threshold {
    display: block;
  }
</style>

<template>
  <div class="cape-dashboard-scroll-threshold"
    v-bind:style="componentStyleObject">
    <slot/>
  </div>
</template>

<script>

export default {

  data () {
    return {
      componentStyleObject: null,
      normalizedTarget: null,
      upperTriggered: false,
      lowerTriggered: false
    }
  },

  props: {
    target: {
      validator: function (value) {
        return value === window || value instanceof HTMLElement
      },
      default: null
    },
    threshold: {
      type: Number,
      default: 10
    },
    enabled: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    normalizedTarget: function (fresh, stale) {
      if (fresh === this.$el) {
        this.componentStyleObject = {
          'overflow': 'auto',
          '-webkit-overflow-scrolling': 'touch'
        }
      } else {
        this.componentStyleObject = null
      }

      if (stale) {
        stale.removeEventListener('scroll', this._handleScroll)
      }
      if (fresh) {
        fresh.addEventListener('scroll', this._handleScroll)
      }
    }
  },

  methods: {
    // Scroll content to a particular place.
    scroll (left, top) {
      let nt = this.normalizedTarget
      if (nt === window) {
        nt.scrollTo(left, top)
      } else {
        nt.scrollLeft = left
        nt.scrollTop = top
      }
    },
    // Reset the state. Should be called once
    // the scrolling should be re-enabled.
    // (ie: after new elements get added to the list)
    reset () {
      this.upperTriggered = false
      this.lowerTriggered = false
    },
    // Get the number of pixes that the content
    // of an element is scrolled upward.
    _getScrollTop () {
      let nt = this.normalizedTarget
      let value = 0
      if (!nt) {
        return value
      }
      if (nt === window) {
        value = nt.pageYOffset
      } else {
        value = nt.scrollTop
      }
      return value
    },
    // Set the number of pixed that the content
    // of an element is scrolled upward.
    _setScrollTop (value) {
      let nt = this.normalizedTarget
      if (!nt) {
        return
      }
      if (nt === window) {
        nt.scrollTo(nt.pageXOffset, value)
      } else {
        nt.scrollTop = value
      }
    },
    // Get the number of pixels that the content
    // of an element is scrolled to the left.
    _getScrollLeft () {
      let nt = this.normalizedTarget
      let value = 0
      if (!nt) {
        return value
      }
      if (nt === window) {
        value = nt.pageXOffset
      } else {
        value = nt.scrollLeft
      }
      return value
    },
    // Set the number of pixels that the content
    // of an element is scrolled to the left.
    _setScrollLeft (value) {
      let nt = this.normalizedTarget
      if (!nt) {
        return
      }
      if (nt === window) {
        nt.scrollTo(value, nt.pageYOffset)
      } else {
        nt.scrollLeft = value
      }
    },
    // Get the scroll target width.
    _getScrollTargetWidth () {
      let nt = this.normalizedTarget
      let value = 0
      if (!nt) {
        return value
      }
      if (nt === window) {
        value = nt.innerWidth
      } else {
        value = nt.offsetWidth
      }
      return value
    },
    // Get the scroll target height.
    _getScrollTargetHeight () {
      let nt = this.normalizedTarget
      let value = 0
      if (!nt) {
        return value
      }
      if (nt === window) {
        value = nt.innerHeight
      } else {
        value = nt.offsetHeight
      }
      return value
    },
    // Check if the thresholds are reached.
    _handleScroll () {
      if (!this.enabled) {
        return
      }
      let nt = this.normalizedTarget
      // in case target is window swap for documentElement
      if (nt === window) {
        nt = document.documentElement
      }
      // upper boundary
      let upperScrollValue = 0
      if (!this.horizontal) {
        upperScrollValue = this._getScrollTop()
      } else {
        upperScrollValue = this._getScrollLeft()
      }
      // lower boundary
      let lowerScrollValue = 0
      if (!this.horizontal) {
        lowerScrollValue = nt.scrollHeight - this._getScrollTargetHeight() - this._getScrollTop()
      } else {
        lowerScrollValue = nt.scrollWidth - this._getScrollTargetWidth() - this._getScrollLeft()
      }
      // boundary checks
      if (upperScrollValue < this.threshold && !this.upperTriggered) {
        this.upperTriggered = true
        this.$emit('threshold', 'upper')
      }
      if (lowerScrollValue < this.threshold && !this.lowerTriggered) {
        this.lowerTriggered = true
        this.$emit('threshold', 'lower')
      }
    }
  },

  mounted () {
    this.normalizedTarget = this.target
    if (!this.normalizedTarget) {
      this.normalizedTarget = this.$el
    }
  }

}
</script>
