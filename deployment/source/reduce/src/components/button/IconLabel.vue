<style scoped lang="scss">
  @import "../../scss/cape";

  $height: 2.25rem;

  .cape-dashboard-icon-label-button {
    @include typography-button();
    display: inline-block;
    background-color: transparent;
    height: $height;
    border-radius: 0.125rem;
    padding: 0 1rem;
  }

  .cape-dashboard-icon-label-button.block {
    display: block;
    width: 100%;
  }

  .body {
    height: 100%;
    @include layout-horizontal();
    @include layout-center-center();
  }

  .body .icon {
    margin: 0 0.5rem 0 0;
  }

  .body .label {
    display: inline-block;
    line-height: $height;
  }

</style>

<template>
  <button
    class="btn cape-dashboard-icon-label-button"
    v-bind:class="componentClassObject">
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
    },
    block: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    componentClassObject () {
      return {
        block: this.block
      }
    },
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
