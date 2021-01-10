<template>
    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row margin-top-bottom-5">
          
          <div class="column">
            <div class="row">
              <div class="column spacer"></div>
              <div
                class="column filter-button filter-button-left"
                v-bind:class="{ 'filter-button-active': projectTypeIsActive('owner') }"
                v-on:click="editProjectOption('owner')"
              >Owner</div>
              <div
                class="column filter-button"
                v-bind:class="{ 'filter-button-active': projectTypeIsActive('team') }"
                v-on:click="editProjectOption('team')"
              >Team</div>
              <div
                class="column filter-button filter-button-right"
                v-bind:class="{ 'filter-button-active': projectTypeIsActive('invites') }"
                v-on:click="editProjectOption('invites')"
              >Invites</div>
            </div>
          </div>

          <div class="column spacer"></div>

          <div class="column">
            <div class="row">
              <div class="column spacer"></div>
              <div
                class="column filter-button filter-button-left"
                v-bind:class="{ 'filter-button-active': filterIsActive('active') }"
                v-on:click="changeFilter('active')"
                v-if="projectOption !== 'invites'"
              >Active</div>
              <div
                class="column filter-button filter-button-right"
                v-bind:class="{ 'filter-button-active': filterIsActive('archived') }"
                v-on:click="changeFilter('archived')"
                v-if="projectOption !== 'invites'"
              >Archived</div>
            </div>
          </div>
          
          <div class="spacer"></div>

          <div
            class="column text-button action"
            v-if="projectOption === 'invites'"
            v-on:click="listInvitesAction"
          >List Invites</div>

          <div class="column text-button text-button-and-logo" v-on:click="archiveProjectAction" v-if="!this.editing && projectOption !== 'invites' && filterIsActive('active') && projectIsSelected()">
            <img src="/box.svg" alt="">
            <span>Archive Project</span>
          </div>
          <div class="column text-button text-button-and-logo" v-on:click="restoreProjectAction" v-if="!this.editing && projectOption !== 'invites' && filterIsActive('archived') && projectIsSelected()">
            <img src="/file-1.svg" alt="">
            <span>Restore Project</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations, } from 'vuex'

export default {
  name: 'ProjectToolbar',
  computed: {
    ...mapState('project', ['filter','editing','projectOption','selectedProjectId']),
  },
  methods: {
    ...mapMutations('project', ['changeFilter','editProjectOption']),
    ...mapActions('project',['archiveProject','restoreProject']),
    ...mapActions('invites', ['listInvites']),
    filterIsActive: function(filterButton) {
      if (filterButton === this.filter) return true;
      else return false;
    },
    projectIsSelected: function() {
      if (!this.selectedProjectId || this.selectedProjectId === '') return false;
      else return true;
    },
    listInvitesAction: async function() {
      try {
        const invites = await this.listInvites()
      } catch(err) {
        console.log('Project toolbar error', err.message)
      }
    },
    archiveProjectAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to archive this project?')
      if (confirm) {
        await this.archiveProject({ projectId: this.selectedProjectId })
      }
      } catch(err) {
        console.log('Project toolbar error', err.message)
      }
    },
    restoreProjectAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to restore this project?')
        if (confirm) {
          await this.restoreProject({ projectId: this.selectedProjectId })
        }
      } catch(err) {
        console.log('Project toolbar error', err.message)
      }
    },
    projectTypeIsActive: function(projectType) {
      if (projectType === this.projectOption) return true
      else return false
    },
  }
}
</script>

<style lang="scss">
.margin-top-bottom-5 {
  margin-top: 5px !important;
  margin-bottom: 5px !important;
}
</style>