<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-layout-drawer-content {
    display: block;
    position: relative;
    z-index: 0;
  }

  .cape-dashboard-layout-drawer-content .drawer {
    z-index: 1;
  }

  .cape-dashboard-layout-drawer-content.fullbleed {
    @include layout-fit();
  }

  .cape-dashboard-layout-drawer-content .content {
    position: relative;
    z-index: 0;
    height: 100%;
  }

  //.cape-dashboard-layout-drawer-content .content {
  //  margin-left: 15rem;
  //}

  /* - */

  .cape-dashboard-layout-drawer-content .drawer {
    position: absolute;
    top: 0;
    bottom: 0;
  //  left: 0;
  }

  /* Transitions */

  .cape-dashboard-layout-drawer-content .drawer {
    transition: left 0.15s ease-in-out;
  }

  .cape-dashboard-layout-drawer-content .content {
    transition: margin-left 0.15s ease-in-out;
  }
</style>

<template>
  <div class="cape-dashboard-layout-drawer-content"
    v-bind:class="componentClassObject">
    <div class="drawer"
      ref="drawer"
      v-bind:style="drawerStyleObject">
      <slot name="drawer"/>
    </div>
    <div class="content"
      ref="content"
      v-bind:style="contentStyleObject">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      componentClassObject: {
        'fullbleed': this.fullbleed
      },
      drawerStyleObject: {},
      contentStyleObject: {}
    }
  },

  props: {
    fullbleed: {
      type: Boolean,
      default: false
    },
    opened: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    opened (fresh, stale) {
      this._updateLayoutStates()
    }
  },

  methods: {
    _updateLayoutStates () {
      const drawerWidth = this.$refs.drawer.offsetWidth
      this.$delete(this.drawerStyleObject, 'left')
      this.$delete(this.contentStyleObject, 'margin-left')
      if (this.opened) {
        this.$set(this.drawerStyleObject, 'left', 0)
        this.$set(this.contentStyleObject, 'margin-left', drawerWidth + 'px')
      } else {
        this.$set(this.drawerStyleObject, 'left', -drawerWidth + 'px')
        this.$set(this.contentStyleObject, 'margin-left', 0)
      }
    }
  },

  mounted () {
    this._updateLayoutStates()
  }

}
</script>
