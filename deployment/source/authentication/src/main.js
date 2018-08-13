// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Authentication from './Authentication'
import '@/redirect'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#authentication',
  router,
  template: '<cape-authentication/>',
  components: {
    'cape-authentication': Authentication
  }
})
