<template>
    <div class="row row-justify-between row-border-bottom" v-if="this.selectedProject()._id && this.selectedProject().owner">
      <div class="column column-full-width">

        <div class="row row-border-bottom row-dark">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('settings')}" v-on:click="editOption('settings')">Settings</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('team')}" v-on:click="editOption('team')">Team</div>
        </div>

        <div class="row row-border-bottom" v-if="this.option === 'settings'">
          <div
            class="column text-button action"
            v-bind:class="{ disabled: !this.projectEditing }"
            v-on:click="cancelProjectChangesAction"
          >Cancel</div>
          <div
            class="column text-button action"
            v-bind:class="{ disabled: !this.projectEditing }"
            v-on:click="saveProjectChangesAction"
          >Save Changes</div>
        </div>

        <div class="row row-border-bottom" v-if="this.option === 'team'">
          <div
            class="column text-button action"
            v-bind:class="{ disabled: !this.teamEditing }"
            v-on:click="cancelTeamChangesAction"
          >Cancel</div>
          <div
            class="column text-button action"
            v-bind:class="{ disabled: !this.teamEditing }"
            v-on:click="saveTeamChangesAction"
          >Save Changes</div>
          <div class="spacer"></div>
          <div
            class="column text-button action"
            v-if="this.option === 'team'"
            v-bind:class="{ disabled: this.teamEditing }"
            v-on:click="listTeamAction"
          >List Team</div>
        </div>

        <div class="row">
          <keep-alive>
            <component :is="`ProjectSettings${upperFirstOption}`" v-if="this.option !== ''"></component>
          </keep-alive>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'
import Vue from 'vue'

import ProjectSettingsSettings from './ProjectSettingsSettings'
import ProjectSettingsTeam from './ProjectSettingsTeam'

export default {
  name: 'ProjectSettings',
  components: {
    ProjectSettingsSettings,
    ProjectSettingsTeam,
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
    ...mapActions('project', ['cancelProjectChanges','saveProjectChanges']),
    ...mapActions('team', ['listTeam','updateTeam']),
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
  }
}
</script>