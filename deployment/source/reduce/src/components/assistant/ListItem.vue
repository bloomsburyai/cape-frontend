<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-assistant-list-item {
    background: $white;

    // States

    &.state-normal {
      opacity: 1;
    }

    &.state-active {
      opacity: 1;
    }

    &.state-inactive {
      opacity: 0.5;
    }

    // Exact match

    &.exact-match {
      border-top: 0.25rem solid $green-500;
    }

    // Body

    .body {
      padding: 1rem 1.5rem;

      .row {
        margin: 0 0 1rem 0;

        &:last-child {
          margin: 0;
        }
      }

      dt {
        @include layout-vertical();
        @include typography-body-1();
        color: $blue-grey-200;
      }

      dd {
        @include layout-vertical();
        @include typography-body-1();
        color: $blue-grey-400;
      }

      .answer-wrapper {
        @include layout-scroll-vertical();
        max-height: (1.25rem * 7 + 2 / 16);
      }

      .cape-dashboard-autogrow-textarea {
        @include typography-body-1();
        color: $blue-grey-400;
        width: 100%;
      }
    }

    // Footer

    .footer {
      border-top: 1px solid $grey-100;
      @include typography-body-1();
      color: $blue-grey-200;
      padding: 0 1.5rem;

      .row > * {
        height: 3rem;
        line-height: 3rem;

        &:last-child {
          text-align: right;
        }
      }

      .truncate {
        display: inline-block;
        @include utility-text-truncate-single-line();
      }

      .cape-dashboard-icon-button {
        position: relative;
        left: 0.75rem;
        background-color: transparent;
        color: $grey-400;

        &:hover {
          background-color: $grey-100;
          color: $grey-600;
        }

        &.btn-deny {
          &.active {
            color: $red-500;

            &:hover {
              color: $red-700;
            }
          }
        }

        &.btn-approve {
          &.active {
            color: $green-500;

            &:hover {
              color: $green-700;
            }
          }
        }

      }

    }

  }
</style>

<template>
  <div class="cape-dashboard-assistant-list-item"
    v-bind:class="componentClassObject">
    <div class="body">
      <template v-if="question">
        <dl class="row no-gutters">
          <dt class="col-2">Matched question</dt>
          <dd class="col-10">{{ question }}</dd>
        </dl>
      </template>
      <dl class="row no-gutters">
        <dt class="col-2">Answer</dt>
        <dd class="col-10">
          <div class="answer-wrapper">
            <cape-dashboard-autogrow-textarea
              v-bind:value="answer"
              v-bind:spellcheck="false"
              v-bind:readonly="true"
              v-bind:highlightRanges="highlightRanges"/>
          </div>
        </dd>
      </dl>
    </div>
    <div class="footer">
      <!--<div class="row no-gutters">-->
      <div class="row">
        <div class="col-4 truncate">
          <template v-if="type === TYPE_DOCUMENT">
            {{ id }}
          </template>
          <template v-if="type === TYPE_REPLY">
            Saved reply
          </template>
        </div>
        <div class="col-4 truncate text-center">
          {{ reference }}
        </div>
        <div class="col-4">
          <template v-if="type === TYPE_REPLY">
            <cape-dashboard-icon-button
              class="btn-deny"
              icon="fa fa-times"
              v-bind:class="{active: (toggleAction === ACTION_DENY)}"
              v-bind:iconSize="0.875"
              v-bind:size="2.5"
              v-on:click.native="_handleActionClick(ACTION_DENY)"/>
            <cape-dashboard-icon-button
              class="btn-approve"
              icon="fa fa-check"
              v-bind:class="{active: (toggleAction === ACTION_APPROVE)}"
              v-bind:iconSize="0.875"
              v-bind:size="2.5"
              v-on:click.native="_handleActionClick(ACTION_APPROVE)"/>
            <cape-dashboard-icon-button
              icon="fa fa-pencil"
              v-bind:iconSize="0.875"
              v-bind:size="2.5"
              v-on:click.native="_handleActionClick(ACTION_EDIT)"/>
          </template>
          <template v-if="type === TYPE_DOCUMENT">
            <cape-dashboard-icon-button
              class="btn-deny"
              icon="fa fa-times"
              v-bind:class="{active: (toggleAction === ACTION_DENY)}"
              v-bind:iconSize="0.875"
              v-bind:size="2.5"
              v-on:click.native="_handleActionClick(ACTION_DENY)"/>
            <cape-dashboard-icon-button
              class="btn-approve"
              icon="fa fa-check"
              v-bind:class="{active: (toggleAction === ACTION_APPROVE)}"
              v-bind:iconSize="0.875"
              v-bind:size="2.5"
              v-on:click.native="_handleActionClick(ACTION_APPROVE)"/>
            <cape-dashboard-icon-button
              icon="fa fa-eye"
              v-bind:iconSize="0.875"
              v-bind:size="2.5"
              v-on:click.native="_handleActionClick(ACTION_VIEW)"/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import * as type from './type'
import * as action from './action'

import IconButton from '@/components/button/Icon'
import AutogrowTextarea from '@/components/AutogrowTextarea'

const ACTION_EVENT = action.EVENT
const ACTION_APPROVE = action.APPROVE
const ACTION_DENY = action.DENY
const ACTION_EDIT = action.EDIT
const ACTION_VIEW = action.VIEW

const STATE_NORMAL = 'stateNormal'
const STATE_ACTIVE = 'stateActive'
const STATE_INACTIVE = 'stateInactive'

export default {

  ACTION_APPROVE: ACTION_APPROVE,
  ACTION_DENY: ACTION_DENY,
  ACTION_EDIT: ACTION_EDIT,
  ACTION_VIEW: ACTION_VIEW,

  STATE_NORMAL: STATE_NORMAL,
  STATE_ACTIVE: STATE_ACTIVE,
  STATE_INACTIVE: STATE_INACTIVE,

  data () {
    return {
      TYPE_DOCUMENT: type.DOCUMENT,
      TYPE_REPLY: type.REPLY,
      ACTION_APPROVE: ACTION_APPROVE,
      ACTION_DENY: ACTION_DENY,
      ACTION_EDIT: ACTION_EDIT,
      ACTION_VIEW: ACTION_VIEW,
      toggleAction: ''
    }
  },

  props: {
    cid: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    type: {
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
    },
    score: {
      type: Number,
      default: 0
    },
    highlightRanges: {
      type: Array
    },
    state: {
      type: String,
      default: STATE_NORMAL
    },
    query: {
      type: String,
      default: ''
    },
    reference: {
      type: String,
      default: ''
    }
  },

  components: {
    'cape-dashboard-icon-button': IconButton,
    'cape-dashboard-autogrow-textarea': AutogrowTextarea
  },

  watch: {
    highlightRanges () {
      this._scrollToHighlight()
    }
  },

  computed: {
    // exactMatch () {
    //   return this.question === this.query
    // },
    componentClassObject () {
      return {
        'state-normal': (this.state === STATE_NORMAL),
        'state-active': (this.state === STATE_ACTIVE),
        'state-inactive': (this.state === STATE_INACTIVE),
        'exact-match': this.exactMatch
      }
    }
  },

  methods: {
    // _scrollToHighlight
    _scrollToHighlight () {
      if (!this.highlightRanges || !this.highlightRanges.length) {
        return
      }
      const element = $('.answer-wrapper', this.$el)
      element.scrollTop(0)
      _.delay(() => {
        const span = $('.answer-wrapper span', this.$el)
        if (span && span.length) {
          const top = Math.abs(span.position().top - Math.round(element.height() / 2))
          element.scrollTop(top)
        }
      }, 20)
    },

    // Event handler that is triggered when
    // an action button gets clicked
    _handleActionClick (action) {
      if (action === ACTION_DENY || action === ACTION_APPROVE) {
        this.toggleAction = action
      }
      this.$emit(ACTION_EVENT, {
        action: action,
        cid: this.cid
      })
    }
  }

}
</script>
