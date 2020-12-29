<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Projects</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Project Name"
            disabled
          />
        </div>
        <span class="tiny-text tiny-text-spaced">Usage: 50% 0.50 GB remaining</span>
        <div class="column text-button action 'text-button-selected-blue'" v-if="this.projectType === 'free'">
          <span>Free</span>
        </div>
        <div class="column text-button action" v-if="this.projectType === 'free' || this.projectType === 'standard'" v-on:click="upgradeTo('standard', projectId)" v-bind:class="{ 'text-button-selected-blue': this.projectType === 'standard' }">
          <span>Standard</span>
        </div>
        <div class="column text-button action" v-if="this.projectType === 'free' || this.projectType === 'developer'"  v-on:click="upgradeTo('developer', projectId)" v-bind:class="{ 'text-button-selected-blue': this.projectType === 'developer' }">
          <span>Developer</span>
        </div>
        <div class="column text-button action" v-if="this.projectType === 'free' || this.projectType === 'professional'"  v-on:click="upgradeTo('professional', projectId)" v-bind:class="{ 'text-button-selected-blue': this.projectType === 'professional' }">
          <span>Professional</span>
        </div>
        <div class="spacer"></div>
        <div class="column text-button action" v-on:click="upgradeTo('professional', projectId)">
          <span>Add 1 GB</span>
        </div>
        <div class="column column-grow"></div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AccountBillingProjects',
  computed: {
    ...mapState('billing', ['card']),
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