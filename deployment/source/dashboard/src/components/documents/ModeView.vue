<style scoped lang="scss">
  @import "./mode-common";

  .cape-dashboard-documents-mode-view {
    display: block;
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
  }

  // Page & content

  .page-wrapper {
    padding: 3rem 1.5rem;
  }

  .page .title-wrapper,
  .page .created-wrapper,
  .page .content-wrapper {
    padding: 0.0625rem 0.3125rem
  }
</style>

<template>
  <div class="cape-dashboard-documents-mode-view">
    <div class="body">

      <div class="canvas-wrapper">
        <div class="canvas">
          <div class="page-wrapper">
            <div class="page"
              v-bind:style="pageStyleObject">
              <div class="title-wrapper">
                <cape-dashboard-autogrow-textarea
                  class="title"
                  v-model="title"
                  v-bind:spellcheck="false"
                  v-bind:readonly="true"/>
              </div>
              <div class="created-wrapper">
                <p class="created">{{ createdLabel }}</p>
              </div>
              <div class="content-wrapper">
                <cape-dashboard-autogrow-textarea
                  class="content"
                  v-model="content"
                  v-bind:spellcheck="false"
                  v-bind:readonly="true"/>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import ModeCommon from './mode-common'
import AutogrowTextarea from '@/components/AutogrowTextarea'

export default {

  extends: ModeCommon,

  data () {
    return {
      pageWrapperVerticalPadding: 48,
      pageStyleObject: {
        'height': 'auto'
      },
      resizeHandler: null
    }
  },

  components: {
    'cape-dashboard-autogrow-textarea': AutogrowTextarea
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
    update () {
      this.$set(this.pageStyleObject, 'height', 'auto')
      this.$nextTick(function () {
        const $canvas = $('.canvas', this.$el)
        const $page = $('.page', this.$el)

        let canvasHeight = $canvas.outerHeight()
        let pageHeight = $page.outerHeight()

        if (pageHeight < canvasHeight) {
          pageHeight = (canvasHeight - this.pageWrapperVerticalPadding * 2) + 'px'
        } else {
          pageHeight = 'auto'
        }
        this.$set(this.pageStyleObject, 'min-height', pageHeight)
      })
    },
    _handleResize () {
      this.update()
    }
  },

  mounted () {
    this.resizeHandler = _.bind(this._handleResize, this)
    $(window).on('resize', this.resizeHandler)
  },

  beforeDestroy () {
    $(window).off('resize', this.resizeHandler)
  }

}
</script>
