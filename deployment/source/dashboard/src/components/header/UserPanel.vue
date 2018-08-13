<style scoped lang="scss">
  @import "../../scss/cape";

  $tail-side: 0.375rem;
  $tail-top: 0.375rem;
  $tail-right: 0.75rem - 0.125rem;

  $icon-height: 3.5rem;

  .cape-dashboard-header-user-panel {
    display: block;
    position: relative;
    width: 15.125rem;

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

    // Details

    .details {
      padding: 1.5rem;
      text-align: center;
      border-bottom: 0.0625rem solid $grey-100;

      .icon {
        height: $icon-height;
        overflow: hidden;
        color: $grey-300;
        margin: 0 0 1rem 0;

        i {
          font-size: $icon-height;
        }
      }

      .username {
        @include typography-body-1();
        @include utility-text-truncate-single-line();
        color: $blue-grey-400;
      }
    }

    // Plan

    .plan {
      padding: 1.5rem;
      border-bottom: 0.0625rem solid $grey-100;

      h6 {
        @include typography-body-2();
        color: $blue-grey-600;
        margin: 0 0 0.5rem 0;
      }

      // Dropdown

      .cape-dashboard-dropdown-content-layout {
        position: relative;
        z-index: 1;
        margin: 0 0 1rem 0;

        // Trigger

        .cape-dashboard-dropdown-label-trigger {
          display: block;
          width: 100%;
          border: 1px solid $grey-300;
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

      // Store

      .store {
        margin: 0 0 1rem 0;

        p {
          @include typography-body-1();
          margin: 0 0 0.5rem 0;
          color: $blue-grey-400;

          span {
            color: $blue-500;
          }
        }

        dl {
          padding: 0;
          margin: 0 0 0.5rem 0;
        }

        dt,
        dd {
          @include typography-body-2();
          font-weight: $font-weight-regular;
        }

        dt {
          color: $blue-grey-200;
        }

        dd {
          color: $blue-grey-400;
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

          &:hover {
            background-color: $green-700;
          }
        }

      }

    }

    // Footer

    .footer {
      padding: 1.5rem;

      .cape-dashboard-label-button {
        background-color: $red-500;
        color: $white;

        &:hover {
          background-color: $red-700;
        }
      }
    }
  }
</style>

<template>
  <div class="cape-dashboard-header-user-panel">
    <div class="tail"></div>

    <!-- Details -->

    <div class="details">
      <!--
      <div class="icon">
        <i class="fa fa-user-circle" aria-hidden="true"></i>
      </div>
      -->
      <div class="username">
        {{ username }}
      </div>
    </div>

    <!-- End details -->

    <cape-dashboard-alert-manager
      ref="alertManager"/>

    <!-- Plan -->

    <div class="plan">
      <h6>Pricing plan</h6>
      <cape-dashboard-dropdown-content-layout
        horizontalAlign="left"
        verticalAlign="top"
        v-bind:block="true"
        ref="planDropdown">
        <cape-dashboard-dropdown-label-trigger
          slot="trigger"
          v-bind:label="planModel.label"
          v-bind:labelColor="color.BLUE_GREY_400"
          v-bind:caretColor="color.GREY_400"/>
        <div slot="content">
          <template v-for="model in planCollection">
            <cape-dashboard-dropdown-label-option
              v-bind:label="model.label"
              v-on:click.native="_handlePlanDropdownOptionSelect($event, model)"/>
          </template>
        </div>
      </cape-dashboard-dropdown-content-layout>

      <template v-if="storeModel">
        <div class="store">
          <p>30 days free then <span>{{ storeModel.price }}</span></p>
          <dl>
            <dt>Support</dt>
            <dd>{{ storeModel.support }}</dd>
          </dl>
          <dl>
            <dt>Rate limit</dt>
            <dd>{{ storeModel.rateLimit }}</dd>
          </dl>
        </div>
      </template>

      <div class="actions">
        <cape-dashboard-progress-label-button
          v-bind:label="planSaveLabel"
          v-bind:disabled="planSaveDisabled"
          v-bind:progress="planSaveProgress"
          v-on:click.native="_handlePlanSaveClick"/>
      </div>
    </div>

    <!-- End plan -->

    <!-- Footer -->

    <div class="footer">
      <cape-dashboard-label-button
        label="Logout"
        v-bind:block="true"
        v-on:click.native="logout"/>
    </div>

    <!-- End footer -->

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
import LabelButton from '@/components/button/Label'

const DEFAULT_USERNAME = 'unknown'

export default {

  DEFAULT_USERNAME: DEFAULT_USERNAME,

  data () {
    const planCollection = [
      {
        label: 'Free',
        value: client.PLAN_FREE
      },
      {
        label: 'Basic',
        value: client.PLAN_BASIC
      },
      {
        label: 'Pro',
        value: client.PLAN_PRO
      }
    ]
    const storeCollection = {
      [client.PLAN_BASIC]: {
        price: '$90/mo',
        support: '2 day response',
        rateLimit: '10 calls / 1 min'
      },
      [client.PLAN_PRO]: {
        price: '$590/mo',
        support: '1 day response',
        rateLimit: '120 calls / 1 min'
      }
    }
    return {
      // expose color to the template
      color: color,
      // profile
      username: DEFAULT_USERNAME,
      userPlanValue: '',
      // plan
      planCollection: planCollection,
      planModel: planCollection[0],
      planSaveProgress: false,
      // store
      storeCollection: storeCollection,
      storeModel: null
    }
  },

  components: {
    'cape-dashboard-alert-manager': AlertManager,
    'cape-dashboard-dropdown-content-layout': DropdownContentLayout,
    'cape-dashboard-dropdown-label-trigger': DropdownLabelTrigger,
    'cape-dashboard-dropdown-label-option': DropdownLabelOption,
    'cape-dashboard-progress-label-button': ProgressLabelButton,
    'cape-dashboard-label-button': LabelButton
  },

  computed: {
    planSaveLabel () {
      let value = 'Subscribe'
      if (this.userPlanValue &&
        this.planModel &&
        this.planModel.value &&
        this.planModel.value === this.userPlanValue) {
        value = 'Subscribed'
      }
      return value
    },
    planSaveDisabled () {
      let value = false
      if (this.userPlanValue &&
        this.planModel &&
        this.planModel.value &&
        this.planModel.value === this.userPlanValue) {
        value = true
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
    // of the components that compute their looks.
    // This is needed because the panel is hidden
    // by default and shown as a consequence of
    // a user action.
    update () {
      this.$nextTick(() => {
        if (this.$refs.planDropdown) {
          this.$refs.planDropdown.update()
        }
      })
    },

    /**
     *
     * Profile
     *
     */

    // _setupProfile calls the API to
    // get the user profile details
    _setupProfile () {
      client.user.profile.get((error, data) => {
        if (error) {
          this.username = DEFAULT_USERNAME
          this.planModel = this.planCollection[0]
        } else {
          this.username = data.username
          const planModel = _.find(this.planCollection, {value: data.plan})
          if (planModel) {
            this.planModel = planModel
          } else {
            this.planModel = this.planCollection[0]
          }
        }
        this.userPlanValue = this.planModel.value
        this._updateStore()
      })
    },

    /**
     *
     * Plan
     *
     */

    // _updateStore syngs the store model
    // taking into account the plan model
    _updateStore () {
      const model = this.planModel
      if (this.storeCollection[model.value]) {
        this.storeModel = this.storeCollection[model.value]
      } else {
        this.storeModel = null
      }
    },

    // // _handlePlanClick is an event handler
    // // triggered when the user changes the
    // // plan
    // _handlePlanClick (value) {
    //   this.plan = value
    //   client.user.plan.set(value)
    // },

    // _handlePlanDropdownOptionSelect is an event
    // handler triggered when a plan is selected
    // from the dropdown
    _handlePlanDropdownOptionSelect (e, model) {
      this.$refs.alertManager.close()
      this.$refs.planDropdown.close()
      this.planModel = model
      this._updateStore()
    },

    // _handlePlanSaveClick is an event handler
    // triggered when the plan save button gets
    // clicked
    _handlePlanSaveClick () {
      this.$refs.alertManager.close()
      this.planSaveProgress = true
      this.userPlanValue = this.planModel.value
      client.user.plan.set(this.planModel.value, (error) => {
        this.planSaveProgress = false
        if (error) {
          this.$refs.alertManager.open({
            type: AlertMessage.TYPE_ERROR,
            label: error.message
          })
        } else {
          this.$emit('close')
        }
      })
    },

    /**
     *
     * Actions
     *
     */

    logout () {
      client.authentication.logout((error, data) => {
        if (error) {
          // TODO: handle error
        } else {
          const redirectURL = _.get(configuration, 'authentication.logout.redirectURL')
          if (redirectURL) {
            window.location.href = redirectURL
          }
        }
      })
    }
  },

  mounted () {
    this._setupProfile()
  }

}
</script>
