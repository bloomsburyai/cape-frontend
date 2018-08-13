<style scoped lang="scss">
  @import "../scss/component";

  .cape-viewer-toolbar {
    @include layout-vertical();
    @include layout-center();
    position: relative;
    width: 4rem;
    background-color: $white;
    box-shadow: $box-shadow-1;

    .logo {
      @include layout-vertical();
      @include layout-center-center();
      width: 100%;
      background-color: $blue-800;
      padding: 1em 0;

      .symbol {
        display: inline-block;
        width: 36px;
        height: 23px;
        background: url("../assets/symbol.svg") no-repeat top left;
        background-size: contain;
      }
    }

    .cape-viewer-icon-button {
      margin: 0.5rem;
      color: $grey-400;

      &:hover,
      &:focus,
      &.active {
        outline: none;
        box-shadow: none;
        background-color: $grey-200;
        color: $grey-600;
      }
    }
  }
</style>

<template>
  <div class="cape-viewer-toolbar">
    <div class="logo">
      <span class="symbol"></span>
    </div>
    <div class="list">
      <cape-viewer-icon-button
        icon="fa fa-mouse-pointer"
        v-bind:class="{active: (store.tool === store.TOOL_SELECTION)}"
        v-bind:iconSize="0.875"
        v-bind:size="3"
        v-on:click.native="store.tool = store.TOOL_SELECTION"
        />
      <cape-viewer-icon-button
        icon="fa fa-square"
        v-bind:class="{active: (store.tool === store.TOOL_RECTANGLE)}"
        v-bind:iconSize="0.875"
        v-bind:size="3"
        v-on:click.native="store.tool = store.TOOL_RECTANGLE"
        />
    </div>
  </div>
</template>

<script>
import store from '@/components/store'

import IconButton from '@/components/button/Icon'

export default {

  data () {
    return {
      store: store
    }
  },

  components: {
    'cape-viewer-icon-button': IconButton
  }

}
</script>
