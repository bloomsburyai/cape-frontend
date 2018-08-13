<style scoped lang="scss">
  @import "../../scss/cape";

  $icon-size: 2.5;
  $label-line-height: $body-1-line-height;
  $label-padding-vertical: ($icon-size - $label-line-height) / 2;

  .cape-dashboard-terms-alert {
    @include layout-horizontal();
    padding: 0.25rem 0.25rem 0.25rem 1.5rem;

    background-color: $blue-grey-100;
    color: $blue-grey-400;

    // Content

    .content-section {
      @include layout-flex();

      .label {
        @include typography-body-1();
        padding: $label-padding-vertical 0;

        a {
          color: $blue-500;
        }
      }
    }

    // Action

    .action-section {
      .cape-dashboard-icon-button {
        color: $blue-grey-400;

        &:hover {
          color: $blue-grey-500;
          background-color: $blue-grey-200;
        }
      }
    }
  }
</style>

<template>
  <div class="cape-dashboard-terms-alert">
    <div class="content-section">
      <div class="label">
        By using this service you accept our <a href="#" v-on:click="_handleLinkClick">terms and conditions</a>.
      </div>
    </div>
    <div class="action-section">
      <cape-dashboard-icon-button
        icon="fa-times"
        v-bind:iconSize="0.875"
        v-bind:size="2.5"
        v-on:click.native="_handleCloseClick"/>
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/button/Icon'

export default {

  components: {
    'cape-dashboard-icon-button': IconButton
  },

  methods: {
    // _handleLinkClick is an event handler
    // triggered when a user clicks the "terms"
    // link
    _handleLinkClick () {
      this.$emit('open')
    },

    // _handleCloseClick is an event handler
    // triggered when a user clicks the close
    // button
    _handleCloseClick () {
      this.$emit('close')
    }
  }

}
</script>
