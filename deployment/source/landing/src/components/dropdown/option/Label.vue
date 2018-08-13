<style scoped lang="scss">
  @import "../../../scss/component";

  $height: 2rem;

  .cape-landing-dropdown-label-option {
    @include typography-button();
    display: block;
    width: 100%;
    background-color: transparent;
    height: $height;
    line-height: $height;
    border-radius: 0;
    padding: 0 1rem;
    // override "typography-button" mixin
    font-weight: $font-weight-regular;
    text-transform: none;
    text-align: left;
  }
</style>

<template>
  <button class="btn cape-landing-dropdown-label-option">
    {{ label }}
  </button>
</template>

<script>
export default {

  props: {
    value: {},
    label: {
      type: String
    }
  }

}
</script>
