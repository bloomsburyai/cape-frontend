<style scoped lang="scss">
  @import "../scss/component";

  .cape-landing-dashed-container {
    display: inline-block;
    position: relative;
    z-index: 0;
    // Resist the temptation to remove this.
    // Dictates that this component aligns at
    // the very top of wrapper elements.
    vertical-align: top;
  }

  .cape-landing-dashed-container .line {
    position: absolute;
  }

  .cape-landing-dashed-container .line-top {
    top: 0;
    right: 0;
    left: 0;
    height: 1px;
  }

  .cape-landing-dashed-container .line-bottom {
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
  }

  .cape-landing-dashed-container .line-left {
    top: 0;
    bottom: 0;
    left: 0;
    width: 1px;
  }

  .cape-landing-dashed-container .line-right {
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
  }

  .cape-landing-dashed-container .content {
    height: 100%;
    margin: 1px;
  }

  // DO NOT REMOVE!
  // This rule deals with an extra space that
  // is left on some browsers under the "content"
  .cape-landing-dashed-container .content > * {
    vertical-align: top;
  }
</style>

<template>
  <div class="cape-landing-dashed-container">
    <span
      v-bind:style="horizontalStyleObject"
      class="line line-top"></span>
    <span
      v-bind:style="verticalStyleObject"
      class="line line-right"></span>
    <span
      v-bind:style="horizontalStyleObject"
      class="line line-bottom"></span>
    <span
      v-bind:style="verticalStyleObject"
      class="line line-left"></span>
    <div
      class="content"
      v-bind:style="contentStyleObject">
      <slot>Lorem ipsum dolor sit amet</slot>
    </div>
  </div>
</template>

<script>

const canvasH = document.createElement('canvas')
canvasH.width = 4
canvasH.height = 1

const canvasV = document.createElement('canvas')
canvasV.width = 1
canvasV.height = 4

const ctxH = canvasH.getContext('2d')
const ctxV = canvasV.getContext('2d')

export default {

  data () {
    return {
      horizontalStyleObject: {
        'background-repeat': 'repeat-x',
        'background-position': 'top left'
      },
      verticalStyleObject: {
        'background-repeat': 'repeat-y',
        'background-position': 'top left'
      },
      contentStyleObject: {
        'padding': this.horizontalPadding + 'rem' + ' ' + this.verticalPadding + 'rem'
      }
    }
  },

  props: {
    strokeColor: {
      type: String,
      default: '#000000'
    },
    horizontalPadding: {
      type: Number,
      default: 0
    },
    verticalPadding: {
      type: Number,
      default: 0.25
    }
  },

  watch: {
    strokeColor () {
      this._redraw()
    }
  },

  methods: {
    _redraw () {
      // let canvasH = this.$refs.canvasH
      // let canvasV = this.$refs.canvasV

      // let ctxH = canvasH.getContext('2d')
      // let ctxV = canvasV.getContext('2d')

      ctxH.fillStyle = this.strokeColor
      ctxH.fillRect(0, 0, 2, 1)
      ctxH.fillStyle = 'rgba(0, 0, 0, 0)'
      ctxH.fillRect(2, 0, 2, 1)

      ctxV.fillStyle = this.strokeColor
      ctxV.fillRect(0, 0, 1, 2)
      ctxH.fillStyle = 'rgba(0, 0, 0, 0)'
      ctxH.fillRect(0, 2, 1, 2)

      this.$set(this.horizontalStyleObject, 'background-image', 'url(' + canvasH.toDataURL() + ')')
      this.$set(this.verticalStyleObject, 'background-image', 'url(' + canvasV.toDataURL() + ')')
      // this.horizontalStyleObject['background-image'] = 'url(' + canvasH.toDataURL() + ')'
      // this.verticalStyleObject['background-image'] = 'url(' + canvasV.toDataURL() + ')'
    }
  },

  mounted () {
    this._redraw()
  }

}
</script>
