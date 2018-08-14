<style scoped lang="scss">
  @import "../../scss/cape";

  .cape-dashboard-navigation-layout {
    /*
    overflow-x: hidden;
    overflow-y: auto;
    */
    background: $white;

    // Normal anchors

    .anchor {
      @include layout-horizontal();
      @include layout-center();
      height: 3rem;
      padding: 0 1.5rem;
      cursor: pointer; cursor: hand;
      transition: background-color .15s ease-in-out;

      &,
      &:hover,
      &:focus {
        text-decoration: none;
        outline: none;
      }

      &:hover,
      &.active {
        background-color: $grey-100;
      }

      i {
        display: inline-block;
        font-size: 0.875rem;
        line-height: 0.875rem;
        width: 1rem;
        height: 1rem;
        margin: 0 1.5rem 0 0;
        color: $grey-400;
        text-align: center;
        vertical-align: middle;
      }

      &.active i {
        color: $blue-500;
      }

      span {
        @include typography-body-1();
        width: 100%;
        color: $blue-grey-600;

      }
    }
  }
</style>

<template>
  <div class="cape-dashboard-navigation-layout">
    <cape-dashboard-navigation-anchor
      v-bind:class="{active: (page === 'statistics')}"
      location="/statistics">
      <i slot="icon" class="fa fa-pie-chart" aria-hidden="true"></i>
      <span slot="label">Statistics</span>
    </cape-dashboard-navigation-anchor>
    <cape-dashboard-navigation-anchor
      v-bind:class="{active: (page === 'assistant')}"
      location="/assistant">
      <i slot="icon" class="fa fa-cogs" aria-hidden="true"></i>
      <span slot="label">Interactive mode</span>
    </cape-dashboard-navigation-anchor>
    <cape-dashboard-navigation-heading>Questions</cape-dashboard-navigation-heading>
    <cape-dashboard-navigation-anchor
      v-bind:class="{active: (page === 'inbox')}"
      location="/inbox">
      <i slot="icon" class="fa fa-envelope" aria-hidden="true"></i>
      <span slot="label">User questions</span>
    </cape-dashboard-navigation-anchor>
    <!--
    <cape-dashboard-navigation-anchor
      v-bind:class="{active: (page === 'inbox')}"
      location="/inbox">
      <i slot="icon" class="fa fa-envelope" aria-hidden="true"></i>
      <span slot="label">Inbox</span>
      <cape-dashboard-navigation-badge slot="badge">35</cape-dashboard-navigation-badge>
    </cape-dashboard-navigation-anchor>
    -->
    <!--
    <cape-dashboard-navigation-anchor
      v-bind:class="{active: (page === 'history')}"
      location="/history">
      <i slot="icon" class="fa fa-history" aria-hidden="true"></i>
      <span slot="label">History</span>
    </cape-dashboard-navigation-anchor>
    -->
    <cape-dashboard-navigation-heading>Knowledge</cape-dashboard-navigation-heading>
    <cape-dashboard-navigation-anchor
      v-bind:class="{active: (page === 'saved-replies')}"
      location="/saved-replies">
      <i slot="icon" class="fa fa-star" aria-hidden="true"></i>
      <span slot="label">Saved replies</span>
    </cape-dashboard-navigation-anchor>
    <cape-dashboard-navigation-anchor
      v-bind:class="{active: (page === 'documents')}"
      location="/documents">
      <i slot="icon" class="fa fa-cloud" aria-hidden="true"></i>
      <span slot="label">Documents</span>
    </cape-dashboard-navigation-anchor>
    <!--
    <cape-dashboard-navigation-heading>Publish</cape-dashboard-navigation-heading>
    <cape-dashboard-navigation-anchor
      v-bind:class="{active: (page === 'widget')}"
      location="/widget">
      <i slot="icon" class="fa fa-code" aria-hidden="true"></i>
      <span slot="label">Widget</span>
    </cape-dashboard-navigation-anchor>
    -->
    <cape-dashboard-navigation-heading>Integrations</cape-dashboard-navigation-heading>
    <!--
    <a class="anchor" target="_blank" href="https://slack.com/oauth/authorize?client_id=103020126263.299415020835&scope=bot,files:read">
      <i slot="icon" class="fa fa-slack" aria-hidden="true"></i>
      <span>Add to Slack</span>
    </a>
    -->
    <cape-dashboard-navigation-anchor
      v-bind:class="{active: (page === 'slack')}"
      location="/integrations/slack">
      <i slot="icon" class="fa fa-slack" aria-hidden="true"></i>
      <span slot="label">Slack</span>
    </cape-dashboard-navigation-anchor>
    <cape-dashboard-navigation-anchor
      v-bind:class="{active: (page === 'forward-email')}"
      location="/integrations/forward-email">
      <i slot="icon" class="fa fa-at" aria-hidden="true"></i>
      <span slot="label">Forward email</span>
    </cape-dashboard-navigation-anchor>


  </div>
</template>

<script>
import _ from 'lodash'
import Anchor from './Anchor'
import Badge from './Badge'
import Heading from './Heading'

const DEFAULT_PAGE = 'assistant'

export default {

  data () {
    return {
      page: ''
    }
  },

  components: {
    'cape-dashboard-navigation-anchor': Anchor,
    'cape-dashboard-navigation-badge': Badge,
    'cape-dashboard-navigation-heading': Heading
  },

  watch: {
    $route (fresh, stale) {
      this.updatePage()
    }
  },

  methods: {
    updatePage () {
      let path = _.trim(this.$route.path, '/')
      if (!path) {
        path = DEFAULT_PAGE
      }
      const parts = path.split('/', 1)
      if (parts && parts.length) {
        this.page = parts[0]
      } else {
        this.page = DEFAULT_PAGE
      }
    }
  },

  created () {
    this.updatePage()
  }

}
</script>
