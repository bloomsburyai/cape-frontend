<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-inbox-viewport-panel-list-item {
    display: block;
    position: relative;

    // Header

    .header {
      position: relative;
      @include layout-horizontal()
      @include layout-center()
      @include utility-cursor-pointer();
      @include utility-selection-prevent();
      height: 3rem;
      background: $white;
      padding: 0 0.75rem;
      border-bottom: 1px solid $grey-100;
    }

    &.expanded .header {
      border-bottom: 1px solid transparent;
    }

    // Header children

    .header > * {
      padding: 0 0.75rem;
    }

    .header {

      // Header select

      .select {

        .cape-dashboard-icon-button {
          background-color: $blue-grey-100;
          color: $white;
          border-radius: 0.75rem;
        }

        .cape-dashboard-icon-button.active {
          background-color: $green-500;
        }
      }

      // Header question & answer

      .question,
      .answer {
        @include layout-flex();
        @include utility-text-truncate-single-line();
        @include typography-body-1();
      }

      .question {
        color: $blue-grey-200;
      }

      .answer {
        color: $blue-grey-400;
      }

      // Header expand

      .expand {

        .cape-dashboard-icon-button {
          background-color: transparent;
          color: $grey-400;
          border-radius: 0.75rem;

          &:hover {
            background-color: $grey-100;
            color: $grey-600;
          }

        }

      }

    }

    // Header actions

    .header .actions {
      @include layout-fit();
      @include layout-horizontal();
      // reset the children padding
      padding: 0;

      .select {
        @include layout-flex();
        height: 100%;
      }

      .expand {
        width: 3 * 0.75rem + 1.5rem;
        height: 100%;
      }

    }

    // Content

    .content {
      display: none;
    }

    &.expanded .content {
      display: block;
    }

    .content .canvas {
      @include layout-vertical();
      @include layout-start();
      background-color: $blue-grey-50;
      padding: 1.5rem 1rem 1.5rem 1.5rem;
      box-shadow: $box-shadow-inset-1;

      .cape-dashboard-message {
        /* IE & Edge fix... */
        width: 100%;
      }

      .user-message {
        margin: 0 0 1rem 0;
      }

    }

  }
</style>

<template>
  <div class="cape-dashboard-inbox-viewport-panel-list-item"
    v-bind:class="componentClassObject">
    <div class="header">
      <span class="select">
        <cape-dashboard-icon-button
          v-bind:icon="selectIcon"
          v-bind:iconSize="0.875"
          v-bind:size="1.5"
          v-bind:class="selectIconButtonClassObject"
          />

      </span>
      <span class="question">{{ question }}</span>
      <span class="answer">{{ answer }}</span>
      <span class="expand">
        <cape-dashboard-icon-button
          v-bind:icon="expandIcon"
          v-bind:iconSize="0.875"
          v-bind:size="1.5"
          />
      </span>
      <div class="actions">
        <div class="select"
          v-on:click="toggleSelect"></div>
        <div class="expand"
          v-on:click="toggleExpand"></div>
      </div>
    </div>
    <div class="content">
      <div class="canvas">
          <cape-dashboard-message
            class="user-message"
            type="user"
            v-bind:value="question"
            v-bind:showDashedStroke="false"
            v-bind:readonly="true"/>
          <cape-dashboard-message
            calss="machine-message"
            type="machine"
            v-bind:value="answer"
            v-bind:showDashedStroke="false"
            v-bind:readonly="true"/>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/button/Icon'
import Message from '@/components/Message'

export default {

  data () {
    return {
      componentClassObject: {},
      selectIconButtonClassObject: {},
      contentClassObject: {},
      selected: false,
      selectIcon: '',
      expanded: false,
      expandIcon: ''
    }
  },

  props: {
    id: {
      type: String,
      default: ''
    },
    question: {
      type: String,
      default: ''
    },
    answer: {
      type: String,
      default: ''
    }
  },

  components: {
    'cape-dashboard-icon-button': IconButton,
    'cape-dashboard-message': Message
  },

  methods: {
    toggleExpand () {
      if (this.expanded) {
        this.close()
      } else {
        this.open()
      }
    },
    open (silent) {
      this.componentClassObject.expanded = true
      this.expanded = true
      this.expandIcon = 'fa-chevron-up'
      if (!silent) {
        this.$emit('open', this)
      }
    },
    close (silent) {
      this.componentClassObject.expanded = false
      this.expanded = false
      this.expandIcon = 'fa-chevron-down'
      if (!silent) {
        this.$emit('close')
      }
    },
    toggleSelect () {
      if (this.selected) {
        this.deselect()
      } else {
        this.select()
      }
    },
    select (silent) {
      this.selectIconButtonClassObject.active = true
      this.selected = true
      this.selectIcon = 'fa-check'
      if (!silent) {
        this.$emit('select', this)
      }
    },
    deselect (silent) {
      this.selectIconButtonClassObject.active = false
      this.selected = false
      this.selectIcon = ''
      if (!silent) {
        this.$emit('deselect')
      }
    }
  },

  mounted () {
    this.close(true)
    this.deselect(true)
  }

}
</script>
