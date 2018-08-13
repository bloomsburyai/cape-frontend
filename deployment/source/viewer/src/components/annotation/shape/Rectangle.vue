<style scoped lang="scss">
  @import "../../../scss/component";

  .cape-viewer-annotation-shape-rectangle {
    background: $cyan-200;
    border: 1px solid $cyan-500;
    opacity: 0.5;
  }
</style>

<template>
  <div class="cape-viewer-annotation-shape-rectangle"
    v-bind:style="componentStyleObject">
  </div>
</template>

<script>
import Shape from '@/components/Shape'

export default Shape.extend({

  data () {
    return {
      model: this.initialModel
    }
  },

  props: {
    initialModel: {
      type: Object,
      default: function () {
        return {
          x: 0,
          y: 0,
          w: 0,
          h: 0
        }
      }
    }
  },

  watch: {
    initialModel (fresh) {
      this.model = fresh
    }
  },

  computed: {
    componentStyleObject () {
      return {
        position: 'absolute',
        top: this.model.y + 'px',
        left: this.model.x + 'px',
        width: this.model.w + 'px',
        height: this.model.h + 'px'
      }
    }
  }

})
</script>
