<template>
    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row">
          <div class="column input-hover">
            <input 
            class="input-text" 
            type="text" 
            id="project-name-input"
            v-bind:value="projectName"
            v-on:focusin="focusInEvent"
            v-on:input="inputEvent"
            v-on:focusout="focusOutEvent"  />
          </div>
          <div class="column text-button" id="project-share-button">Share</div>
          <div class="column text-button" id="project-team-button">Team</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RequestProject',
  props: ['projectId','projectName'],
  data: function() {
    return {
      editing: false,
      updatedProjectName: '',
    }
  },
  methods: {
    ...mapActions('request/requestProject', [
      'updateProjectName',
    ]),
    focusInEvent: function(event) {
      this.editing = false
    },
    inputEvent: function(event) {
      this.editing = true
    },
    focusOutEvent: async function(event) {
      if (!this.editing) return;
      this.updatedProjectName = event.target.value;
      await this.updateProjectName({projectName: this.updatedProjectName, projectId: this.projectId })
    },
  }
}
</script>