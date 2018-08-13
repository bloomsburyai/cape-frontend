<style scoped lang="scss">
  @import "../scss/component";

  .cape-viewer-screen {
    display: block;
    @include layout-scroll-vertical();
    background-color: $blue-grey-50;

    & > * {
      margin: 2rem auto;
    }
  }
</style>

<template>
  <div class="cape-viewer-screen"
    v-on:scroll="_handleScroll">
    <template v-for="i in pdfPageCount">
      <cape-viewer-page
        v-bind:key="i"
        v-bind:index="i"
        v-bind:initialPdfDocument="pdfDocument"
        v-on:ready="_handlePageReady"
        />
    </template>
  </div>
</template>

<script>
// import client from '@/client'

import Page from '@/components/Page'

export default {

  data () {
    return {
      // // client
      // documentID: 'Animals',
      // pdf
      pdfDocument: null,
      // annotations
      annotationCollection: [],
      // page
      pageElementsList: [],
      visiblePagesList: [],
      readyPageCount: 0
    }
  },

  computed: {
    pdfPageCount () {
      let value = 0
      if (this.pdfDocument) {
        value = this.pdfDocument.numPages
      }
      return value
    }
  },

  components: {
    'cape-viewer-page': Page
  },

  watch: {
    pdfDocument () {
      this.$nextTick(() => {
        // this._loadClientData()
        this._updatePageElementsList()
      })
    }
  },

  methods: {

    /**
     * Window
     */

    // _handleWindowResize
    _handleWindowResize () {
      console.log('viewer.screen._handleWindowResize')
      console.log(this)
      this._updateVisiblePagesList()
    },

    /**
     * General
     */

    // scrollTop
    scrollTop (value) {
      if (!this.$el) {
        return
      }
      console.log(this.$el)
      this.$el.scrollTop = value
    },

    // _handleScroll
    _handleScroll () {
      // console.log('viewer.screen._handleScroll')
      this._updateVisiblePagesList()
    },

    // /**
    //  * Client
    //  */
    //
    // _loadClientData () {
    //   client.annotation.paginate({
    //     documentID: this.documentID
    //   }, (error, data) => {
    //     if (error) {}
    //     console.log('_loadClientData.callback')
    //     console.log(error)
    //     console.log(data)
    //     this.annotationCollection = data
    //   })
    // },

    /**
     * Page
     */

    // _handlePageReady
    _handlePageReady () {
      this.readyPageCount++
      if (this.readyPageCount === this.pdfPageCount) {
        this._updateVisiblePagesList()
      }
    },

    // _updatePageElementsList
    _updatePageElementsList () {
      let child = null
      for (let i = 0; i < this.$children.length; i++) {
        child = this.$children[i]
        this.pageElementsList[child.index - 1] = child
      }
    },

    // _updateVisiblePages
    _updateVisiblePagesList () {
      const bounds = this.$el.getBoundingClientRect()
      const verticalPadding = 0

      let startIndex = -1
      let finishIndex = -1

      let i = 0
      let element = null
      let measurements = null

      for (i = 0; i < this.pageElementsList.length; i++) {
        element = this.pageElementsList[i]
        measurements = element.$el.getBoundingClientRect()
        if (startIndex === -1) {
          if (measurements.top + measurements.height > bounds.top + verticalPadding) {
            startIndex = i
          }
        }
        if (finishIndex === -1) {
          if (measurements.bottom > bounds.bottom - verticalPadding) {
            finishIndex = i
          }
        }
        if (startIndex !== -1 && finishIndex !== -1) {
          break
        }
      }

      this.visiblePagesList = []
      for (i = 0; i < this.pageElementsList.length; i++) {
        element = this.pageElementsList[i]
        if (i < startIndex || i > finishIndex) {
          element.clean()
        } else {
          element.setup()
          this.visiblePagesList.push(element)
        }
      }
    }
  },

  created () {
    console.log('viewer.screen.created')
    window.addEventListener('resize', this._handleWindowResize)
  },

  destroyed () {
    console.log('viewer.screen.destroyed')
    window.removeEventListener('resize', this._handleWindowResize)
  }

}
</script>
