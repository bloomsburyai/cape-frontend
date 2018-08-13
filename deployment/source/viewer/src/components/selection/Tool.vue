<style scoped lang="scss">
  @import "../../scss/component";

  .cape-viewer-selection-tool {
    position: relative;
  }
</style>

<template>
  <div class="cape-viewer-selection-tool">
    Tool selection
  </div>
</template>

<script>
import $ from 'jquery'

import store from '@/components/store'

import Shape from '@/components/Shape'

export default {

  data () {
    return {
      // coordinates
      tg: {
        x: 0,
        y: 0
      },
      pt: {
        x: 0,
        y: 0
      },
      // canvas
      target: null
    }
  },

  props: {
    canvas: {
      type: Object
    }
  },

  methods: {

    /**
     * Listeners
     */

    // _setupListeners
    _setupListeners () {
      document.addEventListener('mousedown', this._handleMouseDown)
      document.addEventListener('mouseup', this._handleMouseUp)
    },

    // _cleanListeners
    _cleanListeners () {
      document.removeEventListener('mousedown', this._handleMouseDown)
      document.removeEventListener('mouseup', this._handleMouseUp)
    },

    /**
     * Mouse
     */

    // _handleMouseDown
    _handleMouseDown (e) {
      console.log('toolSelection._handleMouseDown')
      this._canvasRetrieveTarget(e)
      if (!this.target) {
        return
      }
      document.addEventListener('mousemove', this._handleMouseMove)
      this._updateTargetCoordinates(e)
      // open annotation panel
      store.panel.annotation.opened = true
      store.panel.annotation.model = this.target.model
      store.panel.annotation.target = this.target
    },

    // _handleMouseUp
    _handleMouseUp (e) {
      console.log('toolSelection._handleMouseUp')
      if (!this.target) {
        return
      }
      this.target = null
      document.removeEventListener('mousemove', this._handleMouseMove)
    },

    // _handleMouseMove
    _handleMouseMove (e) {
      console.log('toolSelection._handleMouseMove')
      this._updatePointerCoordinates(e)
      this._canvasUpdateTarget()
    },

    /**
     * Coordinates
     */

    // _updateTargetCoordinates
    _updateTargetCoordinates (e) {
      const offset = $(this.target.$el).offset()
      const x = e.pageX - offset.left
      const y = e.pageY - offset.top
      this.$set(this.tg, 'x', x)
      this.$set(this.tg, 'y', y)
    },

    // _updatePointerCoordinates
    _updatePointerCoordinates (e) {
      const offset = $(this.$el).offset()
      const x = e.pageX - offset.left
      const y = e.pageY - offset.top
      this.$set(this.pt, 'x', x)
      this.$set(this.pt, 'y', y)
    },

    /**
     * Canvas
     */

    // _canvasRetrieveTarget
    _canvasRetrieveTarget (e) {
      console.log('toolSelection._canvasRetrieveTarget')
      if (!(e.target && e.target.__vue__)) {
        return
      }
      const target = e.target.__vue__
      if (!(target instanceof Shape)) {
        return
      }
      this.target = target
    },

    // _canvasUpdateTarget
    _canvasUpdateTarget () {
      const x = this.pt.x - this.tg.x
      const y = this.pt.y - this.tg.y
      this.target.model.x = x
      this.target.model.y = y
    }

  },

  mounted () {
    console.log('toolSelection.mounted')
    console.log(this.collection)
    this._setupListeners()
  },

  destroyed () {
    this._cleanListeners()
  }

}
</script>
