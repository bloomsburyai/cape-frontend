<style scoped lang="scss">
  @import "../../../../scss/cape";

  .cape-dashboard-inspector-components-dropdown-trigger {
    @include layout-fit();
    @include layout-vertical();
    @include layout-center-center();

    .wrapper {
      @include layout-horizontal();

      .panel {
        @include layout-vertical();

        .canvas {
          padding: 2rem;
          background-color: $blue-grey-50;
        }

        .toolbar {
          @include layout-horizontal();
          @include layout-start();
          padding: 1rem;
          background-color: $blue-grey-200;
        }
      }
    }
  }
</style>

<template>
  <div class="cape-dashboard-inspector-components-dropdown-trigger">

    <div class="wrapper">

      <div class="panel">
        <div class="canvas">
          <cape-dashboard-dropdown-label-trigger
            label="All"/>
        </div>
        <div class="toolbar"></div>
      </div>

      <div class="panel">
        <div class="canvas">
          <cape-dashboard-dropdown-label-trigger
            label="Lorem ipsum dolor"/>
        </div>
        <div class="toolbar"></div>
      </div>

    </div>

  </div>
</template>

<script>
import DropdownLabelTrigger from '@/components/dropdown/trigger/Label'

export default {

  components: {
    'cape-dashboard-dropdown-label-trigger': DropdownLabelTrigger
  }

}
</script>
