<style scoped lang="scss">
  @import "../../../scss/cape";

  .cape-dashboard-inspector-components-message {
    @include layout-fit();
    width: 100%;
    height: 100%;
  }

  .cape-dashboard-inspector-components-message .wrapper {
    @include layout-vertical();
    @include layout-center();
    width: 40rem;
    height: 100%;
    margin: 0 auto;
  }

  .cape-dashboard-inspector-components-message .flex {
    @include layout-flex();
  }

  .cape-dashboard-inspector-components-message .content {
    width: 100%;
  }

  .cape-dashboard-inspector-components-message .canvas {
    padding: 2rem;
    background-color: $blue-grey-50;
  }

  .cape-dashboard-inspector-components-message .gutter {
    width: 100%;
    height: 1rem;
  }

  .cape-dashboard-inspector-components-message .panel {
    @include layout-horizontal();
    @include layout-start();
    padding: 1rem;
    background-color: $blue-grey-200;
  }

  .cape-dashboard-inspector-components-message .panel > * {
    @include layout-flex();
  }

  .cape-dashboard-inspector-components-message .panel h6 {
    @include typography-body-2();
  }
</style>

<template>
  <div class="cape-dashboard-inspector-components-message">
    <div class="wrapper">
      <div class="flex"></div>
      <div class="content">
        <div class="canvas">
          <cape-dashboard-alert-manager
            ref="alertManager"
            />
        </div>
        <div class="panel">
          <div>
            <cape-dashboard-label-button
              label="Inform"
              v-on:click.native="_handleAction('inform')"
              />
            <cape-dashboard-label-button
              label="Error"
              v-on:click.native="_handleAction('error')"
              />
            <cape-dashboard-label-button
              label="Success"
              v-on:click.native="_handleAction('success')"
              />
            <cape-dashboard-label-button
              label="Close"
              v-on:click.native="_handleAction('close')"
              />
          </div>
        </div>
      </div>
      <div class="flex"></div>
    </div>
  </div>
</template>

<script>
import AlertManager from '@/components/alert/Manager'
import AlertMessage from '@/components/alert/Message'
import LabelButton from '@/components/button/Label'

export default {

  data () {
    return {
      alertMessageLabel: 'Quisque sed ipsum velit. Ut finibus justo at erat pretium convallis. Vivamus vel quam nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia'
      // alertMessageLabel: 'Lorem ipsum'
    }
  },

  components: {
    'cape-dashboard-alert-manager': AlertManager,
    'cape-dashboard-label-button': LabelButton
  },

  methods: {
    _handleAction (type) {
      switch (type) {
        case 'inform':
          this.$refs.alertManager.open({
            type: AlertMessage.TYPE_INFORM,
            label: this.alertMessageLabel
          })
          break
        case 'error':
          this.$refs.alertManager.open({
            type: AlertMessage.TYPE_ERROR,
            label: this.alertMessageLabel
          })
          break
        case 'success':
          this.$refs.alertManager.open({
            type: AlertMessage.TYPE_SUCCESS,
            label: this.alertMessageLabel
          })
          break
        case 'close':
          this.$refs.alertManager.close()
          break
      }
    }
  }

}
</script>
