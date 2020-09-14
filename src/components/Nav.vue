<template>
    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row">
          <div class="column text-button" v-if="shouldBeShown('projects')" v-bind:class="{ 'text-button-selected':shouldBeSelected('projects') }" v-on:click="navigateToRoute('projects')">Projects</div>
          <div class="column text-button" v-if="shouldBeShown('requests')" v-bind:class="{ 'text-button-selected':shouldBeSelected('requests') }" v-on:click="navigateToRoute('requests')">Requests</div>
          <div class="column text-button" v-if="shouldBeShown('workflows')" v-bind:class="{ 'text-button-selected':shouldBeSelected('workflows') }" v-on:click="navigateToRoute('workflows')">Workflows</div>
          <div class="column text-button" v-if="shouldBeShown('statistics')" v-bind:class="{ 'text-button-selected':shouldBeSelected('statistics') }" v-on:click="navigateToRoute('statistics')">Statistics</div>
          <div class="column text-button" v-if="shouldBeShown('storage')" v-bind:class="{ 'text-button-selected':shouldBeSelected('storage') }" v-on:click="navigateToRoute('storage')">Storage</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Nav',
  computed: {
    ...mapState('project', ['projectId']),
  },
  methods: {
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
      } else {
        return false
      }
    },
    shouldBeShown: function(route) {
      if (route === 'projects') {
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
      } else if (route === 'projects') {
        location.assign(`/projects`)
      }
    }
  }
}
</script>