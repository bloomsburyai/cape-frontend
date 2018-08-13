<style scoped lang="scss">
  @import "../scss/cape";

  $tail-side: 0.375rem;
  $tail-left: 0.3125rem;

  .cape-dashboard-bubble {
    display: inline-block;
    position: relative;
    border-radius: 0.125rem;
    padding: 0.625rem;
    margin-left: $tail-side;
  }

  .cape-dashboard-bubble.block {
    display: block;
    width: 100;
  }

  .cape-dashboard-bubble .tail {
    position: absolute;
    top: 1.0625rem;
    left: - $tail-left;
    width: 0;
    height: 0;
    border-top: $tail-side solid transparent;
    border-bottom: $tail-side solid transparent;
    border-right-style: solid;
    border-right-width: $tail-side;
    border-right-color: red;
  }

  .cape-dashboard-bubble .dashed-placeholder {
    padding: 0.0625rem 0.3125rem
  }

  // Progress

  .cape-dashboard-bubble .progress-wrapper {
    margin: 0.0625rem 0.3125rem;
    height: 1.5rem;
    @include layout-vertical();
    @include layout-center-center();
  }

  /* Dashed container & autogrow textarea sizing */

  .cape-dashboard-bubble .cape-dashboard-dashed-container,
  .cape-dashboard-bubble .cape-dashboard-autogrow-textarea {
    vertical-align: top;
    width: 100%;
  }

  /* Autogrow textarea text styling */

  .cape-dashboard-bubble .cape-dashboard-autogrow-textarea {
    @include typography-body-2();
    font-weight: $font-weight-regular;
  }
</style>

<template>
  <div class="cape-dashboard-bubble"
    v-bind:class="componentClassObject"
    v-bind:style="componentStyleObject">
    <span
      class="tail"
      v-bind:style="tailStyleObject"></span>
    <template v-if="progress">
      <div class="progress-wrapper">
        <cape-dashboard-progress-circle
          v-bind:size="1"
          v-bind:lineWidth="0.125"
          v-bind:active="progress"
          v-bind:strokeColor="progressStrokeColor"/>
      </div>
    </template>
    <template v-else>
      <template v-if="showDashedStroke">
        <cape-dashboard-dashed-container
          v-bind:strokeColor="dashedStrokeColor"
          v-bind:horizontalPadding="dashedContainerHorizontalPadding"
          v-bind:verticalPadding="dashedContainerVerticalPadding">
          <cape-dashboard-autogrow-textarea
            v-bind:style="textareaStyleObject"
            v-bind:value="value"
            v-bind:spellcheck="false"
            v-bind:placeholder="placeholder"
            v-bind:disabled="disabled"
            v-bind:readonly="readonly"
            v-bind:highlightRanges="highlightRanges"
            v-on:input="_handleTextareaInput"/>
        </cape-dashboard-dashed-container>
      </template>
      <template v-else>
        <div class="dashed-placeholder">
          <cape-dashboard-autogrow-textarea
            v-bind:style="textareaStyleObject"
            v-bind:value="value"
            v-bind:spellcheck="false"
            v-bind:disabled="disabled"
            v-bind:readonly="readonly"
            v-bind:highlightRanges="highlightRanges"
            v-on:input="_handleTextareaInput"/>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import * as Color from '@/color'
import ProgressCircle from '@/components/progress/Circle'
import DashedContainer from '@/components/DashedContainer'
import AutogrowTextarea from '@/components/AutogrowTextarea'

export default {

  data () {
    let dashedContainerHorizontalPadding = 0
    let dashedContainerVerticalPadding = 0.25

    let textareaStyleObject = {
      'color': this.textColor
    }
    // if (!this.showDashedStroke) {
    //   let horizontalPadding = 0.0625
    //   let verticalPadding = 0.3125
    //   textareaStyleObject['padding'] = horizontalPadding + 'rem' + ' ' + verticalPadding + 'rem'
    // }
    return {
      componentClassObject: {
        'block': this.block
      },
      componentStyleObject: {
        'background-color': this.backgroundColor
      },
      tailStyleObject: {
        'border-right-color': this.backgroundColor
      },
      textareaStyleObject: textareaStyleObject,
      dashedContainerHorizontalPadding: dashedContainerHorizontalPadding,
      dashedContainerVerticalPadding: dashedContainerVerticalPadding
    }
  },

  props: {
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
    dashedStrokeColor: {
      type: String,
      default: Color.WHITE
    },
    backgroundColor: {
      type: String,
      default: Color.GREY_500
    },
    textColor: {
      type: String,
      default: Color.GREY_800
    },
    block: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Boolean,
      default: false
    },
    progressStrokeColor: {
      type: String
    },
    highlightRanges: {
      type: Array
    }
  },

  components: {
    'cape-dashboard-progress-circle': ProgressCircle,
    'cape-dashboard-dashed-container': DashedContainer,
    'cape-dashboard-autogrow-textarea': AutogrowTextarea
  },

  watch: {
    block (fresh, stale) {
      this.componentClassObject.block = fresh
    }
  },

  methods: {
    _handleTextareaInput (value) {
      this.$emit('input', value)
    }
  }

}
</script>
