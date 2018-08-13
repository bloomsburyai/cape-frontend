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
    @include layout-vertical();
    @include layout-center();
    // @include layout-flex();
    padding: 2rem;
    text-align: center;
    background-color: $blue-grey-50;
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

  // .panel > * {
  //   @include layout-flex();
  // }

  .panel h6 {
    @include typography-body-2();
  }

  // Icon button

  .cape-dashboard-icon-button {
    background-color: $blue-400;
    color: $blue-700;
    border-radius: 1.5rem;
  }

  .cape-dashboard-icon-button:hover {
    background-color: $blue-600;
    color: $blue-900;
  }

  // Label button

  .cape-dashboard-label-button.label-button-cancel {
    color: $blue-grey-200;
  }

  .cape-dashboard-label-button.label-button-cancel:hover {
    background-color: $blue-grey-100;
    color: $blue-grey-400;
  }

  .cape-dashboard-label-button.label-button-save {
    background-color: $green-500;
    color: $white;
  }

  .cape-dashboard-label-button.label-button-save:hover {
    background-color: $green-700;
    color: $white;
  }

  .cape-dashboard-label-button.label-button-delete {
    background-color: $red-500;
    color: $white;
  }

  .cape-dashboard-label-button.label-button-delete:hover {
    background-color: $red-700;
    color: $white;
  }

  // Progress label button

  .cape-dashboard-progress-label-button.label-button-cancel {
    color: $blue-grey-200;
  }

  .cape-dashboard-progress-label-button.label-button-cancel:hover {
    background-color: $blue-grey-100;
    color: $blue-grey-400;
  }

  .cape-dashboard-progress-label-button.label-button-save {
    background-color: $green-500;
    color: $white;
  }

  .cape-dashboard-progress-label-button.label-button-save:hover {
    background-color: $green-700;
    color: $white;
  }

  .cape-dashboard-progress-label-button.label-button-delete {
    background-color: $red-500;
    color: $white;
  }

  .cape-dashboard-progress-label-button.label-button-delete:hover {
    background-color: $red-700;
    color: $white;
  }

  // Icon label button

  .cape-dashboard-icon-label-button {}

  .cape-dashboard-icon-label-button:hover {
    background-color: $blue-grey-100;
  }


</style>

<template>
  <div class="cape-dashboard-inspector-components-message">
    <div class="wrapper">
      <div class="flex"></div>
      <div class="content">

        <div class="content-item">
          <div class="canvas">
            <cape-dashboard-icon-button
              icon="fa-bell"
              v-bind:iconSize="1.5"
              v-bind:size="3"/>
          </div>
          <div class="panel">
            <h6>Icon button</h6>
          </div>
        </div>

        <div class="content-item">
          <div class="canvas">
            <cape-dashboard-label-button
              class="label-button-cancel"
              label="Cancel"/>
            <div class="gutter"></div>
            <cape-dashboard-label-button
              class="label-button-save"
              label="Save"/>
            <div class="gutter"></div>
            <cape-dashboard-label-button
              class="label-button-delete"
              label="Delete"
              v-bind:block="true"/>
          </div>
          <div class="panel">
            <h6>Label button</h6>
          </div>
        </div>

        <div class="content-item">
          <div class="canvas">
            <cape-dashboard-progress-label-button
              class="label-button-cancel"
              label="Cancel"
              v-bind:progress="progress"/>
            <div class="gutter"></div>
            <cape-dashboard-progress-label-button
              class="label-button-save"
              label="Save"
              v-bind:progress="progress"/>
            <div class="gutter"></div>
            <cape-dashboard-progress-label-button
              class="label-button-delete"
              label="Delete"
              v-bind:block="true"
              v-bind:progress="progress"/>
          </div>
          <div class="panel">
            <h6>Progress label button</h6>
            <label>
              <input
                type="checkbox"
                v-model="progress">
              Progress {{progress}}
            </label>
          </div>
        </div>

        <div class="content-item">
          <div class="canvas">
            <cape-dashboard-icon-label-button
              class="label-button-new"
              icon="fa-plus-circle"
              v-bind:iconColor="color.BLUE_500"
              v-bind:labelColor="color.BLUE_GREY_600"
              label="New"/>
            <div class="gutter"></div>
            <cape-dashboard-icon-label-button
              class="label-button-new"
              icon="fa-plus-circle"
              label="New"
              v-bind:block="true"/>
          </div>
          <div class="panel">
            <h6>Label button</h6>
          </div>
        </div>

      </div>
      <div class="flex"></div>
    </div>
  </div>
</template>

<script>
import * as color from '@/color'
import IconButton from '@/components/button/Icon'
import LabelButton from '@/components/button/Label'
import ProgressLabelButton from '@/components/button/ProgressLabel'
import IconLabelButton from '@/components/button/IconLabel'

export default {

  data () {
    return {
      progress: false,
      color: color
    }
  },

  components: {
    'cape-dashboard-icon-button': IconButton,
    'cape-dashboard-label-button': LabelButton,
    'cape-dashboard-progress-label-button': ProgressLabelButton,
    'cape-dashboard-icon-label-button': IconLabelButton
  }

}
</script>
