<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-inbox-viewport {
    @include layout-scroll-vertical();
    position: relative;
    background-color: $blue-grey-50;

    .question {
      @include typography-body-2();
      color: $blue-grey-400;
      width: 80%;
      margin: 3rem auto 1rem auto;
    }

    .list {
      & > * {
        width: 80%;
        margin: 1rem auto;
      }
    }
  }
</style>

<template>
  <div class="cape-dashboard-inbox-viewport">
    <template v-if="model && model.question">
      <div class="question">
        {{model.question}}
      </div>
    </template>
    <div class="list">
      <template v-if="model && model.answers">
        <template v-for="(model, index) in model.answers">
          <cape-dashboard-inbox-list-item
            v-bind:id="model.sourceId"
            v-bind:type="model.sourceType"
            v-bind:question="_getListItemModelQuestion(model, index)"
            v-bind:answer="_getListItemModelAnswer(model, index)"
            v-bind:highlightRanges="_getListItemModelHighlightRanges(model, index)"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import * as type from './type'

import ListItem from './ListItem'

export default {

  data () {
    return {}
  },

  props: {
    model: {
      type: Object,
      default: null
    }
  },

  components: {
    'cape-dashboard-inbox-list-item': ListItem
  },

  watch: {
    model () {
      if (this.$el) {
        this.$el.scrollTop = 0
      }
    }
  },

  methods: {
    /**
     *
     * List
     *
     */

    // _getListItemModelQuestion returns the question
    // that should be assigned to the list item component
    _getListItemModelQuestion (model, index) {
      let value = ''
      if (model.sourceType && model.sourceType === type.REPLY) {
        value = model.matchedQuestion
      }
      return value
    },

    // _getListItemModelAnswer returns the answer that
    // should be assigned to the list item component
    _getListItemModelAnswer (model, index) {
      let value = ''
      if (!model.sourceType) {
        return value
      }
      switch (model.sourceType) {
        case type.DOCUMENT:
          value = model.answerContext
          break
        case type.REPLY:
          value = model.answerText
          break
      }
      return value
    },

    // _getListItemModelHighlightRanges returns the ranges
    // that should be assigned to the list item component
    _getListItemModelHighlightRanges (model, index) {
      let range = {start: 0, length: 0}
      if (model.sourceType === type.DOCUMENT) {
        range.start = model.answerTextStartOffset - model.answerContextStartOffset
        range.length = model.answerTextEndOffset - model.answerTextStartOffset
      }
      return [range]
    }
  }

}
</script>
