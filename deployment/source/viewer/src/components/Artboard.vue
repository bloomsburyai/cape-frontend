<style scoped lang="scss">
  @import "../scss/component";

  .cape-viewer-artboard {
    display: block;
    position: relative;
    z-index: 0;

    /**
     * Canvas
     */

    .cape-viewer-canvas {
      @include layout-fit();
      z-index: 1;
    }

    /**
     * Tools
     */

    .cape-viewer-selection-tool {
      position: absolute;
      z-index: 2;
    }

    .cape-viewer-rectangle-tool {
      @include layout-fit();
      z-index: 2;
    }

  }
</style>

<template>
  <div class="cape-viewer-artboard">
    <cape-viewer-canvas ref="canvas"/>
    <template v-if="active && store.tool === store.TOOL_SELECTION">
      <cape-viewer-selection-tool
        v-bind:canvas="$refs.canvas"/>
    </template>
    <template v-if="active && store.tool === store.TOOL_RECTANGLE">
      <cape-viewer-rectangle-tool
        v-bind:canvas="$refs.canvas"/>
    </template>
  </div>
</template>

<script>
import store from '@/components/store'

import Canvas from '@/components/Canvas'
import SelectionTool from '@/components/selection/Tool'
import RectangleTool from '@/components/rectangle/Tool'

export default {

  data () {
    return {
      // store
      store,
      // state
      active: false
    }
  },

  components: {
    'cape-viewer-canvas': Canvas,
    'cape-viewer-selection-tool': SelectionTool,
    'cape-viewer-rectangle-tool': RectangleTool
  },

  methods: {

    /**
     * General
     */

    // setup
    setup () {
      if (this.active) {
        return
      }
      this.active = true
    },

    // clean
    clean () {
      if (!this.active) {
        return
      }
      this.active = false
    }

  }

}
</script>
