<template>
    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="column text-button" id="site-header" v-on:click="assignHome">
          Request Workbox
        </div>
        <div class="row" id="nav-row">
          <div class="column text-button-nav">
            <p class="text-button-nav-text-header">Workbox</p>
          </div>
          <div class="column text-button-nav" v-if="shouldBeShown('projects') && this.$store.getters['cognito/isLoggedIn']" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('projects') }" v-on:click="navigateToRoute('projects')">
            <p class="text-button-nav-text">Projects</p>
          </div>
          <div class="column text-button-nav" v-if="shouldBeShown('requests') && this.$store.getters['cognito/isLoggedIn']" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('requests') }" v-on:click="navigateToRoute('requests')">
            <p class="text-button-nav-text">Requests</p>
          </div>
          <div class="column text-button-nav" v-if="shouldBeShown('workflows') && this.$store.getters['cognito/isLoggedIn']" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('workflows') }" v-on:click="navigateToRoute('workflows')">
            <p class="text-button-nav-text">Workflows</p>
          </div>
          <div class="column text-button-nav" v-if="shouldBeShown('storage') && this.$store.getters['cognito/isLoggedIn']" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('storage') }" v-on:click="navigateToRoute('storage')">
            <p class="text-button-nav-text">Storage</p>
          </div>
          <div class="column text-button-nav" v-if="shouldBeShown('statistics') && this.$store.getters['cognito/isLoggedIn']" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('statistics') }" v-on:click="navigateToRoute('statistics')">
            <p class="text-button-nav-text">Stats</p>
          </div>
          <div class="column text-button-nav" v-if="shouldBeShown('tools')">
            <p class="text-button-nav-text-header">Tools</p>
          </div>
          <div class="column text-button-nav" v-if="shouldBeShown('statuscheck') && this.$store.getters['cognito/isLoggedIn']" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('statuscheck') }" v-on:click="navigateToRoute('statuscheck')">
            <p class="text-button-nav-text">
              <span>Status Check</span>
              <span class="beta">New</span>
            </p>
          </div>
          <div class="column text-button-nav" v-if="shouldBeShown('webhook') && this.$store.getters['cognito/isLoggedIn']" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('webhook') }" v-on:click="navigateToRoute('webhook')">
            <p class="text-button-nav-text">
              <span>Webhooks</span>
              <span class="beta">New</span>
            </p>
          </div>
          <div class="column text-button-nav">
            <p class="text-button-nav-text-header">Settings</p>
          </div>
          <div class="column text-button-nav" v-if="shouldBeShown('account') && this.$store.getters['cognito/isLoggedIn']" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('account') }" v-on:click="navigateToRoute('account')">
            <p class="text-button-nav-text">Account</p>
          </div>
          <div class="column text-button-nav" v-if="this.$route.name === 'Checkout' && this.$store.getters['cognito/isLoggedIn']" v-bind:class="{ 'text-button-nav-selected': this.$route.name === 'Checkout' }">
            <p class="text-button-nav-text">Checkout</p>
          </div>
          <div class="column text-button-nav text-button-and-logo" v-if="!loading && this.$store.getters['cognito/isLoggedIn']" v-on:click="logoutUserAction">
            <p class="text-button-nav-text">Logout</p>
          </div>
          <div class="column text-button-nav" v-if="loading && this.$store.getters['cognito/isLoggedIn']">Logging out...</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Nav',
  data: function() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState('project', ['projectId']),
  },
  methods: {
    ...mapActions('authentication', [
      'logoutUser'
    ]),
    assignHome: function() {
      location.assign('/')
    },
    logoutUserAction: async function() {
      try {
        this.loading = true
        await this.logoutUser()
        location.assign('/login')
      } catch(err) {
        // console.log(err)
      } finally {
        this.loading = false
      }
    },
    shouldBeSelected: function(route) {
      if (this.$route.name === 'Requests' && route === 'requests') {
        return true
      } else if (this.$route.name === 'Workflows' && route === 'workflows') {
        return true
      } else if (this.$route.name === 'Storage' && route === 'storage') {
        return true
      } else if (this.$route.name === 'Projects' && route == 'projects') {
        return true
      } else if (this.$route.name === 'Statistics' && route == 'statistics') {
        return true
      } else if (this.$route.name === 'Statuscheck' && route == 'statuscheck') {
        return true
      } else if (this.$route.name === 'Webhook' && route == 'webhook') {
        return true
      } else if (this.$route.name === 'Account' && route == 'account') {
        return true
      } else {
        return false
      }
    },
    shouldBeShown: function(route) {
      if (route === 'projects' || route === 'account') {
        return true
      } else {
        if (this.projectId !== '') return true;
        else return false;
      }
    },
    navigateToRoute: function(route) {
      if (route === 'requests') {
        location.assign(`/projects/${this.projectId}/requests`)
      } else if (route === 'workflows') {
        location.assign(`/projects/${this.projectId}/workflows`)
      } else if (route === 'storage') {
        location.assign(`/projects/${this.projectId}/storage`)
      } else if (route === 'statistics') {
        location.assign(`/projects/${this.projectId}/statistics`)
      } else if (route === 'statuscheck') {
        location.assign(`/projects/${this.projectId}/statuscheck`)
      } else if (route === 'webhook') {
        location.assign(`/projects/${this.projectId}/webhooks`)
      } else if (route === 'projects') {
        location.assign(`/projects`)
      } else if (route === 'account') {
        location.assign(`/account`)
      }
    }
  }
}
</script>

<style lang="scss">
.beta {
  margin-left: 5px;
  color: #5cc549;
}
</style>