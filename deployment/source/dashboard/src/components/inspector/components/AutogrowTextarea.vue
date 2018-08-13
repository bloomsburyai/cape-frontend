<style scoped lang="scss">
  @import "../../../scss/cape";

  .cape-dashboard-inspector-components-autogrow-textarea {
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
  <div class="cape-dashboard-inspector-components-autogrow-textarea">

    <div class="wrapper">

      <div class="panel">
        <div class="canvas">
          <cape-dashboard-autogrow-textarea
            v-bind:value="value"
            v-bind:highlightRanges="highlightRanges"/>
        </div>
        <div class="toolbar"></div>
      </div>

    </div>

  </div>
</template>

<script>
import AutogrowTextarea from '@/components/AutogrowTextarea'

export default {

  data () {
    let value = ''
    value += 'Praesent congue sapien leo, a porta purus suscipit et. Etiam blandit accumsan nulla nec aliquam. Aenean hendrerit fermentum diam eu interdum. Pellentesque pellentesque orci non aliquet commodo. Quisque molestie orci diam, id mollis justo venenatis sed. Vestibulum et sem ex. Phasellus rutrum libero in justo aliquam viverra. Fusce vel magna aliquam, ullamcorper odio nec, mollis turpis. Nulla egestas nisi vel arcu luctus volutpat. Donec porttitor velit quis suscipit tempus. Suspendisse quis risus sit amet velit lobortis pellentesque sed quis odio. Nam dapibus purus lorem, at efficitur nibh semper in. Sed nec vulputate dolor. Suspendisse vel ex et justo auctor porttitor.' + '\n\n'
    value += 'Curabitur rutrum nisl at aliquet auctor. Nam rutrum, sem eu pharetra egestas, arcu dolor tristique dolor, a pulvinar felis mi ac metus. Suspendisse id tellus quis dolor suscipit mattis. Nulla euismod justo sagittis diam fringilla semper. Donec condimentum diam id sem interdum semper. Nunc consequat tellus ac orci efficitur pharetra. Proin tincidunt eros pulvinar fringilla pharetra.'
    let highlightRanges = [
      {
        start: 50,
        length: 30
      },
      {
        start: 90,
        length: 90
      }
    ]
    return {
      value: value,
      highlightRanges: highlightRanges
    }
  },

  components: {
    'cape-dashboard-autogrow-textarea': AutogrowTextarea
  }

}
</script>
