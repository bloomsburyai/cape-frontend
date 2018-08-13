<style scoped lang="scss">
  @import "../../../scss/component";

  $height: 2.25rem;

  .cape-landing-dropdown-label-trigger {
    @include typography-button();
    display: inline-block;
    background-color: transparent;
    height: $height;
    border-radius: 0.125rem;
    padding: 0 1rem;
    // override "typography-button" mixin
    font-weight: $font-weight-regular;
    text-transform: none;
    text-align: left;

    &.block {
      display: block;
      width: 100%;
    }

    .body {
      @include layout-horizontal();
      @include layout-center();
      width: 100%;
      height: 100%;
    }

    .label {
      // display: inline-block;
      @include layout-flex();
      line-height: $height;
    }

    .caret {
      display: inline-block;
      line-height: $height;
      margin: 0 0 0 0.5rem;
    }
  }
</style>

<template>
  <button class="btn cape-landing-dropdown-label-trigger">
    <div class="body">
      <span class="label"
        v-bind:style="labelStyleObject">
        {{ label }}
      </span>
      <span class="caret"
        v-bind:style="caretStyleObject">
        <i class="fa fa-caret-down" aria-hidden="true"></i>
      </span>
    </div>
  </button>
</template>

<script>
export default {

  props: {
    label: {
      type: String
    },
    labelColor: {
      type: String,
      default: 'inherit'
    },
    caretColor: {
      type: String,
      default: 'inherit'
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
    labelStyleObject () {
      return {
        color: this.labelColor
      }
    },
    caretStyleObject () {
      return {
        color: this.caretColor
      }
    }
  }

}
</script>
