<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-assistant-panel {
    @include layout-vertical();
    background-color: $white;
    box-shadow: $box-shadow-1;
    overflow: hidden;

    // Header

    & > .header {
      @include layout-horizontal();
      @include layout-center();
      @include layout-justified();
      height: 3rem;
      min-height: 3rem;
      padding: 0 0.6875rem 0 1.5rem;
      box-shadow: $box-shadow-1;

      h6 {
        @include typography-body-2();
        color: $blue-grey-600;
      }

      .cape-dashboard-icon-button {
        color: $grey-400;

        &:hover {
          background-color: $grey-100;
          color: $grey-600;
        }
      }
    }

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
      @include layout-vertical();

      // QA

      .qa {
        @include layout-flex();
        @include layout-vertical();

        .body {
          @include layout-flex();
          @include layout-scroll-vertical();

          // Question

          .question {
            @include layout-horizontal();
            margin: 1rem 1.5rem;

            padding: 0 0 1rem 0;
            border-bottom: 1px solid $grey-100;

            h6 {
              @include typography-body-1();
              color: $blue-grey-200;
              width: 10rem;
              // textarea border + textarea padding
              padding: 1px+2px 0;
            }

            .cape-dashboard-autogrow-textarea {
              @include layout-flex();
              @include typography-body-1();
              color: $blue-grey-400;
              border: 1px solid $grey-100;

              &.readonly {
                border: 1px solid transparent;
              }
            }

            .actions {
              @include layout-horizontal();
              @include layout-end-justified();
              margin: 0 0 0 1rem;
              width: 3rem;

              .cape-dashboard-icon-button {
                // textarea border + textarea padding
                padding: 1px+2px;
                color: $grey-400;

                &:hover {
                  color: $grey-600;
                  background-color: $grey-100;
                }
              }
            }
          }

          // Answer

          .answer {
            @include layout-horizontal();
            margin: 1rem 1.5rem;

            h6 {
              @include typography-body-1();
              color: $blue-grey-200;
              width: 10rem;
              // textarea border + textarea padding
              padding: 1px+2px 0;
            }

            .cape-dashboard-autogrow-textarea {
              @include layout-flex();
              @include typography-body-1();
              color: $blue-grey-400;
              border: 1px solid $grey-100;

              &.readonly {
                border: 1px solid transparent;
              }
            }

            .actions {
              @include layout-horizontal();
              @include layout-end-justified();
              margin: 0 0 0 1rem;
              width: 3rem;

              .cape-dashboard-icon-button {
                // textarea border + textarea padding
                padding: 1px+2px;
                color: $grey-400;

                &:hover {
                  color: $grey-600;
                  background-color: $grey-100;
                }
              }
            }
          }

        }
      }

      // Paraphrase

      .paraphrase {
        @include layout-flex-auto();
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

          .cape-dashboard-icon-label-button {
            font-weight: $font-weight-regular;

            &:hover {
              background-color: $grey-100;
            }
          }
        }

        .body {
          @include layout-flex();
          @include layout-vertical();
          @include layout-scroll-vertical();

          .empty {
            @include layout-flex();
            @include layout-horizontal();
            @include layout-center-center();

            h5 {
              @include typography-subheading-1();
              color: $blue-grey-200;
            }
          }

          .list {
            @include layout-flex();
            padding: 1rem 1.5rem;

            .item {
              @include layout-horizontal();
              margin: 0 0 1rem 0;

              &:last-child {
                margin: 0;
              }

              .holder {
                @include layout-flex();
              }

              .actions {
                @include layout-horizontal();
                @include layout-center();
                margin: 0 0 0 1rem;
                width: 1.5rem;
                height: 3.125rem;

                .cape-dashboard-icon-button {
                  color: $grey-400;

                  &:hover {
                    color: $grey-600;
                    background-color: $grey-100;
                  }
                }
              }
            }
          }
        }

        .footer {
          @include layout-horizontal();
          @include layout-end-justified();
          border-top: 1px solid $grey-100;
          padding: 1rem 1.5rem;

          .cape-dashboard-progress-label-button {
            background-color: $green-500;
            color: $white;

            &:hover {
              background-color: $green-700;
            }

            &:disabled {
              background-color: $blue-grey-200;
            }
          }
        }

      }

      // Document

      .document {
        @include layout-flex();
        @include layout-vertical();

        .body {
          @include layout-flex();
          @include layout-scroll-vertical();

          .cape-dashboard-autogrow-textarea {
            @include typography-body-1();
            color: $blue-grey-400;

            margin: 1rem 1.5rem;
          }
        }

      }
    }
  }
</style>

<template>
  <div class="cape-dashboard-assistant-panel">

    <!--

      Header

    -->

    <div class="header">
      <h6>{{ headerTitle }}</h6>
      <cape-dashboard-icon-button
        icon="fa fa-times"
        v-bind:iconSize="0.875"
        v-bind:size="2.5"
        v-on:click.native="_handleCloseClick"/>
    </div>

    <!--

      End header

    -->

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

        <!--

          Reply

        -->

        <template v-if="type === TYPE_REPLY">

          <!-- QA -->

          <div class="qa">
            <cape-dashboard-alert-manager
              ref="qaAlertManager"/>
            <div class="body">

              <!-- Question -->

              <div class="question">
                <h6>Canonical question</h6>
                <cape-dashboard-autogrow-textarea
                  v-model="question.value.current"
                  v-bind:readonly="question.readonly"
                  v-bind:spellcheck="false"
                  v-bind:class="{readonly: question.readonly}"/>
                <div class="actions">
                  <template v-if="question.readonly">
                    <cape-dashboard-icon-button
                      icon="fa fa-pencil"
                      v-bind:iconSize="0.875"
                      v-bind:size="1.5"
                      v-on:click.native="_handleQuestionEditClick"/>
                  </template>
                  <template v-else>
                    <cape-dashboard-icon-button
                      icon="fa fa-check"
                      v-bind:iconSize="0.875"
                      v-bind:size="1.5"
                      v-on:click.native="_handleQuestionSaveClick"/>
                    <cape-dashboard-icon-button
                      icon="fa fa-times"
                      v-bind:iconSize="0.875"
                      v-bind:size="1.5"
                      v-on:click.native="_handleQuestionCancelClick"/>
                  </template>
                </div>
              </div>

              <!-- End question -->

              <!-- Answer -->

              <div class="answer">
                <h6>Answer</h6>
                <cape-dashboard-autogrow-textarea
                  v-model="answer.value.current"
                  v-bind:readonly="answer.readonly"
                  v-bind:spellcheck="false"
                  v-bind:class="{readonly: answer.readonly}"/>
                <div class="actions">
                  <template v-if="answer.readonly">
                    <cape-dashboard-icon-button
                      icon="fa fa-pencil"
                      v-bind:iconSize="0.875"
                      v-bind:size="1.5"
                      v-on:click.native="_handleAnswerEditClick"/>
                  </template>
                  <template v-else>
                    <cape-dashboard-icon-button
                      icon="fa fa-check"
                      v-bind:iconSize="0.875"
                      v-bind:size="1.5"
                      v-on:click.native="_handleAnswerSaveClick"/>
                    <cape-dashboard-icon-button
                      icon="fa fa-times"
                      v-bind:iconSize="0.875"
                      v-bind:size="1.5"
                      v-on:click.native="_handleAnswerCancelClick"/>
                  </template>
                </div>
              </div>

              <!-- End answer -->

            </div>
          </div>

          <!-- End QA -->

          <!-- Paraphrase -->

          <div class="paraphrase">
            <div class="header">
              <h6>Paraphrase questions</h6>
              <cape-dashboard-icon-label-button
                icon="fa-plus-circle"
                v-bind:iconSize="0.875"
                v-bind:iconColor="color.BLUE_500"
                label="New paraphrase"
                v-bind:labelColor="color.BLUE_GREY_600"
                v-on:click.native="_handleParaphraseNewClick"/>
            </div>
            <cape-dashboard-alert-manager
              ref="paraphraseAlertManager"/>
            <div class="body">
              <template v-if="!paraphrase.collection.current || !paraphrase.collection.current.length">
                <div class="empty">
                  <h5>No paraphrase questions found.</h5>
                </div>
              </template>
              <template v-else>
                <div class="list">
                  <template v-for="model in paraphrase.collection.current">
                    <div class="item"
                      v-bind:key="model.id">
                      <div class="holder">
                        <cape-dashboard-message
                          type="user"
                          v-model="model.value.current"
                          v-bind:block="true"
                          v-on:input="_handleParaphraseMessageInput"/>
                      </div>
                      <div class="actions">
                        <cape-dashboard-icon-button
                          icon="fa fa-trash"
                          v-bind:iconSize="0.875"
                          v-bind:size="1.5"
                          v-on:click.native="_handleParaphraseTrashClick(model)"/>
                      </div>
                    </div>
                  </template>
                </div>
              </template>
            </div>
            <div class="footer">
              <cape-dashboard-progress-label-button
                label="Save"
                v-bind:progress="paraphrase.progress"
                v-bind:disabled="paraphrase.disabled"
                v-on:click.native="_handleParaphraseSaveClick"/>
            </div>
          </div>

          <!-- End paraphrase -->

        </template>

        <!--

          End reply

        -->

        <!--

          Document

        -->

        <template v-if="type === TYPE_DOCUMENT">

          <div class="document">
            <div class="body">
              <cape-dashboard-autogrow-textarea
                ref="documentTextarea"
                v-model="document.content"
                v-bind:readonly="true"
                v-bind:spellcheck="false"
                v-bind:highlightRanges="document.ranges"/>
            </div>
          </div>

        </template>

        <!--

          End document

        -->

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
import $ from 'jquery'
import client from '@/client'
import * as color from '@/color'
import * as type from './type'

import ContentSwitcher from '@/components/content/Switcher'
import ContentItem from '@/components/content/Item'
import ProgressCircle from '@/components/progress/Circle'
import IconButton from '@/components/button/Icon'
import AlertManager from '@/components/alert/Manager'
import AlertMessage from '@/components/alert/Message'
import AutogrowTextarea from '@/components/AutogrowTextarea'
import IconLabelButton from '@/components/button/IconLabel'
import Message from '@/components/Message'
import ProgressLabelButton from '@/components/button/ProgressLabel'

const TYPE_DOCUMENT = type.DOCUMENT
const TYPE_REPLY = type.REPLY

const STATE_PROGRESS = 'stateProgress'
const STATE_ERROR = 'stateError'
const STATE_COMPLETE = 'stateComplete'

const PARAPHRASE_ALERT_SUCCESS_LABEL = 'Success'

export default {

  STATE_PROGRESS: STATE_PROGRESS,
  STATE_ERROR: STATE_ERROR,
  STATE_COMPLETE: STATE_COMPLETE,

  data () {
    return {
      // expose color to template
      color: color,
      // expose types to template
      TYPE_DOCUMENT: TYPE_DOCUMENT,
      TYPE_REPLY: TYPE_REPLY,
      // state
      STATE_PROGRESS: STATE_PROGRESS,
      STATE_ERROR: STATE_ERROR,
      STATE_COMPLETE: STATE_COMPLETE,
      state: '',
      // error
      errorMessage: '',
      // base
      id: '',
      type: '',
      ranges: null,
      // answer
      answer: {
        id: '',
        value: {
          original: '',
          current: ''
        },
        readonly: true
      },
      // question
      question: {
        value: {
          original: '',
          current: ''
        },
        readonly: true
      },
      // paraphrase
      paraphrase: {
        cid: 0,
        collection: {
          original: [],
          current: []
        },
        progress: false,
        disabled: true
      },
      // document
      document: {
        title: '',
        content: '',
        ranges: null
      }
    }
  },

  props: {
    model: {
      type: Object,
      default: null
    }
  },

  components: {
    'cape-dashboard-content-switcher': ContentSwitcher,
    'cape-dashboard-content-item': ContentItem,
    'cape-dashboard-progress-circle': ProgressCircle,
    'cape-dashboard-icon-button': IconButton,
    'cape-dashboard-alert-manager': AlertManager,
    'cape-dashboard-autogrow-textarea': AutogrowTextarea,
    'cape-dashboard-icon-label-button': IconLabelButton,
    'cape-dashboard-message': Message,
    'cape-dashboard-progress-label-button': ProgressLabelButton
  },

  computed: {
    headerTitle () {
      let value = 'Edit'
      if (this.type === TYPE_DOCUMENT) {
        value = this.document.title
      }
      return value
    }
  },

  watch: {
    'paraphrase.collection.current' () {
      this._updateParaphraseSaveButton()
    }
  },

  methods: {

    /**
     *
     * General
     *
     */

    // createParaphrase
    createParaphrase (fields) {
      if (!_.has(this.model, 'id')) {
        return
      }
      this._updateState({
        progress: true
      })
      client.reply.question.paraphrase.create({
        replyID: this.model.id,
        content: fields.question
      }, (error, id) => {
        if (error) {
          this._updateState({
            error: error
          })
        } else {
          this.hydrateData()
        }
      })
    },

    // createReply
    createReply (fields) {
      this._updateState({
        progress: true
      })
      client.reply.create({
        question: fields.question,
        answer: fields.answer
      }, (error, data) => {
        if (error) {
          this._updateState({
            error: error
          })
        } else {
          this.id = data.replyId
          this.type = TYPE_REPLY
          this.hydrateData()
        }
      })
    },

    // hydrateData
    hydrateData () {
      // id
      if (_.has(this.model, 'id')) {
        this.id = this.model.id
      } else {
        this.id = ''
      }
      // type
      if (_.has(this.model, 'type')) {
        this.type = this.model.type
      } else {
        this.type = ''
      }
      // ranges
      if (_.has(this.model, 'ranges')) {
        this.ranges = this.model.ranges
      } else {
        this.ranges = null
      }
      // API calls
      if (this.id && this.type) {
        this._updateState({
          progress: true
        })
        switch (this.type) {
          case TYPE_DOCUMENT:
            client.document.read(this.id, (error, data) => {
              this._updateState({
                error: error,
                data: data
              })
              // document
              this.document.title = _.get(data, 'title', '')
              this.document.content = _.get(data, 'text', '')
              this.document.ranges = this.ranges
              this.$nextTick(() => {
                this._documentScrollToHighlight()
              })
            })
            break
          case TYPE_REPLY:
            client.reply.read(this.id, (error, data) => {
              this._updateState({
                error: error,
                data: data
              })
              // answer
              this.answer.id = _.get(data, 'answers.0.id', '')
              this.answer.value.original = _.get(data, 'answers.0.answer', '')
              this.answer.value.current = _.get(data, 'answers.0.answer', '')
              this.answer.readonly = true
              // question
              this.question.value.original = _.get(data, 'canonicalQuestion', '')
              this.question.value.current = _.get(data, 'canonicalQuestion', '')
              this.question.readonly = true
              // paraphrase
              this.paraphrase.cid = 0
              this.paraphrase.collection.current = []
              if (_.has(data, 'paraphraseQuestions')) {
                _.each(data.paraphraseQuestions, (model, index) => {
                  this.paraphrase.collection.current.unshift({
                    id: model.id,
                    value: {
                      original: model.question,
                      current: model.question
                    }
                  })
                })
              }
              this.paraphrase.collection.original = _.cloneDeep(this.paraphrase.collection.current)
            })
            break
        }
      } else {
        // TODO: show some screen or message
      }
    },

    // _updateState
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
        }
      }
      if (state !== this.state) {
        this.state = state
      }
    },

    // _handleCloseClick
    _handleCloseClick () {
      this.$emit('close')
    },

    // _documentScrollToHighlight
    _documentScrollToHighlight () {
      const element = $('.document .body', this.$el)
      element.scrollTop(0)
      this.$nextTick(() => {
        const span = $('.document .body span', this.$el)
        const top = element.scrollTop() + span.position().top - Math.round(element.height() / 2)
        element.scrollTop(top)
      })
    },

    /**
     *
     * Answer
     *
     */

    // _handleAnswerEditClick
    _handleAnswerEditClick () {
      this.answer.readonly = false
    },

    // _handleAnswerCancelClick
    _handleAnswerCancelClick () {
      this.answer.readonly = true
    },

    // _handleAnswerSaveClick
    _handleAnswerSaveClick () {
      this.$refs.qaAlertManager.close()
      client.reply.answer.update({
        id: this.answer.id,
        content: this.answer.value.current
      }, (error, id) => {
        if (error) {
          this.$refs.qaAlertManager.open({
            type: AlertMessage.TYPE_ERROR,
            label: error.message
          })
        } else {
          this.answer.readonly = true
        }
      })
    },

    /**
     *
     * Question
     *
     */

    // _handleQuestionEditClick
    _handleQuestionEditClick () {
      this.question.readonly = false
    },

    // _handleQuestionCancelClick
    _handleQuestionCancelClick () {
      this.question.readonly = true
    },

    // _handleQuestionSaveClick
    _handleQuestionSaveClick () {
      this.$refs.qaAlertManager.close()
      client.reply.question.canonical.update({
        replyID: this.id,
        content: this.question.value.current
      }, (error, id) => {
        if (error) {
          this.$refs.qaAlertManager.open({
            type: AlertMessage.TYPE_ERROR,
            label: error.message
          })
        } else {
          this.question.readonly = true
        }
      })
    },

    /**
     *
     * Paraphrase
     *
     */

    // _handleParaphraseNewClick
    _handleParaphraseNewClick () {
      this.$refs.paraphraseAlertManager.close()
      const model = {
        cid: this.paraphrase.cid,
        value: {
          original: '',
          current: ''
        }
      }
      this.paraphrase.cid += 1
      this.paraphrase.collection.current.unshift(model)
    },

    // _handleParaphraseMessageInput
    _handleParaphraseMessageInput () {
      this._updateParaphraseSaveButton()
    },

    // _handleParaphraseTrashClick
    _handleParaphraseTrashClick (model) {
      let query = null
      if (_.has(model, 'id')) {
        query = {
          id: model.id
        }
        client.reply.question.paraphrase.delete(model.id)
      } else if (_.has(model, 'cid')) {
        query = {
          cid: model.cid
        }
      }
      if (!query) {
        return
      }
      let currentIndex = _.findIndex(this.paraphrase.collection.current, query)
      if (currentIndex !== -1) {
        this.paraphrase.collection.current.splice(currentIndex, 1)
      }
      let originalIndex = _.findIndex(this.paraphrase.collection.original, query)
      if (originalIndex !== -1) {
        this.paraphrase.collection.original.splice(originalIndex, 1)
      }
    },

    // _handleParaphraseSaveClick
    _handleParaphraseSaveClick () {
      this.$refs.paraphraseAlertManager.close()
      this.paraphrase.progress = true
      let count = 0
      let callbackError = null
      const callback = (model) => {
        return (error, id) => {
          count--
          if (error) {
            callbackError = error
          } else {
            if (_.has(model, 'cid')) {
              delete model.cid
            }
            model.id = id
            model.value.original = model.value.current
          }
          if (count === 0) {
            this.paraphrase.progress = false
            if (callbackError) {
              this.$refs.paraphraseAlertManager.open({
                type: AlertMessage.TYPE_ERROR,
                label: callbackError.message
              })
            } else {
              this.$refs.paraphraseAlertManager.open({
                type: AlertMessage.TYPE_SUCCESS,
                label: PARAPHRASE_ALERT_SUCCESS_LABEL
              })
            }
          }
        }
      }
      _.each(this.paraphrase.collection.current, (model, index) => {
        // create
        if (!_.has(model, 'id')) {
          client.reply.question.paraphrase.create({
            replyID: this.id,
            content: model.value.current
          }, callback(model))
        // update
        } else {
          // skip if no change
          if (model.value.original === model.value.current) {
            return
          }
          client.reply.question.paraphrase.update({
            id: model.id,
            content: model.value.current
          }, callback(model))
        }
        count++
      })
      if (!count) {
        this.paraphrase.progress = false
      }
    },

    // _updateParaphraseSaveButton
    _updateParaphraseSaveButton () {
      if (_.isEqual(this.paraphrase.collection.original, this.paraphrase.collection.current)) {
        this.paraphrase.disabled = true
      } else {
        this.paraphrase.disabled = false
      }
    }

  }

}
</script>
