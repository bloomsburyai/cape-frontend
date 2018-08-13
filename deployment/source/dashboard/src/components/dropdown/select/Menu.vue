<style scoped lang="scss">
  @import "../../../scss/cape";

  .cape-dashboard-dropdown-select-menu {
    position: absolute;

    background-color: $white;
    box-shadow: $box-shadow-2;
    padding: 0.25rem 0;
  }
</style>

<template>
  <div
    v-bind:style="componentStyleObject"
    class="cape-dashboard-dropdown-select-menu">
    <slot/>
  </div>
</template>

<script>
import Vue from 'vue'
import Option from './Option'

const OptionConstructor = Vue.extend(Option)

export default {

  data () {
    return {
      componentStyleObject: {
        'display': 'none'
      }
    }
  },

  computed: {
    visible: function () {
      return this.componentStyleObject.display !== 'none'
    }
  },

  methods: {
    show () {
      this.componentStyleObject.display = 'block'
    },
    hide () {
      this.componentStyleObject.display = 'none'
    },
    select (value) {
      let component = null
      for (let i = 0; i < this.$children.length; i++) {
        component = this.$children[i]
        if (component instanceof OptionConstructor) {
          if (component.value === value) {
            this.$emit('select', component)
            return
          }
        }
      }
    },
    _handleOptionSelect (component) {
      this.$emit('select', component)
    }
  },

  mounted () {
    let component = null
    for (let i = 0; i < this.$children.length; i++) {
      component = this.$children[i]
      if (component instanceof OptionConstructor) {
        component.$on('select', this._handleOptionSelect)
      }
    }
  },

  beforeDestroy () {
    let component = null
    for (let i = 0; i < this.$children.length; i++) {
      component = this.$children[i]
      if (component instanceof OptionConstructor) {
        component.$off('select', this._handleOptionSelect)
      }
    }
  }

}
</script>
