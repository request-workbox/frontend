<template>
    <div class="row" v-if="$store.getters['cognito/isLoggedIn']">
      <div class="column column-full-width">
        <div class="column text-button" id="site-header" v-on:click="assignHome">
          Request Workbox
        </div>
        <div class="row" id="nav-row" v-if="$route.name !== 'checkout'">
          <div class="column column-full-width">
            <p class="text-button-nav-text-header">Account</p>
          </div>
          <div class="column text-button-nav" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('projects') }" v-on:click="navigateToRoute('projects')">
            <p class="text-button-nav-text">Projects</p>
          </div>
          <div class="column text-button-nav" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('team-projects') }" v-on:click="navigateToRoute('team-projects')">
            <p class="text-button-nav-text">Team Projects</p>
          </div>
          <div class="column text-button-nav" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('invites') }" v-on:click="navigateToRoute('invites')">
            <p class="text-button-nav-text">Invites</p>
          </div>
          <div class="column text-button-nav" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('tokens') }" v-on:click="navigateToRoute('tokens')">
            <p class="text-button-nav-text">API Keys</p>
          </div>
          <div class="column text-button-nav" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('billing') }" v-on:click="navigateToRoute('billing')">
            <p class="text-button-nav-text">Billing</p>
          </div>
          <div class="column text-button-nav" v-bind:class="{ 'text-button-nav-selected':shouldBeSelected('upgrades') }" v-on:click="navigateToRoute('upgrades')">
            <p class="text-button-nav-text">Upgrades</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: 'Nav',
  computed: {
    ...mapState('project', ['selectedProjectId']),
  },
  methods: {
    assignHome: function() {
      location.assign('/')
    },
    shouldBeSelected: function(route) {
      if (this.$route.name === route) return true
      else return false
    },
    navigateToRoute: function(route) {
      if (route === 'workflow') return location.assign(`/projects/${this.selectedProjectId}/workflow`)
      else return location.assign(`/${route}`)
    }
  }
}
</script>