<style scoped lang="scss">
  @import "../scss/component";

  .cape-landing-textarea {
    display: block;
    position: relative;
    z-index: 0;
  }
</style>

<template>
  <div class="cape-landing-textarea"
    contenteditable="true"
    spellcheck="false"
    v-on:keyup.ctrl.86="sanitize"
    v-on:keyup.meta.86="sanitize"
    v-on:blur="sanitize">{{ value }}</div>
</template>

<script>
import $ from 'jquery'
import Mark from 'mark.js'

export default {

  data () {
    return {
      mark: null,
      rawContent: ''
    }
  },

  props: {
    value: {
      type: String
    }
  },

  methods: {
    // sanitize cleans up the
    // contents of the component
    sanitize () {
      let content = this.$el.innerText
      this.rawContent = this.$el.innerText
      content = content.replace(/&/gm, '&amp;')
        .replace(/"/gm, '&quot;')
        .replace(/'/gm, '&#39;')
        .replace(/</gm, '&lt;')
        .replace(/>/gm, '&gt;')
      this.$el.innerHTML = content
      this.$emit('input', this.rawContent)
    },

    // highlight
    highlight (ranges) {
      let total = ranges.length
      this.reset()
      this.$nextTick(() => {
        this.mark.markRanges(ranges, {
          element: 'span',
          className: 'highlight',
          each: function (element, model) {
            let opacity = (total - model.index) / total
            element.style['background-color'] = 'rgba(255, 235, 59, ' + opacity + ')'
          }
        })
      })
    },

    // reset
    reset () {
      this.mark.unmark()
    },

    // scrollToHighlightIndex
    scrollToHighlightIndex (index) {
      this.$nextTick(() => {
        const element = $(this.$el)
        const span = $('span', this.$el)
        const top = element.scrollTop() + span.position().top - Math.round(element.height() / 2)
        element.scrollTop(top)
      })
    }

  },

  mounted () {
    this.mark = new Mark(this.$el)
  }

}
</script>
