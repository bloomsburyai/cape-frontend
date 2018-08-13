<style scoped lang="scss">
  @import "./mode-common";

  .cape-dashboard-documents-mode-upload {
    display: block;
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  // Page

  .page-wrapper {
    padding: 3rem 0;
    height: 100%;
  }

  // Dashed container

  .cape-dashboard-dashed-container {
    width: 100%;
    height: 100%;
  }

  // Panel

  .panel {
    @include layout-fit();
    top: 0.0625rem;
    right: 0.0625rem;
    bottom: 0.0625rem;
    left: 0.0625rem;
    @include layout-vertical();
    @include layout-center-center();
  }

  // Wrapper

  .wrapper {
    text-align: center;
  }

  // Hydrate content

  .panel-hydrate .wrapper .fa {
    // font-size: 3rem;
    font-size: 2.625rem;
    color: $blue-grey-200;
    margin: 0 0 1rem 0;
  }

  .panel-hydrate .wrapper h6 {
    @include typography-subheading-1();
    color: $blue-grey-400;
    margin: 0 0 1rem 0;
  }

  .panel-hydrate .wrapper small {
    display: block;
    @include typography-caption();
    color: $blue-grey-200;
    margin: 1rem 0 0 0;
  }

  .panel-hydrate .wrapper .cape-dashboard-label-button {
    background-color: $blue-500;
    color: $white;
  }

  .panel-hydrate .wrapper .cape-dashboard-label-button:hover {
    background-color: $blue-700;
  }

  // Progress wrapper

  .panel-progress .wrapper {
    width: 60%;
    margin: 0 auto;
  }

  .panel-progress .wrapper h6 {
    @include typography-subheading-1();
    @include utility-text-truncate-single-line();
    color: $blue-grey-200;
    margin: 1rem 0 0 0;
  }

  .panel-progress .wrapper h6 strong {
    font-weight: $font-weight-regular;
    color: $blue-grey-400;
  }
</style>

<template>
  <div class="cape-dashboard-documents-mode-upload">
    <div class="body">
      <div class="page-wrapper">
        <cape-dashboard-dashed-container
          v-bind:strokeColor="strokeColor">

          <!-- Hydrate -->

          <template v-if="state === STATE_HYDRATE">
            <div class="panel panel-hydrate"
              v-on:dragover="_handleDropzoneDragover"
              v-on:dragleave="_handleDropzoneDragleave"
              v-on:drop="_handleDropzoneDrop">
              <input
                ref="fileInput"
                type="file"
                hidden
                v-on:change="_handleFileInputChange">
              <div class="wrapper">
                <i class="fa fa-file-text-o" aria-hidden="true"></i>
                <h6>Drag file to upload or</h6>
                <cape-dashboard-label-button
                  label="Browse"
                  v-on:click.native="_handleBrowseButtonClick"/>
                <small>.txt files only</small>
              </div>
            </div>
          </template>

          <!-- End hydrate -->

          <!-- Progress -->

          <template v-if="state === STATE_PROGRESS">
            <div class="panel panel-progress">
              <div class="wrapper">
                <cape-dashboard-progress-circle
                  v-bind:size="1.5"
                  v-bind:lineWidth="0.125"
                  v-bind:active="true"/>
                <h6>Uploading <strong>{{ filename }}</strong></h6>
              </div>
            </div>
          </template>

          <!-- End progress -->

        </cape-dashboard-dashed-container>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import client from '@/client'
import * as color from '@/color'
import DashedContainer from '@/components/DashedContainer'
import LabelButton from '@/components/button/Label'
import ProgressCircle from '@/components/progress/Circle'

const STATE_HYDRATE = 'stateHydrate'
const STATE_PROGRESS = 'stateProgress'

export default {

  STATE_HYDRATE: STATE_HYDRATE,
  STATE_PROGRESS: STATE_PROGRESS,

  data () {
    return {
      // expose states to the template
      STATE_HYDRATE: STATE_HYDRATE,
      STATE_PROGRESS: STATE_PROGRESS,
      state: STATE_HYDRATE,
      // dashed container
      strokeColor: color.BLUE_GREY_200,
      // dropzone drag & drop
      overDropzone: false,
      // progress
      filename: ''
    }
  },

  components: {
    'cape-dashboard-dashed-container': DashedContainer,
    'cape-dashboard-label-button': LabelButton,
    'cape-dashboard-progress-circle': ProgressCircle
  },

  methods: {

    /**
     *
     * Hydrate
     *
     */

    // Opens the file browser dialog
    _openFileBrowser () {
      if (!this.$refs.fileInput) {
        return
      }
      this.$refs.fileInput.value = ''
      this.$refs.fileInput.click()
    },

    // Event handler that is called when
    // the user clicks the "Browse" button
    _handleBrowseButtonClick () {
      console.log('documentsModeUpload._handleBrowseButtonClick')
      this._openFileBrowser()
    },

    // Event handler that is called when
    // a file is selected from the file
    // browse dialog.
    _handleFileInputChange (e) {
      console.log('documentsModeUpload._handleFileInputChange')
      console.log(arguments)
      // upload first file in array
      if (e.target &&
        e.target.files &&
        e.target.files.length) {
        this._uploadFile(e.target.files[0])
      }
    },

    // Event handler triggered when an
    // element is dragger over the dropzone
    _handleDropzoneDragover (e) {
      e.preventDefault()
      if (this.overDropzone) {
        return
      }
      console.log('documentModeUpload._handleDropzoneDragover')
      this.overDropzone = true
      this.strokeColor = color.BLUE_500
    },

    // Event handler triggered when a
    // dragged element leaves the dropzone
    _handleDropzoneDragleave (e) {
      e.preventDefault()
      if (!this.overDropzone) {
        return
      }
      console.log('documentsModeUpload._handelDropzoneDragleave')
      this.overDropzone = false
      this.strokeColor = color.BLUE_GREY_200
    },

    // Event handler triggered when an
    // element is dropped on the dropzone
    _handleDropzoneDrop (e) {
      e.preventDefault()
      console.log('documentsModeUpload._handleDropzoneDrop')
      this.overDropzone = false
      this.strokeColor = color.BLUE_GREY_200
      // upload first file in array
      if (e.dataTransfer &&
        e.dataTransfer.files &&
        e.dataTransfer.files.length) {
        this._uploadFile(e.dataTransfer.files[0])
      }
    },

    // uploads a single file
    _uploadFile (file) {
      console.log('documentsModeUpload._uploadFile')
      console.log('file')
      console.log(file)
      client.document.create({
        id: file.name,
        title: file.name,
        file: file
      }, _.bind(function (error, id) {
        console.log('documentsModeUpload._uploadFile.callback')
        console.log(id)
        if (error) {
          this.state = STATE_HYDRATE
          this.$emit('error', error)
        } else {
          this.$emit('success', {
            id: id,
            title: file.name
          })
        }
      }, this))

      this.filename = file.name
      this.state = STATE_PROGRESS
    }
  }

}
</script>
