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
import Projects from './components/Projects'
import TeamProjects from './components/TeamProjects'
import Invites from './components/Invites'
import Tokens from './components/Tokens'
import Billing from './components/Billing'
import Upgrades from './components/Upgrades'
import Checkout from './components/Checkout'
// import Workflow from './components/Workflow'

import Dashboard from './components/Dashboard'

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

    // Settings
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
    },
    {
      path: '/team-projects',
      name: 'team-projects',
      component: TeamProjects,
    },
    {
      path: '/invites',
      name: 'invites',
      component: Invites,
    },
    {
      path: '/tokens',
      name: 'tokens',
      component: Tokens,
    },
    {
      path: '/billing',
      name: 'billing',
      component: Billing,
    },
    {
      path: '/upgrades',
      name: 'upgrades',
      component: Upgrades,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      props: true,
    },

    // Dashboard
    {
      path: '/projects/:projectId',
      name: 'dashboard',
      component: Dashboard,
      props: true,
    },

    // Auth
    {
      path: '/register',
      name: 'register',
      component: Register,
      props: true,
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm,
      props: true,
    },
    {
      path: '/send-reset-password',
      name: 'send-reset-password',
      component: SendReset,
      props: true,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: Reset,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true,
    },

  ],
})
/**
* Install vuex
* **/
import authenticationModule from './shared/plugins/modules/Authentication'

import billingModule from './shared/plugins/modules/Billing'
import checkoutModule from './shared/plugins/modules/Checkout'
import headerModule from './shared/plugins/modules/Header'
import instanceModule from './shared/plugins/modules/Instance'
import invitesModule from './shared/plugins/modules/Invites'
import projectModule from './shared/plugins/modules/Project'
import queueModule from './shared/plugins/modules/Queue'
import requestModule from './shared/plugins/modules/Request'
import storageModule from './shared/plugins/modules/Storage'
import teamModule from './shared/plugins/modules/Team'
import workflowModule from './shared/plugins/modules/Workflow'
import dashboardModule from './shared/plugins/modules/Dashboard'

Vue.use(vuex)
const store = new vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authentication: authenticationModule,
    billing: billingModule,
    checkout: checkoutModule,
    header: headerModule,
    instance: instanceModule,
    invites: invitesModule,
    project: projectModule,
    queue: queueModule,
    request: requestModule,
    storage: storageModule,
    team: teamModule,
    workflow: workflowModule,
    dashboard: dashboardModule,
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