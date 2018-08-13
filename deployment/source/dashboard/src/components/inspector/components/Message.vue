<style scoped lang="scss">
  @import "../../../scss/cape";

  .cape-dashboard-inspector-components-message {
    @include layout-fit();
    width: 100%;
    height: 100%;
  }

  .cape-dashboard-inspector-components-message .wrapper {
    @include layout-vertical();
    @include layout-center();
    width: 40rem;
    height: 100%;
    margin: 0 auto;
  }

  .cape-dashboard-inspector-components-message .flex {
    @include layout-flex();
  }

  .cape-dashboard-inspector-components-message .content {
    width: 100%;
  }

  .cape-dashboard-inspector-components-message .canvas {
    padding: 2rem;
    background-color: $blue-grey-50;
  }

  .cape-dashboard-inspector-components-message .gutter {
    width: 100%;
    height: 1rem;
  }

  .cape-dashboard-inspector-components-message .panel {
    @include layout-horizontal();
    @include layout-start();
    padding: 1rem;
    background-color: $blue-grey-200;
  }

  .cape-dashboard-inspector-components-message .panel > * {
    @include layout-flex();
  }

  .cape-dashboard-inspector-components-message .panel h6 {
    @include typography-body-2();
  }
</style>

<template>
  <div class="cape-dashboard-inspector-components-message">
    <div class="wrapper">
      <div class="flex"></div>
      <div class="content">
        <div class="canvas">
          <cape-dashboard-message
            type="user"
            v-bind:value="messageValueLong"
            v-bind:showDashedStroke="messageShowDashedStroke"/>
          <div class="gutter"></div>
          <cape-dashboard-message
            type="machine"
            v-bind:value="messageValueShort"
            v-bind:showDashedStroke="messageShowDashedStroke"/>
        </div>
        <div class="panel">
          <div>
            <h6>Show dashed stroke</h6>
            <input
              type="checkbox"
              v-model="messageShowDashedStroke">
          </div>
        </div>
      </div>
      <div class="flex"></div>
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message'

export default {

  data () {
    return {
      messageValueLong: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi sed imperdiet tellus. Duis consequat porta lorem quis rutrum. Curabitur sit amet ligula suscipit, tempus magna sit amet, euismod velit. Cras vitae interdum turpis, id cursus turpis. Proin eleifend nisi et congue lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      messageValueShort: 'Quisque tempor magna',
      messageShowDashedStroke: false
    }
  },

  components: {
    'cape-dashboard-message': Message
  }

}
</script>
