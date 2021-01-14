<template>
    <div class="row row-justify-between" v-if="this.selectedProject()._id && this.selectedProject().owner">
      <div class="column column-full-width">

        <div class="row row-border-bottom margin-top-10">
          <div
            class="column account-tab"
            v-bind:class="{ 'account-tab-selected': optionIsSelected('settings') }"
            v-on:click="editOptionAction('settings')">
              Settings
          </div>
          <div
            class="column account-tab"
            v-bind:class="{ 'account-tab-selected': optionIsSelected('team') }"
            v-on:click="editOptionAction('team')">
              Team
          </div>
          <div class="column column-grow"></div>
          <div 
            class="column account-button-light" 
            v-if="this.selectedProject()._id && this.selectedProject().active"
            v-on:click="archiveProjectAction">
            <span>Archive Project</span>
          </div>
          <div 
            class="column account-button-light" 
            v-if="this.selectedProject()._id && !this.selectedProject().active"
            v-on:click="restoreProjectAction">
            <span>Restore Project</span>
          </div>
        </div>

        <div class="row margin-top-bottom-15" v-if="this.option === 'settings'">
          <div
            class="column account-button action"
            v-bind:class="{ 'account-button-disabled': !this.projectEditing }"
            v-on:click="saveProjectChangesAction">
              Save Changes
          </div>
          <div class="spacer"></div>
          <div
            class="column text-button action"
            v-bind:class="{ disabled: !this.projectEditing }"
            v-on:click="cancelProjectChangesAction">
              Cancel
          </div>
        </div>

        <div class="row margin-top-bottom-15" v-if="this.option === 'team'">
          <div
            class="column account-button action"
            v-bind:class="{ 'account-button-disabled': !this.teamEditing }"
            v-on:click="saveTeamChangesAction">
              Save Changes
          </div>
          <div class="spacer"></div>
          <div
            class="column text-button action"
            v-bind:class="{ disabled: !this.teamEditing }"
            v-on:click="cancelTeamChangesAction">
              Cancel
          </div>
        </div>

        <div class="row">
          <keep-alive>
            <component :is="`ProjectsSettings${upperFirstOption}`" v-if="this.option !== ''"></component>
          </keep-alive>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'
import Vue from 'vue'

import ProjectsSettingsSettings from './ProjectsSettingsSettings'
import ProjectsSettingsTeam from './ProjectsSettingsTeam'

export default {
  name: 'ProjectsSettings',
  components: {
    ProjectsSettingsSettings,
    ProjectsSettingsTeam,
  },
  computed: {
    ...mapState('project', {
      option: 'option',
      projectEditing: 'editing',
    }),
    ...mapState('team', {
      teamEditing: 'editing',
    }),
    ...mapGetters('project', ['selectedProject']),
    upperFirstOption: function() {
      return _.upperFirst(this.option)
    },
  },
  methods: {
    ...mapMutations('project', ['editOption']),
    ...mapActions('project', ['cancelProjectChanges','saveProjectChanges','archiveProject','restoreProject']),
    ...mapActions('team', ['listTeam','updateTeam']),
    editOptionAction: function(option) {
      // Edit option
      this.editOption(option)
      
      // List team
      if (option === 'team') this.listTeamAction()
    },
    optionIsSelected: function(option) {
      if (option === this.option) return true
      else return false
    },
    listTeamAction: async function() {
      try {
        await this.listTeam(this.selectedProject()._id)
      } catch(err) {
        console.log('Project settings error', err.message)
      }
    },
    cancelProjectChangesAction: async function() {
      try {
        await this.cancelProjectChanges({ _id: this.selectedProject()._id })
      } catch(err) {
        console.log('Project settings error', err.message)
      }
    },
    saveProjectChangesAction: async function() {
      try {
        await this.saveProjectChanges(this.selectedProject())
      } catch(err) {
        console.log('Project settings error', err.message)
      }
    },
    cancelTeamChangesAction: async function() {
      try {
        await this.listTeam(this.selectedProject()._id)
      } catch(err) {
        console.log('Project settings error', err.message)
      }
    },
    saveTeamChangesAction: async function() {
      try {
        await this.updateTeam(this.selectedProject()._id)
      } catch(err) {
        console.log('Project settings error', err.message)
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
  }
}
</script>