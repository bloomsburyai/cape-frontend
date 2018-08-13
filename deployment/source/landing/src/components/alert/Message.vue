<style scoped lang="scss">
  @import "../../scss/component";

  $icon-size: 2.5;
  $label-line-height: $body-1-line-height;
  $label-padding-vertical: ($icon-size - $label-line-height) / 2;

  .cape-landing-alert-message {
    @include layout-horizontal();
    padding: 0.25rem 0.25rem 0.25rem 0.875rem;

    &.inform {
      background-color: $blue-500;
      color: $white;

      .cape-landing-icon-button {
        color: $blue-800;

        &:hover {
          color: $blue-900;
          background-color: $blue-600;
        }
      }
    }

    &.error {
      background-color: $red-500;
      color: $white;

      .cape-landing-icon-button {
        color: $red-800;

        &:hover {
          color: $red-900;
          background-color: $red-600;
        }
      }
    }

    &.success {
      background-color: $green-500;
      color: $white;

      .cape-landing-icon-button {
        color: $green-800;

        &:hover {
          color: $green-900;
          background-color: $green-600;
        }
      }
    }

    & .content-section {
      @include layout-flex();
      margin: 0 1rem 0 0;

      .label {
        @include typography-body-1();
        padding: $label-padding-vertical 0;
      }
    }
  }
</style>

<template>
  <div class="cape-landing-alert-message"
    v-bind:class="componentClassObject">
    <div class="content-section">
      <div class="label">
        {{ label }}
      </div>
    </div>
    <div class="action-section">
      <cape-landing-icon-button
        icon="fa-times"
        v-bind:iconSize="0.875"
        v-bind:size="2.5"
        v-on:click.native="$emit('close')"/>
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/button/Icon'

const TYPE_INFORM = 'typeInform'
const TYPE_ERROR = 'typeError'
const TYPE_SUCCESS = 'typeSuccess'

export default {

  TYPE_INFORM: TYPE_INFORM,
  TYPE_ERROR: TYPE_ERROR,
  TYPE_SUCCESS: TYPE_SUCCESS,

  data () {
    return {
      type: '',
      label: ''
    }
  },

  components: {
    'cape-landing-icon-button': IconButton
  },

  computed: {
    componentClassObject () {
      return {
        'inform': (this.type === TYPE_INFORM),
        'error': (this.type === TYPE_ERROR),
        'success': (this.type === TYPE_SUCCESS)
      }
    }
  }

}
</script>
