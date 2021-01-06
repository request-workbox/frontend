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
              <input type="date" name="" id="" :value="queueDate" v-on:change="editQueueDateAction"/>
            </div>

            <div class="spacer"></div>

            <div
              class="column text-button action"
              v-if="!loading"
              v-bind:class="{ disabled: !this.activeSelection._id }"
              v-on:click="listQueuesAction">
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
              v-bind:class="{ disabled: !this.activeSelection._id }"
              v-on:click="archiveAllQueuesAction">
              Archive All Upcoming
            </div>
            <div
              class="column text-button action"
              v-if="archiving">
              Archiving...
            </div>

            <div class="large-spacer" v-if="this.activeSelection._id"></div>

            <!-- Schedule Request -->
            <div class="column text-button action action-text-center" v-if="this.activeSelection._id && this.$route.name === 'Requests'" v-on:click="startRequest('return')">Return Request</div>
            <div class="column text-button action action-text-center" v-if="this.activeSelection._id && this.$route.name === 'Requests'" v-on:click="startRequest('queue')">Queue Request</div>
            <div class="column text-button action action-text-center" v-if="this.activeSelection._id && this.$route.name === 'Requests'" v-on:click="startRequest('schedule')">Schedule Request</div>

            <!-- Schedule Workflow -->
            <div class="column text-button action action-text-center" v-if="this.activeSelection._id && this.$route.name === 'Workflows'" v-on:click="startWorkflow('return')">Return Workflow</div>
            <div class="column text-button action action-text-center" v-if="this.activeSelection._id && this.$route.name === 'Workflows'" v-on:click="startWorkflow('queue')">Queue Workflow</div>
            <div class="column text-button action action-text-center" v-if="this.activeSelection._id && this.$route.name === 'Workflows'" v-on:click="startWorkflow('schedule')">Schedule Workflow</div>

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
  name: 'QueueActions',
  data: function () {
    return {
      loading: false,
      archiving: false,
    };
  },
  computed: {
    ...mapState('queue', ['queueDate','queueType','currentTime']),

    ...mapGetters('request', ['selectedRequest']),
    ...mapGetters('workflow', ['selectedWorkflow']),
    activeSelection: function() {
      if (this.$route.name === 'Requests') return this.selectedRequest
      if (this.$route.name === 'Workflows') return this.selectedWorkflow
    },
  },
  methods: {
    ...mapMutations('queue', ['editSelectedQueueId','listQueues','archiveAllQueues']),
    ...mapMutations('instance', ['editSelectedInstanceId', 'editSelectedInstanceStatId']),

    ...mapActions('request', ['returnRequest','queueRequest','scheduleRequest',]),
    ...mapActions('workflow', ['returnWorkflow','queueWorkflow','scheduleWorkflow',]),

    editQueueDateAction: function(event) {
      this.editSelectedQueueId('')
      this.editSelectedInstanceId('')
      this.editSelectedInstanceStatId('')
      
      this.editQueueDate(event.srcElement.value)
    },
    listQueuesAction: async function () {
      try {
        this.loading = true

        const payload = { workflowId: this.activeSelection.workflowId, date: moment(this.queueDate), }
        const queues = await this.listQueues(payload)
      } catch (err) {
        console.log('Queue actions error', err.message)
      } finally {
        this.loading = false
      }
    },
    archiveAllQueuesAction: async function() {
      try {
        const confirm = window.confirm(`Are you sure you want to unschedule [${this.queueType}] queue types occurring on [${this.queueDate}]?`)
      
        if (confirm) {
          this.archiving = true
          
          const payload = { date: moment(this.queueDate), workflowId: this.activeSelection.workflowId, queueType: this.queueType, }
          const queues = await this.archiveAllQueues(payload)
        }
      } catch(err) {
        console.log('Queue actions error', err.message)
      } finally {
        this.archiving = false
      }
    },
    startRequest: async function(queueType) {
      try {
        Vue.$toast.open({ message: 'One moment...', })

        if (queueType === 'return') {
          const results = await this.returnRequest(this.activeSelection._id)
        } else if (queueType === 'queue') {
          const results = await this.queueRequest(this.activeSelection._id)
        } else if (queueType === 'schedule') {
          const results = await this.scheduleRequest(this.activeSelection._id)
        }
      } catch(err) {
        console.log('Queue actions error', err.message)
        Vue.$toast.open({ message: err.message })
      }
    },
    startWorkflow: async function(queueType) {
      try {
        Vue.$toast.open({ message: 'One moment...', })

        if (queueType === 'return') {
          const results = await this.returnWorkflow(this.activeSelection._id)
        } else if (queueType === 'queue') {
          const results = await this.queueWorkflow(this.activeSelection._id)
        } else if (queueType === 'schedule') {
          const results = await this.scheduleWorkflow(this.activeSelection._id)
        }
      } catch(err) {
        console.log('Queue actions error', err.message)
        Vue.$toast.open({ message: err.message })
      }
    },
  },
};
</script>