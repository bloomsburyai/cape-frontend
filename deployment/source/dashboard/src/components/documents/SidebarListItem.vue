<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-documents-sidebar-list-item {
    @include layout-horizontal();
    @include layout-center();
    position: relative;
    @include utility-selection-prevent();
    @include utility-cursor-pointer();
    background: transparent;
    height: 4.5rem;
  }

  .cape-dashboard-documents-sidebar-list-item:hover,
  .cape-dashboard-documents-sidebar-list-item.active {
    background-color: $grey-100;
  }

  // Icon

  .icon-section {
    margin: 0 1rem;
  }

  .icon {
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 1.25rem;
    text-align: center;
    background-color: $blue-grey-100;
  }

  .icon .fa {
    font-size: 0.875rem;
    color: $blue-grey-500;
  }

  // Body

  .body-section {
    @include layout-flex();
    @include layout-horizontal();
    @include layout-center();
    position: relative;
    width: 100%;
    height: 100%;
  }

  .body-section .separator {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 0.0625rem;
    background-color: $grey-100;
  }

  // Content

  .content-section {
    position: relative;
    @include layout-flex();
    height: 100%;
    overflow: hidden;
  }

  .content-section .content-wrapper {
    @include layout-fit();
    @include layout-vertical();
    @include layout-center-justified();
    overflow: hidden;
  }

  .content-section .content {
    margin: 0 1rem 0 0;
  }

  .content-section .content .title {
    @include utility-text-truncate-single-line();
    width: 100%;

    @include typography-body-1();
    color: $blue-grey-400;
  }

  .content-section .content .created {
    @include typography-caption();
    color: $blue-grey-200;
  }

  // Actions

  .cape-dashboard-dropdown-content-layout {
    position: relative;
    z-index: 1;
    margin: 0 0.25rem 0 0;
  }

  .cape-dashboard-icon-button {
    background-color: transparent;
    color: $grey-400;
  }

  .cape-dashboard-icon-button:hover,
  .cape-dashboard-dropdown-content-layout.active .cape-dashboard-icon-button {
    background-color: $grey-300;
    color: $grey-600;
  }

  .cape-dashboard-dropdown-icon-label-option:hover {
    background-color: $grey-100;
  }
</style>

<template>
  <div
    class="cape-dashboard-documents-sidebar-list-item"
    v-bind:class="componentClassObject"
    v-on:click="_handleClick">

    <div class="icon-section">
      <div class="icon">
        <i
          v-bind:class="iconClass"
          aria-hidden="true"></i>
      </div>
    </div>

    <div class="body-section">

      <div class="content-section">
        <div class="content-wrapper">
          <div class="content">
            <h6 class="title">
              <template v-if="title">
                {{ title }}
              </template>
              <template v-else>
                Untitled {{ cid }}
              </template>
            </h6>
            <small class="created">{{ createdLabel }}</small>
          </div>
        </div>
      </div>

      <cape-dashboard-dropdown-content-layout
        horizontalAlign="right"
        verticalAlign="top"
        ref="dropdown">
        <cape-dashboard-icon-button
          slot="trigger"
          icon="fa-ellipsis-v"
          v-bind:iconSize="0.875"
          v-bind:size="2.5"/>
        <div slot="content">
          <cape-dashboard-dropdown-icon-label-option
            icon="fa-times"
            v-bind:iconSize="0.875"
            v-bind:iconColor="color.GREY_400"
            label="Delete"
            v-bind:labelColor="color.BLUE_GREY_400"
            v-on:click.native="_handleActionClick(ACTION_DELETE)"
            />
        </div>
      </cape-dashboard-dropdown-content-layout>

      <div class="separator"></div>

    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'
import * as color from '@/color'
import * as type from './type'
import * as action from './action'
import IconButton from '@/components/button/Icon'
import DropdownContentLayout from '@/components/dropdown/content/Layout'
import DropdownIconLabelOption from '@/components/dropdown/option/LabelIcon'

const ACTION = action.EVENT
const ACTION_DELETE = action.DELETE

export default {

  ACTION: ACTION,
  ACTION_DELETE: ACTION_DELETE,

  data () {
    return {
      // expose color to
      // the template above
      color: color,
      // expose action constants
      // to the template above
      ACTION_DELETE: ACTION_DELETE,
      // component
      componentClassObject: {
        active: false
      }
    }
  },

  props: {
    id: {
      type: String,
      default: ''
    },
    // client id is used to keep track
    // of items that are new and have
    // not been saved on the backend
    cid: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '',
      validator (value) {
        return value === type.TEXT || value === type.FILE
      }
    },
    created: {
      type: Number,
      default: 0
    }
  },

  components: {
    'cape-dashboard-icon-button': IconButton,
    'cape-dashboard-dropdown-content-layout': DropdownContentLayout,
    'cape-dashboard-dropdown-icon-label-option': DropdownIconLabelOption
  },

  computed: {
    iconClass () {
      let value = 'fa '
      switch (this.type) {
        case type.TEXT:
          value += 'fa-clipboard'
          break
        case type.FILE:
          value += 'fa-file-text'
          break
      }
      return value
    },
    createdLabel () {
      return moment.unix(this.created).format('MMM DD, YYYY')
    },
    selected: {
      get () {
        return this.componentClassObject.active
      },
      set (value) {
        this.componentClassObject.active = value
      }
    }
  },

  methods: {

    // Event handler that is triggered when
    // the user clicks this component and
    // it checks if it should emit "select"
    // event.
    _handleClick (e) {
      let dropdown = this.$refs.dropdown.$el
      let insideDropdown = false
      if (dropdown === e.target || $(dropdown, this.$el).has(e.target).length) {
        insideDropdown = true
      }
      if (!insideDropdown) {
        this.$emit('select', this)
      }
    },

    // Event handler that is triggered when
    // a dropdown action is clicked.
    _handleActionClick (action) {
      const dropdown = this.$refs.dropdown
      if (dropdown) {
        dropdown.close()
      }
      this.$emit(ACTION, {
        type: action,
        id: this.id,
        cid: this.cid
      })
    }

  }

}
</script>
