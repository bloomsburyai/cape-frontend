<style scoped lang="scss">
  @import "../../../scss/cape";

  .cape-dashboard-inspector-components-message {
    @include layout-fit();
    width: 100%;
    height: 100%;
  }

  .wrapper {
    @include layout-vertical();
    @include layout-center();
    width: 60rem;
    height: 100%;
    margin: 0 auto;
  }

  .flex {
    @include layout-flex();
  }

  .content {
    @include layout-horizontal();
    width: 100%;
  }

  .content-item {
    @include layout-flex();
    @include layout-vertical();
    padding: 0 1rem;
  }

  .canvas {
    @include layout-horizontal();
    @include layout-center-center();
    // @include layout-flex();
    padding: 2rem;
    text-align: center;
    background-color: $blue-grey-50;
  }

  .canvas > * {
    margin: 0 2rem;
  }

  .gutter {
    width: 100%;
    height: 1rem;
  }

  .panel {
    @include layout-vertical();
    @include layout-start();
    padding: 1rem;
    background-color: $blue-grey-200;
  }

  .panel h6 {
    @include typography-body-2();
  }
</style>

<template>
  <div class="cape-dashboard-inspector-components-message">
    <div class="wrapper">
      <div class="flex"></div>
      <div class="content">

        <div class="content-item">
          <div class="canvas">
            <cape-dashboard-progress-circle
              v-bind:size="1.5"
              v-bind:strokeColor="leftColor"
              v-bind:active="active"/>
            <cape-dashboard-progress-circle
              v-bind:strokeColor="middleColor"
              v-bind:active="active"/>
            <cape-dashboard-progress-circle
              v-bind:size="1"
              v-bind:lineWidth="0.125"
              v-bind:strokeColor="rightColor"
              v-bind:active="active"/>
          </div>
          <div class="panel">
            <h6>Progress label button</h6>
            <label>
              <input
                type="checkbox"
                v-model="active">
              Active
            </label>
          </div>
        </div>

      </div>
      <div class="flex"></div>
    </div>
  </div>
</template>

<script>
import * as color from '@/color'
import ProgressCircle from '@/components/progress/Circle'

export default {

  data () {
    return {
      active: false,
      leftColor: color.DEEP_PURPLE_500,
      middleColor: color.BLUE_500,
      rightColor: color.PINK_500
    }
  },

  components: {
    'cape-dashboard-progress-circle': ProgressCircle
  }

}
</script>
