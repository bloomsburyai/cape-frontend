<style scoped lang="scss">
  .cape-dashboard-alert-manager {
    display: block;
  }
</style>

<template>
  <div class="cape-dashboard-alert-manager">
    <template v-if="state === STATE_OPENED">
      <cape-dashboard-alert-message
        ref="message"
        v-on:close="close"/>
    </template>
  </div>
</template>

<script>
import Message from './Message'

const STATE_CLOSED = 'stateClosed'
const STATE_OPENED = 'stateOpened'

export default {

  STATE_CLOSED: STATE_CLOSED,
  STATE_OPENED: STATE_OPENED,

  data () {
    return {
      STATE_CLOSED: STATE_CLOSED,
      STATE_OPENED: STATE_OPENED,
      state: STATE_CLOSED
    }
  },

  components: {
    'cape-dashboard-alert-message': Message
  },

  computed: {
    opened () {
      return this.state === STATE_OPENED
    }
  },

  methods: {
    open (fields) {
      this.state = STATE_OPENED
      this.$nextTick(function () {
        if (!this.$refs.message) {
          return
        }
        let value
        for (let key in fields) {
          value = fields[key]
          this.$refs.message[key] = value
        }
      })
    },
    close () {
      this.state = STATE_CLOSED
    }
  }

}
</script>
