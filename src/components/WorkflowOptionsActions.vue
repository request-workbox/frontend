<template>
  <div class="row row-border-bottom" v-if="this.option !== 'queue'">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <div
              v-if="this.option !== 'queue'"
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelWorkflowChangesAction">
                Cancel
              </div>
            <div
              v-if="this.option !== 'queue'"
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="saveWorkflowChangesAction">
                Save Changes
              </div>
            <div class="spacer" v-if="allowAddingWorkflowTask()"></div>
            <div
              v-if="allowAddingWorkflowTask()"
              class="column text-button action"
              v-on:click="addWorkflowTaskAction"
              :disabled="this.selectedWorkflow().workflowType === 'request'">
                Add Request
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import moment from 'moment-timezone'
import Vue from 'vue'

export default {
  name: 'WorkflowOptionsActions',
  computed: {
    ...mapState('workflow', ['editing','option']),
    ...mapGetters('workflow', ['selectedWorkflow']),
  },
  methods: {
    ...mapActions('workflow', ['cancelWorkflowChanges','saveWorkflowChanges','addWorkflowTask']),
    allowAddingWorkflowTask: function () {
      if (!this.selectedWorkflow()._id) return false

      if (this.option === 'tasks') return true
      else return false
    },
    addWorkflowTaskAction: async function () {
      try {
        const workflowTask = await this.addWorkflowTask({ workflowId: this.selectedWorkflow()._id })
      } catch(err) {
        console.log('Workflow options actions error', err.message)
      }
    },
    cancelWorkflowChangesAction: async function () {
      try {
        const workflow = await this.cancelWorkflowChanges({ _id: this.selectedWorkflow()._id })
      } catch(err) {
        console.log('Workflow options actions error', err.message)
      }
    },
    saveWorkflowChangesAction: async function () {
      try {
        const workflow = await this.saveWorkflowChanges(this.selectedWorkflow())
      } catch(err) {
        console.log('Workflow options actions error', err.message)
      }
    },
  },
};
</script>

<style lang="scss">
input[type="date"] {
  font-family: "Open Sans", sans-serif;
}
</style>