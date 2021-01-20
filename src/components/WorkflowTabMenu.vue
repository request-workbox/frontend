<template>
    <div class="row">
      <div class="column column-full-width padding-left-right-15">
        <div class="row">
          <div
            class="column workflow-tab">
              {{ this.selectedWorkflow().name}}
          </div>

          <div
              class="column account-button action"
              v-bind:class="{ 'account-button-disabled': !this.editing }"
              v-on:click="saveWorkflowChangesAction">
                Save Workflow Changes
              </div>
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelWorkflowChangesAction">
                Cancel
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
  name: 'WorkflowTabMenu',
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
}
</script>

<style lang="scss">
.workflow-tab {
    width: auto;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    padding: 0 4px;
    color:grey;

    border-style: solid;
    border-color:white;
    border-width: 1px;

    transition: 0.2s;

    color:black;
}
.workflow-tab-selected {
  color:black;
  border-bottom-color: #2197f3;
}
</style>