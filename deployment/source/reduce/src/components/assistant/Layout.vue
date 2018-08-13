<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-assistant-layout {
    @include layout-fit();
    @include layout-vertical();
    background-color: $blue-grey-50;

    // Content switcher & item

    .cape-dashboard-content-switcher {
      height: 100%;
    }

    .cape-dashboard-content-item {
      height: 100%;
      padding: 7.5rem 0 0 0;
      overflow: hidden;
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

    // Empty state

    .state-empty.selected {

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
            margin: 0 0 1rem 0;
          }

          p {
            @include typography-body-1();
            color: $blue-grey-200;
          }

          a {
            color: $blue-500;
          }
        }
      }

    }

    // Complete state

    .state-complete.selected {
      position: relative;

      // List

      .list-outer {
        @include layout-fit();
        overflow-x: hidden;
        overflow-y: auto;
      }

      .list > * {
        margin: 1rem auto;
      }

      // Actions

      .more-wrapper {
        @include layout-horizontal();
        @include layout-center-justified();
        width: 50%;
        margin: 1rem auto;

        .cape-dashboard-progress-label-button {
          background: $blue-grey-300;
          color: $white;

          &:hover {
            background: $blue-grey-500;
          }
        }

      }

      // Panel

      .cape-dashboard-assistant-panel {
        position: absolute;
        top: 3rem;
        right: 1.5rem;
        bottom: 3rem;
        left: 50%;
        // "margin" is added by js code
      }

    }

    // Header

    .header-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      background-color: $blue-grey-50;
      // "right" is added by js code
      // "padding" is added by js code
    }

    .header {
      @include layout-horizontal();
      @include layout-center();

      .cape-dashboard-assistant-input {
        @include layout-flex();
      }

      .cape-dashboard-progress-label-button {
        background: $green-500;
        color: $white;
        height: 3rem;
        line-height: 3rem;

        &:hover {
          background: $green-700;
        }
      }
    }

  }
</style>

<template>
  <div class="cape-dashboard-assistant-layout">

      <cape-dashboard-content-switcher
        v-bind:value="state">

        <!--

          Progress

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

          End progress

        -->

        <!--

          Error

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

          End error

        -->

        <!--

          Empty

        -->

        <cape-dashboard-content-item
          class="state-empty"
          v-bind:value="STATE_EMPTY">
          <div class="content">
            <div class="body">
              <div class="icon">
                <i class="fa fa-comment-o" aria-hidden="true"></i>
              </div>
              <h5>No answers were found.</h5>
              <p>To have answers from documents add some <router-link to="/documents">here</router-link>,<br />to have answers from saved replies add some <router-link to="/saved-replies">here</router-link>.</p>
            </div>
          </div>
        </cape-dashboard-content-item>

        <!--

          End empty

        -->

        <!--

          Complete

        -->

        <cape-dashboard-content-item
          class="state-complete"
          v-bind:value="STATE_COMPLETE">

          <!-- List -->

          <div class="list-outer" ref="listOuter">
            <div class="list-inner" ref="listInner">
              <div class="list" ref="list" v-bind:style="listStyleObject">
                <template v-for="(model, index) in queryCollection">
                  <cape-dashboard-assistant-list-item
                    v-bind:key="model.cid || model.sourceId"
                    v-bind:cid="model.cid"
                    v-bind:id="model.sourceId"
                    v-bind:type="model.sourceType"
                    v-bind:question="_getListItemModelQuestion(model, index)"
                    v-bind:answer="_getListItemModelAnswer(model, index)"
                    v-bind:score="_getListItemModelScore(model, index)"
                    v-bind:highlightRanges="_getListItemModelHighlightRanges(model, index)"
                    v-bind:state="_getListItemModelState(model, index)"
                    v-bind:query="inputValue"
                    v-bind:reference="_getListItemModelReference(model, index)"
                    v-on:action="_handleListItemAction"/>
                </template>
              </div>
              <template v-if="moreVisible && !panelVisible">
                <div class="more-wrapper">
                  <cape-dashboard-progress-label-button
                    label="More"
                    v-bind:progress="moreProgress"
                    v-on:click.native="_handleListMoreClick"/>
                </div>
              </template>
            </div>
          </div>

          <!-- End list -->

          <!-- Panel -->

          <template v-if="panelVisible">
            <cape-dashboard-assistant-panel
              ref="panel"
              v-bind:style="panelStyleObject"
              v-bind:model="panelModel"
              v-on:close="hidePanel"/>
          </template>

          <!-- End panel -->

        </cape-dashboard-content-item>

        <!--

          End complete

        -->

      </cape-dashboard-content-switcher>

      <!--

        Header

      -->

      <div class="header-wrapper"
        v-bind:style="headerWrapperStyleObject">
        <div class="header"
          v-bind:style="headerStyleObject">
          <cape-dashboard-assistant-input
            v-model="inputValue"
            v-bind:placeholder="INPUT_PLACEHOLDER"
            v-on:input="_handleInputChange"
            ref="input"/>
          <template v-if="saveVisible && !panelVisible">
            <cape-dashboard-progress-label-button
              label="Submit"
              v-bind:progress="saveProgress"
              v-on:click.native="_handleListSaveClick"/>
          </template>
        </div>
      </div>

      <!--

        End header

      -->

  </div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'
import moment from 'moment'
import client from '@/client'
import configuration from '@/configuration'
import * as type from './type'
import URI from 'urijs'

import ContentSwitcher from '@/components/content/Switcher'
import ContentItem from '@/components/content/Item'
import ProgressCircle from '@/components/progress/Circle'
import Input from './Input'
import ListItem from './ListItem'
import ProgressLabelButton from '@/components/button/ProgressLabel'
import Panel from './Panel'

const STATE_PROGRESS = 'stateProgress'
const STATE_ERROR = 'stateError'
const STATE_EMPTY = 'stateEmpty'
const STATE_COMPLETE = 'stateComplete'

const INPUT_PLACEHOLDER = 'Type a question'
const QUERY_PAGE_SIZE = 5

const QUERY_CONFIGURATION = _.extend(configuration.query)

const uri = new URI()
const query = uri.search(true)

export default {

  STATE_PROGRESS: STATE_PROGRESS,
  STATE_ERROR: STATE_ERROR,
  STATE_EMPTY: STATE_EMPTY,
  STATE_COMPLETE: STATE_COMPLETE,

  data () {
    return {
      // state
      STATE_PROGRESS: STATE_PROGRESS,
      STATE_ERROR: STATE_ERROR,
      STATE_EMPTY: STATE_EMPTY,
      STATE_COMPLETE: STATE_COMPLETE,
      state: '',
      // error
      errorMessage: '',
      // input
      INPUT_PLACEHOLDER: INPUT_PLACEHOLDER,
      inputValue: '',
      // list
      scrollbarWidth: 0,
      queryPage: 0,
      moreVisible: true,
      moreProgress: false,
      saveVisible: false,
      saveProgress: false,
      // panel
      panelVisible: false,
      panelModel: null,
      // query
      queryCollection: [],
      // timestamps
      pageTimestamp: null,
      questionTimestamp: null
    }
  },

  components: {
    'cape-dashboard-content-switcher': ContentSwitcher,
    'cape-dashboard-content-item': ContentItem,
    'cape-dashboard-progress-circle': ProgressCircle,
    'cape-dashboard-assistant-input': Input,
    'cape-dashboard-assistant-list-item': ListItem,
    'cape-dashboard-progress-label-button': ProgressLabelButton,
    'cape-dashboard-assistant-panel': Panel
  },

  computed: {
    headerWrapperStyleObject () {
      let right = '0'
      let padding = '3rem 0 0 0'
      if (this.scrollbarWidth) {
        right = this.scrollbarWidth + 'px'
      }
      if (this.panelVisible) {
        right = '50%'
        padding = '3rem 0.75rem 0 1.5rem'
      }
      return {
        right: right,
        padding: padding
      }
    },
    headerStyleObject () {
      let width = '80%'
      let margin = '0 auto'
      if (this.panelVisible) {
        width = '100%'
        margin = '0'
      }
      return {
        width: width,
        margin: margin
      }
    },
    listStyleObject () {
      let offset = 0
      if (this.scrollbarWidth) {
        offset = (this.scrollbarWidth / 2) + 'px'
      }
      if (this.panelVisible) {
        let width = '50%'
        if (offset) {
          width = 'calc(50% + ' + offset + ')'
        }
        return {
          width: width,
          margin: '7.5rem 0 0 0',
          padding: '0 0.75rem 0 1.5rem'
        }
      } else {
        return {
          width: '80%',
          margin: '7.5rem auto 0 auto',
          padding: '0'
        }
      }
    },
    panelStyleObject () {
      let margin = '0 0 0 0.75rem'
      if (this.scrollbarWidth) {
        margin = '0 ' + (this.scrollbarWidth + 'px') + ' 0 0.75rem'
      }
      return {
        margin: margin
      }
    }
  },

  methods: {
    /**
     *
     * State
     *
     */

    // _updateState
    _updateState (details) {
      _.defaults(details, {
        progress: false,
        error: null,
        collection: []
      })
      let state = ''
      // non-complete progress
      if (this.state !== STATE_COMPLETE && details.progress) {
        state = STATE_PROGRESS
      }
      // non-complete error
      if (this.state !== STATE_COMPLETE && details.error) {
        state = STATE_ERROR
      }
      // empty or complete
      if (!details.progress && !details.error) {
        if (details.collection &&
          !details.collection.length &&
          !this.queryCollection.length) {
          state = STATE_EMPTY
        } else {
          state = STATE_COMPLETE
        }
      }
      if (this.state !== state) {
        this.state = state
      }
    },

    /**
     *
     * Header
     *
     */

    // _handleInputChange is an event handler
    // triggered when a new value is inserted
    _handleInputChange (value) {
      this.state = ''
      this._queryClient(value)
      this.hidePanel()
      $('.list-outer', this.$el).scrollTop(0)
      this.questionTimestamp = moment()
      this.saveVisible = false
    },

    _headerAccountForScrollbar () {
      this.$nextTick(() => {
        const listOuterWidth = this.$refs.listOuter.offsetWidth
        const listInnerWidth = this.$refs.listInner.offsetWidth
        let scrollbarWidth = 0
        if (listInnerWidth < listOuterWidth) {
          scrollbarWidth = (listOuterWidth - listInnerWidth)
        }
        this.scrollbarWidth = scrollbarWidth
      })
    },

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

    // _getListItemModelScore returns the score that
    // should be assigned to the list item component
    _getListItemModelScore (model, index) {
      let value = 0
      if (model.confidence) {
        value = model.confidence
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
    },

    // _getListItemModelState returns the state that
    // should be assigned to the list item component
    _getListItemModelState (model, index) {
      if (!this.panelModel) {
        return ListItem.STATE_NORMAL
      }
      if (this.panelModel.cid === model.cid) {
        return ListItem.STATE_ACTIVE
      }
      return ListItem.STATE_INACTIVE
    },

    // _getListItemModelReference
    _getListItemModelReference (model, index) {
      let value = ''
      if (model.reference) {
        value = model.reference
      }
      return value
    },

    // _handleListItemAction is an event handler
    // triggered when the list item emits an action
    // event
    _handleListItemAction (details) {
      if (!_.has(details, 'action') ||
        !_.has(details, 'cid')) {
        return
      }
      let queryModel = _.find(this.queryCollection, {
        cid: details.cid
      })
      if (!queryModel ||
        !_.has(queryModel, 'sourceId') ||
        !_.has(queryModel, 'sourceType')) {
        return
      }
      let panelModel = {
        cid: queryModel.cid,
        id: queryModel.sourceId,
        type: queryModel.sourceType
      }
      if (queryModel.sourceType === type.DOCUMENT) {
        panelModel.ranges = [{
          start: queryModel.answerTextStartOffset,
          length: queryModel.answerTextEndOffset - queryModel.answerTextStartOffset
        }]
      }
      if (details.action === ListItem.ACTION_EDIT ||
        details.action === ListItem.ACTION_VIEW) {
        this.panelModel = panelModel
        this.$nextTick(() => {
          this.$refs.panel.hydrateData()
        })
        this.panelVisible = true
      }
      if (details.action === ListItem.ACTION_APPROVE ||
        details.action === ListItem.ACTION_DENY) {
        this.saveVisible = true
        const now = moment()
        queryModel.action = details.action
        client.log.event({
          action: details.action,
          answerModel: queryModel,
          answerCollection: this.queryCollection,
          question: this.inputValue,
          time: {
            current: now.unix(),
            page: Math.round(now.diff(this.pageTimestamp) / 1000),
            question: Math.round(now.diff(this.questionTimestamp) / 1000)
          },
          browser: {
            signature: navigator.userAgent,
            size: {
              width: $(window).width(),
              height: $(window).height()
            }
          },
          queryString: query
        })
      }
    },

    // _handleListMoreClick
    _handleListMoreClick () {
      this.queryPage++
      this._queryClient(this.inputValue, this.queryPage)
    },

    // _handleListSaveClick
    _handleListSaveClick () {
      this.saveProgress = true
      const now = moment()
      client.log.event({
        action: 'save',
        answerCollection: this.queryCollection,
        question: this.inputValue,
        time: {
          current: now.unix(),
          page: Math.round(now.diff(this.pageTimestamp) / 1000),
          question: Math.round(now.diff(this.questionTimestamp) / 1000)
        },
        browser: {
          signature: navigator.userAgent,
          size: {
            width: $(window).width(),
            height: $(window).height()
          }
        },
        queryString: query
      }, () => {
        this.saveProgress = false
        this.inputValue = ''
        this.state = ''
        this.queryCollection = []
        this.moreVisible = false
        this.moreProgress = false
        this.saveVisible = false
        this.saveProgress = false
      })
    },

    /**
     *
     * Panel
     *
     */

    hidePanel () {
      this.panelVisible = false
      this.panelModel = null
    },

    /**
     *
     * Query
     *
     */

    // _queryClient makes an api call to get
    // the answer for the parameter passed in
    _queryClient (content, number) {
      if (!number) {
        number = 0
      }
      if (number === 0) {
        this.queryCollection = []
      }
      this.moreVisible = true
      this.moreProgress = true
      this._updateState({
        progress: true
      })
      const fields = _.defaults({
        content: content
      }, QUERY_CONFIGURATION)
      // client.query.prepare({
      //   content: content
      // }).paginate({
      client.query.prepare(fields).paginate({
        size: QUERY_PAGE_SIZE,
        number: number
      }, (error, data) => {
        this.moreProgress = false
        this._updateState({
          error: error,
          collection: data
        })
        if (this.state === STATE_COMPLETE) {
          if (!data || !data.length) {
            this.moreVisible = false
          }
          _.each(data, (model, index) => {
            model.cid = String(this.queryCollection.length)
            this.queryCollection.push(model)
          })
          this._headerAccountForScrollbar()
        }
      })
    }
  },

  mounted () {
    this.hidePanel()
    this.pageTimestamp = moment()
  }

}
</script>
