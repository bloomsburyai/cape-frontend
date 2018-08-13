<style scoped lang="scss">
  .cape-progress-circle {
    display: inline-block;
    overflow: hidden;
  }

  .active canvas {
    -webkit-animation: rotate 2s infinite linear;
    animation: rotate 2s infinite linear;
  }

  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }

  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
</style>

<template>
  <div class="cape-progress-circle"
    v-bind:class="componentClassObject"
    v-bind:style="componentStyleObject">
    <canvas
      ref="canvas"></canvas>
  </div>
</template>

<script>
import * as color from '@/color'
import unit from '@/unit'

export default {

  props: {
    size: {
      type: Number,
      default: 2
    },
    lineWidth: {
      type: Number,
      default: 0.25
    },
    strokeColor: {
      type: String,
      default: color.BLUE_500
    },
    active: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    size () {
      this._draw()
    },
    lineWidth () {
      this._draw()
    },
    strokeColor () {
      this._draw()
    }
  },

  computed: {
    componentClassObject () {
      return {
        'active': this.active
      }
    },
    componentStyleObject () {
      return {
        'width': this.size + 'rem',
        'height': this.size + 'rem'
      }
    }
  },

  methods: {
    _draw () {
      let size = unit.convertRemToPixels(this.size)
      let lineWidth = unit.convertRemToPixels(this.lineWidth)

      let canvas = this.$refs.canvas
      canvas.width = size
      canvas.height = size

      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, size, size)
      ctx.strokeStyle = this.strokeColor
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'

      let x = size / 2
      let y = size / 2
      let radius = size / 2 - lineWidth - 1 // The "- 1" is for IE
      let startAngle = unit.convertDegreesToRadians(-90 + 25)
      let endAngle = unit.convertDegreesToRadians(-90 + 335)
      ctx.arc(x, y, radius, startAngle, endAngle)
      ctx.stroke()
    }
  },

  mounted () {
    this._draw()
  }

}
</script>
