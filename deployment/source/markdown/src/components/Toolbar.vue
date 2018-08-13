<style scoped lang="scss">
  @import "../scss/component";

  .cape-markdown-toolbar {
    @include layout-horizontal();
    @include layout-center();
    position: relative;
    height: 3rem;
    background-color: $white;
    box-shadow: $box-shadow-1;

    // Logo

    .logo {
      @include layout-vertical();
      @include layout-center-center();
      background-color: $blue-800;
      padding: 0 1rem;
      height: 100%;

      .symbol {
        display: inline-block;
        width: 36px;
        height: 23px;
        background: url("../assets/symbol.svg") no-repeat top left;
        background-size: contain;
      }
    }

    // Gutter

    .gutter {
      @include layout-flex();
    }

    // List

    .list {
      @include layout-horizontal();
      @include layout-center();
      @include layout-flex();
      padding: 0.25rem;

      .cape-markdown-icon-button {
        color: $grey-400;

        &:focus,
        &:hover,
        &.active {
          outline: none;
          box-shadow: none;
        }

        &:hover {
          background: $grey-100;
          color: $grey-600;
        }

        &.active {
          background: $grey-200;
          color: $grey-600;
        }
      }

    }
  }
</style>

<template>
  <div class="cape-markdown-toolbar">
    <div class="logo">
      <span class="symbol"></span>
    </div>
    <div class="list">
      <cape-markdown-icon-button
        icon="fa fa-i-cursor"
        v-bind:class="{active: (store.tool === store.TOOL_SELECTION)}"
        v-bind:iconSize="0.875"
        v-bind:size="2.5"
        v-on:click.native="_handleToolClick(store.TOOL_SELECTION)"
        />
    </div>
    <div>{{ store.tool }}</div>
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
    'cape-markdown-icon-button': IconButton
  },

  methods: {

    /**
     * General
     */

    // _handleToolClick
    _handleToolClick (tool) {
      if (store.tool === tool) {
        store.tool = ''
      } else {
        store.tool = tool
      }
    }

  }

}
</script>
