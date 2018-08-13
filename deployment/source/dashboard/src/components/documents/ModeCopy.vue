<style scoped lang="scss">
  @import "./mode-common";

  .cape-dashboard-documents-mode-copy {
    display: block;
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
  }

  // Page & content

  .page {
    border-bottom: none;
  }

  .page-wrapper {
    padding: 3rem 1.5rem 0 1.5rem;
  }

  .page .created-wrapper {
    padding: 0.0625rem 0.3125rem
  }

  .page .content-wrapper,
  .page .content-wrapper .cape-dashboard-dashed-container,
  .page .content-wrapper .cape-dashboard-autogrow-textarea {
    height: 100%;
  }

  // Actions

  .actions-wrapper {
    @include contain();
  }

  .actions {
    @include layout-horizontal()
    @include layout-end-justified();
    border-top: 1px solid $blue-grey-100;
    padding: 1.5rem;
  }

  .actions .cape-dashboard-label-button {
    color: $blue-grey-200;
  }

  .actions .cape-dashboard-label-button:hover {
    background-color: $blue-grey-100;
    color: $blue-grey-400;
  }

  .actions .cape-dashboard-progress-label-button {
    background-color: $green-500;
    color: $white;
  }

  .actions .cape-dashboard-progress-label-button:hover {
    background-color: $green-700;
  }
</style>

<template>
  <div class="cape-dashboard-documents-mode-copy">
    <div class="body">

      <div class="canvas-wrapper">
        <div class="canvas">
          <div class="page-wrapper">
            <div class="page"
              v-bind:style="pageStyleObject">
              <div class="title-wrapper">
                <cape-dashboard-dashed-container
                  v-bind:strokeColor="color.GREY_300"
                  v-bind:horizontalPadding="dashedContainerHorizontalPadding"
                  v-bind:verticalPadding="dashedContainerVerticalPadding">
                  <cape-dashboard-autogrow-textarea
                    class="title"
                    v-model="titleTextareaValue"
                    v-bind:spellcheck="false"
                    v-on:input="_handleTextareaInput"/>
                </cape-dashboard-dashed-container>
              </div>
              <div class="created-wrapper">
                <p class="created">{{ createdLabel }}</p>
              </div>
              <div class="content-wrapper">
                <cape-dashboard-dashed-container
                  v-bind:strokeColor="color.GREY_300"
                  v-bind:horizontalPadding="dashedContainerHorizontalPadding"
                  v-bind:verticalPadding="dashedContainerVerticalPadding">
                  <cape-dashboard-autogrow-textarea
                    class="content"
                    v-model="contentTextareaValue"
                    v-bind:spellcheck="false"
                    v-on:input="_handleTextareaInput"/>
                </cape-dashboard-dashed-container>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="actions-wrapper">
        <div class="actions"
          v-bind:style="actionsStyleObject">
          <cape-dashboard-label-button
            label="Cancel"
            v-on:click.native="_handleCancelActionClick"/>
          <cape-dashboard-progress-label-button
            label="Save"
            v-bind:progress="saveActionProgress"
            v-on:click.native="_handleSaveActionClick"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import client from '@/client'
import * as color from '@/color'
import * as action from './action'
import ModeCommon from './mode-common'
import DashedContainer from '@/components/DashedContainer'
import AutogrowTextarea from '@/components/AutogrowTextarea'
import LabelButton from '@/components/button/Label'
import ProgressLabelButton from '@/components/button/ProgressLabel'

export default {

  extends: ModeCommon,

  data () {
    return {
      // expose color to template
      color: color,
      // page
      pageWrapperVerticalPadding: 48,
      pageStyleObject: {},
      // actions
      actionsStyleObject: {},
      saveActionProgress: false,
      // dashed container
      dashedContainerHorizontalPadding: 0,
      dashedContainerVerticalPadding: 0.25,
      // resize
      resizeHandler: null,
      // textareas
      titleTextareaValue: '',
      contentTextareaValue: ''
    }
  },

  components: {
    'cape-dashboard-dashed-container': DashedContainer,
    'cape-dashboard-autogrow-textarea': AutogrowTextarea,
    'cape-dashboard-label-button': LabelButton,
    'cape-dashboard-progress-label-button': ProgressLabelButton
  },

  watch: {
    title () {
      this.update()
    },
    content () {
      this.update()
    }
  },

  methods: {

    // Updates the layout of the component
    // to figure out the page height and if
    // a scrollbar is present on the canvas
    update () {
      this.$set(this.pageStyleObject, 'height', 'auto')
      this.$nextTick(function () {
        const $canvasWrapper = $('.canvas-wrapper', this.$el)
        const $canvas = $('.canvas', this.$el)
        const $page = $('.page', this.$el)

        let canvasWrapperWidth = $canvasWrapper.innerWidth()
        let canvasWidth = $canvas.outerWidth()
        let canvasHeight = $canvas.outerHeight()

        // page should have at least
        // the height of the canvas
        let pageHeight = $page.outerHeight()
        if (pageHeight < canvasHeight) {
          pageHeight = (canvasHeight - this.pageWrapperVerticalPadding) + 'px'
        } else {
          pageHeight = 'auto'
        }
        this.$set(this.pageStyleObject, 'height', pageHeight)

        // actions compensate for scrollbar
        let scrollbarWidth = 0
        if (canvasWidth < canvasWrapperWidth) {
          scrollbarWidth = (canvasWrapperWidth - canvasWidth) + 'px'
        } else {
          scrollbarWidth = 0
        }
        this.$set(this.actionsStyleObject, 'margin-right', scrollbarWidth)
      })
    },

    // Event handler that is triggered
    // when text is entered in one of the
    // textareas
    _handleTextareaInput () {
      this.update()
    },

    // Event handler that is triggered
    // when the browser window gets
    // resized
    _handleWindowResize () {
      this.update()
    },

    // Event handler that is triggered
    // when the user presses the "cancel"
    // action button
    _handleCancelActionClick () {
      this.$emit(action.EVENT, {
        type: action.DELETE
      })
    },

    // Event handler that is triggered
    // when the user presses the "save"
    // action button
    _handleSaveActionClick () {
      client.document.create({
        title: this.titleTextareaValue,
        content: this.contentTextareaValue
      }, _.bind(function (error, id) {
        this.saveActionProgress = false
        if (error) {
          this.$emit('error', error)
        } else {
          this.$emit('success', {
            id: id,
            title: this.titleTextareaValue,
            text: this.contentTextareaValue
          })
        }
      }, this))
      this.saveActionProgress = true
    }
  },

  mounted () {
    this.resizeHandler = _.bind(this._handleWindowResize, this)
    $(window).on('resize', this.resizeHandler)
    this.update()
  },

  beforeDestroy () {
    $(window).off('resize', this.resizeHandler)
  }

}
</script>
