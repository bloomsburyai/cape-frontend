<style lang="scss">
  html, body {
    width: 100%;
    height: 100%;
  }
  body {
    font-family: 'Roboto', sans-serif;
  }

  /**
   * Bootstrap buttons
   */

  .btn {
    border: 0;
    box-shadow: none;
    cursor: pointer; cursor: hand;

    &:focus,
    &.focus,
    &:hover,
    &.hover,
    &:active,
    &.active {
      box-shadow: none;
    }
  }
</style>

<style scoped lang="scss">
  @import "./scss/cape";

  .cape-dashboard {
    @include layout-vertical();
    height: 100%;

    // Header

    & > .header {
      pozition: relative;
      z-index: 1;
    }

    // Content

    & > .content {
      position: relative;
      @include layout-flex();

      // Dashboard header

      .cape-dashboard-header-layout {
        box-shadow: $box-shadow-4;
      }

      // Dashboard navigation

      .cape-dashboard .cape-dashboard-navigation-layout {
        box-shadow: $box-shadow-1;
        width: 15rem;
        height: 100%;
        @include layout-scroll-vertical();
      }

    }

    // Covers

    .covers {
      @include layout-fit();
      z-index: 2;
    }

    // Onboarding

    .cape-dashboard-onboarding {
      @include layout-fit();
      z-index: 3;
    }

  }
</style>

<template>
  <div class="cape-dashboard">
    <div class="header">
      <template v-if="termsAlertOpened">
        <cape-dashboard-terms-alert
          ref="termsAlert"
          v-on:open="_handleTermsAlertOpen"
          v-on:close="_handleTermsAlertClose"/>
      </template>
    </div>
    <div class="content">
      <cape-dashboard-layout-header-content
        v-bind:hasScrollingRegion="true"
        v-bind:fullbleed="true"
        class="cape-dashboard">
        <cape-dashboard-header-layout
            slot="header"
            v-on:toggle="toggleNavigation"/>
        <cape-dashboard-layout-drawer-content
          slot="content"
          ref="drawerContentLayout"
          v-bind:fullbleed="true"
          v-bind:opened="drawerOpened">
          <cape-dashboard-navigation-layout
            slot="drawer"></cape-dashboard-navigation-layout>
          <div slot="content">
            <router-view></router-view>
          </div>
        </cape-dashboard-layout-drawer-content>
      </cape-dashboard-layout-header-content>
    </div>
    <template v-if="coversOpened">
      <div class="covers">
        <template v-if="termsModalOpened">
          <cape-dashboard-terms-modal
            ref="termsModal"
            v-on:close="_handleTermsModalClose"
            v-on:agree="_handleTermsModalAgree"/>
        </template>
      </div>
    </template>
    <template v-if="onboardingOpened">
      <cape-dashboard-onboarding
        ref="onboarding"
        v-on:close="_handleOnboardinClose"/>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
import client from '@/client'
import TermsAlert from '@/components/terms/Alert'
import TermsModal from '@/components/terms/Modal'
import LayoutHeaderContent from '@/components/layout/HeaderContent'
import LayoutDrawerContent from '@/components/layout/DrawerContent'
import HeaderLayout from '@/components/header/Layout'
import NavigationLayout from '@/components/navigation/Layout'
import Onboarding from '@/components/Onboarding'

export default {

  data () {
    return {
      drawerOpened: true,
      coversOpened: false,
      termsAlertOpened: false,
      termsModalOpened: false,
      onboardingOpened: false
    }
  },

  components: {
    'cape-dashboard-terms-alert': TermsAlert,
    'cape-dashboard-terms-modal': TermsModal,
    'cape-dashboard-layout-header-content': LayoutHeaderContent,
    'cape-dashboard-layout-drawer-content': LayoutDrawerContent,
    'cape-dashboard-header-layout': HeaderLayout,
    'cape-dashboard-navigation-layout': NavigationLayout,
    'cape-dashboard-onboarding': Onboarding
  },

  methods: {

    /**
     * Client
     */

    // _setupClient retrieves the user profile
    // data from the API. It then, depending on the
    // user profile state in the backend shows the
    // terms or onoarding components.
    _setupClient () {
      client.user.profile.get((error, data) => {
        if (!error && data && _.has(data, 'termsAgreed') && !data.termsAgreed) {
          this.termsAlertOpened = true
        }
        if (!error && data && _.has(data, 'onboardingCompleted') && !data.onboardingCompleted) {
          this.onboardingOpened = true
        }
      })
    },

    /**
     * Terms alert
     */

    // _handleTermsAlertOpen is an event handler
    // triggered when the modal link in the alert
    // component gets clicked. It then shows the
    // terms modal.
    _handleTermsAlertOpen () {
      this.coversOpened = true
      this.termsModalOpened = true
    },

    // _handleTermsAlertClose is an event handler
    // triggered when the terms alert gets closed.
    // It closes the alert and marks the terms as
    // agreed in the backend.
    _handleTermsAlertClose () {
      client.user.terms.agree()
      this.coversOpened = false
      this.termsAlertOpened = false
    },

    /**
     * Terms modal
     */

    // _handleTermsModalClose is an event handler
    // triggered when the terms modal gets closed.
    _handleTermsModalClose () {
      this.coversOpened = false
      this.termsModalOpened = false
    },

    // _handleTermsModalAgree is an event handler
    // triggered when the user agrees to the terms
    // presented in the modal.
    _handleTermsModalAgree () {
      this.coversOpened = false
      this.termsModalOpened = false
      this.termsAlertOpened = false
    },

    /**
     * Onboarding
     */

    // _handleOnboardingClose is an event handler
    // triggered when the onboarding component
    // reaches the end and the user has finished
    // this process. It removes the component from
    // the DOM.
    _handleOnboardinClose () {
      this.onboardingOpened = false
    },

    /**
     * Header
     */

    // toggleNavigation shows
    // or hides the navigation
    toggleNavigation () {
      this.drawerOpened = !this.drawerOpened
    }
  },

  mounted () {
    this._setupClient()
  }

}
</script>
