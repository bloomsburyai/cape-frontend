<style scoped lang="scss">
  @import "../scss/cape";

  .cape-dashboard-canvas {
    @include layout-fit();
    display: block;
    z-index: 0;
    background-color: $blue-grey-50;
  }

  .vertical-wrapper {
    @include layout-scroll-vertical();
    width: 100%;
    height: 100%;
  }

  .padding-wrapper {
    min-height: 100%;
    @include layout-vertical();
  }

  .flex {
    @include layout-flex();
  }

  .vertical-fix {
    display: block;
  }

  .vertical-gutter {
    padding: 1.5rem 0;
  }

  .content {
    display: block;
    // @include layout-vertical();
    // @include layout-start();
    margin: 0 auto;
  }
</style>

<template>
  <div class="cape-dashboard-canvas">
    <div class="vertical-wrapper">
      <div class="padding-wrapper"
        v-bind:style="paddingWrapperStyleObject">
        <div class="flex"></div>
        <div class="vertical-fix">
          <div class="vertical-gutter">
            <div class="horizontal-wrapper">
              <div
                class="content"
                v-bind:style="contentStyleObject">
                <slot/>
              </div>
            </div>
          </div>
        </div>
        <div class="flex"></div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

// const CONTENT_MAX_WIDTH = 640
// const CONTENT_MIN_WIDTH = 300

export default {

  data () {
    return {
      contentStyleObject: {
        width: 'auto',
        vibility: 'visible'
      },
      repository: {}
    }
  },

  props: {
    paddingTop: {
      type: String,
      default: ''
    },
    paddingBottom: {
      type: String,
      default: ''
    }
  },

  computed: {
    paddingWrapperStyleObject () {
      let value = {}
      if (this.paddingTop) {
        value['padding-top'] = this.paddingTop
      }
      if (this.paddingBottom) {
        value['padding-bottom'] = this.paddingBottom
      }
      return value
    }
  },

  methods: {
    _handleBeforeResize () {
      this.contentStyleObject.width = 'auto'
      this.contentStyleObject.visibility = 'hidden'
    },
    _handleResize (details) {
      this.repository[details.cid] = {
        width: details.width,
        height: details.height
      }
      let width = 0
      _.forEach(this.repository, function (item) {
        if (item.width > width) {
          width = item.width
        }
      })
      this.$nextTick(function () {
        // if (width > CONTENT_MAX_WIDTH) {
        //   width = CONTENT_MAX_WIDTH
        // }
        // if (width < CONTENT_MIN_WIDTH) {
        //   width = CONTENT_MIN_WIDTH
        // }
        this.contentStyleObject.width = width + 'px'
        this.contentStyleObject.visibility = 'visible'
      })
    }
  },

  mounted () {
    this.$on('beforeResize', this._handleBeforeResize)
    this.$on('resize', this._handleResize)
  },

  beforeDestroy () {
    console.log('canvas.beforeDestroy')
    this.$off('beforeResize', this._handleBeforeResize)
    this.$off('resize', this._handleResize)
  }

}
</script>
