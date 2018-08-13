<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-assistant-input {
    display: block;
    position: relative;
    z-index: 0;

    background-color: $white;
    box-shadow: $box-shadow-1-vertical-1;
    padding: 0 0.75rem 0 0;

    .wrapper {
      @include layout-horizontal();
      @include layout-center();
      @include layout-end-justified();

      input {
        @include typography-body-1();

        border: 0;
        border-radius: 0;
        color: $blue-grey-400;

        line-height: 3rem;
        height: 3rem;
        padding: 0 1.5rem;

        &::placeholder {
          color: $blue-grey-400;
          opacity: 1;
        }
      }

      .cape-dashboard-icon-button {
        background-color: transparent;
        color: $grey-400;

        &:hover {
          background-color: $grey-100;
          color: $grey-600;
        }
      }
    }
  }
</style>

<template>
  <div class="cape-dashboard-assistant-input">
    <div class="wrapper">
      <input
        v-model="inputValue"
        v-bind:placeholder="placeholder"
        v-on:keyup.enter="_handleInputEnterKey"
        type="text"
        class="form-control"/>
      <cape-dashboard-icon-button
        icon="fa fa-arrow-circle-right"
        v-bind:iconSize="0.875"
        v-bind:size="2.5"
        v-on:click.native="_handleButtonClick"
        />
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/button/Icon'

export default {

  data () {
    return {
      inputValue: this.value
    }
  },

  props: {
    placeholder: {
      type: String
    },
    value: {
      type: String
    }
  },

  watch: {
    value (fresh, stale) {
      this.inputValue = fresh
    }
  },

  components: {
    'cape-dashboard-icon-button': IconButton
  },

  methods: {
    // Event handler that is triggered
    // when the user presses the "Enter"
    // key in the input field.
    _handleInputEnterKey () {
      this.$emit('input', this.inputValue)
    },

    // _handleButtonClick is an event handler that is
    // triggered when the user presses the button.
    _handleButtonClick () {
      this.$emit('input', this.inputValue)
    }
  }

}
</script>
