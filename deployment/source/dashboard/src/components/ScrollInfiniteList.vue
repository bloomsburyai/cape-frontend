<style scoped lang="scss">
  @import "../scss/cape";

  .cape-dashboard-scroll-infinite-list {
    display: block;
    position: relative;
    z-index: 0;
  }

  .cape-dashboard-scroll-infinite-list .cape-dashboard-scroll-threshold {
    height: 100%;
  }

  .cape-dashboard-scroll-infinite-list .indicator {
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
  }

  .cape-dashboard-scroll-infinite-list .progress-indicator .fa {
    font-size: 0.875rem;
    color: $blue-500;
  }

  .cape-dashboard-scroll-infinite-list .finish-indicator {
    color: $blue-grey-200;
  }
</style>

<!--

DO NOT REMOVE!
Used as exmplanation for what "render" does.


<template>
  <div class="cape-dashboard-scroll-infinite-list">
    <cape-dashboard-scroll-threshold>
      <template v-for="(model, index) in collection">
        <slot v-bind:model="model"/>
      </template>
      <div class="progress-indicator">
        <i class="fa fa-circle-o-notch" aria-hidden="true"></i>
      </div>
    </cape-dashboard-scroll-threshold>
  </div>
</template>

-->

<script>
import ScrollThreshold from '@/components/ScrollThreshold'

export default {

  // Render the commented out template above from code.
  // Needed so that we can re-use the scoped slot as
  // an element builder.
  render (createElement) {
    // progress element
    let progressElement = null
    if (this.progress) {
      progressElement = createElement('div', {
        attrs: {
          'class': 'indicator progress-indicator'
        }
      }, [
        createElement('i', {
          attrs: {
            'class': 'fa fa-spin fa-circle-o-notch',
            'aria-hidden': 'true'
          }
        })
      ])
    }

    // finish element
    let finishElement = null
    if (!this.hasMore) {
      finishElement = createElement('div', {
        attrs: {
          'class': 'indicator finish-indicator cape-typography-caption'
        }
      }, ['End'])
    }

    // list items
    // use scoped slot component as builder
    const ItemConstructor = this.$scopedSlots.default
    const itemElements = this.collection.map(function (model) {
      const component = ItemConstructor(model)
      return component
    })

    // scroll threshold element & children
    const scrollThresholdChildren = [...itemElements]
    if (progressElement) {
      scrollThresholdChildren.push(progressElement)
    }
    if (finishElement) {
      scrollThresholdChildren.push(finishElement)
    }
    const scrollThresholdElement = createElement(ScrollThreshold, {
      ref: 'scrollThreshold',
      on: {
        threshold: this._handleScrollThreshold
      },
      props: {
        enabled: !this.progress
      }
    }, scrollThresholdChildren)

    // component element
    const element = createElement('div', {
      attrs: {
        'class': 'cape-dashboard-scroll-infinite-list'
      }
    }, [scrollThresholdElement])
    return element
  },

  data () {
    return {
      collection: [],
      pageNumber: 0,
      progress: false,
      hasMore: true,
      adapter: null
    }
  },

  components: {
    'cape-dashboard-scroll-threshold': ScrollThreshold
  },

  computed: {
    items () {
      return this.$refs.scrollThreshold.$children
    }
  },

  methods: {
    load () {
      this.progress = true
      this.adapter(this.pageNumber, this._callback)
    },
    reset () {
      this.collection = []
      this.pageNumber = 0
      this.progress = false
      this.hasMore = true
      this.$refs.scrollThreshold.scroll(0, 0)
    },
    _callback (error, models, more) {
      if (error) {}
      this.progress = false
      this.hasMore = more
      this.$refs.scrollThreshold.reset()
      if (models) {
        this.collection.push(...models)
      }
    },
    _handleScrollThreshold (place) {
      if (place === 'lower' && this.hasMore) {
        this.pageNumber++
        this.load()
      }
    }
  }

}
</script>
