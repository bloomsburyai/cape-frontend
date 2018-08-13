<style scoped lang="scss">
  @import "../../scss/component";

  $height: 2.25rem;

  .cape-viewer-label-button {
    @include typography-button();
    display: inline-block;
    background-color: transparent;
    height: $height;
    line-height: $height;
    border-radius: 0.125rem;
    padding: 0 1rem;
  }

  .cape-viewer-label-button.block {
    display: block;
    width: 100%;
  }
</style>

<template>
  <button
    class="btn cape-viewer-label-button"
    v-bind:class="componentClassObject">
    {{ label }}
  </button>
</template>

<script>
export default {

  data () {
    return {
      componentClassObject: {
        block: this.block
      }
    }
  },

  props: {
    label: {
      type: String
    },
    block: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    block (fresh, stale) {
      this.componentClassObject.block = fresh
    }
  }
}
</script>
