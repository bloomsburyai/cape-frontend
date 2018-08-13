<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-inbox-info-item {
    display: block;
    width: 15rem;
    padding: 0.875rem 0 0 0;
  }

  .cape-dashboard-inbox-info-item .date,
  .cape-dashboard-inbox-info-item .question,
  .cape-dashboard-inbox-info-item .answer {
    @include layout-horizontal();
    @include layout-center();
  }

  // Paddings

  .cape-dashboard-inbox-info-item .date,
  .cape-dashboard-inbox-info-item .time,
  .cape-dashboard-inbox-info-item .question,
  .cape-dashboard-inbox-info-item .answer {
    padding-right: 1.5rem;
  }

  .cape-dashboard-inbox-info-item .time {
    padding-left: 4.5rem;
    padding-bottom: 1rem;
  }

  .cape-dashboard-inbox-info-item .question,
  .cape-dashboard-inbox-info-item .answer {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  // Separator

  .cape-dashboard-inbox-info-item .time,
  .cape-dashboard-inbox-info-item .question,
  .cape-dashboard-inbox-info-item .answer {
    border-bottom: 1px solid $grey-100;
  }

  .cape-dashboard-inbox-info-item div:last-child {
    border-bottom: 0;
  }

  // Icon

  .cape-dashboard-inbox-info-item .icon {
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    color: $grey-400;
    margin: 0 1rem 0 1rem;
  }

  .cape-dashboard-inbox-info-item .icon > * {
    font-size: 0.875rem;
  }

  // Label

  .cape-dashboard-inbox-info-item .label {
    @include typography-headline();
    font-weight: 300;
  }

  .cape-dashboard-inbox-info-item .date .label {
    color: $blue-grey-600;
  }

  .cape-dashboard-inbox-info-item .time .label {
    color: $blue-grey-200;
  }

  // Content

  .cape-dashboard-inbox-info-item .content {
    @include layout-flex();
    @include layout-horizontal();
    @include layout-center();
    @include layout-justified();
    margin: 0;
  }

  .cape-dashboard-inbox-info-item .content dt,
  .cape-dashboard-inbox-info-item .content dd {
    @include typography-body-1();
    margin: 0;
  }

  .cape-dashboard-inbox-info-item .content dt {
    color: $blue-grey-200;
  }

  .cape-dashboard-inbox-info-item .content dd {
    color: $blue-grey-600;
  }
</style>

<template>
  <div class="cape-dashboard-inbox-info-item">
    <div class="date">
      <span class="icon">
        <i class="fa fa-clock-o" aria-hidden="true"></i>
      </span>
      <h4 class="label">{{ createdDateLabel }}</h4>
    </div>
    <div class="time">
      <h4 class="label">{{ createdTimeLabel }}</h4>
    </div>
    <div class="question">
      <span class="icon">
        <i class="fa fa-question-circle" aria-hidden="true"></i>
      </span>
      <dl class="content">
        <dt>Question</dt>
        <dd>{{ questionSource }}</dd>
      </dl>
    </div>
    <template v-if="answerSource">
      <div class="answer">
        <span class="icon">
          <i class="fa fa-comments" aria-hidden="true"></i>
        </span>
        <dl class="content">
          <dt>Answer</dt>
          <dd>Document</dd>
        </dl>
      </div>
    </template>
  </div>
</template>

<script>
import moment from 'moment'

export default {

  computed: {
    createdDateLabel () {
      return moment.unix(this.created).format('MMM DD, YYYY')
    },
    createdTimeLabel () {
      return moment.unix(this.created).format('hh:mm A')
    }
  },

  props: {
    created: {
      type: Number
    },
    questionSource: {
      type: String
    },
    answerSource: {
      type: String
    }
  }

}
</script>
