<style scoped lang="scss">
  @import "../../../scss/cape";

  .cape-dashboard-dropdown-select-trigger {
    background-color: transparent;
    display: inline-block;
    height: 2.25rem;
    line-height: 2.25rem;
    padding: 0 1rem;
    border-radius: 0;
  }

  .cape-dashboard-dropdown-select-trigger .label {
    display: inline-block;
    color: $blue-grey-600;
  }

  .cape-dashboard-dropdown-select-trigger .icon {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    color: $grey-400;
    // margin: 0 0 0 0.5rem;
  }
</style>

<template>
  <button class="btn cape-dashboard-dropdown-select-trigger"
    v-on:click="$emit('toggle')">
    <span class="label cape-typography-body-1">
      <template v-if="label">
        {{ label }}
      </template>
      <template v-else>
        <slot/>
      </template>
    </span>
    <span class="icon">
      <i class="fa fa-caret-down" aria-hidden="true"></i>
    </span>
  </button>
</template>

<script>
export default {
  data () {
    return {
      label: ''
    }
  }
}
</script>
