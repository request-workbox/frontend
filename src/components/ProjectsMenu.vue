<template>
    <div class="row">
      <div class="column column-full-width">
        <div class="row">
          <div class="column account-container">
            <label class="account-breadcrumb">Account - Projects</label>
            <h3 class="account-header-slim">My Projects</h3>
          </div>
        </div>
        <div class="row row-border-bottom">
          <div
            class="column account-tab"
            v-bind:class="{ 'account-tab-selected': filterIsActive('active') }"
            v-on:click="changeFilter('active')">
              Active
          </div>
          <div
            class="column account-tab"
            v-bind:class="{ 'account-tab-selected': filterIsActive('archived') }"
            v-on:click="changeFilter('archived')">
              Archived
          </div>
          <div class="column column-grow"></div>
          <div class="column account-button" v-on:click="createProjectAction()">
            <span>New Project</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ProjectsMenu',
  computed: {
    ...mapState('project', ['filter']),
  },
  methods: {
    ...mapMutations('project', ['changeFilter']),
    ...mapActions('project', ['createProject']),
    createProjectAction: async function() {
      try {
        const project = await this.createProject()
      } catch(err) {
        console.log('Project menu error', err.message)
      }
    },
    filterIsActive: function(filterButton) {
      if (filterButton === this.filter) return true;
      else return false;
    },
  }
}
</script>