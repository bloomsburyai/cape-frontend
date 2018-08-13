<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-search-layout {
    display: inline-block;
    @include layout-flex();
    overflow: hidden;

    .wrapper {
      @include layout-horizontal();
      @include layout-center();
      @include layout-end-justified();

      width: 100%;
    }

    .label {
      @include layout-flex();
      @include utility-text-truncate-single-line();
      @include typography-body-1();

      color: $blue-grey-200;
      text-align: right;
      margin: 0 0.5rem;
    }

    input {
      @include layout-flex();
      @include typography-body-1();

      border: 0;
      border-radius: 0;
      padding: 0.5rem 1rem;
      color: $blue-grey-600;

      // IE10 fix
      line-height: 2.5rem;
      height: 2.5rem;
      padding: 0 1rem;
      // remove "x" button
      &::-ms-clear {
        display: none;
      }
      // End IE10 fix

      &:disabled,
      &[readonly] {
        background-color: transparent;
      }
    }

    .cape-dashboard-icon-button {
      background-color: transparent;
      color: $grey-400;

      &.active,
      &:hover {
        background-color: $grey-100;
        color: $grey-600;
      }
    }
  }
</style>

<template>
  <div class="cape-dashboard-search-layout"
    v-bind:class="componentClassObject">
    <div class="wrapper">
      <template v-if="!opened && inputValue">
        <div class="label">{{inputValue}}</div>
      </template>
      <template v-if="opened">
        <input
          ref="input"
          v-model="inputValue"
          v-bind:placeholder="placeholder"
          v-bind:readonly="!opened"
          v-bind:disabled="!opened"
          v-on:keyup.enter="_handleInputEnterKey"
          type="text"
          class="form-control"
          />
      </template>
      <cape-dashboard-icon-button
        v-on:click.native="toggle"
        v-bind:class="iconButtonClassObject"
        v-bind:icon="iconClass"
        v-bind:iconSize="0.875"
        v-bind:size="2.5"
        />
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import IconButton from '@/components/button/Icon'

const STATE_CLOSED = 'stateClosed'
const STATE_OPENED = 'stateOpened'

export default {

  STATE_CLOSED: STATE_CLOSED,
  STATE_OPENED: STATE_OPENED,

  data () {
    return {
      STATE_CLOSED: STATE_CLOSED,
      STATE_OPENED: STATE_OPENED,
      state: STATE_CLOSED,
      inputValue: this.value
    }
  },

  props: {
    closeOnOutsideClick: {
      type: Boolean,
      default: true
    },
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

  computed: {
    opened () {
      return this.state === STATE_OPENED
    },
    componentClassObject () {
      return {
        active: this.opened
      }
    },
    iconButtonClassObject () {
      return {
        active: this.opened
      }
    },
    iconClass () {
      let value = 'fa '
      if (this.opened) {
        value += 'fa-times'
      } else {
        value += 'fa-search'
      }
      return value
    }
  },

  components: {
    'cape-dashboard-icon-button': IconButton
  },

  methods: {

    // Toggles the component state
    toggle () {
      if (this.opened) {
        this.close()
      } else {
        this.open()
      }
    },

    // Opens the component
    open () {
      this.state = STATE_OPENED
      $(document).on('click', this._handleDocumentClick)
      this.$emit('stateChange', this.opened)
      // let componets be drawn
      // the focus the input
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },

    // Closes the component
    close () {
      this.state = STATE_CLOSED
      $(document).off('click', this._handleDocumentClick)
      this.$emit('stateChange', this.opened)
    },

    // Event handler that is triggered
    // when the user clicks anywhere.
    // It is used to check if closing
    // should occur.
    _handleDocumentClick (e) {
      let inside = false
      if (e.target === this.$el || $(this.$el).has(e.target).length) {
        inside = true
      }
      if (!inside) {
        this.close()
      }
    },

    // Event handler that is triggered
    // when the user presses the "Enter"
    // key in the input field.
    _handleInputEnterKey () {
      this.$emit('input', this.inputValue)
      this.close()
    }
  },

  beforeDestroy () {
    // clean document handler
    $(document).off('click', this._handleDocumentClick)
  }

}
</script>
