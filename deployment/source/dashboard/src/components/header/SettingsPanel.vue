<style scoped lang="scss">
  @import "../../scss/cape";

  $tail-side: 0.375rem;
  $tail-top: 0.375rem;
  $tail-right: 0.75rem - 0.125rem;

  .cape-dashboard-header-settings-panel {
    display: block;
    position: relative;
    width: 25.125rem;

    // Tail

    .tail {
      position: absolute;
      top: -$tail-top;
      right: $tail-right;
      width: 0;
      height: 0;
      border-left: $tail-side solid transparent;
      border-right: $tail-side solid transparent;

      border-bottom: $tail-side solid $white;
    }

    // Header

    .header {
      box-shadow: $box-shadow-1;
      padding: 0 1.5rem;

      h6 {
        @include typography-body-2();
        line-height: 3rem;
        color: $blue-grey-600;

      }

    }

    // Content

    .content {
      padding: 1.5rem;

      // Label

      label {
        @include typography-body-1();
        color: $blue-grey-400;
        margin: 0 0 0.75rem 0;
      }

      // Dropdown

      .cape-dashboard-dropdown-content-layout {
        position: relative;
        z-index: 1;

        // Trigger

        .cape-dashboard-dropdown-label-trigger {
          display: block;
          width: 100%;
          border: 0.0625rem solid $grey-300;
        }

        .cape-dashboard-dropdown-label-trigger:hover,
        &.active .cape-dashboard-dropdown-label-trigger {
          background-color: $grey-100;
        }

        // Option

        .cape-dashboard-dropdown-label-option {
          color: $blue-grey-400;

          &:hover {
            background-color: $grey-100;
          }
        }

      }

      // Actions

      .actions {
        @include layout-horizontal();
        @include layout-end-justified();

        // Button

        .cape-dashboard-progress-label-button {
          background-color: $green-500;
          color: $white;
        }

        .cape-dashboard-progress-label-button:hover {
          background-color: $green-700;
        }

      }

      // Inputs

      .input-group {

        input.form-control {
          @include typography-body-1();
          text-transform: none;
          text-align: left;
          border-radius: 0.125rem 0 0 0.125rem;
          height: 2.25rem;
          line-height: 2.25rem;
          padding: 0 1rem;
          border: 0.0625rem solid $grey-300;
          color: $blue-grey-400;

          &:focus {
            box-shadow: none;
            border: 0.0625rem solid $grey-300;
          }

          &[readonly] {
            background-color: $white;
          }
        }

        .input-group-addon {
          transition: all .15s ease-in-out;
          padding: 0 0.5rem;
          border: 0.0625rem solid $grey-300;
          border-left: 0;
          background: transparent;

          .cape-dashboard-icon-button {
            color: $grey-400;
          }

          &:hover {
            background-color: $grey-100;

            .cape-dashboard-icon-button {
              color: $grey-600;
            }
          }
        }

      }

      // Admin token

      .form-group-admin-token {

        .input-group {
          margin-bottom: 1rem;

          .form-control,
          .form-control:disabled,
          .form-control[readonly] {
            border: 0.0625rem solid $red-200;
            // border-right: 0.0625rem solid $grey-300;
          }

          .input-group-addon {
            border: 0.0625rem solid $red-200;
            border-left: 0;
          }
        }

        .info {
          i {
            color: $red-500;
          }
          span {
            color: $red-500;
          }
        }
      }

      // Links

      .links{
        @include layout-horizontal();
        margin: 0 -0.5rem;

        .btn {
          @include layout-flex();
          @include typography-body-1();
          background: $blue-grey-200;
          color: $white;
          margin: 0 0.5rem;

          &:hover {
            background: $blue-grey-300;
          }
        }
      }

      // Info

      .info {
        @include layout-horizontal();

        // Icon

        i {
          width: 0.875rem;
          height: 0.875rem;
          font-size: 0.875rem;
          color: $grey-400;
          margin: 0.1875rem 0 0 0;
        }

        // Text

        span {
          @include layout-flex();
          @include typography-caption();
          color: $blue-grey-200;
          margin: 0 0 0 0.5rem;
        }

        // Link

        a {
          color: $blue-500;
        }
      }

    }


  }
</style>

<template>
  <div class="cape-dashboard-header-settings-panel">
    <div class="tail"></div>
    <cape-dashboard-alert-manager
      ref="alertManager"/>
    <div class="message">
      <div class="header">
        <h6>Message settings</h6>
      </div>
      <div class="content">
        <div class="form-group">
          <label>Confidence score threshold</label>
          <cape-dashboard-dropdown-content-layout
            horizontalAlign="left"
            verticalAlign="top"
            v-bind:block="true"
            ref="thresholdDropdown">
            <cape-dashboard-dropdown-label-trigger
              slot="trigger"
              v-bind:label="thresholdDropdownModel.label"
              v-bind:labelColor="color.BLUE_GREY_400"
              v-bind:caretColor="color.GREY_400"/>
            <div slot="content">
              <template v-for="model in thresholdDropdownCollection">
              <cape-dashboard-dropdown-label-option
                v-bind:label="model.label"
                v-on:click.native="_handleThresholdDropdownOptionSelect($event, model)"/>
              </template>
            </div>
          </cape-dashboard-dropdown-content-layout>
        </div>
        <div class="actions">
          <cape-dashboard-progress-label-button
            label="Save"
            v-on:click.native="_handleThresholdSaveClick"
            v-bind:progress="thresholdSaveProgress"/>
        </div>
      </div>
    </div>

    <div class="token">
      <div class="header">
        <h6>API access</h6>
      </div>
      <div class="content">
        <div class="form-group">
          <label>Question answering API token</label>
          <div class="input-group">
            <input
              v-bind:value="queryTokenValue"
              type="text"
              class="form-control"
              readonly
              ref="queryTokenInput"
              />
            <div class="input-group-addon">
              <cape-dashboard-icon-button
                v-bind:icon="queryTokenButtonIcon"
                v-bind:iconSize="0.875"
                v-bind:size="2"
                v-on:click.native="_handleTokenCopyClick(TOKEN_QUERY)"
                />
            </div>
          </div>
        </div>
        <div class="form-group form-group-admin-token">
          <label>Administration API token</label>
          <div class="input-group">
            <input
              v-bind:value="adminTokenValue"
              type="text"
              class="form-control"
              readonly
              ref="adminTokenInput"
              />
            <div class="input-group-addon">
              <cape-dashboard-icon-button
                v-bind:icon="adminTokenButtonIcon"
                v-bind:iconSize="0.875"
                v-bind:size="2"
                v-on:click.native="_handleTokenCopyClick(TOKEN_ADMIN)"
                />
            </div>
          </div>
          <div class="info">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
            <span>
              This token allows full control of your account. Keep it safe.
            </span>
          </div>

        </div>
        <div class="form-group">
          <label>Documentation</label>
          <div class="links">
            <a
              class="btn"
              v-bind:href="links.documentationURL"
              target="_blank">
              API
            </a>
            <a
              class="btn"
              v-bind:href="links.issueTrackerURL"
              target="_blank">
              Issue tracker
            </a>
            <a
              class="btn"
              v-bind:href="links.pythonClientURL"
              target="_blank">
              Python client
            </a>
          </div>
        </div>
        <div class="info">
          <i class="fa fa-info-circle" aria-hidden="true"></i>
          <span>
            For more information please email us at <a href="mailto:contact@bloomsbury.ai">contact@bloomsbury.ai</a>.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import client from '@/client'
import * as color from '@/color'
import configuration from '@/configuration'
import AlertManager from '@/components/alert/Manager'
import AlertMessage from '@/components/alert/Message'
import DropdownContentLayout from '@/components/dropdown/content/Layout'
import DropdownLabelTrigger from '@/components/dropdown/trigger/Label'
import DropdownLabelOption from '@/components/dropdown/option/Label'
import ProgressLabelButton from '@/components/button/ProgressLabel'
import IconButton from '@/components/button/Icon'

const TOKEN_QUERY = 'tokenQuery'
const TOKEN_ADMIN = 'tokenAdmin'

const ICON_SWAP_DELAY = 3000

const ALERT_LABEL_SUCCESS = 'Success.'

export default {

  data () {
    const thresholdDropdownCollection = [
      {
        label: 'Very low',
        value: client.THRESHOLD_VERY_LOW
      },
      {
        label: 'Low',
        value: client.THRESHOLD_LOW
      },
      {
        label: 'Medium',
        value: client.THRESHOLD_MEDIUM
      },
      {
        label: 'High',
        value: client.THRESHOLD_HIGH
      },
      {
        label: 'Very high',
        value: client.THRESHOLD_VERY_HIGH
      }
    ]
    return {
      // expose color to the template
      color: color,
      // expose links to the template
      links: configuration.links,
      // token
      TOKEN_QUERY: TOKEN_QUERY,
      TOKEN_ADMIN: TOKEN_ADMIN,
      queryTokenButtonShowCheckIcon: false,
      adminTokenButtonShowCheckIcon: false,
      // tokenQueryButtonIcon: '',
      // tokenAdminButtonIcon: '',
      // threshold
      thresholdDropdownCollection: thresholdDropdownCollection,
      thresholdDropdownModel: {
        label: '',
        value: ''
      },
      thresholdSaveProgress: false,
      // token
      queryTokenValue: '',
      adminTokenValue: ''
    }
  },

  components: {
    'cape-dashboard-alert-manager': AlertManager,
    'cape-dashboard-dropdown-content-layout': DropdownContentLayout,
    'cape-dashboard-dropdown-label-trigger': DropdownLabelTrigger,
    'cape-dashboard-dropdown-label-option': DropdownLabelOption,
    'cape-dashboard-progress-label-button': ProgressLabelButton,
    'cape-dashboard-icon-button': IconButton
  },

  computed: {
    queryTokenButtonIcon () {
      let value = 'fa-copy'
      if (this.queryTokenButtonShowCheckIcon) {
        value = 'fa-check'
      }
      return value
    },
    adminTokenButtonIcon () {
      let value = 'fa-copy'
      if (this.adminTokenButtonShowCheckIcon) {
        value = 'fa-check'
      }
      return value
    }
  },

  methods: {

    /**
     *
     * Component
     *
     */

    // update takes care of updating the layout
    // of the components that compute their looks
    // This is needed because the panel is hidden
    // by default and shown as a consequence of
    // a user action
    update () {
      this.$nextTick(() => {
        if (this.$refs.thresholdDropdown) {
          this.$refs.thresholdDropdown.update()
        }
      })
    },

    /**
     *
     * Alert manger
     *
     */

    _closeAlertManager () {
      const alertManager = this.$refs.alertManager
      if (alertManager && alertManager.opened) {
        alertManager.close()
      }
    },

    /**
     *
     * Threshold
     *
     */

    _setupThreshold () {
      client.user.threshold.get((error, value) => {
        if (error) {
          this.$refs.alertManager.open({
            type: AlertMessage.TYPE_ERROR,
            label: error.message
          })
        } else {
          const thresholdDropdownModel = _.find(this.thresholdDropdownCollection, {value: value})
          if (thresholdDropdownModel) {
            this.thresholdDropdownModel = thresholdDropdownModel
          }
        }
      })
    },

    _handleThresholdDropdownOptionSelect (e, model) {
      this.thresholdDropdownModel = model
      // close threshold dropdown
      this.$refs.thresholdDropdown.close()
      // close alert manager
      this._closeAlertManager()
    },

    _handleThresholdSaveClick () {
      this._closeAlertManager()
      this.thresholdSaveProgress = true
      const thresholdValue = this.thresholdDropdownModel.value
      client.user.threshold.set(thresholdValue, (error, data) => {
        this.thresholdSaveProgress = false
        if (error) {
          this.$refs.alertManager.open({
            type: AlertMessage.TYPE_ERROR,
            label: error.message
          })
        } else {
          this.$refs.alertManager.open({
            type: AlertMessage.TYPE_SUCCESS,
            label: ALERT_LABEL_SUCCESS
          })
        }
      })
    },

    /**
     *
     * Token
     *
     */

    // _setupToken calls the API to get
    // token values and handles error cases
    _setupToken () {
      client.user.token.query.get((error, value) => {
        if (error) {
          this.$refs.alertManager.open({
            type: AlertMessage.TYPE_ERROR,
            label: error.message
          })
        } else {
          this.queryTokenValue = value
        }
      })
      client.user.token.admin.get((error, value) => {
        if (error) {
          this.$refs.alertManager.open({
            type: AlertMessage.TYPE_ERROR,
            label: error.message
          })
        } else {
          this.adminTokenValue = value
        }
      })
    },

    // _handleTokenCopy click is an event handler
    // that is triggered when a copy button is clicked
    _handleTokenCopyClick (type) {
      if (!this.$refs.queryTokenInput || !this.$refs.adminTokenInput) {
        return
      }

      let inputReference = null
      let iconDataKey = ''
      switch (type) {
        case TOKEN_QUERY:
          inputReference = this.$refs.queryTokenInput
          iconDataKey = 'queryTokenButtonShowCheckIcon'
          // this.$refs.queryTokenInput.select()
          break
        case TOKEN_ADMIN:
          inputReference = this.$refs.adminTokenInput
          iconDataKey = 'adminTokenButtonShowCheckIcon'
          // this.$refs.adminTokenInput.select()
          break
      }
      if (!inputReference) {
        return
      }

      // select & copy
      inputReference.select()
      let copied = false
      try {
        copied = document.execCommand('copy')
      } catch (error) {

      }

      // deselect
      inputReference.selectionStart = 0
      inputReference.selectionEnd = 0

      // swap icons
      if (copied) {
        this[iconDataKey] = true
        _.delay(() => {
          this[iconDataKey] = false
        }, ICON_SWAP_DELAY)
      }
    }

  },

  mounted () {
    this._setupThreshold()
    this._setupToken()
  }

}
</script>
