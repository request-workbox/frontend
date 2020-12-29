<template>
  <div class="row">
    <div class="column column-full-width">

    <div class="row row-border-bottom">
      <div class="column column-data column-header column-5 column-padded">Stat</div>
      
      <div class="column column-data column-header column-10 column-padded">
        <span class="column-text-button" v-on:click="toggleScheduleOrderDirection('date')">Departure</span>
      </div>
      <div class="column column-data column-header column-5 column-padded">Status</div>
      <div class="column column-data column-header column-5 column-padded">Queue Type</div>
      <div class="column column-data column-header column-10 column-padded">Workflow Name</div>
      <div class="column column-data column-header column-grow column-padded">
        <span class="column-text-button" v-on:click="toggleScheduleOrderDirection('createdAt')">Created</span>
      </div>
    </div>

    <div 
      v-for="(stat) in filterScheduleByWorkflow(this.selectedData()._id)" :key="stat._id"
      v-bind:class="{'table-row-selected':shouldBeSelected(stat._id)}"
      v-on:click="selectQueueStatAction(stat)"
      class="row row-border-bottom table-row-selectable schedule-row">
      <div class="column column-data column-5 column-padded">
        <a :href="instanceStatUrl(stat.instanceId)" target="_blank">View</a>
      </div>
      
      <div class="column column-data column-10 column-padded">{{ formattedDate(stat.date) }}</div>
      <div class="column column-data column-5 column-padded">{{ formattedQueueStatus(stat.status) }}</div>
      <div class="column column-data column-5 column-padded">{{ formattedQueueType(stat.queueType) }}</div>
      <div class="column column-data column-10 column-padded">{{ stat.workflowName }}</div>
      <div class="column column-data column-grow column-padded">{{ formattedDate(stat.createdAt) }}</div>
      <div class="column column-data column-grow column-padded">
        <span class="column-text-button" v-if="canRemoveSchedule(stat.status)" v-on:click="archiveQueueAction(stat._id)">Remove</span>
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
    ...mapState('table', ['selectedQueueStatId']),
    ...mapGetters("table", ["selectedData"]),
    ...mapGetters('schedule', ['filterScheduleByWorkflow']),
  },
  methods: {
    ...mapMutations('table', ['changeSelectedQueueStatId']),
    ...mapMutations('schedule', ['toggleScheduleOrderDirection']),
    ...mapActions('schedule', ['archiveQueue']),
    formattedQueueType: (queueType) => {
      if (queueType === 'return') return 'Return'
      if (queueType === 'queue') return 'Queue'
      if (queueType === 'schedule') return 'Schedule'
    },
    formattedQueueStatus: (queueType) => {
      return _.upperFirst(queueType)
    },
    formattedDate: (date) => {
      return `${moment(date).format('h:mm:ss a')}`
    },
    canRemoveSchedule: (status) => {
      if (status === 'pending') return true
      else return false
    },
    instanceStatUrl: function(instanceId) {
      const projectId = this.$route.params.projectId
      return `/projects/${projectId}/statistics?id=${instanceId}`
    },
    archiveQueueAction: async function(queueId) {
      try {
        await this.archiveQueue(queueId)
      } catch(err) {
        console.log(err)
      }
    },
    selectQueueStatAction: function(stat) {
      this.changeSelectedQueueStatId(stat._id)
    },
    shouldBeSelected: function(statId) {
      if (statId === this.selectedQueueStatId) return true
      else return false
    }
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