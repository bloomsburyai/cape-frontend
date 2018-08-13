<style scoped lang="scss">
  @import "../../scss/component";

  .cape-viewer-annotation-panel {
    @include layout-vertical();

    // Header

    .header {
      @include layout-horizontal();
      @include layout-center();
      @include layout-justified();
      min-height: 3rem;
      padding: 0 0.6875rem 0 1.5rem;
      box-shadow: $box-shadow-1;

      h6 {
        @include typography-body-2();
        color: $blue-grey-600;
      }

      .cape-viewer-icon-button {
        color: $grey-400;

        &:hover {
          color: $grey-600;
          background: $grey-100;
        }
      }
    }

    // Body

    .body {
      @include layout-scroll-vertical();
      padding: 1.5rem;
      // @include layout-flex();
      // @include layout-vertical();

      label {
        @include typography-body-1();
        color: $blue-grey-400;
        margin: 0 0 0.75rem 0;
      }

      .cape-viewer-autogrow-input {
        display: block;
        @include typography-body-1();
        padding: 7px;
        border-radius: 2px;
        border: 1px solid $grey-300;
        color: $blue-grey-400;
      }
    }

    // Footer

    .footer {
      border-top: 1px solid $grey-100;
      padding: 1.5rem;

      .cape-viewer-progress-label-button {
        background: $green-500;
        color: $white;

        &:hover {
          background: $green-700;
        }
      }
    }

  }
</style>

<template>
  <div class="cape-viewer-annotation-panel">

    <!--

      Header

    -->

    <div class="header">
      <h6>Annotation settings</h6>
      <cape-viewer-icon-button
        icon="fa fa-times"
        v-bind:iconSize="0.875"
        v-bind:size="2.5"
        v-on:click.native="_handleCloseClick"
        />
    </div>

    <!--

      End header

    -->

    <!--

      Body

    -->

    <div class="body">
      <div class="form-group">
        <label>Question</label>
        <cape-viewer-autogrow-input
          v-model="model.question"/>
      </div>
      <div class="form-group">
        <label>Answer</label>
        <cape-viewer-autogrow-input
          v-model="model.answer"/>
      </div>
    </div>

    <!--

      End body

    -->

    <!--

      Footer

    -->

    <div class="footer">
      <cape-viewer-progress-label-button
        label="Save"
        v-bind:block="true"
        v-bind:progress="false"
        v-on:click.native="_handleSaveClick"
        />
    </div>

    <!--

      End footer

    -->

  </div>
</template>

<script>
import client from '@/client'
import store from '@/components/store'

import IconButton from '@/components/button/Icon'
import ProgressLabelButton from '@/components/button/ProgressLabel'
import AutogrowInput from '@/components/AutogrowInput'

export default {

  data () {
    return {
      model: store.panel.annotation.model
    }
  },

  components: {
    'cape-viewer-icon-button': IconButton,
    'cape-viewer-progress-label-button': ProgressLabelButton,
    'cape-viewer-autogrow-input': AutogrowInput
  },

  methods: {

    /**
     * General
     */

    // _handleCloseClick
    _handleCloseClick () {
      store.panel.annotation.opened = false
    },

    // _handleSaveClick
    _handleSaveClick () {
      const model = this.model
      client.annotation.create({
        documentID: 'e453211f-f3b5-12b4-a59d-1143a7fb6a78',
        question: model.question,
        answer: model.answer,
        page: 1,
        boundingBoxes: [{
          x1: model.x,
          y1: model.y,
          x2: model.x + model.w,
          y2: model.y + model.h
        }],
        metadata: {
          x: model.x,
          y: model.y,
          w: model.w,
          h: model.h
        }
      }, (error, data) => {
        if (error) {}
      })
    }

  }

}
</script>
