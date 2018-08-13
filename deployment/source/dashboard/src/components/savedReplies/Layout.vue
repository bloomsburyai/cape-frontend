<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-saved-replies-layout {
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

        // Button

        .cape-dashboard-icon-label-button {
          font-weight: $font-weight-regular;
        }

        .cape-dashboard-icon-label-button:hover {
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

          .cape-dashboard-label-button {
            background-color: $blue-500;
            color: $white;

            &:hover {
              background-color: $blue-700;
            }
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

          // Button

          .cape-dashboard-icon-label-button {
            font-weight: $font-weight-regular;
          }

          .cape-dashboard-icon-label-button:hover {
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
          @include layout-vertical();

          // Panel

          .cape-dashboard-saved-replies-panel {
            overflow: hidden;
            height: 100%;
          }
        }

      }

    }

  }
</style>

<template>
  <div class="cape-dashboard-saved-replies-layout">

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
              <cape-dashboard-icon-label-button
                icon="fa-plus-circle"
                v-bind:iconSize="0.875"
                v-bind:iconColor="color.BLUE_500"
                label="New reply"
                v-bind:labelColor="color.BLUE_GREY_600"
                v-on:click.native="_handleSidebarNewButtonClick"/>
            </template>
            <cape-dashboard-search-layout
              v-model="sidebarSearchValue"
              v-on:stateChange="_handleSidebarSearchStateChange"
              v-on:input="_handleSidebarSearchInput"
              placeholder="Search list..."/>

          </div>

          <!-- End header -->

          <!-- Content -->

          <div slot="content" class="content">
            <div class="body">
              <div class="icon">
                <i class="fa fa-comment-o" aria-hidden="true"></i>
              </div>
              <h5>No saved replies found.</h5>
              <cape-dashboard-label-button
                label="New reply"
                v-on:click.native="_handleSidebarNewButtonClick"/>
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
                <cape-dashboard-icon-label-button
                  icon="fa-plus-circle"
                  v-bind:iconSize="0.875"
                  v-bind:iconColor="color.BLUE_500"
                  label="New reply"
                  v-bind:labelColor="color.BLUE_GREY_600"
                  v-on:click.native="_handleSidebarNewButtonClick"/>
              </template>
              <cape-dashboard-search-layout
                v-model="sidebarSearchValue"
                v-on:stateChange="_handleSidebarSearchStateChange"
                v-on:input="_handleSidebarSearchInput"
                placeholder="Search list..."/>
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
                <cape-dashboard-saved-replies-sidebar-list-item
                  slot-scope="model"
                  v-bind:key="model.id || model.cid"
                  v-bind:id="model.id"
                  v-bind:cid="model.cid"
                  v-bind:question="model.canonicalQuestion"
                  v-bind:created="model.created"
                  v-on:select="_handleSidebarListItemSelect"
                  v-on:action="_handleSidebarListItemAction"
                  />
              </cape-dashboard-scroll-infinite-list>
            </div>

            <!-- End content sidebar -->

            <!-- Content viewport -->

            <div class="viewport">
              <cape-dashboard-saved-replies-panel
                v-bind:model="panelModel"
                v-on:modelChange="_handlePanelModelChange"/>
            </div>

            <!-- End content viewport -->

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
import IconLabelButton from '@/components/button/IconLabel'
import LabelButton from '@/components/button/Label'
import SearchLayout from '@/components/search/Layout'
import DropdownContentLayout from '@/components/dropdown/content/Layout'
import IconButton from '@/components/button/Icon'
import DropdownIconLabelOption from '@/components/dropdown/option/LabelIcon'
import ScrollInfiniteList from '@/components/ScrollInfiniteList'
import SidebarListItem from './SidebarListItem'
import Panel from './Panel'

const STATE_PROGRESS = 'stateProgress'
const STATE_ERROR = 'stateError'
const STATE_EMPTY = 'stateEmpty'
const STATE_COMPLETE = 'stateComplete'

const ROUTE_ID_PREFIX = 'id:'

const ACTION_DELETE = SidebarListItem.ACTION_DELETE

// const VIEWPORT_ALERT_SUCCESS_LABEL = 'Success'

export default {

  data () {
    return {
      // expose color to template above :)
      color: color,
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
      // viewport dropdown
      ACTION_DELETE: ACTION_DELETE
    }
  },

  components: {
    'cape-dashboard-content-switcher': ContentSwitcher,
    'cape-dashboard-content-item': ContentItem,
    'cape-dashboard-progress-circle': ProgressCircle,
    'cape-dashboard-layout-header-content': LayoutHeaderContent,
    'cape-dashboard-alert-manager': AlertManager,
    'cape-dashboard-icon-label-button': IconLabelButton,
    'cape-dashboard-label-button': LabelButton,
    'cape-dashboard-search-layout': SearchLayout,
    'cape-dashboard-dropdown-content-layout': DropdownContentLayout,
    'cape-dashboard-icon-button': IconButton,
    'cape-dashboard-dropdown-icon-label-option': DropdownIconLabelOption,
    'cape-dashboard-scroll-infinite-list': ScrollInfiniteList,
    'cape-dashboard-saved-replies-sidebar-list-item': SidebarListItem,
    'cape-dashboard-saved-replies-panel': Panel
  },

  computed: {
    viewportHeaderTitle () {
      let value = 'Create reply'
      if (_.has(this.sidebarSelectedListModel, 'id')) {
        value = 'Edit reply'
      }
      return value
    },
    panelModel () {
      return _.cloneDeep(this.sidebarSelectedListModel)
    }
  },

  watch: {
    '$route' () {
      this._inspectRoute()
    }
  },

  methods: {

    /**
     *
     * States
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
              // TODO: remove if below
              if (!this.$refs.stateEmptyHeaderContentLayout) {
                return
              }
              this.$refs.stateEmptyHeaderContentLayout.update()
            })
            break
          case STATE_COMPLETE:
            this.$nextTick(function () {
              // TODO: remove if below
              if (!this.$refs.stateCompleteHeaderContentLayout) {
                return
              }
              this.$refs.stateCompleteHeaderContentLayout.update()
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

      // deselecte previous list item
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
        client.reply.delete(details.id, function (error, data) {
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
      if (!(index !== -1 && model && item)) {
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
          this._selectSidebarListItemByModel(newModel)
        } else {
          // deselect curent item
          this._deselectSidebarListItemAndModel()
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
     * Sidebar new button
     */

    // Event handler that is triggered
    // when a user clicks the "new reply"
    // sidebar button
    _handleSidebarNewButtonClick () {
      // create new model &
      // add to list collection
      this.sidebarListCID += 1
      const model = {
        cid: String(this.sidebarListCID),
        uses: 0
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
        this.$router.replace({name: 'savedReplies', params: {id: routeID}})
      } else {
        if (this.$route &&
          this.$route.params &&
          this.$route.params.id) {
          this.$router.push({name: 'savedReplies'})
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
          client.reply.read(routeID, clientCallback)
        } else {
          client.reply.paginate({
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
      if (!(sidebarList &&
        sidebarList.collection)) {
        return
      }
      const model = _.first(sidebarList.collection)
      if (!model) {
        return
      }
      this._selectSidebarListItemByModel(model)
    },

    // Selects a list item by model
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
      // deselecte previous list item
      this._deselectSidebarListItemAndModel()
      // check if the list
      // items have been drawn
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

    // Selects sidebar item and
    // model and stores everything
    _selectSidebarListItemAndModel (item, model) {
      this.sidebarSelectedListItem = item
      this.sidebarSelectedListItem.selected = true
      this.sidebarSelectedListModel = model
    },

    // Deselects current sidebar item
    _deselectSidebarListItemAndModel () {
      if (this.sidebarSelectedListItem) {
        this.sidebarSelectedListItem.selected = false
      }
      this.sidebarSelectedListItem = null
      this.sidebarSelectedListModel = null
    },

    _updateListItemAndModelFromViewportMessages () {
      let userValue = this.viewportUserMessageValue
      let machineValue = this.viewportMachineMessageValue
      let model = this.sidebarSelectedListModel
      model.canonicalQuestion = userValue
      _.set(model, 'answers[0].answer', machineValue)
    },

    /**
     *
     * Viewport
     *
     */

    // Event handler that is triggered
    // when a user clicks on the actions
    // menu on the viewport.
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

    /**
     *
     * Panel
     *
     */

    _handlePanelModelChange (details) {
      const model = _.extend(this.sidebarSelectedListModel, details)
      const sidebarList = this.$refs.sidebarList
      let query = null
      if (_.has(model, 'cid')) {
        query = {cid: model.cid}
      } else if (_.has(model, 'id')) {
        query = {id: model.id}
      }
      if (!query) {
        return
      }
      const index = _.findIndex(sidebarList.collection, query)
      if (index === -1) {
        return
      }
      sidebarList.collection.splice(index, 1, model)
      this.$nextTick(() => {
        this._selectSidebarListItemByModel(model)
      })
    }
  },

  mounted () {
    this._setupSidebarList()
    this._inspectRoute()
  }

}
</script>
