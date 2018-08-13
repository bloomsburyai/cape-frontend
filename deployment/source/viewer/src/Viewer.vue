<style lang="scss">
  /**
   *
   * Dependencies
   *
   */

  // Fonts
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');

  // Font awesome
  @import "../node_modules/font-awesome/scss/variables";
  $fa-font-path: "../node_modules/font-awesome/fonts/";
  @import "../node_modules/font-awesome/scss/mixins";
  @import "../node_modules/font-awesome/scss/path";
  @import "../node_modules/font-awesome/scss/core";
  @import "../node_modules/font-awesome/scss/larger";
  @import "../node_modules/font-awesome/scss/fixed-width";
  @import "../node_modules/font-awesome/scss/list";
  @import "../node_modules/font-awesome/scss/bordered-pulled";
  @import "../node_modules/font-awesome/scss/animated";
  @import "../node_modules/font-awesome/scss/rotated-flipped";
  @import "../node_modules/font-awesome/scss/stacked";
  @import "../node_modules/font-awesome/scss/icons";
  @import "../node_modules/font-awesome/scss/screen-reader";

  // Bootstrap
  @import "../node_modules/bootstrap/scss/bootstrap";

  /**
   *
   * Global styles
   *
   */

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }
</style>

<style scoped lang="scss">
  @import "./scss/viewer";

  .cape-viewer {
    width: 100%;
    height: 100%;

    .cape-viewer-layout {
      width: 100%;
      height: 100%;
    }
  }
</style>

<template>
  <div class="cape-viewer">
    <cape-viewer-layout ref="layout"/>
  </div>
</template>

<script>
/**
 * Dependencies
 */

import 'jquery'
import 'popper.js'
import 'bootstrap'

import PDFJS from 'pdfjs-dist'

import Layout from '@/components/Layout'

/**
 * PDFJS
 */

PDFJS.PDFJS.workerSrc = '/static/pdfjs-dist/build/pdf.worker.js'
PDFJS.PDFJS.cMapUrl = '/static/pdfjs-dist/cmaps/'
PDFJS.PDFJS.cMapPacked = true

const DEFAULT_URL = '/static/sample.pdf'

export default {

  components: {
    'cape-viewer-layout': Layout
  },

  mounted () {
    PDFJS.getDocument(DEFAULT_URL).then((pdfDocument) => {
      this.$refs.layout.pdfDocument = pdfDocument
    })
  }

}
</script>
