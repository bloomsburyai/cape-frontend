<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-integrations-layout {
    @include layout-fit();
    @include layout-vertical();
    background-color: $blue-grey-50;

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
      @include layout-scroll-vertical();

      .panel {
        width: 43rem;
        background: $white;
        margin: 3rem auto 3rem auto;
        box-shadow: $box-shadow-1;
        overflow: hidden;

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

        .body {
          @include typography-body-1();
          color: $blue-grey-400;
          padding: 1.5rem;

          code {
            background: $blue-grey-700;
            color: $blue-grey-300;
            border-radius: 2px;
          }

          .method {
            color: $cyan-500;
          }

          .argument {
            color: $amber-500;
          }

          p {
            margin: 0.5rem 0 0.5rem 0;
          }

          dl {
            margin-top: 0.25rem;
            margin-bottom: 0.25rem;
          }

          dt {
            font-weight: 400;
            margin-top: 0.25rem;
            margin-bottom: 0.25rem;
          }

          dd {
            margin-top: 0.25rem;
            margin-bottom: 0.25rem;
          }

          ul {
            margin: 0.5rem 0 0.5rem 0;
          }

          li {
            margin-top: 0.25rem;
            margin-bottom: 0.25rem;
          }

          a.link {
            color: $blue-500;
          }
        }

      }

      .panel-slack {

        .emoji {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: 20px;
          background-repeat: no-repeat;
        }

        .btn {
          @include typography-body-1();
          background: $blue-grey-200;
          border-radius: 0.125rem;
          color: $white;
          display: block;
          margin: 1rem 0 0 0;

          &:hover {
            background: $blue-grey-300;
          }

        }

      }

      .panel-email {

        .form-control {
          @include typography-body-1();
          text-transform: none;
          text-align: left;
          border-radius: 0.125rem;
          height: 2.25rem;
          line-height: 2.25rem;
          padding: 0 1rem;
          border: 0.0625rem solid $grey-300;
          color: $blue-grey-400;

          &:focus {
            box-shadow: none;
            border: 0.0625rem solid $grey-300;
          }
        }

        .cape-dashboard-progress-label-button {
          background: $green-500;
          color: $white;
          margin-right: 15px;

          &:hover {
            background: $green-700;
          }
        }

      }

    }

  }
</style>

<template>
  <div class="cape-dashboard-integrations-layout">

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

        Complete

      -->

      <cape-dashboard-content-item
        class="state-complete"
        v-bind:value="STATE_COMPLETE">

        <div class="wrapper">

          <div class="panel panel-slack">
            <div class="header">
              <h6>Slack</h6>
            </div>
            <div class="body">
              <iframe src="https://player.vimeo.com/video/258053984?autoplay=1&loop=1" width="640" height="289" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              <p>Hi, I am Capebot, I will answer all your questions, I will learn from you and your documents and improve over time.</p>
              <p>Here are my commands:</p>
              <ul class="list-unstyled">
                <!-- Method: add -->
                <li>
                  <code><span class="method">.add</span> <span class="argument">question</span> | <span class="argument">answer</span></code>
                  Create a new saved reply.
                </li>
                <!-- Method: next -->
                <li>
                  <code><span class="method">.next</span></code>
                  Show the next possible answer for the last question.
                </li>
                <!-- Method: why -->
                <li>
                  <code><span class="method">.why</span></code>
                  Explain why the last answer was given.
                </li>
                <!-- Method: help -->
                <li>
                  <code><span class="method">.help</span></code>
                  Display this message.
                </li>
              </ul>
              <p>You can also:</p>
              <ul>
                <li>
                  <span class="method">Add</span> a Slack emoji reaction to bot answers with
                  <span class="emoji" style="background-image: url(https://a.slack-edge.com/c00d19/img/emoji_2017_12_06/sheet_google_64_indexed_256.png);background-position:27.45098039215686% 96.07843137254902%;background-size:5200% 5200%;"></span>
                  or
                  <span class="emoji" style="background-image: url(https://a.slack-edge.com/c00d19/img/emoji_2017_12_06/sheet_google_64_indexed_256.png);background-position:58.8235294117647% 52.94117647058823%;background-size:5200% 5200%;"></span>, I will remember and improve over time.</li>
                <li><span class="method">Upload</span> text and markdown documents by sending them to me in a private message. I will read them when answering.</li>
                <li><span class="method">Ask</span> me to calculate, for example <code><span class="argument">what is 3+2?</span></code>.</li>
              </ul>
              <p>For more options login to your account at <a class="link" href="https://thecape.ai">https://thecape.ai</a>.</p>
              <a class="btn" target="_blank" href="https://slack.com/oauth/authorize?client_id=338986243510.338281301605&scope=bot">
                <i class="fa fa-slack" aria-hidden="true"></i>
                <span>Add to Slack</span>
              </a>
            </div>
          </div>

          <div class="panel panel-email">
            <div class="header">
              <h6>Forward email</h6>
            </div>
            <cape-dashboard-alert-manager
              ref="emailAlertManager"/>
            <div class="body">
              <iframe src="https://player.vimeo.com/video/258794094?autoplay=1&loop=1" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              <p>Send an email to <code><span class="argument">{{queryTokenValue}}</span>@thecape.ai</code>:</p>
              <ul>
                <li>If Cape knows the answer it will then respond by email,</li>
                <li>If Cape is not sure about the answer, it will send you an email to the address below with suggestions. After you reply to this email, Cape will save the answer for the future and respond to the original email.</li>
              </ul>
              <p>Status: {{emailStatus}}</p>
              <div class="row">
                <div class="col">
                  <input
                    v-model="emailValue"
                    type="email"
                    class="form-control">
                </div>
                <cape-dashboard-progress-label-button
                  label="Save"
                  v-bind:progress="emailProgress"
                  v-on:click.native="_handleEmailSaveClick"/>
              </div>
            </div>
          </div>


        </div>

      </cape-dashboard-content-item>

      <!--

        End complete

      -->

    </cape-dashboard-content-switcher>

  </div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'

import client from '@/client'

import ContentSwitcher from '@/components/content/Switcher'
import ContentItem from '@/components/content/Item'
import ProgressCircle from '@/components/progress/Circle'
import ProgressLabelButton from '@/components/button/ProgressLabel'
import AlertManager from '@/components/alert/Manager'
import AlertMessage from '@/components/alert/Message'

const STATE_PROGRESS = 'stateProgress'
const STATE_ERROR = 'stateError'
const STATE_COMPLETE = 'stateComplete'

const EMAIL_SUCCESS = 'Success'

const EMAIL_STATUS_ACTIVE = 'Active'
const EMAIL_STATUS_UNVERIFIED = 'Not verified (Click the link we sent to your mail to verify your email)'
const EMAIL_STATUS_UNACTIVE = 'Deactivated (setup a forwarding email to activate)'

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
      // email
      queryTokenValue: '',
      emailStatus: '',
      emailValue: '',
      emailProgress: false,
      urlValue: ''
    }
  },

  components: {
    'cape-dashboard-content-switcher': ContentSwitcher,
    'cape-dashboard-content-item': ContentItem,
    'cape-dashboard-progress-circle': ProgressCircle,
    'cape-dashboard-progress-label-button': ProgressLabelButton,
    'cape-dashboard-alert-manager': AlertManager
  },

  watch: {
    '$route' () {
      this._scrollToPanel()
    }
  },

  methods: {

    /**
     * General
     */

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
          this._hydrateData(details.data)
          this._scrollToPanel()
        }
      }
      if (state !== this.state) {
        this.state = state
      }
    },

    // _hydrateData
    _hydrateData (data) {
      console.log('_hydrateData')
      console.log(data)
      if (data.forwardEmail && data.forwardEmailVerified) {
        this.emailStatus = EMAIL_STATUS_ACTIVE
      } else if (data.forwardEmail && !data.forwardEmailVerified) {
        this.emailStatus = EMAIL_STATUS_UNVERIFIED
      } else {
        this.emailStatus = EMAIL_STATUS_UNACTIVE
      }
      this.emailValue = data.forwardEmail
    },

    /**
     * Client
     */

    // _setupClient
    _setupClient () {
      this._updateState({
        progress: true
      })
      client.user.profile.get((error, data) => {
        this._updateState({
          error: error,
          data: data
        })
      })
      client.user.token.query.get((error, value) => {
        if (error) {
          // TODO: handle error
          return
        }
        this.queryTokenValue = value
      })
    },

    /**
     * Email
     */

    // _handleEmailSaveClick
    _handleEmailSaveClick () {
      this.emailProgress = true
      this.$refs.emailAlertManager.close()
      client.user.forwardEmail.set(this.emailValue, (error, data) => {
        this.emailProgress = false
        if (error) {
          this.$refs.emailAlertManager.open({
            type: AlertMessage.TYPE_ERROR,
            label: error.message
          })
        } else {
          this.$refs.emailAlertManager.open({
            type: AlertMessage.TYPE_SUCCESS,
            label: EMAIL_SUCCESS
          })
          this.emailStatus = EMAIL_STATUS_UNVERIFIED
        }
      })
    },

    /**
     * Route
     */

    // _scrollToPanel
    _scrollToPanel () {
      if (!(this.$route &&
        this.$route.params &&
        this.$route.params.platform)) {
        return
      }
      let platform = this.$route.params.platform
      let target = ''
      switch (platform) {
        case 'slack':
          target = '.panel-slack'
          break
        case 'forward-email':
          target = '.panel-email'
          break
      }
      if (!target) {
        return
      }
      this.$nextTick(() => {
        const offset = $(target, this.$el).offset()
        $('.state-complete', this.$el).scrollTop(offset.top)
      })
    }

  },

  mounted () {
    this._setupClient()
  }

}
</script>
