<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-navigation-anchor {
    height: 3rem;
    padding: 0 1.5rem;
    cursor: pointer; cursor: hand;
    transition: background-color .15s ease-in-out;
  }

  .cape-dashboard-navigation-anchor a,
  .cape-dashboard-navigation-anchor a:hover,
  .cape-dashboard-navigation-anchor a:focus {
    text-decoration: none;
    width: 100%;
    height: 100%;
    outline: none;
  }

  .cape-dashboard-navigation-anchor .icon {
    display: inline-block;
    font-size: 0.875rem;
    line-height: 0.875rem;
    width: 1rem;
    height: 1rem;
    margin: 0 1.5rem 0 0;
    color: $grey-400;
    text-align: center;
  }

  .cape-dashboard-navigation-anchor .icon > * {
    vertical-align: middle;
  }

  .cape-dashboard-navigation-anchor .label {
    width: 100%;
    color: $blue-grey-600;
  }

  .cape-dashboard-navigation-anchor:hover,
  .cape-dashboard-navigation-anchor.active {
    background-color: $grey-100;
  }

  .cape-dashboard-navigation-anchor.active .icon {
    color: $blue-500;
  }
</style>

<template>
  <div class="cape-dashboard-navigation-anchor">
    <router-link v-bind:to="location" class="h-100 d-flex flex-row align-items-center">
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <div class="label cape-typography-body-1">
        <slot name="label"></slot>
      </div>
      <slot name="badge"></slot>
    </router-link>
  </div>
</template>

<script>
export default {

  props: {
    location: {
      type: String
    }
  }

}
</script>
