<style scoped lang="scss">
  @import "../../../scss/cape";

  .cape-dashboard-inspector-components-bubble {
    @include layout-fit();
    width: 100%;
    height: 100%;
  }

  .cape-dashboard-inspector-components-bubble .wrapper {
    @include layout-vertical();
    @include layout-center();
    width: 40rem;
    height: 100%;
    margin: 0 auto;
  }

  .cape-dashboard-inspector-components-bubble .flex {
    @include layout-flex();
  }

  .cape-dashboard-inspector-components-bubble .content {
    width: 100%;
  }

  .cape-dashboard-inspector-components-bubble .canvas {
    padding: 2rem;
    background-color: $blue-grey-50;
  }

  .cape-dashboard-inspector-components-bubble .panel {
    @include layout-horizontal();
    @include layout-start();
    padding: 1rem;
    background-color: $blue-grey-200;
  }

  .cape-dashboard-inspector-components-bubble .panel > * {
    @include layout-flex();
  }

  .cape-dashboard-inspector-components-bubble .panel h6 {
    @include typography-body-2();
  }
</style>

<template>
  <div class="cape-dashboard-inspector-components-bubble">
    <div class="wrapper">
      <div class="flex"></div>
      <div class="content">
        <div class="canvas">
          <cape-dashboard-bubble
            v-bind:value="bubbleValue"
            v-bind:showDashedStroke="bubbleShowDashedStroke"
            v-bind:progress="bubbleProgress"/>
        </div>
        <div class="panel">
          <div>
            <h6>Value</h6>
            <input
              type="text"
              v-model="bubbleValue">
          </div>
          <div>
            <h6>Show dashed stroke</h6>
            <input
              type="checkbox"
              v-model="bubbleShowDashedStroke">
          </div>
          <div>
            <h6>Progress</h6>
            <input
              type="checkbox"
              v-model="bubbleProgress">
          </div>

        </div>
      </div>
      <div class="flex"></div>
    </div>
  </div>
</template>

<script>
import Bubble from '@/components/Bubble'

export default {

  data () {
    return {
      bubbleValue: 'Class aptent taciti sociosqu ad litora torquent.',
      bubbleShowDashedStroke: false,
      bubbleProgress: false
    }
  },

  components: {
    'cape-dashboard-bubble': Bubble
  }

}
</script>
