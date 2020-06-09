/**
 * Import Vue
 * **/
import Vue from 'vue'
/**
 * Import Vuex
 * **/
import vuex from 'vuex'
/**
 * Import vue-router
 * **/
import VueRouter from 'vue-router'
/**
 * Import axios
 * **/
import axios from './shared/plugins/network/axios'
/**
 * Import cognito module
 * **/
import attachCognitoModule from '@vuetify/vuex-cognito-module'
/**
 * Install vue-router
 * **/
import Request from './components/Request'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/requests',
      component: Request,
    },
  ],
})
/**
* Install vuex
* **/
import authenticationModule from './shared/plugins/storage/authentication'
Vue.use(vuex)
const store = new vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authentication: authenticationModule,
  }
})
/**
 * Add store to axios
 * **/
Vue.use(axios, store)
/**
 * Add cognito to store
 * **/
attachCognitoModule(store, {
  userPoolId: process.env.VUE_APP_AWS_USER_POOL,
  userPoolWebClientId: process.env.VUE_APP_AWS_USER_POOL_CLIENT,
  region: process.env.VUE_APP_AWS_REGION,
}, 'cognito')
/**
 * Initialize app
 * **/
import App from './App.vue'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')