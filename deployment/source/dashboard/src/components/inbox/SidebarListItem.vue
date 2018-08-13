<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-inbox-sidebar-list-item {
    @include layout-horizontal();
    @include layout-center();
    position: relative;
    @include utility-selection-prevent();
    @include utility-cursor-pointer();
    background: transparent;
    height: 4.5rem;
  }

  .cape-dashboard-inbox-sidebar-list-item:hover,
  .cape-dashboard-inbox-sidebar-list-item.active {
    background-color: $grey-100;
  }

  // Icon & status

  .icon-section {
    position: relative;
    margin: 0 1rem;
  }

  .icon {
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 1.25rem;
    text-align: center;
    background-color: $blue-grey-100;
  }

  .icon .fa {
    font-size: 0.875rem;
    color: $blue-grey-500;
  }

  .status {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.875rem;
    line-height: 0.875rem;
  }

  .status .fill {
    position: absolute;
    top: 0.125rem;
    right: 0.125rem;
    bottom: 0.125rem;
    left: 0.125rem;
    z-index: 0;
    background-color: $white;
    border-radius: 0.875rem;
  }

  .status .fa {
    position: relative;
    z-index: 1;
  }

  .status-success {
    color: $green-500;
  }

  .status-fail {
    color: $red-500;
  }

  // Body

  .body-section {
    @include layout-flex();
    @include layout-horizontal();
    @include layout-center();
    position: relative;
    width: 100%;
    height: 100%;
  }

  .body-section .separator {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 0.0625rem;
    background-color: $grey-100;
  }

  // Content

  .content-section {
    position: relative;
    @include layout-flex();
    height: 100%;
    overflow: hidden;
  }

  .content-section .content-wrapper {
    @include layout-fit();
    @include layout-vertical();
    @include layout-center-justified();
    overflow: hidden;
  }

  .content-section .content {
    margin: 0 1rem 0 0;
  }

  .content-section .content .question {
    @include utility-text-truncate-single-line();
    width: 100%;
  }

  .content-section .content .question-read {
    @include typography-body-1();
    color: $blue-grey-400;
  }

  .content-section .content .question-unread {
    @include typography-body-2();
    color: $blue-grey-600;
  }

  .content-section .content .created {
    @include typography-caption();
    color: $blue-grey-200;
  }
</style>

<template>
  <div class="cape-dashboard-inbox-sidebar-list-item"
    v-bind:class="componentClassObject"
    v-on:click="_handleClick">

    <div class="icon-section">
      <div class="icon">
        <i class="fa fa-user" aria-hidden="true"></i>
      </div>
      <span class="status"
        v-bind:class="statusClassObject">
        <span class="fill"></span>
        <i v-bind:class="statusIconClass"
          aria-hidden="true"></i>
      </span>
    </div>

    <div class="body-section">
      <div class="content-section">
        <div class="content-wrapper">
          <div class="content">
            <h6
              class="question"
              v-bind:class="questionClassObject">
              {{ question }}
            </h6>
            <small class="created">{{ createdLabel }}</small>
          </div>
        </div>
      </div>
      <div class="separator"></div>
    </div>

  </div>
</template>

<script>
import moment from 'moment'

export default {

  data () {
    return {
      componentClassObject: {
        active: false
      }
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
    created: {
      type: Number,
      default: 0
    },
    answered: {
      type: Boolean,
      default: false
    },
    read: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    statusClassObject () {
      return {
        'status-success': this.answered,
        'status-fail': !this.answered
      }
    },
    statusIconClass () {
      let value = 'fa '
      if (this.answered) {
        value += 'fa-check-circle'
      } else {
        value += 'fa-exclamation-circle'
      }
      return value
    },
    questionClassObject () {
      return {
        'question-read': this.read,
        'question-unread': !this.read
      }
    },
    createdLabel () {
      let value = ''
      value += moment.unix(this.created).format('MMM DD, YYYY')
      value += ' at '
      value += moment.unix(this.created).format('hh:mm A')
      return value
    },
    selected: {
      get () {
        return this.componentClassObject.active
      },
      set (value) {
        this.componentClassObject.active = value
      }
    }
  },

  methods: {
    _handleClick (e) {
      this.$emit('select', this)
    }
  }

}
</script>
