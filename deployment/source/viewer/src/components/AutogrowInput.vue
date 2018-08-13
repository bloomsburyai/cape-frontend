<style scoped lang="scss">
  @import "../scss/component";

  .cape-viewer-autogrow-input {
    display: inline-block;
    min-width: 200px;
    min-height: 28px;
  }
</style>

<template>
  <pre class="cape-viewer-autogrow-input"
    v-bind:contenteditable="!readonly"
    v-on:keyup="_updateValue"></pre>
</template>

<script>
export default {

  props: {
    value: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    value () {
      this._updateContent()
    }
  },

  methods: {

    // _updateContent
    _updateContent () {
      if (this.value !== this.$el.innerText) {
        this.$el.textContent = this.value
      }
    },

    // _updateValue
    _updateValue () {
      this.$emit('input', this.$el.innerText)
    }

  }

}
</script>
