<template>
  <div class="row row-border-bottom" v-if="this.option !== 'queue'">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <!-- Cancel / Save Changes / Add Task-->
            <div
              v-if="this.option !== 'queue'"
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelWorkflowChangesAction"
            >
              Cancel
            </div>
            <div
              v-if="this.option !== 'queue'"
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
    ...mapState('queue', ['queueDate','queueType', 'queueStatus', 'currentTime']),
    ...mapGetters('table', ['selectedData']),
    ...mapState('table', ['editing']),
    ...mapState('table', ['option']),
  },
  methods: {
    ...mapMutations('queue', ['changeQueueDate', 'changeQueueType', 'changeQueueStatus','changeSelectedInstanceStatId']),
    ...mapMutations('table', ['changeSelectedQueueStatId']),
    ...mapActions("table", [
      'cancelWorkflowChanges',
      'saveWorkflowChanges',
      'addWorkflowTask',
      'returnWorkflow',
      'queueWorkflow',
      'scheduleWorkflow',
    ]),
    ...mapActions('queue', ['getQueues','archiveAllQueues']),
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
    changeQueueDateAction: function(event) {
      this.changeSelectedQueueStatId('')
      this.changeSelectedInstanceStatId('')
      this.changeQueueDate(event.srcElement.value)
    },
    getScheduleAction: async function () {
      if (!this.selectedData()._id) return;
      
      this.loading = true
      try {
        const payload = {
          workflowId: this.selectedData()._id,
          date: moment(this.queueDate),
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

      const date = moment(this.queueDate)
      const workflowId = this.selectedData()._id
      const queueType = this.queueType

      const confirm = window.confirm(`Are you sure you want to unschedule [${queueType}] queue types occurring on [${this.queueDate}]?`)
      if (confirm) {
        this.clearing = true
        try {
          const payload = {
            date: date,
            workflowId: workflowId,
            queueType: queueType,
          }
          await this.archiveAllQueues(payload)
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