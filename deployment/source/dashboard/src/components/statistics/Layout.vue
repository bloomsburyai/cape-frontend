<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-statistics-layout {
    @include layout-fit();
    @include layout-vertical();

    // Content switcher & item

    .cape-dashboard-content-switcher {
      @include layout-flex();
      @include layout-vertical();
    }

    .cape-dashboard-content-item {
      @include layout-flex();
    }

    // Progress state

    .state-progress.selected {
      @include layout-vertical();
      @include layout-center-center();
    }

    // Error state

    .state-error.selected {

      // Content

      .content {
        @include layout-vertical();
        @include layout-center-center();
        height: 100%;

        .body {
          text-align: center;
          max-width: 50%;

          .icon {
            font-size: 2.625rem;
            color: $blue-grey-200;
            margin: 0 0 1rem 0;
          }

          h5 {
            @include typography-subheading-1();
            color: $blue-grey-200;
          }

        }

      }

    }

    // Complete state

    .state-complete.selected {
      @include layout-horizontal();

      .left {
        @include layout-flex();
        @include layout-vertical();
        overflow: hidden;
      }

      .right {
        @include layout-vertical();
        background-color: $white;
        box-shadow: $box-shadow-1;
        overflow: hidden;
        width: 20rem;
        min-width: 20rem;
      }

      .summary {
        // @include layout-flex();
        @include layout-horizontal();
        @include layout-center();
        background-color: $blue-grey-50;
        padding: 1.5rem;

        .tile {
          @include layout-flex();
          color: $white;
          padding: 0.5rem 1rem;

          p {
            @include typography-caption();
            @include utility-text-truncate-single-line();
          }

          h6 {
            @include typography-subheading-1();
          }
        }
      }

      .questions {
        @include layout-flex();
        @include layout-vertical();

        .header {
          border-bottom: 1px solid $grey-100;
        }

        .body {
          @include layout-flex();
          @include layout-scroll-vertical();

          .row {
            margin: 0;
          }

          .row-header {
            @include typography-body-2();
            color: $blue-grey-200;
            padding: 0.5rem 1.5rem;
            border-bottom: 1px solid $grey-100;
          }

          .row-item {
            @include typography-body-1();
            color: $blue-grey-400;
            padding: 0.5rem 1.5rem;
            border-bottom: 1px solid $grey-100;

            > * {
              @include utility-text-truncate-single-line();
            }
          }
        }
      }

      .pie-chart {
        @include layout-flex();
        @include layout-vertical();

        .header {
          @include layout-horizontal();
          @include layout-center();
          @include layout-justified();
          height: 3rem;
          padding: 0 0.6875rem 0 1.5rem;
          box-shadow: $box-shadow-1;

          h6 {
            @include typography-body-2();
            color: $blue-grey-600;
          }
        }

        .canvas {
          @include layout-flex();
          position: relative;
          padding: 1.5rem;
          overflow: hidden;
        }

        .footer {

          .row {
            margin: 0;
          }

          dt, dd {
            @include typography-body-1();
            border-top: 1px solid $grey-100;
            padding: 1rem 1.5rem;
          }

          dt {
            color: $blue-grey-200;
          }

          dd {
            text-align: right;
            color: $blue-grey-400;
          }

        }
      }

      .graph {
        @include layout-flex();
        @include layout-vertical();

        .header {
          @include layout-horizontal();
          @include layout-center();
          @include layout-justified();
          height: 3rem;
          padding: 0 0.6875rem 0 1.5rem;
          box-shadow: $box-shadow-1;

          h6 {
            @include typography-body-2();
            color: $blue-grey-600;
          }
        }

        .canvas {
          @include layout-flex();
          position: relative;
          padding: 1.5rem;
          overflow: hidden;
        }
      }
    }

  }
</style>

<template>
  <div class="cape-dashboard-statistics-layout">

    <!--

      Content switcher

    -->

    <cape-dashboard-content-switcher
      v-bind:value="state">

      <!--

        Initial progress

      -->

      <cape-dashboard-content-item
        class="state-progress"
        v-bind:value="STATE_PROGRESS">
        <cape-dashboard-progress-circle
          v-bind:size="1.5"
          v-bind:lineWidth="0.125"
          v-bind:active="state === STATE_PROGRESS"/>
      </cape-dashboard-content-item>

      <!--

        End initial progress

      -->

      <!--

        Initial error

      -->

      <cape-dashboard-content-item
        class="state-error"
        v-bind:value="STATE_ERROR">
        <div class="content">
          <div class="body">
            <div class="icon">
              <i class="fa fa-frown-o" aria-hidden="true"></i>
            </div>
            <h5>{{ errorMessage }}</h5>
          </div>
        </div>
      </cape-dashboard-content-item>

      <!--

        End initial error

      -->

      <!--

        Complete

      -->

      <cape-dashboard-content-item
        class="state-complete"
        v-bind:value="STATE_COMPLETE">



        <div class="left">
          <div class="summary">
            <template v-for="model in summaryCollection">
              <div
                v-bind:key="model.key"
                v-bind:style="model.style"
                class="tile">
                <p>{{ model.label }}</p>
                <h6>{{ model.value }}</h6>
              </div>
            </template>
          </div>
          <div class="questions">
            <div class="header">
              <cape-dashboard-tab-bar
                v-model="questionStatus">
                <cape-dashboard-tab-item
                  v-bind:value="QUESTION_ANSWERED">
                  Automatic
                </cape-dashboard-tab-item>
                <cape-dashboard-tab-item
                  v-bind:value="QUESTION_ASSISTED">
                  Assisted
                </cape-dashboard-tab-item>
                <!--
                <cape-dashboard-tab-item
                  v-bind:value="QUESTION_UNANSWERED">
                  Unanswered
                </cape-dashboard-tab-item>
                -->
              </cape-dashboard-tab-bar>
            </div>
            <div class="body" ref="body">
              <div class="row row-header">
                <div class="col">Time</div>
                <div class="col">Duration</div>
                <div class="col">Status</div>
                <div class="col">Question</div>
                <template v-if="questionStatus === QUESTION_ANSWERED">
                  <div class="col">Matched</div>
                </template>
              </div>
              <template v-for="model in filteredQuestionCollection">
                <div class="row row-item" v-bind:key="model.key">
                  <div class="col">{{_computeTime(model.created)}}</div>
                  <div class="col">{{_computeDuration(model.duration)}}</div>
                  <div class="col">{{model.status}}</div>
                  <div class="col">{{model.question}}</div>
                  <template v-if="questionStatus === QUESTION_ANSWERED">
                    <div class="col">{{model.matchedQuestion}}</div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="pie-chart">
            <div class="header">
              <h6>Source statistics</h6>
            </div>
            <div class="canvas">
              <canvas ref="pieChart"></canvas>
            </div>
            <div class="footer">
              <dl class="row">
                <template v-for="model in sourceFooterCollection">
                  <dt class="col-6">{{model.label}}</dt>
                  <dd class="col-6">{{model.value}}</dd>
                </template>
              </dl>
            </div>
          </div>
          <div class="graph">
            <div class="header">
              <h6>Accuracy over time</h6>
            </div>
            <div class="canvas">
              <canvas ref="areaChart"></canvas>
            </div>
          </div>
        </div>

      </cape-dashboard-content-item>

      <!--

        End complete

      -->

    </cape-dashboard-content-switcher>

    <!--

      End content switcher

    -->


  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import Chart from 'chart.js'

import client from '@/client'
import * as color from '@/color'

import ContentSwitcher from '@/components/content/Switcher'
import ContentItem from '@/components/content/Item'
import ProgressCircle from '@/components/progress/Circle'
import TabBar from '@/components/tab/Bar'
import TabItem from '@/components/tab/Item'

const STATE_PROGRESS = 'stateProgress'
const STATE_ERROR = 'stateError'
const STATE_COMPLETE = 'stateComplete'

const QUESTION_ANSWERED = 'automatic'
const QUESTION_ASSISTED = 'assisted'
const QUESTION_UNANSWERED = 'unanswered'

export default {

  data () {
    return {
      // state
      STATE_PROGRESS: STATE_PROGRESS,
      STATE_ERROR: STATE_ERROR,
      STATE_COMPLETE: STATE_COMPLETE,
      state: '',
      // error
      errorMessage: '',
      // summary
      summaryCollection: [
        {
          key: 'averageResponseTime',
          style: {
            'background-color': color.DEEP_PURPLE_500
          },
          label: 'Average response time',
          value: '2 secs'
        },
        // {
        //   key: 'unanswered',
        //   style: {
        //     'background-color': color.INDIGO_500
        //   },
        //   label: 'Unanswered',
        //   value: 0
        // },
        {
          key: 'totalDocuments',
          style: {
            'background-color': color.BLUE_500
          },
          label: 'Total documents',
          value: 0
        },
        {
          key: 'totalQuestions',
          style: {
            'background-color': color.LIGHT_BLUE_500
          },
          label: 'Total questions',
          value: 0
        },
        {
          key: 'totalSavedReplies',
          style: {
            'background-color': color.CYAN_500
          },
          label: 'Total saved replies',
          value: 0
        }
      ],
      // table
      QUESTION_ANSWERED: QUESTION_ANSWERED,
      QUESTION_ASSISTED: QUESTION_ASSISTED,
      QUESTION_UNANSWERED: QUESTION_UNANSWERED,
      questionStatus: QUESTION_ANSWERED,
      questionCollection: [],
      // pie chart
      pieChart: null,
      sourceCollection: [],
      sourceFooterCollection: [
        {
          key: 'assisted',
          value: 0,
          label: 'Assisted'
        },
        {
          key: 'automatic',
          value: 0,
          label: 'Automatic'
        }
      ],
      // area chart
      areaChart: null,
      coverageCollection: []
    }
  },

  components: {
    'cape-dashboard-content-switcher': ContentSwitcher,
    'cape-dashboard-content-item': ContentItem,
    'cape-dashboard-progress-circle': ProgressCircle,
    'cape-dashboard-tab-bar': TabBar,
    'cape-dashboard-tab-item': TabItem
  },

  computed: {
    filteredQuestionCollection () {
      return _.filter(this.questionCollection, {status: this.questionStatus})
    }
  },

  watch: {
    questionStatus (fresh) {
      this.$nextTick(() => {
        this.$refs.body.scrollTop = 0
      })
    }
  },

  methods: {

    /**
     * General
     */

    _updateState (details) {
      _.defaults(details, {
        progress: false,
        error: null,
        data: null
      })
      this.errorMessage = ''
      let state = ''
      if (details.progress) {
        state = STATE_PROGRESS
      } else {
        if (details.error) {
          state = STATE_ERROR
          this.errorMessage = details.error.message
        } else {
          state = STATE_COMPLETE
          this._hydrateData(details.data)
          this._setupPieChart()
          this._setupAreaChart()
        }
      }
      if (state !== this.state) {
        this.state = state
      }
    },

    _hydrateData (data) {
      // summary
      _.each(this.summaryCollection, (model) => {
        if (_.has(data, model.key)) {
          if (model.key === 'averageResponseTime') {
            model.value = Number(data[model.key]).toFixed(2) + ' sec'
          } else {
            model.value = data[model.key]
          }
        }
      })
      // table
      const questionCollection = []
      _.each(data.questions, (model) => {
        model.key = questionCollection.length
        questionCollection.push(model)
      })
      this.questionCollection = questionCollection
      // pie chart
      const sourceCollection = []
      _.each(data.sources, (model) => {
        sourceCollection.push({
          label: model.title,
          value: Number(model.percent).toFixed(2)
        })
      })
      this.sourceCollection = sourceCollection
      _.each(this.sourceFooterCollection, (model) => {
        if (_.has(data, model.key)) {
          model.value = data[model.key]// Number(data[model.key]).toFixed(2) + '%'
        }
      })
      // area chart
      const coverageCollection = []
      _.each(data.coverage, (model) => {
        coverageCollection.push({
          label: moment.unix(model.time).format('HH:mm'),
          value: Number(model.coverage).toFixed(2)
        })
      })
      this.coverageCollection = coverageCollection
    },

    _computeTime (value) {
      return moment.unix(value).fromNow()
    },

    _computeDuration (value) {
      return Number(value).toFixed(2) + ' sec'
    },

    /**
     * Client
     */

    _setupClient () {
      this._updateState({
        progress: true
      })
      client.user.statistics.get((error, data) => {
        this._updateState({
          error: error,
          data: data
        })
      })
    },

    /**
     * Pie chart
     */

    _setupPieChart () {
      const canvas = this.$refs.pieChart
      const labels = _.map(this.sourceCollection, 'label')
      const data = _.map(this.sourceCollection, 'value')
      this.pieChart = new Chart(canvas.getContext('2d'), {
        type: 'pie',
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          }
        },
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              color.PURPLE_500,
              color.DEEP_PURPLE_500,
              color.INDIGO_500,
              color.BLUE_500,
              color.CYAN_500,
              color.GREEN_500,
              color.LIGHT_GREEN_500,
              color.LIME_500,
              color.YELLOW_500,
              color.AMBER_500,
              color.ORANGE_500,
              color.DEEP_ORANGE_500
            ]
          }]
        }
      })
    },

    /**
     * Area chart
     */

    _setupAreaChart () {
      const canvas = this.$refs.areaChart
      const labels = _.map(this.coverageCollection, (model) => {
        return model.label
      })
      const data = _.map(this.coverageCollection, 'value')
      this.areaChart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        options: {
          responsive: true,
          maintainAspectRation: false,
          spanGaps: false,
          elements: {
            line: {
              tension: 0.000001
            }
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                ticks: {max: 100, min: 0}
              }
            ]
          }
        },
        data: {
          labels: labels,
          datasets: [{
            backgroundColor: color.BLUE_200,
            borderColor: color.BLUE_500,
            data: data
          }]
        }
      })
    }

  },

  mounted () {
    this._setupClient()
  }

}
</script>
