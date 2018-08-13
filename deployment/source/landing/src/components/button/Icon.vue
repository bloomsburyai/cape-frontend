<style scoped lang="scss">
  @import "../../scss/component";

  .cape-landing-icon-button {
    background-color: transparent;
    border-radius: 0;
  }
</style>

<template>
  <button
    v-bind:style="componentStyleObject"
    class="btn cape-landing-icon-button">
    <i
      v-bind:class="iconClass"
      v-bind:style="iconStyleObject"
      aria-hidden="true"></i>
  </button>
</template>

<script>
export default {

  data: function () {
    return {
      componentStyleObject: {
        'padding': ((this.size - this.iconSize) / 2) + 'rem',
        'font-size': this.iconSize + 'rem',
        'line-height': this.iconSize + 'rem',
        'width': this.size + 'rem',
        'height': this.size + 'rem'
      },
      iconStyleObject: {
        'width': this.iconSize + 'rem',
        'height': this.iconSize + 'rem'
      }
    }
  },

  props: {
    icon: {
      type: String
    },
    iconSize: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 1.25
    }
  },

  computed: {
    iconClass: function () {
      return 'fa ' + this.icon
    }
  }

}
</script>
