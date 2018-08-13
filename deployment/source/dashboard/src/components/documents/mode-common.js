import moment from 'moment'

export default {

  props: {
    id: {
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

  computed: {
    createdLabel () {
      return moment.unix(this.created).format('MMM DD, YYYY')
    }
  }

}
