<style scoped lang="scss">
  @import "../scss/cape";

  .cape-dashboard-onboarding {
    position: relative;

    // Backdrop

    .backdrop {
      @include layout-fit();
      background: $black;
      opacity: 0.5;
    }

    // Types

    &.type-modal {
      @include layout-vertical();
      @include layout-center-center();
    }

    &.type-tooltip {

    }

    // Step

    .step {
      position: relative;
      background-color: $white;
      box-shadow: $box-shadow-1;
      max-width: 30rem;
      padding: 1.5rem;

      // Tail

      &.tooltip-right {
        border-left: 0.125rem solid $orange-500;

        .tail {
          position: absolute;
          top: 50%;
          left: -0.5rem;
          margin: -0.25rem 0 0 0;
          border-top: 0.5rem solid transparent;
          border-bottom: 0.5rem solid transparent;
          border-right: 0.5rem solid $orange-500;
        }
      }

      &.tooltip-bottom {
        border-top: 0.125rem solid $orange-500;

        .tail {
          position: absolute;
          top: -0.5rem;
          left: 50%;
          margin: 0 0 0 -0.25rem;
          border-left: 0.5rem solid transparent;
          border-right: 0.5rem solid transparent;
          border-bottom: 0.5rem solid $orange-500;
        }
      }

      //

      .body {
        @include typography-body-1();
        color: $blue-grey-400;

        p {
          margin: 0;
        }
      }

      .actions {
        @include layout-horizontal();
        @include layout-end-justified();
        margin: 1.5rem 0 0 0;

        .button-next {
          background-color: $blue-500;
          color: $white;

          &:hover {
            background-color: $blue-700;
          }
        }

        .button-end {
          background-color: $blue-grey-200;
          color: $white;

          &:hover {
            background: $blue-grey-300;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="cape-dashboard-onboarding"
    v-bind:class="componentClassObject">
    <div class="backdrop"></div>
    <template v-if="model">
      <div class="step"
        v-bind:style="stepStyleObject"
        v-bind:class="stepClassObject">
        <div class="tail"></div>
        <div class="body">
          <p v-html="model.content"></p>
        </div>
        <div class="actions">
          <template v-if="hasNext">
            <cape-dashboard-label-button
              class="button-next"
              label="Next"
              v-on:click.native="_handleNextClick"/>
          </template>
          <template v-else>
            <cape-dashboard-label-button
              class="button-end"
              label="End"
              v-on:click.native="_handleEndClick"/>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'

import client from '@/client'
import LabelButton from '@/components/button/Label'

const DEFAULT_KEY = 'assistant'

const TYPE_MODAL = 'typeModal'
const TYPE_TOOLTIP = 'typeTooltip'

export default {

  data () {
    return {
      store: {
        'assistant': [
          {
            type: TYPE_MODAL,
            content: 'Welcome to Cape admin panel<br/>Cape answers your questions by reading your documents and common questions.'
          },
          {
            type: TYPE_TOOLTIP,
            class: 'tooltip-right',
            style: function () {
              const $step = $('.step', this.$el)
              const $target = $('.cape-dashboard-navigation-anchor:eq(3)')
              const top = $target.offset().top + ($target.outerHeight() - $step.outerHeight()) / 2
              const left = $target.offset().left + $target.outerWidth()
              return {
                position: 'absolute',
                top: top + 'px',
                left: left + 'px',
                width: '320px'
              }
            },
            content: 'You can start by adding a document here.'
          },
          {
            type: TYPE_TOOLTIP,
            class: 'tooltip-right',
            style: function () {
              const $step = $('.step', this.$el)
              const $target = $('.cape-dashboard-navigation-anchor:eq(2)')
              const top = $target.offset().top + ($target.outerHeight() - $step.outerHeight()) / 2
              const left = $target.offset().left + $target.outerWidth()
              return {
                position: 'absolute',
                top: top + 'px',
                left: left + 'px',
                width: '352px'
              }
            },
            content: 'You can also add common questions here.'
          },
          {
            type: TYPE_TOOLTIP,
            class: 'tooltip-bottom',
            style: function () {
              const $step = $('.step', this.$el)
              const $target = $('.cape-dashboard-assistant-input')
              const top = $target.offset().top + $target.outerHeight()
              const left = $target.offset().left + ($target.outerWidth() - $step.outerWidth()) / 2
              return {
                position: 'absolute',
                top: top + 'px',
                left: left + 'px',
                width: '320px'
              }
            },
            content: 'After that ask your question here.'
          },
          {
            type: TYPE_MODAL,
            content: 'Thank you!<br/>' +
              'To see more advanced functionality or to add Cape to your app check our API.'
          }

        ]
      },
      key: '',
      cursor: 0,
      stepStyleObject: {}
    }
  },

  computed: {
    collection () {
      return this.store[this.key]
    },
    model () {
      return this.collection[this.cursor]
    },
    componentClassObject () {
      let value = {}
      if (this.model && this.model.type) {
        switch (this.model.type) {
          case TYPE_MODAL:
            value['type-modal'] = true
            break
          case TYPE_TOOLTIP:
            value['type-tooltip'] = true
            break
        }
      }
      return value
    },
    hasNext () {
      return this.cursor < (this.collection.length - 1)
    },
    stepClassObject () {
      let value = {}
      if (this.model && this.model.class) {
        value[this.model.class] = true
      }
      return value
    }
  },

  components: {
    'cape-dashboard-label-button': LabelButton
  },

  methods: {
    // setup
    setup () {
      // key
      let key = DEFAULT_KEY
      let parts = _.trim(this.$route.path, '/').split('/', 1)
      if (parts && parts.length && parts[0]) {
        key = parts[0]
      }
      this.key = key
      // cursor
      this.cursor = 0
    },

    // _handleNextClick
    _handleNextClick () {
      this.cursor++
      this._updateStepStyleObject()
    },

    // _handleEndClick
    _handleEndClick () {
      client.user.onboarding.complete()
      this.$emit('close')
    },

    // _handleWindowResize
    _handleWindowResize () {
      this._updateStepStyleObject()
    },

    // _updateStepStyleObject
    _updateStepStyleObject () {
      if (!this.model || !this.model.type) {
        this.stepStyleObject = {}
      }
      switch (this.model.type) {
        case TYPE_MODAL:
          this.stepStyleObject = {}
          break
        case TYPE_TOOLTIP:
          this.$nextTick(() => {
            this.stepStyleObject = this.model.style()
          })
          break
      }
    }
  },

  created () {
    this.setup()
    $(window).on('resize', this._handleWindowResize)
  },

  beforeDestroy () {
    $(window).off('resize', this._handleWindowResize)
  }

}
</script>
