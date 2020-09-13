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
import Project from './components/Project'
import Request from './components/Request'
import Workflow from './components/Workflow'
import Environment from './components/Environment'
import Statistic from './components/Statistic'

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
      path: '/projects/:projectId/environments',
      name: 'Environments',
      component: Environment,
      props: true,
    },
    {
      path: '/projects/:projectId/statistics',
      name: 'Statistics',
      component: Statistic,
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
 * Import Socket
 * **/
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
/**
 * Configure Socket
 * **/
Vue.use(new VueSocketIO({
  debug: false,
  connection: SocketIO(process.env.VUE_APP_API_URL),
}));
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