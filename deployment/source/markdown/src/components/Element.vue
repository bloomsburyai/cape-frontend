<style scoped lang="scss">
  @import "../scss/component";

  .cape-markdown-element {
    display: inline-block;
  }
</style>

<template>
  <div class="cape-markdown-element">
    <slot></slot>
  </div>
</template>

<script>
export default {

  methods: {

    // _handleMouseDown
    _handleMouseDown (e) {
      console.log('_handleMouseDown')
      console.log(e)
      // this._inspectSelection()
    },

    // _handleMouseUp
    _handleMouseUp (e) {
      console.log('_handleMouseUp')
      console.log(e)
      this._inspectSelection()
    },

    _inspectSelection () {
      console.log('_inspectSelection')
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
    }

  }

}
</script>
