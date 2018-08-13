<style scoped lang="scss">
  @import "../scss/component";

  .cape-viewer-page {
    position: relative;
    background-color: $white;
    overflow: hidden;
    opacity: 0.3;
    box-shadow: $box-shadow-1;

    &.active {
      opacity: 1;
    }

    canvas {
      position: relative;
      z-index: 0;
    }

    span {
      position: absolute;
      top: 0;
      right: 0;
      @include typography-caption();
    }

    .cape-viewer-artboard {
      @include layout-fit();
      z-index: 1;
    }

  }
</style>

<template>
  <div class="cape-viewer-page"
    v-bind:style="componentStyleObject"
    v-bind:class="componentClassObject">
    <canvas ref="canvas"/>
    <cape-viewer-artboard ref="artboard"/>
  </div>
</template>

<script>
import Artboard from '@/components/Artboard'

const SCALE = 1

export default {

  data () {
    return {
      pdfDocument: this.initialPdfDocument,
      pdfPage: null,
      pdfPageViewport: null,
      width: 0,
      height: 0,
      active: false
    }
  },

  props: {
    index: {
      type: Number
    },
    initialPdfDocument: {
      type: Object
    }
  },

  computed: {
    componentStyleObject () {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    },
    componentClassObject () {
      return {
        active: this.active
      }
    }
  },

  components: {
    'cape-viewer-artboard': Artboard
  },

  watch: {
    initialPdfDocument () {
      this.pdfDocument = this.initialPdfDocument
    },
    pdfDocument () {
      this._initialize()
    }
  },

  methods: {
    /**
     * General
     */

    // _initialize
    _initialize () {
      console.log('viewer.page._initialize')
      this.pdfDocument.getPage(this.index)
        .then((pdfPage) => {
          this.pdfPage = pdfPage
          this.pdfPageViewport = pdfPage.getViewport(SCALE)
          this._updateSize()
          this.$emit('ready')
        })
    },

    // _updateSize
    _updateSize () {
      this.width = this.pdfPageViewport.width
      this.height = this.pdfPageViewport.height
    },

    // _draw
    _draw () {
      const canvas = this.$refs.canvas
      canvas.width = this.width
      canvas.height = this.height
      const context = canvas.getContext('2d')
      this.pdfPage.render({
        canvasContext: context,
        viewport: this.pdfPageViewport
      })
    },

    // _undraw
    _undraw () {
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, this.width, this.height)
      this.pdfPage.cleanup()
    },

    // setup
    setup () {
      if (this.active) {
        return
      }
      this.active = true
      this.$refs.artboard.setup()
      this._draw()
    },

    // clean
    clean () {
      if (!this.active) {
        return
      }
      this.active = false
      this.$refs.artboard.clean()
      this._undraw()
    }

  },

  mounted () {
    this._initialize()
  }

}
</script>
