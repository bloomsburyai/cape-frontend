<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-inbox-layout {
    display: block;
    @include layout-fit();

    // Content switcher & item

    .cape-dashboard-content-switcher {
      height: 100%
    }

    .cape-dashboard-content-item {
      height: 100%;

      // Selected state layout

      &.selected {
        &.state-progress {
          @include layout-vertical();
          @include layout-center-center();
        }
      }

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
          max-width: 18rem;

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

      // Header

      .header {
        @include layout-horizontal();
        @include layout-center();
        @include layout-justified();

        height: 3rem;
        background-color: $white;
        box-shadow: $box-shadow-1;

        // Dropdown

        .dropdown {
          @include layout-horizontal();
          @include layout-center();

          // Prefix

          .prefix {
            @include typography-body-1();
            color: $blue-grey-200;
            margin: 0 0.5rem 0 1rem;
          }

          // Dropdown content layout

          .cape-dashboard-dropdown-content-layout {

            // Trigger

            .cape-dashboard-dropdown-label-trigger {
              padding: 0 0.5rem;

              &:hover {
                background-color: $grey-100;
              }

            }

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

        }

        // Search

        .cape-dashboard-search-layout {
          padding: 0 0.1875rem 0 0;
        }

        .cape-dashboard-search-layout.active {
          width: 100%;
        }

      }

      // Content

      .content {
        @include layout-vertical();
        @include layout-center-center();
        height: 100%;

        .body {
          text-align: center;

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

      // Header

      .header {
        @include layout-horizontal();
        height: 3rem;
        background: $white;
        box-shadow: $box-shadow-1;

        // Sidebar

        .sidebar {
          @include layout-horizontal();
          @include layout-center();
          @include layout-justified();
          width: 20rem;
          border-right: 1px solid $grey-100;

          // Dropdown

          .dropdown {
            @include layout-horizontal();
            @include layout-center();

            // Prefix

            .prefix {
              @include typography-body-1();
              color: $blue-grey-200;
              margin: 0 0.5rem 0 1rem;
            }

            // Dropdown content layout

            .cape-dashboard-dropdown-content-layout {

              // Trigger

              .cape-dashboard-dropdown-label-trigger {
                padding: 0 0.5rem;

                &:hover {
                  background-color: $grey-100;
                }

              }

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

          }

          // Search

          .cape-dashboard-search-layout {
            padding: 0 0.1875rem 0 0;
          }

          .cape-dashboard-search-layout.active {
            width: 100%;
          }

        }

        // Viewport

        .viewport {
          @include layout-flex();
          @include layout-horizontal();
          @include layout-center();
          @include layout-justified();
          padding: 0 0.6875rem 0 1.5rem;

          // Title

          .title {
            @include typography-body-2();
            color: $blue-grey-600;
          }

          // Dropdown

          .cape-dashboard-icon-button {
            color: $grey-400;
          }

          .cape-dashboard-icon-button:hover,
          .cape-dashboard-dropdown-content-layout.active .cape-dashboard-icon-button {
            background-color: $grey-100;
            color: $grey-600;
          }

        }

      }

      // Content

      .content {
        @include layout-horizontal();
        height: 100%;

        // Sidebar

        .sidebar {
          @include layout-vertical();
          position: relative;
          z-index: 1;
          width: 20rem;
          box-shadow: $box-shadow-1;

          // Infinite list

          .cape-dashboard-scroll-infinite-list {
            @include layout-flex();
            overflow: hidden;
          }

        }

        // Viewport

        .cape-dashboard-inbox-viewport {
          @include layout-flex();
          @include layout-vertical();
        }

      }

    }

  }
</style>

<template>
  <div class="cape-dashboard-inbox-layout">

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

        Empty

      -->

      <cape-dashboard-content-item
        class="state-empty"
        v-bind:value="STATE_EMPTY">

        <cape-dashboard-layout-header-content
          ref="stateEmptyHeaderContentLayout"
          v-bind:hasScrollingRegion="true"
          v-bind:fullbleed="true">

          <!-- Header -->

          <div slot="header" class="header">

            <template v-if="!sidebarSearchIsOpened">
              <div class="dropdown">
                <div class="prefix">
                  Filter
                </div>
                <cape-dashboard-dropdown-content-layout
                  ref="stateEmptyHeaderSidebarDropdown"
                  horizontalAlign="left"
                  verticalAlign="top">
                  <cape-dashboard-dropdown-label-trigger
                    slot="trigger"
                    v-bind:label="sidebarDropdownModel.label"
                    v-bind:labelColor="color.BLUE_GREY_600"
                    v-bind:caretColor="color.GREY_400"
                    />
                  <div slot="content">
                    <template v-for="model in sidebarDropdownCollection">
                      <cape-dashboard-dropdown-label-option
                        v-bind:label="model.label"
                        v-on:click.native="_handleSidebarDropdownOptionSelect($event, model)"/>
                    </template>
                  </div>
                </cape-dashboard-dropdown-content-layout>
              </div>
            </template>
            <cape-dashboard-search-layout
              v-model="sidebarSearchValue"
              v-on:stateChange="_handleSidebarSearchStateChange"
              v-on:input="_handleSidebarSearchInput"
              placeholder="Search list..."/>

          </div>

          <!-- End header-->

          <!-- Content -->

          <div slot="content" class="content">
            <div class="body">
              <div class="icon">
                <i class="fa fa-envelope-o" aria-hidden="true"></i>
              </div>
              <h5>No user questions found.</h5>
            </div>
          </div>

          <!-- End content -->

        </cape-dashboard-layout-header-content>

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

        <cape-dashboard-layout-header-content
          ref="stateCompleteHeaderContentLayout"
          v-bind:hasScrollingRegion="true"
          v-bind:fullbleed="true">

          <!-- Header -->

          <div slot="header" class="header">

            <!-- Header sidebar -->

            <div class="sidebar">
              <template v-if="!sidebarSearchIsOpened">
                <div class="dropdown">
                  <div class="prefix">
                    Filter
                  </div>
                  <cape-dashboard-dropdown-content-layout
                    ref="stateCompleteHeaderSidebarDropdown"
                    horizontalAlign="left"
                    verticalAlign="top">
                    <cape-dashboard-dropdown-label-trigger
                      slot="trigger"
                      v-bind:label="sidebarDropdownModel.label"
                      v-bind:labelColor="color.BLUE_GREY_600"
                      v-bind:caretColor="color.GREY_400"
                      />
                    <div slot="content">
                      <template v-for="model in sidebarDropdownCollection">
                        <cape-dashboard-dropdown-label-option
                          v-bind:label="model.label"
                          v-on:click.native="_handleSidebarDropdownOptionSelect($event, model)"/>
                      </template>
                    </div>
                  </cape-dashboard-dropdown-content-layout>
                </div>
              </template>
              <cape-dashboard-search-layout
                v-model="sidebarSearchValue"
                v-on:stateChange="_handleSidebarSearchStateChange"
                v-on:input="_handleSidebarSearchInput"
                placeholder="Search list..."/>
            </div>

            <!-- End header sidebar -->

            <!-- Header vieport -->

            <div class="viewport">
              <h6 class="title">Edit reply</h6>
              <cape-dashboard-dropdown-content-layout
                ref="stateCompleteHeaderViewportDropdown"
                horizontalAlign="right"
                verticalAlign="top">
                <cape-dashboard-icon-button
                  slot="trigger"
                  icon="fa-info-circle"
                  v-bind:icon-size="0.875"
                  v-bind:size="2.5"/>
                <div slot="content">
                  <template v-if="sidebarSelectedListModel">
                    <cape-dashboard-inbox-info-item
                      v-bind:created="sidebarSelectedListModel.created"
                      v-bind:questionSource="sidebarSelectedListModel.questionSource"
                      v-bind:answerSource="sidebarSelectedListModel.answerSource"/>
                  </template>
                </div>
              </cape-dashboard-dropdown-content-layout>
            </div>

            <!-- End header viewport -->

          </div>

          <!-- End header-->

          <!-- Content -->

          <div slot="content" class="content">

            <!-- Content sidebar -->

            <div class="sidebar">
              <cape-dashboard-alert-manager
                ref="sidebarAlertManager"/>
              <cape-dashboard-scroll-infinite-list
                ref="sidebarList">
                <cape-dashboard-inbox-sidebar-list-item
                  slot-scope="model"
                  v-bind:key="model.id"
                  v-bind:id="model.id"
                  v-bind:question="model.question"
                  v-bind:created="model.created"
                  v-bind:answered="model.answered"
                  v-bind:read="model.read"
                  v-on:select="_handleSidebarListItemSelect"
                  />
              </cape-dashboard-scroll-infinite-list>
            </div>

            <!-- End content sidebar -->

            <!-- Viewport -->

            <cape-dashboard-inbox-viewport
              v-bind:model="sidebarSelectedListModel"/>

            <!-- End viewport -->

          </div>

          <!-- End content -->

        </cape-dashboard-layout-header-content>

      </cape-dashboard-content-item>

      <!--

        End complete

      -->

    </cape-dashboard-content-switcher>

  </div>
</template>

<script>
import _ from 'lodash'
import client from '@/client'
import * as color from '@/color'
import ContentSwitcher from '@/components/content/Switcher'
import ContentItem from '@/components/content/Item'
import ProgressCircle from '@/components/progress/Circle'
import LayoutHeaderContent from '@/components/layout/HeaderContent'
import AlertManager from '@/components/alert/Manager'
import AlertMessage from '@/components/alert/Message'
import DropdownContentLayout from '@/components/dropdown/content/Layout'
import DropdownLabelTrigger from '@/components/dropdown/trigger/Label'
import DropdownLabelOption from '@/components/dropdown/option/Label'
import SearchLayout from '@/components/search/Layout'
import ScrollInfiniteList from '@/components/ScrollInfiniteList'
import SidebarListItem from './SidebarListItem'
import IconButton from '@/components/button/Icon'
import InfoItem from './InfoItem'
import Viewport from './Viewport'

const STATE_PROGRESS = 'stateProgress'
const STATE_ERROR = 'stateError'
const STATE_EMPTY = 'stateEmpty'
const STATE_COMPLETE = 'stateComplete'

export default {

  data () {
    const sidebarDropdownCollection = [
      {
        label: 'All',
        value: 'both'
      },
      {
        label: 'Unanswered',
        value: 'false'
      }
    ]
    return {
      // expose color to the template
      color: color,
      // state
      STATE_PROGRESS: STATE_PROGRESS,
      STATE_ERROR: STATE_ERROR,
      STATE_EMPTY: STATE_EMPTY,
      STATE_COMPLETE: STATE_COMPLETE,
      state: '',
      // error message
      errorMessage: '',
      // sidebar dropdown
      sidebarDropdownCollection: sidebarDropdownCollection,
      sidebarDropdownModel: sidebarDropdownCollection[0],
      // sidebar search
      sidebarSearchValue: '',
      sidebarSearchIsOpened: false,
      // sidebar list
      sidebarSelectedListItem: null,
      sidebarSelectedListModel: null
    }
  },

  components: {
    'cape-dashboard-content-switcher': ContentSwitcher,
    'cape-dashboard-content-item': ContentItem,
    'cape-dashboard-progress-circle': ProgressCircle,
    'cape-dashboard-layout-header-content': LayoutHeaderContent,
    'cape-dashboard-alert-manager': AlertManager,
    'cape-dashboard-dropdown-content-layout': DropdownContentLayout,
    'cape-dashboard-dropdown-label-trigger': DropdownLabelTrigger,
    'cape-dashboard-dropdown-label-option': DropdownLabelOption,
    'cape-dashboard-search-layout': SearchLayout,
    'cape-dashboard-scroll-infinite-list': ScrollInfiniteList,
    'cape-dashboard-inbox-sidebar-list-item': SidebarListItem,
    'cape-dashboard-icon-button': IconButton,
    'cape-dashboard-inbox-info-item': InfoItem,
    'cape-dashboard-inbox-viewport': Viewport
  },

  methods: {

    /**
     *
     * State
     *
     */

    // updates the state of the view
    // when results are returned from
    // the API call
    _updateState (details) {
      _.defaults(details, {
        progress: false,
        error: null,
        collection: []
      })

      let state = STATE_COMPLETE
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
        if (details.collection && !details.collection.length) {
          state = STATE_EMPTY
        } else {
          state = STATE_COMPLETE
        }
      }

      if (this.state !== state) {
        this.state = state
        switch (this.state) {
          case STATE_EMPTY:
            this.$nextTick(function () {
              this.$refs.stateEmptyHeaderContentLayout.update()
              this.$refs.stateEmptyHeaderSidebarDropdown.update()
            })
            break
          case STATE_COMPLETE:
            this.$nextTick(function () {
              this.$refs.stateCompleteHeaderContentLayout.update()
              this.$refs.stateCompleteHeaderSidebarDropdown.update()
              this.$refs.stateCompleteHeaderViewportDropdown.update()
            })
            break
        }
      }
    },

    /**
     *
     * Sidebar
     *
     */

    /**
     * Sidebar dropdown
     */

    // Event handler that is triggered
    // when a new value is selected from
    // the sidebar dropdown filter.
    _handleSidebarDropdownOptionSelect (e, model) {
      this.sidebarDropdownModel = model
      // close header dropdown
      this.$refs.stateCompleteHeaderSidebarDropdown.close()
      this.$refs.stateEmptyHeaderSidebarDropdown.close()
      // close sidebar alert manager
      const sidebarAlertManager = this.$refs.sidebarAlertManager
      if (sidebarAlertManager) {
        sidebarAlertManager.close()
      }
      // clean current selected list item
      this._deselectSidebarListItemAndModel()
      // reset sidebar list & load
      const sidebarList = this.$refs.sidebarList
      if (sidebarList) {
        sidebarList.reset()
        sidebarList.load()
      }
    },

    /**
     * Sidebar search
     */

    // Event handler that is triggered
    // when the sidebar search component
    // is opened or clicked by a user
    _handleSidebarSearchStateChange (opened) {
      this.sidebarSearchIsOpened = opened
    },

    // Event handler that is triggered
    // when a user enters a search string
    // and then presses the Enter key
    _handleSidebarSearchInput () {
      // close sidebar alert manager
      this.$refs.sidebarAlertManager.close()
      // clean current selected list item
      this._deselectSidebarListItemAndModel()
      // reset sidebar list & load
      const sidebarList = this.$refs.sidebarList
      sidebarList.reset()
      sidebarList.load()
    },

    /**
     * Sidebar list
     */

    // Defines the adapter that should
    // be used by the sidebar list
    _setupSidebarList () {
      const sidebarList = this.$refs.sidebarList
      if (!sidebarList || sidebarList.adapter) {
        return
      }
      sidebarList.adapter = _.bind(function (pageNumber, callback) {
        const pageSize = 30
        client.inbox.paginate({
          answered: this.sidebarDropdownModel.value,
          search: this.sidebarSearchValue,
          size: pageSize,
          number: pageNumber
        }, _.bind(function (error, data) {
          if (error) {
            this.errorMessage = error.message
            this.$refs.sidebarAlertManager.open({
              type: AlertMessage.TYPE_ERROR,
              label: error.message
            })
            callback(error, null, false)
          } else {
            // list callback
            const pageCount = Math.max(Math.ceil(data.totalItems / pageSize) - 1, 0)
            const hasMore = pageNumber < pageCount
            callback(error, data.items, hasMore)
            // sidebar first item select
            this._attemptFirstSidebarListItemSelect()
          }
          // update view state
          this._updateState({
            error: error,
            collection: sidebarList.collection
          })
        }, this))
        // reset error message
        this.errorMessage = ''
        // update view state
        this._updateState({
          progress: true
        })
      }, this)
    },

    // Attempts to select the first
    // model & item in the sidebar list
    _attemptFirstSidebarListItemSelect () {
      if (this.sidebarSelectedListModel) {
        return
      }
      const sidebarList = this.$refs.sidebarList
      if (!(sidebarList && sidebarList.collection)) {
        return
      }
      const model = _.first(sidebarList.collection)
      if (!model) {
        return
      }
      this._selectSidebarListItemByModel(model)
    },

    // Selects a sidebar list item by model
    _selectSidebarListItemByModel (model) {
      const sidebarList = this.$refs.sidebarList
      // selection callback
      const selectItem = _.bind(function () {
        const item = _.find(sidebarList.items, function (item) {
          return item.id === model.id
        })
        if (item) {
          this._selectSidebarListItemAndModel(item, model)
        }
      }, this)
      // deselect previous list item
      this._deselectSidebarListItemAndModel()
      // check if the list items have been drawn
      if (sidebarList.items.length) {
        selectItem()
      } else {
        this.$nextTick(selectItem)
      }
    },

    // Handles the event that is triggered
    // when a sidebar list item gets selected
    // by a click.
    _handleSidebarListItemSelect (item) {
      let collection = this.$refs.sidebarList.collection
      let model = _.find(collection, {id: item.id})
      if (!model) {
        return
      }
      // deselect current item
      this._deselectSidebarListItemAndModel()
      // select new item
      this._selectSidebarListItemAndModel(item, model)
    },

    // Selects a sidebar item and
    // model and stores everything
    _selectSidebarListItemAndModel (item, model) {
      this.sidebarSelectedListItem = item
      this.sidebarSelectedListModel = model
      if (this.sidebarSelectedListItem) {
        this.sidebarSelectedListItem.selected = true
      }
      // handle model read value
      if (!model.read) {
        model.read = true
        client.inbox.markAsRead(model.id)
      }
    },

    // Deselects current sidebar item
    _deselectSidebarListItemAndModel () {
      if (this.sidebarSelectedListItem) {
        this.sidebarSelectedListItem.selected = false
      }
      this.sidebarSelectedListItem = null
      this.sidebarSelectedListModel = null
    }

  },

  mounted () {
    // setup & load sidebar list
    this._setupSidebarList()
    this.$refs.sidebarList.load()
  }

}
</script>
