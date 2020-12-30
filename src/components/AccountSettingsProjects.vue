<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Projects</div>
      </div>

      <div class="row row-border-bottom" v-for="(project) in ownerData()" :key="project._id">
        <div class="column column-data column-15">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="project.name"
            disabled
          />
        </div>
        <span class="tiny-text tiny-text-spaced">{{ project.usage }} MB / {{ project.usageTotal }} MB ({{ project.usage / project.usageTotal }}%)</span>
        <div class="column text-button action" v-on:click="upgradeTo('professional', projectId)">
          <span>Add 1 GB</span>
        </div>
        <div class="spacer"></div>
        <div class="column text-button action text-button-selected-blue" v-if="project.projectType === 'free'">
          <span>Free</span>
        </div>
        <div class="column text-button action" v-if="project.projectType === 'free' || project.projectType === 'standard'" v-on:click="upgradeTo('standard', projectId)" v-bind:class="{ 'text-button-selected-blue': project.projectType === 'standard' }">
          <span>Standard</span>
        </div>
        <div class="column text-button action" v-if="project.projectType === 'free' || project.projectType === 'developer'"  v-on:click="upgradeTo('developer', projectId)" v-bind:class="{ 'text-button-selected-blue': project.projectType === 'developer' }">
          <span>Developer</span>
        </div>
        <div class="column text-button action" v-if="project.projectType === 'free' || project.projectType === 'professional'"  v-on:click="upgradeTo('professional', projectId)" v-bind:class="{ 'text-button-selected-blue': project.projectType === 'professional' }">
          <span>Professional</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'AccountSettingsProjects',
  computed: {
    ...mapState('billing', ['card']),
    ...mapGetters('project', ['ownerData']),
  },
  methods: {
    upgradeTo: async function(upgradeType, projectId) {
      if (this.card) {
        location.assign(`/checkout?card=existing&type=${upgradeType}`)
      } else {
        location.assign(`/checkout?card=update&type=${upgradeType}`)
      }
    },
  }
}
</script>