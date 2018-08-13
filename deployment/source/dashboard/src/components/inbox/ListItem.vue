<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-inbox-list-item {
    background: $white;

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
        max-height: (1.25rem * 5 + 2 / 16);
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

      .cape-dashboard-icon-button {
        position: relative;
        left: 0.75rem;
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
  <div class="cape-dashboard-inbox-list-item">
    <div class="body">
      <template v-if="question">
        <dl class="row no-gutters">
          <dt class="col-4">Matched question</dt>
          <dd class="col-8">{{ question }}</dd>
        </dl>
      </template>
      <dl class="row no-gutters">
        <dt class="col-4">Answer</dt>
        <dd class="col-8">
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
      <div class="row no-gutters">
        <div class="col-4">
          <template v-if="type === TYPE_DOCUMENT">
            Document
          </template>
          <template v-if="type === TYPE_REPLY">
            Saved reply
          </template>
        </div>
        <div class="col-3 ml-auto">
          <cape-dashboard-icon-button
            icon="fa fa-eye"
            v-bind:iconSize="0.875"
            v-bind:size="2.5"
            v-on:click.native="_handleActionClick"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import * as type from './type'

import IconButton from '@/components/button/Icon'
import AutogrowTextarea from '@/components/AutogrowTextarea'

export default {

  data () {
    return {
      TYPE_DOCUMENT: type.DOCUMENT,
      TYPE_REPLY: type.REPLY
    }
  },

  props: {
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
    highlightRanges: {
      type: Array
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

    // _handleActionClick
    _handleActionClick () {
      switch (this.type) {
        case type.DOCUMENT:
          this.$router.push({name: 'documents', params: {id: this.id}})
          break
        case type.REPLY:
          this.$router.push({name: 'savedReplies', params: {id: this.id}})
          break
      }
    }
  }

}
</script>
