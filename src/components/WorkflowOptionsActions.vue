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
            >
              Cancel
            </div>
            <div
              v-if="this.option !== 'queue' && this.option !== 'schedule'"
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="saveWorkflowChangesAction"
            >
              Save Changes
            </div>
            <div
              v-if="allowAddingWorkflowTask()"
              class="column text-button action"
              v-on:click="addWorkflowTaskAction"
            >
              Add Task
            </div>

            <!-- Date Filter -->
            <div class="column" v-if="this.option === 'schedule'">
              <span class="tiny-text tiny-text-spaced">{{ currentTime }}</span>
            </div>
            <div class="column" v-if="this.option === 'schedule'">
              <input type="date" name="" id="" :value="scheduleDate" v-on:change="changeScheduleDateAction"/>
            </div>

            <!-- Reload / Clear -->
            <div class="spacer"></div>
            <div
              class="column text-button action"
              v-if="this.option === 'schedule' && !loading"
              v-bind:class="{ disabled: !this.selectedData()._id }"
              v-on:click="getScheduleAction"
            >
              Reload
            </div>
            <div
              class="column text-button action"
              v-if="this.option === 'schedule' && loading"
            >
              Loading...
            </div>
            <div
              class="column text-button action"
              v-if="this.option === 'schedule' && !clearing"
              v-bind:class="{ disabled: !this.selectedData()._id }"
              v-on:click="archiveAllQueueAction"
            >
              Archive Upcoming
            </div>
            <div
              class="column text-button action"
              v-if="this.option === 'schedule' && clearing"
            >
              Archiving...
            </div>

            <!-- Queue Type Filter -->
            <div class="spacer"></div>
            <div
              v-if="this.option === 'schedule'"
              class="column filter-button filter-button-left"
              v-bind:class="{ 'filter-button-active': this.scheduleType === 'all' }"
              v-on:click="changeScheduleTypeAction('all')"
            >
              All
            </div>
            <div 
              v-if="this.option === 'schedule'" 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.scheduleType === 'return' }" 
              v-on:click="changeScheduleTypeAction('return')">
              Return
            </div>
            <div 
              v-if="this.option === 'schedule'" 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.scheduleType === 'queue' }" 
              v-on:click="changeScheduleTypeAction('queue')">
              Queue
            </div>
            <div
              v-if="this.option === 'schedule'"
              class="column filter-button filter-button-right"
              v-bind:class="{ 'filter-button-active': this.scheduleType === 'schedule' }"
              v-on:click="changeScheduleTypeAction('schedule')"
            >
              Schedule
            </div>

            <!-- Queue Status Filter -->
            <div class="spacer"></div>
            <div
              v-if="this.option === 'schedule'"
              class="column filter-button filter-button-left"
              v-bind:class="{ 'filter-button-active': this.scheduleStatus === 'all' }"
              v-on:click="changeScheduleStatusAction('all')"
            >
              All
            </div>
            <div 
              v-if="this.option === 'schedule'" 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.scheduleStatus === 'active' }"
              v-on:click="changeScheduleStatusAction('active')">
              Active
            </div>
            <div 
              v-if="this.option === 'schedule'" 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.scheduleStatus === 'archived' }"
              v-on:click="changeScheduleStatusAction('archived')">
              Archived
            </div>
            <div 
              v-if="this.option === 'schedule'" 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.scheduleStatus === 'error' }"
              v-on:click="changeScheduleStatusAction('error')">
              Errored
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import moment from 'moment-timezone'

export default {
  name: "WorkflowOptionsActions",
  data: function () {
    return {
      loading: false,
      clearing: false,
    };
  },
  computed: {
    ...mapState('schedule', ['scheduleDate','scheduleType', 'scheduleStatus', 'currentTime']),
    ...mapGetters("table", ["selectedData"]),
    ...mapState("table", ["editing"]),
    ...mapState("table", ["option"]),
  },
  methods: {
    ...mapMutations('schedule', ['changeScheduleDate', 'changeScheduleType', 'changeScheduleStatus']),
    ...mapMutations('table', ['changeSelectedQueueStatId']),
    ...mapActions("table", [
      "cancelWorkflowChanges",
      "saveWorkflowChanges",
      "addWorkflowTask",
    ]),
    ...mapActions('schedule', [
      'getSchedule',
      'archiveAllQueue'
    ]),
    allowAddingWorkflowTask: function () {
      if (!this.selectedData()._id) return false;

      if (this.option === "tasks") return true;
      else return false;
    },
    addWorkflowTaskAction: async function () {
      await this.addWorkflowTask({ workflowId: this.selectedData()._id });
    },
    cancelWorkflowChangesAction: async function () {
      await this.cancelWorkflowChanges({ _id: this.selectedData()._id });
    },
    saveWorkflowChangesAction: async function () {
      await this.saveWorkflowChanges(this.selectedData());
    },
    changeScheduleDateAction: function(event) {
      this.changeSelectedQueueStatId('')
      this.changeScheduleDate(event.srcElement.value)
    },
    changeScheduleTypeAction: function(scheduleType) {
      this.changeSelectedQueueStatId('')
      this.changeScheduleType(scheduleType)
    },
    changeScheduleStatusAction: function(scheduleStatus) {
      this.changeSelectedQueueStatId('')
      this.changeScheduleStatus(scheduleStatus)
    },
    getScheduleAction: async function () {
      if (!this.selectedData()._id) return;
      
      this.loading = true
      try {
        const payload = {
          workflowId: this.selectedData()._id,
          date: moment(this.scheduleDate),
        };
        await this.getSchedule(payload);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false
      }
    },
    archiveAllQueueAction: async function(queueId) {
      if (!this.selectedData()._id) return;

      const date = moment(this.scheduleDate)
      const workflow = this.selectedData()._id
      const queueType = this.scheduleType

      const confirm = window.confirm(`Are you sure you want to unschedule [${queueType}] queue types occurring on [${this.scheduleDate}]?`)
      if (confirm) {
        this.clearing = true
        try {
          const payload = {
            date: date,
            workflow: workflow,
            queueType: queueType,
          }
          await this.archiveAllQueue(payload)
        } catch(err) {
          console.log(err)
        } finally {
          this.clearing = false
        }
      }
    },
  },
};
</script>

<style lang="scss">
input[type="date"] {
  font-family: "Open Sans", sans-serif;
}
.tiny-text-spaced {
  margin-left: 9px !important;
}
</style>