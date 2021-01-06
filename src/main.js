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
 * Import stripe
 * **/
import stripe from './shared/plugins/network/stripe'
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
import Storage from './components/Storage'
import Account from './components/Account'
import Checkout from './components/Checkout'

import Register from './components/UserRegister'
import Confirm from './components/UserConfirm'
import Reset from './components/UserReset'
import SendReset from './components/UserSendReset'
import Login from './components/UserLogin'

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
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
      props: true,
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
      path: '/projects/:projectId/storage',
      name: 'Storage',
      component: Storage,
      props: true,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      props: true,
    },
    {
      path: '/confirm',
      name: 'Confirm',
      component: Confirm,
      props: true,
    },
    {
      path: '/send-reset-password',
      name: 'SendReset',
      component: SendReset,
      props: true,
    },
    {
      path: '/reset-password',
      name: 'Reset',
      component: Reset,
      props: true,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true,
    },
  ],
})
/**
* Install vuex
* **/
import authenticationModule from './shared/plugins/modules/Authentication'
import projectModule from './shared/plugins/modules/Project'
import tableModule from './shared/plugins/modules/Table'
import accountModule from './shared/plugins/modules/AccountSettings'
import billingModule from './shared/plugins/modules/AccountBilling'
import headerModule from './shared/plugins/modules/Header'
import queueModule from './shared/plugins/modules/Queue'
import instanceModule from './shared/plugins/modules/Instance'
import checkoutModule from './shared/plugins/modules/Checkout'

Vue.use(vuex)
const store = new vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authentication: authenticationModule,
    project: projectModule,
    table: tableModule,
    account: accountModule,
    billing: billingModule,
    header: headerModule,
    queue: queueModule,
    instance: instanceModule,
    checkout: checkoutModule,
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
 * Configure Stripe
 * **/
Vue.use(stripe)
/**
 * Configure Toast
 * **/
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast, {
  position: 'top-right',
  duration: 10000,
  type: 'default',
})
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