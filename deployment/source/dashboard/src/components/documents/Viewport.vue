<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-documents-viewport {
    display: block;
    position: relative;
    z-index: 0;

    .wrapper {
      @include layout-vertical();
      width: 100%;
      height: 100%;
    }

    .cape-dashboard-documents-mode-view,
    .cape-dashboard-documents-mode-copy,
    .cape-dashboard-documents-mode-upload {
      @include layout-flex();
    }
  }
</style>

<template>
  <div class="cape-dashboard-documents-viewport">
    <div class="wrapper">
      <cape-dashboard-alert-manager ref="alertManager"/>

      <template v-if="mode === MODE_VIEW">
        <cape-dashboard-documents-mode-view
          v-bind:id="id"
          v-bind:title="title"
          v-bind:content="content"
          v-bind:created="created"/>
      </template>

      <template v-if="mode === MODE_COPY">
        <cape-dashboard-documents-mode-copy
          v-bind:id="id"
          v-bind:title="title"
          v-bind:content="content"
          v-bind:created="created"
          v-on:error="_handleModeCopyError"
          v-on:success="_handleModeCopySuccess"
          v-on:action="_handleModeCopyAction"/>
      </template>

      <template v-if="mode === MODE_UPLOAD">
        <cape-dashboard-documents-mode-upload
          v-on:error="_handleModeUploadError"
          v-on:success="_handleModeUploadSuccess"/>
      </template>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import client from '@/client'
import * as action from './action'
import AlertManager from '@/components/alert/Manager'
import AlertMessage from '@/components/alert/Message'
import ModeView from './ModeView'
import ModeCopy from './ModeCopy'
import ModeUpload from './ModeUpload'

const MODE_VIEW = 'modeView'
const MODE_COPY = 'modeCopy'
const MODE_UPLOAD = 'modeUpload'

const ALERT_MODE_COPY_SUCCESS_LABEL = 'Success'
const ALERT_MODE_UPLOAD_SUCCESS_LABEL = 'Success'

export default {

  MODE_VIEW: MODE_VIEW,
  MODE_COPY: MODE_COPY,
  MODE_UPLOAD: MODE_UPLOAD,

  data () {
    return {
      MODE_VIEW: MODE_VIEW,
      MODE_COPY: MODE_COPY,
      MODE_UPLOAD: MODE_UPLOAD,
      mode: MODE_VIEW
    }
  },

  props: {
    id: {
      type: String,
      default: ''
    },
    cid: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    created: {
      type: Number,
      default: 0
    }
  },

  components: {
    'cape-dashboard-alert-manager': AlertManager,
    'cape-dashboard-documents-mode-view': ModeView,
    'cape-dashboard-documents-mode-copy': ModeCopy,
    'cape-dashboard-documents-mode-upload': ModeUpload
  },

  watch: {
    mode (fresh, stale) {
      const alertManager = this.$refs.alertManager
      if (alertManager && alertManager.opened) {
        alertManager.close()
      }
    }
  },

  methods: {

    /**
     *
     * Mode copy
     *
     */

    // Event handler that is triggered
    // when an error occured while saving
    // the document
    _handleModeCopyError (error) {
      console.log('--')
      console.log('documentsViewport._handleModeCopyError')
      console.log('error')
      console.log(error)
      this.$refs.alertManager.open({
        type: AlertMessage.TYPE_ERROR,
        label: error.message
      })
    },

    // Event handler that is triggered
    // when the document was successfully
    // saved.
    // A "syncModel" event is triggered
    // and it should be used to update
    // the sidebar list item.
    _handleModeCopySuccess (model) {
      console.log('--')
      console.log('documentsViewport._handleModeCopySuccess')
      console.log('model')
      console.log(model)
      this.$refs.alertManager.open({
        type: AlertMessage.TYPE_SUCCESS,
        label: ALERT_MODE_COPY_SUCCESS_LABEL
      })
      this.$emit('syncModel', model)
    },

    // _handleModeCopy is an event handler
    // that is triggered when the cancel
    // button gets clicked
    _handleModeCopyAction (details) {
      this.$emit(action.EVENT, {
        type: details.type,
        id: this.id,
        cid: this.cid
      })
    },

    /**
     *
     * Mode upload
     *
     */

    // Event handler that is triggered
    // when an error occured while
    // uploading the document
    _handleModeUploadError (error) {
      console.log('--')
      console.log('documentsViewport._handleModeUploadError')
      console.log('error')
      console.log(error)
      this.$refs.alertManager.open({
        type: AlertMessage.TYPE_ERROR,
        label: error.message
      })
    },

    // Event handler that is triggered
    // when the document was successfully
    // uploaded.
    // A "syncModel" event is triggered
    // if and when the model was retrieved
    // from the backend.
    // The event is ment to be used to
    // update the sidebar item.
    _handleModeUploadSuccess (model) {
      console.log('--')
      console.log('documentsViewport._handleModeUploadSuccess')
      console.log('model')
      console.log(model)
      this.$refs.alertManager.open({
        type: AlertMessage.TYPE_SUCCESS,
        label: ALERT_MODE_UPLOAD_SUCCESS_LABEL
      })
      client.document.read(model.id, _.bind(function (error, data) {
        console.log('documentsViewport._handleModeUploadSuccess.readDocumentCallback')
        console.log('error')
        console.log(error)
        console.log('data')
        console.log(data)

        // TODO: handle error
        if (error) {
          return
        }
        if (data) {
          console.log('sync')
          this.$emit('syncModel', data)
        }
      }, this))
    }

  }

}
</script>
