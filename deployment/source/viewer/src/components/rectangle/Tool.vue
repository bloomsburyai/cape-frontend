<style scoped lang="scss">
  @import "../../scss/component";

  .cape-viewer-rectangle-tool {
    @include layout-fit();
  }
</style>

<template>
  <div class="cape-viewer-rectangle-tool">
    Tool rectangle
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'

import store from '@/components/store'

export default {

  data () {
    return {
      // coordinates
      tl: {
        x: 0,
        y: 0
      },
      br: {
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
      this.$el.addEventListener('mouseenter', this._handleMouseEnter)
      this.$el.addEventListener('mouseleave', this._handleMouseLeave)
    },

    // _cleanListeners
    _cleanListeners () {
      this.$el.removeEventListener('mouseenter', this._handleMouseEnter)
      this.$el.removeEventListener('mouseleave', this._handleMouseLeave)
    },

    /**
     * Mouse
     */

    // _handleMouseEnter
    _handleMouseEnter () {
      this.$el.addEventListener('mousedown', this._handleMouseDown)
      this.$el.addEventListener('mouseup', this._handleMouseUp)
    },

    // _handleMouseLeave
    _handleMouseLeave () {
      this.$el.removeEventListener('mousedown', this._handleMouseDown)
      this.$el.removeEventListener('mouseup', this._handleMouseUp)
      // take care of cleanup while click and drag outside
      this.$el.removeEventListener('mousemove', this._handleMouseMove)
    },

    // _handleMouseDown
    _handleMouseDown (e) {
      this.$el.addEventListener('mousemove', this._handleMouseMove)
      this._updateDownCoordinates(e)
      this._canvasCreateShape()
    },

    // _handleMouseUp
    _handleMouseUp () {
      this.$el.removeEventListener('mousemove', this._handleMouseMove)
      // open annotation panel
      store.panel.annotation.opened = true
      store.panel.annotation.model = this.target.model
      store.panel.annotation.target = this.target
    },

    // _handleMouseMove
    _handleMouseMove (e) {
      this._updateMoveCoordinates(e)
      this._canvasUpdateShape()
    },

    /**
     * Coordinates
     */

    // _updateCoordinates
    _updateCoordinates (tlx, tly, brx, bry) {
      this.$set(this.tl, 'x', tlx)
      this.$set(this.tl, 'y', tly)
      this.$set(this.br, 'x', brx)
      this.$set(this.br, 'y', bry)
    },

    // _updateDownCoordinates
    _updateDownCoordinates (e) {
      const offset = $(this.$el).offset()
      const x = e.pageX - offset.left
      const y = e.pageY - offset.top
      this._updateCoordinates(x, y, x, y)
    },

    // _updateMoveCoordinates
    _updateMoveCoordinates (e) {
      const offset = $(this.$el).offset()
      const cx = e.pageX - offset.left
      const cy = e.pageY - offset.top
      // normalize coordinates
      const tlx = Math.min(this.tl.x, cx)
      const tly = Math.min(this.tl.y, cy)
      const brx = Math.max(this.tl.x, cx)
      const bry = Math.max(this.tl.y, cy)
      this._updateCoordinates(tlx, tly, brx, bry)
    },

    /**
     * Canvas
     */

    // _canvasCreateShape
    _canvasCreateShape () {
      const model = this.canvas.add({
        x: this.tl.x,
        y: this.tl.y,
        w: 0,
        h: 0
      })
      this.canvas.$nextTick(() => {
        this.target = _.find(this.canvas.$children, {model: model})
      })
    },

    // _canvasUpdateShape
    _canvasUpdateShape () {
      const x = this.tl.x
      const y = this.tl.y
      const w = this.br.x - this.tl.x
      const h = this.br.y - this.tl.y
      this.target.model.x = x
      this.target.model.y = y
      this.target.model.w = w
      this.target.model.h = h
    }

  },

  mounted () {
    if (!this.canvas) {
      return
    }
    this._setupListeners()
  },

  destroyed () {
    this._cleanListeners()
  }

}
</script>
