<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            
            <div class="column">
              <span class="tiny-text tiny-text-spaced">{{ currentTime }}</span>
            </div>
            <div class="column">
              <input type="date" name="" id="" :value="queueDate" v-on:change="changeQueueDateAction"/>
            </div>

            <div class="spacer"></div>

            <div
              class="column text-button action"
              v-if="!loading"
              v-bind:class="{ disabled: !this.selectedData()._id }"
              v-on:click="getQueueAction">
              Reload
            </div>
            <div
              class="column text-button action"
              v-if="loading">
              Loading...
            </div>
            <div
              class="column text-button action"
              v-if="!archiving"
              v-bind:class="{ disabled: !this.selectedData()._id }"
              v-on:click="archiveAllQueuesAction">
              Archive Upcoming
            </div>
            <div
              class="column text-button action"
              v-if="archiving">
              Archiving...
            </div>

            <div class="large-spacer" v-if="this.selectedData()._id"></div>

            <!-- Schedule Request -->
            <div class="column text-button action action-text-center" v-if="this.selectedData()._id && this.$route.name === 'Requests'" v-on:click="returnRequestAction">Return Request</div>
            <div class="column text-button action action-text-center" v-if="this.selectedData()._id && this.$route.name === 'Requests'" v-on:click="queueRequestAction">Queue Request</div>
            <div class="column text-button action action-text-center" v-if="this.selectedData()._id && this.$route.name === 'Requests'" v-on:click="scheduleRequestAction">Schedule Request</div>

            <!-- Schedule Workflow -->
            <div class="column text-button action action-text-center" v-if="this.selectedData()._id && this.$route.name === 'Workflows'" v-on:click="returnWorkflowAction">Return Workflow</div>
            <div class="column text-button action action-text-center" v-if="this.selectedData()._id && this.$route.name === 'Workflows'" v-on:click="queueWorkflowAction">Queue Workflow</div>
            <div class="column text-button action action-text-center" v-if="this.selectedData()._id && this.$route.name === 'Workflows'" v-on:click="scheduleWorkflowAction">Schedule Workflow</div>

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
  name: 'QueueActions',
  data: function () {
    return {
      loading: false,
      archiving: false,
    };
  },
  computed: {
    ...mapState('queue', ['queueDate','queueType','currentTime']),
    ...mapGetters('table', ['selectedData']),
  },
  methods: {
    ...mapMutations('queue', ['changeSelectedQueueStatId']),
    ...mapMutations('instance', ['changeSelectedInstanceStatId']),
    
    ...mapActions('table', ['returnRequest','queueRequest','scheduleRequest',]),
    ...mapActions('queue', ['listQueues', 'archiveAllQueues']),
    changeQueueDateAction: function(event) {
      this.changeSelectedQueueStatId('')
      this.changeSelectedInstanceStatId('')
      this.changeQueueDate(event.srcElement.value)
    },
    getQueueAction: async function () {
      if (!this.selectedData()._id) return;
      if (!this.selectedData().workflowId) return;
      
      this.loading = true
      try {
        const payload = {
          workflowId: this.selectedData().workflowId,
          date: moment(this.queueDate),
        };
        await this.listQueues(payload)
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false
      }
    },
    archiveAllQueuesAction: async function(queueId) {
      if (!this.selectedData()._id) return;
      if (!this.selectedData().workflowId) return;

      const date = moment(this.queueDate)
      const workflowId = this.selectedData().workflowId
      const queueType = this.queueType

      const confirm = window.confirm(`Are you sure you want to unschedule [${queueType}] queue types occurring on [${this.queueDate}]?`)
      if (confirm) {
        this.archiving = true
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
          this.archiving = false
        }
      }
    },
    returnRequestAction: async function() {
      if (!this.selectedData()._id) return;
      if (!this.selectedData().workflowId) return;

      try {
        // Info
        Vue.$toast.open({
          message: 'Returning request...',
          type: 'info',
        })
        // Start
        await this.returnRequest(this.selectedData()._id)
        // Success
        Vue.$toast.open({
          message: 'Request returned successfully',
          type: 'success',
        })
      } catch(err) {
        Vue.$toast.open(err.message)
      }
    },
    queueRequestAction: async function() {
      if (!this.selectedData()._id) return;
      if (!this.selectedData().workflowId) return;

      try {
        await this.queueRequest(this.selectedData()._id)
        Vue.$toast.open({
          message: 'Queued request',
          type: 'info',
        })
      } catch(err) {
        Vue.$toast.open(err.message)
      }
    },
    scheduleRequestAction: async function() {
      if (!this.selectedData()._id) return;
      if (!this.selectedData().workflowId) return;

      try {
        await this.scheduleRequest(this.selectedData()._id)
        Vue.$toast.open({
          message: 'Scheduled request',
          type: 'info',
        })
      } catch(err) {
        Vue.$toast.open(err.message)
      }
    },
  },
};
</script>