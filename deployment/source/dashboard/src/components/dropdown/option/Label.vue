<style scoped lang="scss">
  @import "../../../scss/cape";

  $height: 2rem;

  .cape-dashboard-dropdown-label-option {
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
  <button class="btn cape-dashboard-dropdown-label-option">
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
