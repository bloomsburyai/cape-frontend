<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-content-item {
    position: relative;
    z-index: 0;
    display: none;
  }

  .cape-dashboard-content-item.selected {
    display: block;
  }
</style>

<template>
  <div class="cape-dashboard-content-item"
    v-bind:class="componentClassObject">
    <slot/>
  </div>
</template>

<script>
export default {

  data () {
    return {
      componentClassObject: {
        selected: false
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
        return this.componentClassObject.selected
      },
      set (value) {
        this.componentClassObject.selected = value
      }
    }
  }

}
</script>
