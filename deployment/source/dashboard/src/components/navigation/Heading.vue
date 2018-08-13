<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-navigation-heading {
    height: 3rem;
    line-height: 3rem;
    padding: 0 1.5rem;
  }

  .cape-dashboard-navigation-heading .cape-typography-body-2 {
    text-transform: uppercase;
    color: $blue-grey-200;
    display: inline-block;
  }
</style>

<template>
  <div class="cape-dashboard-navigation-heading">
    <h6 class="align-middle cape-typography-body-2">
      <slot></slot>
    </h6>
  </div>
</template>

<script>

</script>
