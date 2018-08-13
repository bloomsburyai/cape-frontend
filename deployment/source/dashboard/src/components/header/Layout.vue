<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-header-layout {
    background-color: $blue-800;
    height: 4rem;
    min-height: 4rem;
    padding: 0 1.25rem 0 0.9375rem;

    .toggle {
      width: 10rem;
    }

    .title {
      @include typography-subheading-1();
      color: $blue-400;
    }

    .actions {
      @include layout-horizontal();
      @include layout-end-justified();
      width: 10rem;
    }
  }

  .cape-dashboard-header-layout .logo {
    display: inline-block;
    margin: 0.375rem 0 0 0.9375rem;
  }

  .cape-dashboard-header-layout .logo .symbol {
    display: inline-block;
    width: 36px;
    height: 23px;
    background: url("../../assets/symbol.svg") no-repeat top left;
    background-size: contain;
  }

  .cape-dashboard-header-layout .logo .type {
    margin: -0.125rem 0 0 0.3125rem;
  }

  .cape-dashboard-header-layout .logo .type .name {
    text-transform: uppercase;
    color: $white;
    font-size: 1.125rem;
    font-weight: $font-weight-medium;
    line-height: 1;
  }

  .cape-dashboard-header-layout .logo .type .version {
    color: $blue-400;
    font-size: 0.625rem;
    line-height: 1;
    margin: -0.125rem 0 0 0;
  }


  .cape-dashboard-header-layout {

    // Dropdowns

    .cape-dashboard-icon-button {
      background-color: transparent;
      border-radius: 1rem;
      color: $white;

      margin: 1rem 0;
    }

    .cape-dashboard-icon-button:hover,
    .cape-dashboard-dropdown-content-layout.active .cape-dashboard-icon-button {
      background-color: $blue-900;
    }

    // User dropdown

    .btn-user-trigger {
      margin-left: 0.625rem;
    }
  }
</style>

<template>
  <div class="cape-dashboard-header-layout">
    <div class="h-100 d-flex flex-row align-items-center justify-content-between">
      <div class="d-flex flex-row align-items-center toggle">
        <cape-dashboard-icon-button
          icon="fa-bars"
          v-on:click.native="$emit('toggle')"
          v-bind:icon-size="0.875"
          v-bind:size="2"
          class="btn-navigation-trigger"/>
        <div class="logo">
          <span class="symbol"></span>
          <span class="type float-right">
            <div class="name">Cape</div>
            <div class="version">alpha</div>
          </span>
        </div>
      </div>
      <h5 class="title">Admin panel</h5>
      <div class="actions">
        <cape-dashboard-dropdown-content-layout
          horizontalAlign="right"
          verticalAlign="top"
          v-on:stateChange="_handleSettingsDropdownStateChange">
          <cape-dashboard-icon-button
            slot="trigger"
            icon="fa-cog"
            v-bind:icon-size="1.5"
            v-bind:size="2"
            class="btn-settings-trigger"/>
          <cape-dashboard-header-settings-panel
            slot="content"
            ref="settingsDropdownPanel"/>
        </cape-dashboard-dropdown-content-layout>
        <cape-dashboard-dropdown-content-layout
          ref="userDropdown"
          horizontalAlign="right"
          verticalAlign="top"
          v-on:stateChange="_handleUserDropdownStateChange">
          <cape-dashboard-icon-button
            slot="trigger"
            icon="fa-user-circle"
            v-bind:icon-size="1.5"
            v-bind:size="2"
            class="btn-user-trigger"/>
          <cape-dashboard-header-user-panel
            slot="content"
            ref="userDropdownPanel"
            v-on:close="_handleUserPanelClose"/>
        </cape-dashboard-dropdown-content-layout>
      </div>
    </div>
  </div>
</template>

<script>
import DropdownContentLayout from '@/components/dropdown/content/Layout'
import IconButton from '@/components/button/Icon'
import SettingsPanel from './SettingsPanel'
import UserPanel from './UserPanel'

export default {

  components: {
    'cape-dashboard-dropdown-content-layout': DropdownContentLayout,
    'cape-dashboard-icon-button': IconButton,
    'cape-dashboard-header-settings-panel': SettingsPanel,
    'cape-dashboard-header-user-panel': UserPanel
  },

  methods: {
    /**
     *
     * Settings dropdown
     *
     */

    // _handleSettingsDropdownStateChange is an event
    // handler that is triggered when the settings
    // dropdown is opened or closed
    _handleSettingsDropdownStateChange (opened) {
      if (this.$refs.settingsDropdownPanel && opened) {
        this.$refs.settingsDropdownPanel.update()
      }
    },

    /**
     *
     * User dropdown
     *
     */

    // _handleUserDropdownStateChange is an event
    // handler that is triggered when the user
    // dropdown is opened or closed
    _handleUserDropdownStateChange (opened) {
      if (this.$refs.userDropdownPanel && opened) {
        this.$refs.userDropdownPanel.update()
      }
    },

    // _handleUserPanelClose is an event handler
    // triggered when the user panel triggers a
    // "close" event
    _handleUserPanelClose () {
      this.$refs.userDropdown.close()
    }
  }

}
</script>
