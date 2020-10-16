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
 * Import socket
 * **/
import socket from './shared/plugins/network/socket'
/**
 * Import cognito module
 * **/
import attachCognitoModule from '@vuetify/vuex-cognito-module'
/**
 * Install vue-router
 * **/
import Project from './components/Project'
import Request from './components/Request'
import Workflow from './components/Workflow'
import Statistic from './components/Statistic'
import Storage from './components/Storage'
import Account from './components/Account'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/projects',
      name: 'Projects',
      component: Project,
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
    },
    {
      path: '/projects/:projectId/requests',
      name: 'Requests',
      component: Request,
      props: true,
    },
    {
      path: '/projects/:projectId/workflows',
      name: 'Workflows',
      component: Workflow,
      props: true,
    },
    {
      path: '/projects/:projectId/statistics',
      name: 'Statistics',
      component: Statistic,
      props: true,
    },
    {
      path: '/projects/:projectId/storage',
      name: 'Storage',
      component: Storage,
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
import accountModule from './shared/plugins/modules/Account'
import billingModule from './shared/plugins/modules/Billing'
import headerModule from './shared/plugins/modules/Header'

Vue.use(vuex)
const store = new vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authentication: authenticationModule,
    menu: menuModule,
    project: projectModule,
    table: tableModule,
    account: accountModule,
    billing: billingModule,
    header: headerModule,
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
 * Configure Socket
 * **/
Vue.use(socket)
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