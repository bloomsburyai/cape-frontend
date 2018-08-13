<style scoped lang="scss">
  @import "../scss/component";

  .cape-markdown-page {
    position: relative;
    overflow: hidden;
    background: $white;
    box-shadow: $box-shadow-1;
  }
</style>

<template>
  <div class="cape-markdown-page"
    v-on:click="_handleClick">
    <div class="content"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import marked from 'marked'
import {Renderer} from '@/renderer'

import sample from '../../static/sample.md'
import Element from '@/components/Element'

marked.setOptions({
  renderer: new Renderer(),
  sanitize: true
})

export default {

  data () {
    return {
      content: null
    }
  },

  methods: {

    /**
     * General
     */

    // _updateContent
    _updateContent () {
      if (this.content) {
        this.content.$destroy()
        this.content = null
      }
      const template = '' +
        '<div' +
        ' id="capeMarkdownPageWrapper"' +
        ' class="cape-markdown-page-wrapper">' +
        marked(sample) +
        '</div>'
      this.content = new Vue({
        template: template,
        components: {
          'cape-markdown-element': Element
        }
      }).$mount('.content')
    },

    // _handleClick
    _handleClick (e) {
      console.log('_handleClick')
      const selection = window.getSelection()
      console.log(selection)
      if (!(selection && selection.rangeCount)) {
        return
      }
      const range = selection.getRangeAt(0)
      if (!range) {
        return
      }
      console.log(range)
      console.log('-')
      console.log(range.commonAncestorContainer)
      console.log(range.commonAncestorContainer.childNodes)
      console.log('-')
      // console.log(range.startContainer.parentElement)
      console.log(range.startContainer.parentNode)
      console.log('-')
      // console.log(range.endContainer.parentElement)
      console.log(range.endContainer.parentNode)
    }

  },

  mounted () {
    this._updateContent()
  }

}
</script>
