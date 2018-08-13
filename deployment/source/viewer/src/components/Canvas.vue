<style scoped lang="scss">
  @import "../scss/component";

  .cape-viewer-canvas {

  }
</style>

<template>
  <div class="cape-viewer-canvas">
    <template v-for="model in collection">
      <cape-viewer-annotation-shape-rectangle
        v-bind:key="model.key"
        v-bind:initialModel="model"/>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
import AnnotationShapeRectangle from '@/components/annotation/shape/Rectangle'

export default {

  data () {
    return {
      collection: []
    }
  },

  components: {
    'cape-viewer-annotation-shape-rectangle': AnnotationShapeRectangle
  },

  methods: {

    /**
     * General
     */

    // newKey
    newKey () {
      return this.collection.length
    },

    // add
    add (model) {
      model.key = this.newKey()
      this.collection.push(model)
      return model
    },

    // getByKey
    getByKey (value) {
      return _.find(this.collection, {key: value})
    }
  }

}
</script>
