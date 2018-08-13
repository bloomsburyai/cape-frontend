<style lang="scss">
  @import "../scss/cape";

  .cape-dashboard-autogrow-textarea .highlight {
    background-color: $yellow-500;
    padding: 0.125rem;
  }
</style>

<style scoped lang="scss">
  @import "../scss/cape";

  .cape-dashboard-autogrow-textarea {
    display: inline-block;
    position: relative;
    overflow: hidden;
    outline: none;
    // word-wrap: pre-wrap;
    // word-wrap: break-word;
    white-space: pre-wrap;
    width: 400px;
    // Firefox fix - no height by default
    min-height: 1.75rem;
    padding: 2px;
    @include typography-body-2();
    font-family: 'Roboto', sans-serif;
    font-weight: $font-weight-regular;
  }
</style>

<template>
  <pre class="cape-dashboard-autogrow-textarea"
    v-bind:contenteditable="!readonly"
    v-bind:spellcheck="spellcheck"
    v-on:keyup="_updateValue"></pre>
</template>

<script>
import _ from 'lodash'
import Mark from 'mark.js'

export default {

  data () {
    return {
      mark: null
    }
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    spellcheck: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    highlightRanges: {
      type: Array
    }
  },

  watch: {
    value () {
      this._updateContent()
    },
    highlightRanges () {
      this._updateMark()
    }
  },

  methods: {
    _updateContent () {
      if (this.value !== this.$el.innerText) {
        this.$el.textContent = this.value
      }
    },

    _updateMark () {
      const ranges = _.cloneDeep(this.highlightRanges)
      if (!this.mark) {
        this.mark = new Mark(this.$el)
      }
      this.mark.unmark()
      if (!(ranges && ranges.length)) {
        return
      }
      this.$nextTick(() => {
        this.mark.markRanges(ranges, {
          element: 'span',
          className: 'highlight'
        })
      })
    },

    _handlePaste (e) {
      e.preventDefault()
      let data = ''
      if (e.clipboardData) {
        data = e.clipboardData.getData('text/plain')
      } else if (window.clipboardData) {
        data = window.clipboardData.getData('Text')
      } else if (e.originalEvent.clipboardData) {
        data = e.originalEvent.clipboardData.getData('text')
      }
      if (!data) {
        return
      }
      const position = this._getCaretPosition()
      data = _.trim(data)
      const textContent = this.$el.textContent
      let prefix = textContent.slice(0, position)
      let suffix = textContent.slice(position)
      const text = prefix + data + suffix
      this.$el.textContent = text
      this.$emit('input', text)
      this.$nextTick(() => {
        this._setCaretPosition(position + data.length)
      })
    },

    _getCaretPosition () {
      let selection
      let range
      selection = window.getSelection()
      if (!selection) {
        return -1
      }
      range = selection.getRangeAt(0)
      if (!range) {
        return -1
      }
      return range.endOffset
    },

    _setCaretPosition (position) {
      let range = document.createRange()
      range.setStart(this.$el.firstChild, position)
      range.collapse(true)
      let selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
    }
  },

  created () {
    this._updateValue = _.debounce(() => {
      this.$emit('input', this.$el.innerText)
    }, 300)
  },

  mounted () {
    this._updateContent()
    this._updateMark()
    this.$el.addEventListener('paste', this._handlePaste)
  },

  beforeDestroy () {
    this.$el.removeEventListener('paste', this._handlePaste)
  }
}
</script>
