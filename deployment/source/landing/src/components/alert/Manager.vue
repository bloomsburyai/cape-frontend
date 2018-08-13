<style scoped lang="scss">
  .cape-landing-alert-manager {
    display: block;
  }
</style>

<template>
  <div class="cape-landing-alert-manager">
    <template v-if="state === STATE_OPENED">
      <cape-landing-alert-message
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

  data () {
    return {
      STATE_CLOSED: STATE_CLOSED,
      STATE_OPENED: STATE_OPENED,
      state: STATE_CLOSED
    }
  },

  components: {
    'cape-landing-alert-message': Message
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
