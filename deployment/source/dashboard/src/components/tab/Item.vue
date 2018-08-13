<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-tab-item {
    display: inline-block;
    @include typography-button();
    @include utility-cursor-pointer();
    @include utility-selection-prevent();
    height: 3rem;
    line-height: 3rem;
    padding: 0 1.5rem;
    color: $blue-grey-400;
    background-color: $white;
  }

  //.cape-dashboard-tab-item:not(.active):hover {
  .cape-dashboard-tab-item:hover {
    background-color: $grey-100;
  }

  .cape-dashboard-tab-item.active {
    border-bottom: 3px solid $blue-500;
    color: $blue-grey-600;
  }
</style>

<template>
  <div class="cape-dashboard-tab-item"
    v-bind:class="componentClassObject"
    v-on:click="_handleClick">
    <slot/>
  </div>
</template>

<script>
export default {

  data () {
    return {
      componentClassObject: {
        active: false
      }
    }
  },

  props: {
    value: {
      required: true
    }
  },

  computed: {
    selected: {
      get () {
        return this.componentClassObject.active
      },
      set (value) {
        this.componentClassObject.active = value
      }
    }
  },

  methods: {
    _handleClick () {
      this.$parent.$emit('select', this)
    }
  }

}
</script>
