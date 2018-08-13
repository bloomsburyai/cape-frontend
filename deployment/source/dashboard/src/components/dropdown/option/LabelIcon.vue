<style scoped lang="scss">
  @import "../../../scss/cape";

  $height: 2rem;

  .cape-dashboard-dropdown-icon-label-option {
    @include typography-button();
    display: block;
    width: 100%;
    background-color: transparent;
    height: $height;
    border-radius: 0;
    padding: 0 1rem;
    // override "typography-button" mixin
    font-weight: $font-weight-regular;
    text-transform: none;
  }

  .body {
    height: 100%;
    @include layout-horizontal();
    @include layout-self-start();
    @include layout-center();
  }

  .body .icon {
    margin: 0 1rem 0 0;
  }

  .body .label {
    display: inline-block;
    line-height: $height;
  }
</style>

<template>
  <button class="btn cape-dashboard-dropdown-icon-label-option">
    <span class="body">
      <i
        v-bind:class="iconClass"
        v-bind:style="iconStyleObject"
        aria-hidden="true"
        class="icon"></i>
      <span class="label"
        v-bind:style="labelStyleObject">
        {{ label }}
      </span>
    </span>
  </button>
</template>

<script>
export default {

  props: {
    value: {},
    icon: {
      type: String
    },
    iconSize: {
      type: Number,
      default: 0.875
    },
    iconColor: {
      type: String,
      default: 'inherit'// color.BLUE_500
    },
    label: {
      type: String
    },
    labelColor: {
      type: String,
      default: 'inherit'// color.BLUE_GREY_600
    }
  },

  computed: {
    iconClass () {
      return 'fa ' + this.icon
    },
    iconStyleObject () {
      return {
        'width': this.iconSize + 'rem',
        'height': this.iconSize + 'rem',
        'font-size': this.iconSize + 'rem',
        'line-height': this.iconSize + 'rem',
        'color': this.iconColor
      }
    },
    labelStyleObject () {
      return {
        'color': this.labelColor
      }
    }
  }

}
</script>
