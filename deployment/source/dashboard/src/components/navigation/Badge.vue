<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-navigation-badge {
    display: inline-block;
    background-color: $red-500;
    color: $white;
    font-size: 0.625rem;
    font-weight: $font-weight-medium;
    line-height: 1;
    padding:  0.1875rem 0.25rem  0.125rem 0.25rem;
    border-radius: 0.125rem;
  }
</style>

<template>
  <span class="cape-dashboard-navigation-badge">
    <slot></slot>
  </span>
</template>

<script></script>
