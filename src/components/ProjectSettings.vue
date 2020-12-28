<template>
    <div class="row row-justify-between row-border-bottom" v-if="this.projectId && this.selectedData().owner">
      <div class="column column-full-width">

        <div class="row row-border-bottom row-dark">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('settings')}" v-on:click="changeOption('settings')">Settings</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('team')}" v-on:click="changeOption('team')">Team</div>
        </div>

        <div class="row row-border-bottom">
          <div
            class="column text-button action"
            v-bind:class="{ disabled: !this.editing }"
            v-on:click="cancelProjectChangesAction"
          >Cancel</div>
          <div
            class="column text-button action"
            v-bind:class="{ disabled: !this.editing }"
            v-on:click="saveProjectChangesAction"
          >Save Changes</div>
          <div class="spacer"></div>
          <div
            class="column text-button action"
            v-if="this.option === 'team'"
            v-bind:class="{ disabled: this.editing }"
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
    ...mapState('project', ['option','editing','projectId']),
    ...mapGetters('project',['selectedData']),
    upperFirstOption: function() {
      return _.upperFirst(this.option)
    },
  },
  methods: {
    ...mapActions('project', ['cancelProjectChanges','saveProjectChanges','listTeam','updateTeam']),
    ...mapMutations('project', ['changeOption']),
    optionIsSelected: function(option) {
      if (option === this.option) return true
      else return false
    },
    listTeamAction: async function() {
      await this.listTeam(this.selectedData()._id)
    },
    cancelProjectChangesAction: async function() {
      if (this.option === 'settings') {
        await this.cancelProjectChanges({ _id: this.selectedData()._id })
      } else if (this.option === 'team') {
        await this.listTeam(this.selectedData()._id)
      }
    },
    saveProjectChangesAction: async function() {
      try {
        if (this.option === 'settings') {
          await this.saveProjectChanges(this.selectedData())
        } else if (this.option === 'team') {
          await this.updateTeam(this.selectedData()._id)
        }
      } catch(err) {
        Vue.$toast.open(err.message)
      }
    },
  }
}
</script>