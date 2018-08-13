<style scoped lang="scss">
  @import "../scss/component";

  .cape-viewer-layout {
    @include layout-horizontal();
    position: relative;
    z-index: 0;

    .cape-viewer-screen {
      @include layout-flex();
    }

    .panels {
      @include layout-vertical();
      @include layout-scroll-vertical();
      min-width: 320px;
    }
  }
</style>

<template>
  <div class="cape-viewer-layout">
    <cape-viewer-toolbar ref="toolbar"/>
    <cape-viewer-screen ref="screen"/>
    <template v-if="store.panel.annotation.opened">
      <div class="panels">
        <cape-viewer-annotation-panel/>
      </div>
    </template>
  </div>
</template>

<script>
import store from '@/components/store'

import Toolbar from '@/components/Toolbar'
import Screen from '@/components/Screen'
import AnnotationPanel from '@/components/annotation/Panel'

export default {

  data () {
    return {
      // store
      store,
      // pdf
      pdfDocument: this.initialPdfDocument
    }
  },

  props: {
    initialPdfDocument: {
      type: Object
    }
  },

  components: {
    'cape-viewer-toolbar': Toolbar,
    'cape-viewer-screen': Screen,
    'cape-viewer-annotation-panel': AnnotationPanel
  },

  watch: {
    initialPdfDocument () {
      this.pdfDocument = this.initialPdfDocument
    },
    pdfDocument () {
      console.log('viewer.layout.watch.pdfDocument')
      console.log(this.pdfDocument)

      this.$refs.screen.scrollTop(0)
      this.$refs.screen.pdfDocument = this.pdfDocument
    }
  }

}
</script>
