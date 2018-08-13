<style scoped lang="scss">
  @import "../../../scss/cape";

  .cape-dashboard-dropdown-select-option {
    background-color: transparent;
    display: block;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    padding: 0 1rem;
    text-align: left;
  }

  .cape-dashboard-dropdown-select-option .label {
    color: $blue-grey-400;
  }
</style>

<template>
  <button class="btn cape-dashboard-dropdown-select-option"
    v-on:click="_handleClick">
    <!--<span class="label cape-typography-body-1">-->
    <div class="label cape-typography-body-1">
      <slot/>
    </div>
    <!--</span>-->
  </button>
</template>

<script>
export default {

  props: ['value'],

  methods: {
    _handleClick () {
      this.$emit('select', this)
    }
  }

}
</script>
