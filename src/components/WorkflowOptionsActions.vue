<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelWorkflowChangesAction"
            >Cancel</div>
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="saveWorkflowChangesAction"
            >Save Changes</div>
            <div
              class="column text-button action"
              v-if="this.option === 'queue'"
            >Refresh Queue</div>
            <div
              class="column text-button action"
              v-if="this.option === 'schedule'"
            >Refresh Schedule</div>
            <div
              class="column text-button action"
              v-if="this.option === 'schedule'"
            >Clear Schedule</div>
            <div
              class="column text-button action"
              v-if="this.option === 'queue'"
            >Clear Queue</div>
          </div>
        </div>
        <div class="column" v-if="allowAddingWorkflowTask()">
          <div
            class="column text-button action"
            v-on:click="addWorkflowTaskAction"
          >Add Request</div>
        </div>
        <div class="column" v-if="this.option === 'schedule'">
          <div
            class="column text-button action"
          >Start New Instance in 5 Min</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "WorkflowOptionsActions",
  computed: {
    ...mapGetters('table', ['selectedData']),
    ...mapState("table", ["editing"]),
    ...mapState('table', ['option'])
  },
  methods: {
    ...mapActions("table", ["cancelWorkflowChanges", 'saveWorkflowChanges','addWorkflowTask']),
    allowAddingWorkflowTask: function() {
      if (!this.selectedData()._id) return false;

      if (this.option === 'tasks') return true;
        else return false;
    },
    addWorkflowTaskAction: async function() {
      await this.addWorkflowTask({ workflowId: this.selectedData()._id})
    },
    cancelWorkflowChangesAction: async function() {
      await this.cancelWorkflowChanges({ _id: this.selectedData()._id })
    },
    saveWorkflowChangesAction: async function() {
      await this.saveWorkflowChanges(this.selectedData())
    },
  }
};
</script>

<style lang="scss">

</style>