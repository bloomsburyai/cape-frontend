<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-layout-header-content {
    display: block;
    position: relative;
    z-index: 0;
  }

  .cape-dashboard-layout-header-content > .wrapper > .header {
    @include layout-fixed-top();
    z-index: 1;
  }

  .cape-dashboard-layout-header-content.has-scrolling-region {
    height: 100%;
  }

  .cape-dashboard-layout-header-content.has-scrolling-region > .wrapper > .header {
    position: absolute;
  }

  .cape-dashboard-layout-header-content.has-scrolling-region > .wrapper > .content {
    @include layout-fit();
    @include layout-scroll-vertical();
  }

  .cape-dashboard-layout-header-content.fullbleed {
    @include layout-vertical();
    @include layout-fit();
  }

  .cape-dashboard-layout-header-content.fullbleed > .wrapper,
  .cape-dashboard-layout-header-content.fullbleed > .wrapper > .content {
    @include layout-vertical();
    @include layout-flex();
  }

  .cape-dashboard-layout-header-content > .wrapper > .content {
    position: relative;
    z-index: 0;
  }
</style>

<template>
  <div class="cape-dashboard-layout-header-content"
    v-bind:class="componentClassObject">
    <div class="wrapper">
      <div class="header"
        ref="header">
        <slot name="header"/>
      </div>
      <div class="content"
        ref="content"
        v-bind:style="contentStyleObject">
        <slot name="content"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      componentClassObject: {
        'has-scrolling-region': this.hasScrollingRegion,
        'fullbleed': this.fullbleed
      },
      contentStyleObject: {}
    }
  },

  props: {
    hasScrollingRegion: {
      type: Boolean,
      default: false
    },
    fullbleed: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    update () {
      this._updateLayoutStates()
    },
    _updateLayoutStates () {
      const headerHeight = this.$refs.header.offsetHeight
      this.$delete(this.contentStyleObject, 'margin-top')
      this.$delete(this.contentStyleObject, 'padding-top')
      if (this.hasScrollingRegion) {
        this.$set(this.contentStyleObject, 'margin-top', headerHeight + 'px')
      } else {
        this.$set(this.contentStyleObject, 'padding-top', headerHeight + 'px')
      }
    }
  },

  mounted () {
    this._updateLayoutStates()
  }

}
</script>
