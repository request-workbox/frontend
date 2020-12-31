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
            <div class="spacer" v-if="allowAddingWorkflowTask()"></div>
            <div
              v-if="allowAddingWorkflowTask()"
              class="column text-button action"
              v-on:click="addWorkflowTaskAction"
              :disabled="this.selectedData().workflowType === 'request'"
            >
              Add Request
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


            <div class="large-spacer" v-if="this.selectedData()._id && this.option === 'schedule'"></div>

            <!-- Schedule Workflow -->
            <div class="column text-button action action-text-center" v-if="this.selectedData()._id && this.option === 'schedule'" v-on:click="returnWorkflowAction">Return Workflow</div>
            <div class="column text-button action action-text-center" v-if="this.selectedData()._id && this.option === 'schedule'" v-on:click="queueWorkflowAction">Queue Workflow</div>
            <div class="column text-button action action-text-center" v-if="this.selectedData()._id && this.option === 'schedule'" v-on:click="scheduleWorkflowAction">Schedule Workflow</div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import moment from 'moment-timezone'
import Vue from 'vue'

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
      'returnWorkflow','queueWorkflow','scheduleWorkflow',
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
      try {
        await this.saveWorkflowChanges(this.selectedData());
      } catch(err) {
        Vue.$toast.open(err.message)
      }
    },
    changeScheduleDateAction: function(event) {
      this.changeSelectedQueueStatId('')
      this.changeScheduleDate(event.srcElement.value)
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
      const workflowId = this.selectedData()._id
      const queueType = this.scheduleType

      const confirm = window.confirm(`Are you sure you want to unschedule [${queueType}] queue types occurring on [${this.scheduleDate}]?`)
      if (confirm) {
        this.clearing = true
        try {
          const payload = {
            date: date,
            workflowId: workflowId,
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
    returnWorkflowAction: async function() {
      try {
        // Info
        Vue.$toast.open({
          message: 'Returning workflow...',
          type: 'info',
        })
        // Start
        await this.returnWorkflow(this.selectedData()._id)
        // Success
        Vue.$toast.open({
          message: 'Workflow returned successfully',
          type: 'success',
        })
      } catch(err) {
        Vue.$toast.open(err.response.data)
      }
    },
    queueWorkflowAction: async function() {
      try {
        await this.queueWorkflow(this.selectedData()._id)
        Vue.$toast.open({
          message: 'Queued workflow',
          type: 'info',
        })
      } catch(err) {
        Vue.$toast.open(err.response.data)
      }
    },
    scheduleWorkflowAction: async function() {
      try {
        await this.scheduleWorkflow(this.selectedData()._id)
        Vue.$toast.open({
          message: 'Scheduled workflow',
          type: 'info',
        })
      } catch(err) {
        Vue.$toast.open(err.response.data)
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