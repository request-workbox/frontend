<template>
  <div class="row">
    <div class="column column-full-width">

    <div class="row row-border-bottom">
      <div class="column column-data column-header column-5 column-padded">Stat</div>
      <div class="column column-data column-header column-10 column-padded">Queue Type</div>
      <div class="column column-data column-header column-10 column-padded">Status</div>
      
      
      <div class="column column-data column-header column-15 column-padded">Created</div>
      <div class="column column-data column-header column-15 column-padded">Departure</div>
      <div class="column column-data column-header column-20 column-padded">Workflow Name</div>
    </div>

    <div 
      v-for="(stat) in filterScheduleByWorkflow(this.selectedData()._id)" :key="stat._id"
      class="row row-border-bottom schedule-row">
      <div class="column column-data column-5">
        <a :href="instanceStatUrl(stat.instance)" target="_blank">View</a>
      </div>
      <div class="column column-data column-10 column-padded">{{ formattedQueueType(stat.queueType) }}</div>
      <div class="column column-data column-10 column-padded">{{ formattedQueueStatus(stat.status) }}</div>
      
      
      <div class="column column-data column-15 column-padded">{{ formattedDate(stat.createdAt) }}</div>
      <div class="column column-data column-15 column-padded">{{ formattedDate(stat.date) }}</div>
      <div class="column column-data column-20 column-padded">{{ stat.workflowName }}</div>
      <div class="column column-data column-grow column-padded" v-if="canRemoveSchedule(stat.status)" v-on:click="archiveQueueAction(stat._id)">
        <span class="column-text-button">Remove</span>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: "WorkflowOptionsSchedule",
  computed: {
    ...mapGetters("table", ["selectedData"]),
    ...mapGetters('schedule', ['filterScheduleByWorkflow']),
  },
  methods: {
    ...mapActions('schedule', ['archiveQueue']),
    formattedQueueType: (queueType) => {
      if (queueType === 'return') return 'Return'
      if (queueType === 'queue') return 'Queue'
      if (queueType === 'schedule') return 'Schedule'
    },
    formattedQueueStatus: (queueType) => {
      if (queueType === 'received') return 'Received'
      if (queueType === 'queued') return 'Queued'
      if (queueType === 'running') return 'Running'
      if (queueType === 'complete') return 'Complete'
      if (queueType === 'archived') return 'Archived'
      if (queueType === 'error') return 'Error'
    },
    formattedDate: (date) => {
      return `${moment(date).format('h:mm:ss a')}`
    },
    canRemoveSchedule: (status) => {
      if (status === 'received' || status === 'queued') return true
      else return false
    },
    instanceStatUrl: function(instanceId) {
      const projectId = this.$route.params.projectId
      return `/projects/${projectId}/statistics?instance=${instanceId}`
    },
    archiveQueueAction: async function(queueId) {
      try {
        await this.archiveQueue(queueId)
      } catch(err) {
        console.log(err)
      }
    },
  }
};
</script>

<style lang="scss">
.schedule-row:hover {
  background: #dcf0ff !important;
  border-top: #2196f3 solid 1px !important;
  border-bottom: #2196f3 solid 1px !important;
}
</style>