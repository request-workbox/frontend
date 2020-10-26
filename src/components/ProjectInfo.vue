<template>
    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row">
          <div class="column input-hover">
            <input 
            class="input-text" 
            type="text" 
            id="project-name-input"
            ref="projectName"
            v-bind:value="projectName"
            v-on:focusin="focusInEvent"
            v-on:input="inputEvent"
            v-on:focusout="focusOutEvent"  />
          </div>
          <div class="column text-button" v-on:click="focusOutEvent">Save Project Name</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProjectInfo',
  data: function() {
    return {
      editing: false,
      updatedProjectName: '',
    }
  },
  computed: {
    ...mapState('project', ['projectName']),
  },
  methods: {
    ...mapActions('project', [
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
      this.updatedProjectName = event.target.value || this.$refs.projectName.value;
      await this.updateProjectName({projectName: this.updatedProjectName, projectId: this.projectId })
      location.reload()
    },
  }
}
</script>