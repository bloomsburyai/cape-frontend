<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-saved-replies-panel {
    @include layout-vertical();

    // Content switcher & item

    .cape-dashboard-content-switcher {
      @include layout-flex();
      @include layout-vertical();
    }

    .cape-dashboard-content-item.selected {
      @include layout-flex();
      @include layout-vertical();
    }

    // Mode create

    .mode-create {

      // Question

      .question {
        @include layout-horizontal();
        margin: 1rem 1.5rem 0 1.5rem;

        padding: 0 0 1rem 0;
        border-bottom: 1px solid $grey-100;

        h6 {
          @include typography-body-1();
          color: $blue-grey-200;
          width: 10rem;
          // textarea border + textarea padding
          padding: 1px + 2px 0;
        }

        .cape-dashboard-autogrow-textarea {
          @include layout-flex();
          @include typography-body-1();
          color: $blue-grey-400;
          border: 1px solid $grey-100;
        }
      }

      // Answer

      .answer {
        @include layout-horizontal();
        margin: 1rem 1.5rem;

        h6{
          @include typography-body-1();
          color: $blue-grey-200;
          width: 10rem;
          // textarea border + textarea padding
          padding: 1px + 2px 0;
        }

        .cape-dashboard-autogrow-textarea {
          @include layout-flex();
          @include typography-body-1();
          color: $blue-grey-400;
          border: 1px solid $grey-100;
        }
      }

      // Footer

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
        }
      }

    }

    // Mode update

    .mode-update {

      // QA

      .qa {
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
            padding: 1px + 2px 0;
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
              padding: 1px + 2px;
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
            padding: 1px + 2px 0;
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
              padding: 1px + 2px;
              color: $grey-400;

              &:hover {
                color: $grey-600;
                background-color: $grey-100;
              }
            }
          }
        }

      }

      // Paraphrase

      .paraphrase {
        @include layout-flex-auto();
        @include layout-vertical();

        // Header

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

        // Body

        .body {
          @include layout-flex();
          @include layout-vertical();

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
            @include layout-scroll-vertical();
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

        // Footer

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

    }

  }
</style>

<template>
  <div class="cape-dashboard-saved-replies-panel">
    <cape-dashboard-content-switcher
      v-bind:value="mode">

      <!--

        Mode create

      -->

      <cape-dashboard-content-item
        class="mode mode-create"
        v-bind:value="MODE_CREATE">

        <cape-dashboard-alert-manager
          ref="createAlertManager"/>

        <!-- Question -->

        <div class="question">
          <h6>Canonical question</h6>
          <cape-dashboard-autogrow-textarea
            v-model="question.value.current"
            v-bind:readonly="false"
            v-bind:spellcheck="false"/>
        </div>

        <!-- End question -->

        <!-- Answer -->

        <div class="answer">
          <h6>Answer</h6>
          <cape-dashboard-autogrow-textarea
            v-model="answer.value.current"
            v-bind:readonly="false"
            v-bind:spellcheck="false"/>
        </div>

        <!-- End answer -->

        <!-- Footer -->

        <div class="footer">
          <cape-dashboard-progress-label-button
            label="Save"
            v-bind:progress="create.progress"
            v-on:click.native="_handleCreateSaveClick"/>
        </div>

        <!-- End footer -->

      </cape-dashboard-content-item>

      <!--

        End mode create

      -->

      <!--

        Mode update

      -->

      <cape-dashboard-content-item
        class="mode mode-update"
        v-bind:value="MODE_UPDATE">

        <!--

          QA

        -->

        <cape-dashboard-alert-manager
          ref="qaAlertManager"/>

        <div class="qa">

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
                  v-on:click.native="_handleUpdateQuestionEditClick"/>
              </template>
              <template v-else>
                <cape-dashboard-icon-button
                  icon="fa fa-check"
                  v-bind:iconSize="0.875"
                  v-bind:size="1.5"
                  v-on:click.native="_handleUpdateQuestionSaveClick"/>
                <cape-dashboard-icon-button
                  icon="fa fa-times"
                  v-bind:iconSize="0.875"
                  v-bind:size="1.5"
                  v-on:click.native="_handleUpdateQuestionCancelClick"/>
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
                  v-on:click.native="_handleUpdateAnswerEditClick"/>
              </template>
              <template v-else>
                <cape-dashboard-icon-button
                  icon="fa fa-check"
                  v-bind:iconSize="0.875"
                  v-bind:size="1.5"
                  v-on:click.native="_handleUpdateAnswerSaveClick"/>
                <cape-dashboard-icon-button
                  icon="fa fa-times"
                  v-bind:iconSize="0.875"
                  v-bind:size="1.5"
                  v-on:click.native="_handleUpdateAnswerCancelClick"/>
              </template>
            </div>
          </div>

          <!-- End answer -->

        </div>

        <!--

          End QA

        -->

        <!--

          Paraphrase

        -->

        <div class="paraphrase">

          <!-- Header -->

          <div class="header">
            <h6>Paraphrase questions</h6>
            <cape-dashboard-icon-label-button
              icon="fa-plus-circle"
              v-bind:iconSize="0.875"
              v-bind:iconColor="color.BLUE_500"
              label="New paraphrase"
              v-bind:labelColor="color.BLUE_GREY_600"
              v-on:click.native="_handleUpdateParaphraseNewClick"/>
          </div>

          <!-- End header -->

          <!-- Body -->

          <div class="body">
            <cape-dashboard-alert-manager
              ref="paraphraseAlertManager"/>
            <template v-if="!paraphrase.collection.current || !paraphrase.collection.current.length">
              <div class="empty">
                <h5>No paraphrase questions found.</h5>
              </div>
            </template>
            <template v-else>
              <div class="list">
                <template v-for="model in paraphrase.collection.current">
                  <div class="item">
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
                        v-on:click.native="_handleUpdateParaphraseTrashClick(model)"/>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>

          <!-- End body -->

          <!-- Footer -->

          <div class="footer">
            <cape-dashboard-progress-label-button
              label="Save"
              v-bind:progress="paraphrase.progress"
              v-bind:disabled="paraphrase.disabled"
              v-on:click.native="_handleUpdateParaphraseSaveClick"/>
          </div>

          <!-- End footer -->

        </div>

        <!--

          End paraphrase

        -->

      </cape-dashboard-content-item>

      <!--

        End mode update

      -->

    </cape-dashboard-content-switcher>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import client from '@/client'
import * as color from '@/color'

import ContentSwitcher from '@/components/content/Switcher'
import ContentItem from '@/components/content/Item'
import AlertManager from '@/components/alert/Manager'
import AlertMessage from '@/components/alert/Message'
import AutogrowTextarea from '@/components/AutogrowTextarea'
import IconButton from '@/components/button/Icon'
import IconLabelButton from '@/components/button/IconLabel'
import Message from '@/components/Message'
import ProgressLabelButton from '@/components/button/ProgressLabel'

const MODE_CREATE = 'modeCreate'
const MODE_UPDATE = 'modeUpdate'

const PARAPHRASE_ALERT_SUCCESS_LABEL = 'Success'

export default {

  MODE_CREATE: MODE_CREATE,
  MODE_UPDATE: MODE_UPDATE,

  data () {
    return {
      // template helpers
      color: color,
      // mode
      MODE_CREATE,
      MODE_UPDATE,
      // id
      id: '',
      // create
      create: {
        progress: false
      },
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
      }
    }
  },

  props: {
    model: {
      type: Object,
      default: null
    }
  },

  watch: {
    model (fresh, stale) {
      // Check to see if we have a new model before closing.
      // This can happen because we emit a "modelChange" event
      // that overrites
      if (_.has(fresh, 'id') &&
        _.has(stale, 'id') &&
        fresh.id !== stale.id) {
        this._closeAlertManagers()
      }
      this._hydrateData(fresh)
    },
    'paraphrase.collection.current' () {
      this._updateParaphraseSaveButton()
    }
  },

  components: {
    'cape-dashboard-content-switcher': ContentSwitcher,
    'cape-dashboard-content-item': ContentItem,
    'cape-dashboard-alert-manager': AlertManager,
    'cape-dashboard-autogrow-textarea': AutogrowTextarea,
    'cape-dashboard-icon-button': IconButton,
    'cape-dashboard-icon-label-button': IconLabelButton,
    'cape-dashboard-message': Message,
    'cape-dashboard-progress-label-button': ProgressLabelButton
  },

  computed: {
    mode () {
      let value = MODE_CREATE
      if (this.id) {
        value = MODE_UPDATE
      }
      return value
    }
  },

  methods: {

    /**
     *
     * General
     *
     */

    // _closeAlertManagers
    _closeAlertManagers () {
      this.$refs.createAlertManager.close()
      this.$refs.qaAlertManager.close()
      this.$refs.paraphraseAlertManager.close()
    },

    // _hydrateData
    _hydrateData (model) {
      // id
      if (_.has(model, 'id')) {
        this.id = _.get(model, 'id')
      } else {
        this.id = ''
      }
      // answer
      if (_.has(model, 'answers.0.id')) {
        this.answer.id = _.get(model, 'answers.0.id')
      } else {
        this.answer.id = ''
      }
      if (_.has(model, 'answers.0.answer')) {
        this.answer.value.original = _.get(model, 'answers.0.answer')
        this.answer.value.current = _.get(model, 'answers.0.answer')
      } else {
        this.answer.value.original = ''
        this.answer.value.current = ''
      }
      this.answer.readonly = true
      // question
      if (_.has(model, 'canonicalQuestion')) {
        this.question.value.original = _.get(model, 'canonicalQuestion')
        this.question.value.current = _.get(model, 'canonicalQuestion')
      } else {
        this.question.value.original = ''
        this.question.value.current = ''
      }
      this.question.readonly = true
      // paraphrase
      this.paraphrase.cid = 0
      this.paraphrase.collection.current = []
      if (_.has(model, 'paraphraseQuestions')) {
        _.each(model.paraphraseQuestions, (model, index) => {
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
    },

    /**
     *
     * Create
     *
     */

    // _handleCreateSaveClick
    _handleCreateSaveClick () {
      this.$refs.createAlertManager.close()
      this.create.progress = true
      client.reply.create({
        question: this.question.value.current,
        answer: this.answer.value.current
      }, (error, data) => {
        this.create.progress = false
        if (error) {
          this.$refs.createAlertManager.open({
            type: AlertMessage.TYPE_ERROR,
            label: error.message
          })
        } else {
          let model = {
            id: data.replyId,
            canonicalQuestion: this.question.value.current,
            answers: [{
              id: data.answerId,
              answer: this.answer.value.current
            }],
            created: moment().unix()
          }
          this._hydrateData(model)
          this.$emit('modelChange', model)
        }
      })
    },

    /**
     *
     * Update
     *
     */

    /**
     * Answer
     */

    // _handleUpdateAnswerEditClick
    _handleUpdateAnswerEditClick () {
      this.answer.readonly = false
    },

    // _handleUpdateAnswerCancelClick
    _handleUpdateAnswerCancelClick () {
      this.answer.readonly = true
    },

    // _handleUpdateAnswerSaveClick
    _handleUpdateAnswerSaveClick () {
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
     * Question
     */

    // _handleUpdateQuestionEditClick
    _handleUpdateQuestionEditClick () {
      this.question.readonly = false
    },

    // _handleUpdateQuestionCancelClick
    _handleUpdateQuestionCancelClick () {
      this.question.readonly = true
    },

    // _handleUpdateQuestionSaveClick
    _handleUpdateQuestionSaveClick () {
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
          this.$emit('modelChange', {
            canonicalQuestion: this.question.value.current
          })
        }
      })
    },

    /**
     * Paraphrase
     */

    // _handleUpdateParaphraseNewClick
    _handleUpdateParaphraseNewClick () {
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

    // _handleUpdateParaphraseTrashClick
    _handleUpdateParaphraseTrashClick (model) {
      let query = null
      if (_.has(model, 'id')) {
        query = {
          id: model.id
        }
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

    // _handleUpdateParaphraseSaveClick
    _handleUpdateParaphraseSaveClick () {
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
            if (callbackError) {
              this.paraphrase.progress = false
              this.$refs.paraphraseAlertManager.open({
                type: AlertMessage.TYPE_ERROR,
                label: callbackError.message
              })
            } else {
              client.reply.read(this.id, (error, data) => {
                this.paraphrase.progress = false
                if (error) {
                  this.$refs.paraphraseAlertManager.open({
                    type: AlertMessage.TYPE_ERROR,
                    label: error.message
                  })
                } else {
                  this.$refs.paraphraseAlertManager.open({
                    type: AlertMessage.TYPE_SUCCESS,
                    label: PARAPHRASE_ALERT_SUCCESS_LABEL
                  })
                  this.$emit('modelChange', data)
                }
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

    // _updatePharaphraseSaveButton
    _updateParaphraseSaveButton () {
      if (_.isEqual(this.paraphrase.collection.original, this.paraphrase.collection.current)) {
        this.paraphrase.disabled = true
      } else {
        this.paraphrase.disabled = false
      }
    }

  },

  mounted () {
    this._closeAlertManagers()
    this._hydrateData(this.model)
  }

}
</script>
