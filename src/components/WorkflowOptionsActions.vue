<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <!-- Cancel / Save Changes / Add Task-->
            <div
              v-if="this.option !== 'queue' && this.option !== 'schedule'"
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelWorkflowChangesAction"
            >Cancel</div>
            <div
              v-if="this.option !== 'queue' && this.option !== 'schedule'"
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="saveWorkflowChangesAction"
            >Save Changes</div>
            <div
              v-if="allowAddingWorkflowTask()"
              class="column text-button action"
              v-on:click="addWorkflowTaskAction"
            >Add Task</div>
            <!-- Date Filter -->
            <div class="spacer"></div>
            <div 
              class="column"
              v-if="this.option === 'schedule'">
              <input type="date" name="" id="">
            </div>
            <!-- Reload / Clear -->
            <div class="spacer"></div>
            <div
              class="column text-button action"
              v-if="this.option === 'schedule'"
              v-on:click="getScheduleAction"
            >Reload</div>
            <div
              v-if="this.option === 'schedule'"
              class="column text-button action"
            >Clear</div>
            <!-- Queue Type Filter -->
            <div class="spacer"></div>
            <div
              v-if="this.option === 'schedule'"
              class="column filter-button filter-button-left filter-button-active"
            >All</div>
            <div
              v-if="this.option === 'schedule'"
              class="column filter-button"
            >Return</div>
            <div
              v-if="this.option === 'schedule'"
              class="column filter-button"
            >Queue</div>
            <div
              v-if="this.option === 'schedule'"
              class="column filter-button filter-button-right"
            >Schedule</div>
            <!-- Queue Status Filter -->
            <div class="spacer"></div>
            <div
              v-if="this.option === 'schedule'"
              class="column filter-button filter-button-left filter-button-active"
            >Active</div>
            <div
              v-if="this.option === 'schedule'"
              class="column filter-button"
            >Archived</div>
            <div
              v-if="this.option === 'schedule'"
              class="column filter-button"
            >Errored</div>
        </div>
        
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
    ...mapActions("table", ["cancelWorkflowChanges", 'saveWorkflowChanges','addWorkflowTask', 'getSchedule']),
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
    getScheduleAction: async function() {
      await this.getSchedule({
        workflowId: this.selectedData()._id,
        date: new Date()
      })
    }
  }
};
</script>

<style lang="scss">
  input[type=date] {
    font-family: "Open Sans", sans-serif;
  }
</style>