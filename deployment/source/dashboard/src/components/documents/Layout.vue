<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-documents-layout {
    display: block;
    @include layout-fit();

    // Content switcher & item

    .cape-dashboard-content-switcher {
      height: 100%;
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

        .cape-dashboard-documents-sidebar-dropdown-trigger:hover,
        .cape-dashboard-dropdown-content-layout.active .cape-dashboard-documents-sidebar-dropdown-trigger {
          background-color: $grey-100;
        }

        .cape-dashboard-dropdown-icon-label-option:hover {
          background-color: $grey-100;
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
            margin: 0 0 1rem 0;
          }

          .cape-dashboard-dropdown-label-trigger {
            background-color: $blue-500;
            color: $white;

            &:hover {
              background-color: $blue-700;
            }
          }

          .cape-dashboard-dropdown-icon-label-option:hover {
            background-color: $grey-100;
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
        background-color: $white;
        box-shadow: $box-shadow-1;

        // Sidebar

        .sidebar {
          @include layout-horizontal();
          @include layout-center();
          @include layout-justified();
          width: 20rem;
          border-right: 0.0625rem solid $grey-100;

          // Dropdown

          .cape-dashboard-documents-sidebar-dropdown-trigger:hover,
          .cape-dashboard-dropdown-content-layout.active .cape-dashboard-documents-sidebar-dropdown-trigger {
            background-color: $grey-100;
          }

          .cape-dashboard-dropdown-icon-label-option:hover {
            background-color: $grey-100;
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

          .cape-dashboard-dropdown-icon-label-option:hover {
            background-color: $grey-100;
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

        .viewport {
          @include layout-flex();
          @inclyde layout-vertical();
        }

      }

    }

  }
</style>

<template>
  <div class="cape-dashboard-documents-layout">

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
              <cape-dashboard-dropdown-content-layout
                horizontalAlign="left"
                verticalAlign="top"
                ref="stateEmptyHeaderSidebarDropdown">
                <cape-dashboard-documents-sidebar-dropdown-trigger
                  slot="trigger"
                  icon="fa-plus-circle"
                  v-bind:iconSize="0.875"
                  v-bind:iconColor="color.BLUE_500"
                  label="New document"
                  v-bind:labelColor="color.BLUE_GREY_600"
                  />
                <div slot="content">
                  <cape-dashboard-dropdown-icon-label-option
                    icon="fa-clipboard"
                    v-bind:iconSize="0.875"
                    v-bind:iconColor="color.GREY_400"
                    label="Copy and paste text"
                    v-bind:labelColor="color.BLUE_GREY_400"
                    v-on:click.native="_handleSidebarDropdownOptionSelect($event, type.TEXT)"
                    />
                  <cape-dashboard-dropdown-icon-label-option
                    icon="fa-upload"
                    v-bind:iconSize="0.875"
                    v-bind:iconColor="color.GREY_400"
                    label="Upload"
                    v-bind:labelColor="color.BLUE_GREY_400"
                    v-on:click.native="_handleSidebarDropdownOptionSelect($event, type.FILE)"
                    />
                </div>
              </cape-dashboard-dropdown-content-layout>
            </template>
            <cape-dashboard-search-layout
              v-model="sidebarSearchValue"
              v-on:stateChange="_handleSidebarSearchStateChange"
              v-on:input="_handleSidebarSearchInput"
              placeholder="Search list..."
              />

          </div>

          <!-- End header -->

          <!-- Content -->

          <div slot="content" class="content">
            <div class="body">
              <div class="icon">
                <i class="fa fa-file-text-o" aria-hidden="true"></i>
              </div>
              <h5>No documents found.</h5>
              <cape-dashboard-dropdown-content-layout
                horizontalAlign="center"
                verticalAlign="top"
                ref="stateEmptyContentDropdown">
                <!--
                <cape-dashboard-documents-sidebar-dropdown-trigger
                  slot="trigger"
                  icon="fa-plus-circle"
                  v-bind:iconSize="0.875"
                  v-bind:iconColor="color.BLUE_500"
                  label="New document"
                  v-bind:labelColor="color.BLUE_GREY_600"
                  />
                -->
                <cape-dashboard-dropdown-label-trigger
                  slot="trigger"
                  label="New document"
                  v-bind:labelColor="color.WHITE"
                  v-bind:caretColor="color.WHITE"
                  />
                <div slot="content">
                  <cape-dashboard-dropdown-icon-label-option
                    icon="fa-clipboard"
                    v-bind:iconSize="0.875"
                    v-bind:iconColor="color.GREY_400"
                    label="Copy and paste text"
                    v-bind:labelColor="color.BLUE_GREY_400"
                    v-on:click.native="_handleSidebarDropdownOptionSelect($event, type.TEXT)"
                    />
                  <cape-dashboard-dropdown-icon-label-option
                    icon="fa-upload"
                    v-bind:iconSize="0.875"
                    v-bind:iconColor="color.GREY_400"
                    label="Upload"
                    v-bind:labelColor="color.BLUE_GREY_400"
                    v-on:click.native="_handleSidebarDropdownOptionSelect($event, type.FILE)"
                    />
                </div>
              </cape-dashboard-dropdown-content-layout>
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

          <div
            slot="header"
            class="header">

            <!-- Header sidebar -->

            <div class="sidebar">
              <template v-if="!sidebarSearchIsOpened">
                <cape-dashboard-dropdown-content-layout
                  horizontalAlign="left"
                  verticalAlign="top"
                  ref="stateCompleteHeaderSidebarDropdown">
                  <cape-dashboard-documents-sidebar-dropdown-trigger
                    slot="trigger"
                    icon="fa-plus-circle"
                    v-bind:iconSize="0.875"
                    v-bind:iconColor="color.BLUE_500"
                    label="New document"
                    v-bind:labelColor="color.BLUE_GREY_600"
                    />
                  <div slot="content">
                    <cape-dashboard-dropdown-icon-label-option
                      icon="fa-clipboard"
                      v-bind:iconSize="0.875"
                      v-bind:iconColor="color.GREY_400"
                      label="Copy and paste text"
                      v-bind:labelColor="color.BLUE_GREY_400"
                      v-on:click.native="_handleSidebarDropdownOptionSelect($event, type.TEXT)"
                      />
                    <cape-dashboard-dropdown-icon-label-option
                      icon="fa-upload"
                      v-bind:iconSize="0.875"
                      v-bind:iconColor="color.GREY_400"
                      label="Upload"
                      v-bind:labelColor="color.BLUE_GREY_400"
                      v-on:click.native="_handleSidebarDropdownOptionSelect($event, type.FILE)"
                      />
                  </div>
                </cape-dashboard-dropdown-content-layout>
              </template>
              <cape-dashboard-search-layout
                v-model="sidebarSearchValue"
                v-on:stateChange="_handleSidebarSearchStateChange"
                v-on:input="_handleSidebarSearchInput"
                placeholder="Search list..."
                />
            </div>

            <!-- End header sidebar -->

            <!-- Header viewport -->

            <div class="viewport">
              <h6 class="title">{{ viewportHeaderTitle }}</h6>
              <cape-dashboard-dropdown-content-layout
                horizontalAlign="right"
                verticalAlign="top"
                ref="stateCompleteHeaderViewportDropdown">
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
                    v-on:click.native="_handleViewportActionClick(ACTION_DELETE)"
                    />
                </div>
              </cape-dashboard-dropdown-content-layout>
            </div>

            <!-- End header viewport -->

          </div>

          <!-- End header -->

          <!-- Content -->

          <div
            slot="content"
            class="content">

            <!-- Content sidebar -->

              <div class="sidebar">
                <cape-dashboard-alert-manager
                  ref="sidebarAlertManager"/>
                <cape-dashboard-scroll-infinite-list
                  ref="sidebarList">
                  <cape-dashboard-documents-sidebar-list-item
                    slot-scope="model"
                    v-bind:key="model.id"
                    v-bind:id="model.id"
                    v-bind:cid="model.cid"
                    v-bind:title="model.title"
                    v-bind:type="model.type"
                    v-bind:created="model.created"
                    v-on:select="_handleSidebarListItemSelect"
                    v-on:action="_handleSidebarListItemAction"
                    />
                </cape-dashboard-scroll-infinite-list>
              </div>

            <!-- End content sidebar -->

            <!-- Content viewport -->

            <cape-dashboard-documents-viewport
              ref="viewport"
              class="viewport"
              v-bind:id="viewportID"
              v-bind:cid="viewportCID"
              v-bind:title="viewportTitle"
              v-bind:content="viewportContent"
              v-bind:created="viewportCreated"
              v-on:syncModel="_handleViewportSyncModel"
              v-on:action="_handleViewportAction"/>

            <!-- End content viewport -->

          </div>

          <!-- End content -->

        </cape-dashboard-layout-header-content>

      </cape-dashboard-content-item>

      <!--

        End complete

      -->

    </cape-dashboard-content-switcher/>

  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import client from '@/client'
import * as color from '@/color'
import * as type from './type'
import * as action from './action'
import ContentSwitcher from '@/components/content/Switcher'
import ContentItem from '@/components/content/Item'
import ProgressCircle from '@/components/progress/Circle'
import LayoutHeaderContent from '@/components/layout/HeaderContent'
import DropdownLabelTrigger from '@/components/dropdown/trigger/Label'
import AlertManager from '@/components/alert/Manager'
import AlertMessage from '@/components/alert/Message'
import DropdownContentLayout from '@/components/dropdown/content/Layout'
import SidebarDropdownTrigger from './SidebarDropdownTrigger'
import DropdownIconLabelOption from '@/components/dropdown/option/LabelIcon'
import SearchLayout from '@/components/search/Layout'
import ScrollInfiniteList from '@/components/ScrollInfiniteList'
import SidebarListItem from './SidebarListItem'
import IconButton from '@/components/button/Icon'
import Viewport from './Viewport'

const STATE_PROGRESS = 'stateProgress'
const STATE_ERROR = 'stateError'
const STATE_EMPTY = 'stateEmpty'
const STATE_COMPLETE = 'stateComplete'

const ROUTE_ID_PREFIX = 'id:'

const ACTION_DELETE = action.DELETE // SidebarListItem.ACTION_DELETE

const VIEWPORT_MODE_VIEW_HEADER_TITLE = 'View document'
const VIEWPORT_MODE_COPY_HEADER_TITLE = 'Copy and paste document'
const VIEWPORT_MODE_UPLOAD_HEADER_TITLE = 'Upload document'

export default {

  data () {
    return {
      // expose color to template above
      color: color,
      // expose type to the template above
      type: type,
      // state
      STATE_PROGRESS: STATE_PROGRESS,
      STATE_ERROR: STATE_ERROR,
      STATE_EMPTY: STATE_EMPTY,
      STATE_COMPLETE: STATE_COMPLETE,
      state: '',
      // error message
      errorMessage: '',
      // sidebar search
      sidebarSearchIsOpened: false,
      sidebarSearchValue: '',
      // sidebar list
      sidebarListCID: 0, // sidebar list client id
      sidebarSelectedListItem: null,
      sidebarSelectedListModel: null,
      // viewport header
      viewportHeaderTitle: '',
      // viewport dropdown
      ACTION_DELETE: ACTION_DELETE,
      // viewport content
      viewportID: '',
      viewportCID: '',
      viewportTitle: '',
      viewportContent: '',
      viewportCreated: 0
    }
  },

  components: {
    'cape-dashboard-content-switcher': ContentSwitcher,
    'cape-dashboard-content-item': ContentItem,
    'cape-dashboard-progress-circle': ProgressCircle,
    'cape-dashboard-layout-header-content': LayoutHeaderContent,
    'cape-dashboard-dropdown-label-trigger': DropdownLabelTrigger,
    'cape-dashboard-alert-manager': AlertManager,
    'cape-dashboard-dropdown-content-layout': DropdownContentLayout,
    'cape-dashboard-documents-sidebar-dropdown-trigger': SidebarDropdownTrigger,
    'cape-dashboard-dropdown-icon-label-option': DropdownIconLabelOption,
    'cape-dashboard-search-layout': SearchLayout,
    'cape-dashboard-scroll-infinite-list': ScrollInfiniteList,
    'cape-dashboard-documents-sidebar-list-item': SidebarListItem,
    'cape-dashboard-icon-button': IconButton,
    'cape-dashboard-documents-viewport': Viewport
  },

  watch: {
    '$route' () {
      this._inspectRoute()
    }
  },

  methods: {

    /**
     *
     * State
     *
     */

    // updates the state of the view
    // when results are returned
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
              this.$refs.stateEmptyContentDropdown.update()
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
     * General
     *
     */

    // _inspectRoute sets up the component
    // considering the route structure
    _inspectRoute () {
      if (this.$route.params &&
        this.$route.params.id) {
        this.sidebarSearchValue = ROUTE_ID_PREFIX + this.$route.params.id
      }

      // deselect previous list item
      this._deselectSidebarListItemAndModel()

      const sidebarList = this.$refs.sidebarList
      sidebarList.reset()
      sidebarList.load()
    },

    // Takes care of launching
    // the correct action handler
    _handleAction (details) {
      switch (details.type) {
        case ACTION_DELETE:
          this._handleDeleteAction(details)
          break
      }
    },

    // Handles the delete action
    _handleDeleteAction (details) {
      // depending on the details build query
      let query = null
      if (!details.id) {
        query = {cid: details.cid}
      } else {
        query = {id: details.id}
        client.document.delete(details.id, function (error, data) {
          // TODO: fill handler body
          // if you're interested in
          // response
          if (error) {}
        })
      }
      // execute query and get index, model and item
      const sidebarList = this.$refs.sidebarList
      let index = -1
      let model = null
      let item = null
      if (query) {
        index = _.findIndex(sidebarList.collection, query)
        model = _.find(sidebarList.collection, query)
        item = _.find(sidebarList.items, query)
      }
      // skip if we're missing details
      if (!(index !== -1 &&
        model &&
        item)) {
        return
      }
      // handle actually what happens next
      sidebarList.collection.splice(index, 1)
      if (item.selected) {
        // pottentially select new item
        if (index > sidebarList.collection.length - 1) {
          index = sidebarList.collection.length - 1
        }
        let newModel = sidebarList.collection[index]
        if (newModel) {
          // takes care of deselecting current item
          this.$nextTick(() => {
            this._selectSidebarListItemByModel(newModel)
          })
        } else {
          // deselect curent item
          this._deselectSidebarListItemAndModel()
          // update viewport
          this._updateViewport()
        }
      }
      // update view state
      this._updateState({
        collection: sidebarList.collection
      })
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
    // when a sidebar dropdown is selected
    // by the user
    _handleSidebarDropdownOptionSelect (e, type) {
      // close header sidebar dropdown
      this.$refs.stateCompleteHeaderSidebarDropdown.close()
      // create new model &
      // add to list collection
      this.sidebarListCID += 1
      const model = {
        cid: String(this.sidebarListCID),
        type: type,
        created: moment().unix()
      }
      const sidebarList = this.$refs.sidebarList
      sidebarList.collection.unshift(model)

      // update view state
      this._updateState({
        collection: sidebarList.collection
      })

      // let the item get drawn then select it
      this.$nextTick(function () {
        this._selectSidebarListItemByModel(model)
      })
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
      if (this.sidebarSearchValue &&
        _.startsWith(this.sidebarSearchValue, ROUTE_ID_PREFIX)) {
        let routeID = this.sidebarSearchValue.substr(ROUTE_ID_PREFIX.length)
        this.$router.push({name: 'documents', params: {id: routeID}})
      } else {
        if (this.$route &&
          this.$route.params &&
          this.$route.params.id) {
          this.$router.push({name: 'documents'})
        } else {
          this._deselectSidebarListItemAndModel()
          const sidebarList = this.$refs.sidebarList
          sidebarList.reset()
          sidebarList.load()
        }
      }
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
      sidebarList.adapter = (pageNumber, callback) => {
        // reset error message
        this.errorMessage = ''
        // update view state
        this._updateState({
          progress: true
        })
        const pageSize = 30
        const clientCallback = (error, data) => {
          if (error) {
            this.errorMessage = error.message
            this.$refs.sidebarAlertManager.open({
              type: AlertMessage.TYPE_ERROR,
              label: error.message
            })
            callback(error, null, false)
          } else {
            // list callback
            let pageCount = 1
            let hasMore = false
            let models = []
            if (_.has(data, 'totalItems') && _.has(data, 'items')) {
              pageCount = Math.max(Math.ceil(data.totalItems / pageSize) - 1, 0)
              hasMore = pageNumber < pageCount
              models = data.items
            } else if (_.has(data, 'id')) {
              models = [data]
            }
            callback(error, models, hasMore)
            // select first item
            this._attemptFirstSidebarListItemSelect()
          }
          // update view state
          this._updateState({
            error: error,
            collection: sidebarList.collection
          })
        }
        if (this.sidebarSearchValue &&
          _.startsWith(this.sidebarSearchValue, ROUTE_ID_PREFIX)) {
          let routeID = this.sidebarSearchValue.substr(ROUTE_ID_PREFIX.length)
          client.document.read(routeID, clientCallback)
        } else {
          client.document.paginate({
            search: this.sidebarSearchValue,
            size: pageSize,
            number: pageNumber
          }, clientCallback)
        }
      }
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

    // Select a sidebar list item by model
    _selectSidebarListItemByModel (model) {
      const sidebarList = this.$refs.sidebarList
      // model and item comparison key
      // support models that are known
      // to the backend and new models
      let comparisonKey = ''
      if (_.has(model, 'id')) {
        comparisonKey = 'id'
      }
      if (_.has(model, 'cid')) {
        comparisonKey = 'cid'
      }
      if (!comparisonKey) {
        return
      }
      // selection callback
      const selectItem = _.bind(function () {
        const item = _.find(sidebarList.items, function (item) {
          return item[comparisonKey] === model[comparisonKey]
        })
        if (item) {
          this._selectSidebarListItemAndModel(item, model)
        }
      }, this)
      // deselect previous list item
      this._deselectSidebarListItemAndModel()
      // check if the list items
      // have been drawn
      if (sidebarList.items.length) {
        selectItem()
      } else {
        this.$nextTick(selectItem)
      }
    },

    // Handles the event that is triggered
    // when a sidebar list item gets selected
    // by a click on its background
    _handleSidebarListItemSelect (item) {
      let property = 'id'
      if (item.cid) {
        property = 'cid'
      }
      const sidebarList = this.$refs.sidebarList
      const model = _.find(sidebarList.collection, {[property]: item[property]})
      if (!model) {
        return
      }
      // deselect current item
      this._deselectSidebarListItemAndModel()
      // select new item
      this._selectSidebarListItemAndModel(item, model)
    },

    // Event handler that is triggered
    // when a user clicks on the menu
    // actions that each list item has.
    _handleSidebarListItemAction (details) {
      this._handleAction(details)
    },

    // Selects a sidebar item and
    // model and stores everything
    _selectSidebarListItemAndModel (item, model) {
      this.sidebarSelectedListItem = item
      this.sidebarSelectedListModel = model
      if (this.sidebarSelectedListItem) {
        this.sidebarSelectedListItem.selected = true
      }
      this._updateViewport()
    },

    // Deselects current sidebar item
    _deselectSidebarListItemAndModel () {
      if (this.sidebarSelectedListItem) {
        this.sidebarSelectedListItem.selected = false
      }
      this.sidebarSelectedListItem = null
      this.sidebarSelectedListModel = null
    },

    /**
     *
     * Viewport
     *
     */

    // Event handler that is triggered
    // when a user clicks on the menu
    // actions on the viewport.
    _handleViewportActionClick (action) {
      if (this.$refs.stateCompleteHeaderViewportDropdown) {
        this.$refs.stateCompleteHeaderViewportDropdown.close()
      }
      let model = this.sidebarSelectedListModel
      if (!model) {
        return
      }
      this._handleAction({
        type: action,
        id: model.id,
        cid: model.cid
      })
    },

    // Updates the values of the variables
    // that are bound to the viewport component
    // using the sidebar selected list model
    _updateViewport () {
      let model = this.sidebarSelectedListModel
      let viewportID = ''
      if (_.has(model, 'id') && model.id) {
        viewportID = model.id
      }
      let viewportCID = ''
      if (_.has(model, 'cid') && model.cid) {
        viewportCID = model.cid
      }
      let viewportTitle = ''
      if (_.has(model, 'title') && model.title) {
        viewportTitle = model.title
      }
      let viewportContent = ''
      if (_.has(model, 'text') && model.text) {
        viewportContent = model.text
      }
      let viewportCreated = 0
      if (_.has(model, 'created') && model.created) {
        viewportCreated = model.created
      }
      let viewportMode = Viewport.MODE_VIEW
      let viewportHeaderTitle = VIEWPORT_MODE_VIEW_HEADER_TITLE
      if (!viewportID && _.has(model, 'type')) {
        switch (model.type) {
          case type.TEXT:
            viewportMode = Viewport.MODE_COPY
            viewportHeaderTitle = VIEWPORT_MODE_COPY_HEADER_TITLE
            break
          case type.FILE:
            viewportMode = Viewport.MODE_UPLOAD
            viewportHeaderTitle = VIEWPORT_MODE_UPLOAD_HEADER_TITLE
            break
        }
      }
      this.viewportHeaderTitle = viewportHeaderTitle
      this.viewportID = viewportID
      this.viewportCID = viewportCID
      this.viewportTitle = viewportTitle
      this.viewportContent = viewportContent
      this.viewportCreated = viewportCreated
      this.$refs.viewport.mode = viewportMode
    },

    // Event handler that is triggered
    // when an viewport model gets changed
    // and the update should be made in
    // other components.
    _handleViewportSyncModel (model) {
      _.each(model, _.bind(function (value, key) {
        this.$set(this.sidebarSelectedListModel, key, value)
      }, this))
      this._updateViewport()
    },

    // _handleViewportAction is an event handler
    // that is triggered when a viewport action
    // occurs
    _handleViewportAction (details) {
      this._handleAction(details)
    }

  },

  mounted () {
    this._setupSidebarList()
    this._inspectRoute()
  }

}
</script>
