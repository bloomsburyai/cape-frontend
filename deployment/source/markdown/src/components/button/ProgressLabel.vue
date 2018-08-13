<style scoped lang="scss">
  @import "../../scss/component";

  $height: 2.25rem;

  .cape-markdown-progress-label-button {
    @include typography-button();
    display: inline-block;
    position: relative;
    z-index: 0;
    background-color: transparent;
    height: $height;
    line-height: $height;
    border-radius: 0.125rem;
    padding: 0 1rem;
  }

  .cape-markdown-progress-label-button.block {
    display: block;
    width: 100%;
  }

  .cape-markdown-progress-label-button .label {
    visibility: visible;
  }

  .cape-markdown-progress-label-button .indicator {
    @include layout-fit();
    display: none;
  }

  .cape-markdown-progress-label-button .indicator .fa {
    font-size: 0.875rem;
  }

  .cape-markdown-progress-label-button.progress .label {
    visibility: hidden
  }

  .cape-markdown-progress-label-button.progress .indicator {
    display: block;
  }
</style>

<template>
  <button
    class="btn cape-markdown-progress-label-button"
    v-bind:class="componentClassObject">
    <span class="label">{{ label }}</span>
    <span class="indicator">
      <i class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
    </span>
  </button>
</template>

<script>
export default {

  computed: {
    componentClassObject () {
      return {
        block: this.block,
        progress: this.progress
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
    },
    progress: {
      type: Boolean,
      default: false
    }
  }

}
</script>
