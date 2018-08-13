<style scoped lang="scss">
  @import "../../../scss/component";

  .cape-landing-dropdown-content-layout {
    display: inline-block;
    position: relative;

    &.block {
      display: block;
    }

    // Content

    & > .content {
      background-color: $white;
      box-shadow: $box-shadow-2;
      border: 1px solid $grey-300;

      display: none;
    }

    &.active > .content {
      display: block;
    }

    &.block > .content {
      width: 100%;
    }

    // Known option types

    .cape-landing-dropdown-icon-label-option:first-child,
    .cape-landing-dropdown-label-option:first-child {
      margin-top: 0.1875rem;
    }

    .cape-landing-dropdown-icon-label-option:last-child,
    .cape-landing-dropdown-label-option:last-child {
      margin-bottom: 0.1875rem;
    }
  }
</style>

<template>
  <div class="cape-landing-dropdown-content-layout"
    v-bind:class="componentClassObject">
    <div class="trigger"
      ref="trigger"
      v-on:click="toggle">
      <slot name="trigger"/>
    </div>
    <div class="content"
      ref="content"
      v-bind:style="contentStyleObject">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {

  data () {
    return {
      componentClassObject: {
        'active': false,
        'block': this.block
      },
      contentStyleObject: {}
    }
  },

  props: {
    horizontalAlign: {
      type: String,
      required: true
      // values: 'left', 'right', 'center'
    },
    verticalAlign: {
      type: String,
      required: true
      // values: 'top', 'bottom'
    },
    block: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    opened: function () {
      return this.componentClassObject['active']
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
      this.componentClassObject['active'] = true
      $(document).on('click', this._handleDocumentClick)
      this.$emit('stateChange', this.opened)
    },
    close () {
      this.componentClassObject['active'] = false
      $(document).off('click', this._handleDocumentClick)
      this.$emit('stateChange', this.opened)
    },
    update () {
      this._updateLayoutStates()
    },
    _handleDocumentClick (e) {
      let inside = false
      if (e.target === this.$el || $(this.$el).has(e.target).length) {
        inside = true
      }
      if (!inside) {
        this.close()
      }
    },
    _updateLayoutStates () {
      this._updateContentStyleObject()
    },
    _updateContentStyleObject () {
      const $trigger = $(this.$refs.trigger)
      const $content = $(this.$refs.content)
      let left = ''
      let right = ''
      switch (this.horizontalAlign) {
        case 'left':
          left = 0
          right = 'auto'
          break
        case 'right':
          left = 'auto'
          right = 0
          break
        case 'center':
          left = Math.round(($trigger.outerWidth() - $content.outerWidth()) / 2) + 'px'
          break
      }
      let top = ''
      let bottom = ''
      switch (this.verticalAlign) {
        case 'top':
          top = $trigger.outerHeight() + 'px'
          bottom = 'auto'
          break
        case 'bottom':
          top = 'auto'
          bottom = $trigger.outerHeight() + 'px'
          break
      }
      this.contentStyleObject = {
        'position': 'absolute',
        'top': top,
        'right': right,
        'bottom': bottom,
        'left': left
      }
    }
  },

  mounted () {
    this._updateLayoutStates()
  },

  beforeDestroy () {
    $(document).off('click', this._handleDocumentClick)
  }

}
</script>
