<template>
    <div class="row row-justify-between row-border-bottom" v-if="this.projectId !== ''">
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
    ...mapActions('project', ['cancelProjectChanges','saveProjectChanges']),
    ...mapMutations('project', ['changeOption']),
    optionIsSelected: function(option) {
      if (option === this.option) return true
      else return false
    },
    cancelProjectChangesAction: async function() {
      await this.cancelProjectChanges({ _id: this.selectedData()._id })
    },
    saveProjectChangesAction: async function() {
      try {
        await this.saveProjectChanges(this.selectedData())
      } catch(err) {
        Vue.$toast.open(err.message)
      }
    },
  }
}
</script>