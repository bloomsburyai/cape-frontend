<style src="./styles/global.scss" lang="scss"></style>

<style scoped>
  .cape-authentication {
    height: 100%;
  }

  .header {
    padding: 0 0 48px 0;
    margin: 1rem 0 0 0;
    text-align: center;
  }

  .logo {
    display: inline-block;
    text-indent: -9999px;
    width: 67px;
    height: 43.2px;

    background: url("./assets/symbol.svg") no-repeat top left;
    background-size: contain;
  }
</style>

<template>
  <div class="cape-authentication">
    <div class="h-100 d-flex flex-column">
      <div class="h-50"></div>
      <div class="mx-auto">
        <div class="header">
          <a class="logo"
            v-bind:href="logoURL">Cape</a>
        </div>
        <router-view class="mx-auto"></router-view>
      </div>
      <div class="h-50"></div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import configuration from '@/configuration.js'

export default {

  computed: {
    logoURL () {
      let value = '#'
      if (_.has(configuration, 'authentication.logo.url')) {
        value = configuration.authentication.logo.url
      }
      return value
    }
  }

}
</script>
