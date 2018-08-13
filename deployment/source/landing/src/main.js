// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Landing from './Landing'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#landing',
  router,
  template: '<cape-landing/>',
  components: {
    'cape-landing': Landing
  }
})
