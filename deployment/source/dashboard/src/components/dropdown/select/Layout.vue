<style scoped lang="scss">
  @import "../../../scss/cape";

  .cape-dashboard-dropdown-select-layout {
    position: relative;
  }
</style>

<template>
  <div class="cape-dashboard-dropdown-select-layout"
    v-on:toggle="toggle">
    <slot/>
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import Vue from 'vue'
import Trigger from './Trigger'
import Menu from './Menu'

const TriggerConstructor = Vue.extend(Trigger)
const MenuConstructor = Vue.extend(Menu)

export default {

  props: {
    closeOnOutsideClick: {
      type: Boolean,
      default: true
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    value: {}
  },

  computed: {
    opened: function () {
      return this.$refs.menu.visible
    }
  },

  methods: {
    toggle () {
      if (this.opened) {
        this.close()
      } else {
        this.open()
      }
    },
    open () {
      this.$refs.menu.show()
      $(document).on('click', this._handleDocumentClick)
    },
    close () {
      this.$refs.menu.hide()
      $(document).off('click', this._handleDocumentClick)
    },
    select (value) {
      this.$refs.menu.select(value)
    },
    _handleDocumentClick (e) {
      if (!this.closeOnOutsideClick) {
        return
      }
      let inside = false
      if (e.target === this.$el || $(this.$el).has(e.target).length) {
        inside = true
      }
      if (!inside) {
        this.close()
      }
    },
    _handleMenuSelect (component) {
      let label = _.trim(component.$el.innerText)
      let value = component.value
      this.$refs.trigger.label = label
      if (this.closeOnSelect) {
        this.close()
      }
      this.$emit('input', value)
    }
  },

  mounted () {
    // iterate over slot components
    // and discover trigger and menu
    let component = null
    for (let i = 0; i < this.$slots.default.length; i++) {
      if (!this.$slots.default[i].componentInstance) {
        continue
      }
      component = this.$slots.default[i].componentInstance
      if (component instanceof TriggerConstructor) {
        this.$refs.trigger = component
      } else if (component instanceof MenuConstructor) {
        this.$refs.menu = component
      }
    }

    // TODO: check if we have "trigger" and
    // "menu" and do something about it

    // add toggle handler for trigger
    this.$refs.trigger.$on('toggle', this.toggle)
    // add select handler for menu
    this.$refs.menu.$on('select', this._handleMenuSelect)

    // initial value select
    if (this.value !== undefined) {
      this.select(this.value)
    }
  },

  beforeDestroy () {
    // clear the above added handlers
    this.$refs.trigger.$off('toggle')
    this.$refs.menu.$off('select')
    // clean document click handler
    $(document).off('click', this._handleDocumentClick)
  }

}
</script>
