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
import Workflow from './components/Workflow'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/projects/:projectId/requests',
      component: Request,
      props: true,
    },
    {
      path: '/projects/:projectId/workflows',
      component: Workflow,
      props: true,
    },
  ],
})
/**
* Install vuex
* **/
import authenticationModule from './shared/plugins/modules/authentication'
import menuModule from './shared/plugins/modules/Menu'
import projectModule from './shared/plugins/modules/Project'
import tableModule from './shared/plugins/modules/Table'
Vue.use(vuex)
const store = new vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authentication: authenticationModule,
    menu: menuModule,
    project: projectModule,
    table: tableModule
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