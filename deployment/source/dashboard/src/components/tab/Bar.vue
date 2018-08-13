<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-tab-bar {
    @include layout-horizontal();
  }
</style>

<template>
  <div class="cape-dashboard-tab-bar">
    <slot/>
  </div>
</template>

<script>
import _ from 'lodash'

export default {

  data () {
    return {
      selectedItem: null
    }
  },

  props: ['value'],

  computed: {
    selectedValue () {
      let value = 0
      if (this.selectedItem) {
        value = this.selectedItem.value
      }
      return value
    }
  },

  watch: {
    value (fresh, stale) {
      this._updateSelectedDetails()
    },
    selectedItem (fresh, stale) {
      if (fresh) {
        fresh.selected = true
      }
      if (stale) {
        stale.selected = false
      }
    }
  },

  methods: {
    _updateSelectedDetails () {
      let value = this.selectedValue
      if (value !== this.value) {
        value = this.value
      }
      let item = _.find(this.$children, function (item) {
        return item.value === value
      })
      if (item) {
        this.selectedItem = item
      }
    },
    _handleItemSelect (item) {
      if (this.selectedItem === item) {
        return
      }
      this.selectedItem = item
      this.$emit('input', this.selectedItem.value)
    }
  },

  mounted () {
    this.$on('select', this._handleItemSelect)
    this._updateSelectedDetails()
  },

  beforeDestroy () {
    this.$off('select', this._handleItemSelect)
  }

}
</script>
