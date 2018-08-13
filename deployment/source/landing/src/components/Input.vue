<style scoped lang="scss">
  @import "../scss/component";

  .cape-landing-input {
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

      .cape-landing-icon-button {
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
  <div class="cape-landing-input">
    <div class="wrapper">
      <input
        v-model="inputValue"
        v-bind:placeholder="placeholder"
        v-on:keyup.enter="_handleInputEnterKey"
        type="text"
        class="form-control"/>
      <cape-landing-icon-button
        v-bind:icon="buttonIcon"
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
    },
    progress: {
      type: Boolean
    }
  },

  watch: {
    value (fresh, stale) {
      this.inputValue = fresh
    }
  },

  components: {
    'cape-landing-icon-button': IconButton
  },

  computed: {
    buttonIcon () {
      let value = 'fa fa-arrow-circle-right'
      if (this.progress) {
        value = 'fa fa-spin fa-circle-o-notch'
      }
      return value
    }
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
