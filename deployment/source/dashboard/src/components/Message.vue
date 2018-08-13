<style scoped lang="scss">
  @import "../scss/cape";

  .cape-dashboard-message {
    display: block;
    position: relative;

    .content {
      display: inline-block;
    }

    &.block .content {
      display: block;
    }

    // Icon

    .icon {
      width: 2.5rem;
      height: 2.5rem;
      line-height: 2.5rem;
      border-radius: 1.25rem;
      text-align: center;
      background-color: $blue-grey-100;
      margin: 0.1875rem 0.6875rem 0 0;

      position: absolute;
      top: 0;
      left: 0;

      .fa {
        font-size: 0.875rem;
        color: $blue-grey-500;
      }
    }

    // Bubble

    .cape-dashboard-bubble {
      margin: 0 0 0 3.1875rem;
    }

  }
</style>

<template>
  <div class="cape-dashboard-message"
    v-bind:class="componentClassObject">
    <div class="content">
      <div class="icon">
        <i
          class="fa"
          aria-hidden="true"
          v-bind:class="iconClass"></i>
      </div>
      <cape-dashboard-bubble
        v-bind:value="value"
        v-bind:showDashedStroke="showDashedStroke"
        v-bind:placeholder="placeholder"
        v-bind:disabled="disabled"
        v-bind:readonly="readonly"
        v-bind:dashedStrokeColor="bubbleDashedStrokeColor"
        v-bind:backgroundColor="bubbleBackgroundColor"
        v-bind:textColor="bubbleTextColor"
        v-bind:progressStrokeColor="bubbleProgressStrokeColor"
        v-bind:block="block"
        v-bind:progress="progress"
        v-bind:highlightRanges="highlightRanges"
        v-on:input="_handleBubbleInput"
        />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import * as Color from '@/color'
import Bubble from '@/components/Bubble'

export default {

  data () {
    let iconClass = ''
    let bubbleDashedStrokeColor = ''
    let bubbleBackgroundColor = ''
    let bubbleTextColor = ''
    let bubbleProgressStrokeColor = ''
    switch (this.type) {
      case 'user':
        iconClass = 'fa-user'
        bubbleDashedStrokeColor = Color.BLUE_400
        bubbleBackgroundColor = Color.BLUE_600
        bubbleTextColor = Color.WHITE
        bubbleProgressStrokeColor = Color.WHITE
        break
      case 'machine':
        iconClass = 'fa-cogs'
        bubbleDashedStrokeColor = Color.GREY_300
        bubbleBackgroundColor = Color.WHITE
        bubbleTextColor = Color.BLUE_GREY_400
        bubbleProgressStrokeColor = Color.BLUE_GREY_400
        break
    }
    return {
      cid: _.uniqueId('message'),
      componentClassObject: {
        'block': this.block
      },
      iconClass: iconClass,
      bubbleDashedStrokeColor: bubbleDashedStrokeColor,
      bubbleBackgroundColor: bubbleBackgroundColor,
      bubbleTextColor: bubbleTextColor,
      bubbleProgressStrokeColor: bubbleProgressStrokeColor
    }
  },

  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return value === 'user' || value === 'machine'
      }
    },
    value: {
      type: String
    },
    showDashedStroke: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    notifyResize: {
      type: Boolean,
      default: false
    },
    resizeMaximumWidth: {
      type: Number,
      default: 0
    },
    resizeMinimumWidth: {
      type: Number,
      default: 0
    },
    block: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Boolean,
      default: false
    },
    highlightRanges: {
      type: Array
    }
  },

  components: {
    'cape-dashboard-bubble': Bubble
  },

  watch: {
    value () {
      this._handleResize()
    },
    block (fresh, stale) {
      this.componentClassObject.block = fresh
    },
    resizeMaximumWidth () {
      this._handleResize()
    },
    resizeMinimumWidth () {
      this._handleResize()
    },
    progress () {
      this._handleResize()
    }
  },

  methods: {
    _handleResize () {
      if (!this.notifyResize) {
        return
      }
      this.$parent.$emit('beforeResize')
      this.$nextTick(function () {
        let width = $('.content', this.$el).outerWidth()
        let height = $('.content', this.$el).outerHeight()
        if (!this.resizeMinimumWidth) {
          if (this.resizeMaximumWidth && width > this.resizeMaximumWidth) {
            width = this.resizeMaximumWidth
          }
        } else {
          width = this.resizeMinimumWidth
        }
        this.$parent.$emit('resize', {
          cid: this.cid,
          type: this.type,
          width: width,
          height: height
        })
      })
    },
    _handleBubbleInput (value) {
      this.$emit('input', value)
    }
  },

  mounted () {
    this._handleResize()
  }

}
</script>
