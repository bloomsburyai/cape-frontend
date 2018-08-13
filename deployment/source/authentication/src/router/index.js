import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Recover from '@/components/Recover'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // }
    {
      alias: '/',
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/login/:error',
      component: Login
    },
    {
      path: '/recover',
      name: 'recover',
      component: Recover
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
