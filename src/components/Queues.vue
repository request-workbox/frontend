<template>
  <div class="row">
    <div class="column column-full-width">

    <div class="row row-border-bottom">
      <div class="column column-data column-header-text column-grow column-group-header">Queues</div>
    </div>

    <div class="row row-border-bottom">
      <div class="column column-data column-header column-10 column-padded">
        <span class="column-text-button" v-on:click="toggleQueueOrderDirection('date')">Departure</span>
      </div>
      <div class="column column-data column-header column-5 column-padded">Status</div>
      <div class="column column-data column-header column-5 column-padded">Queue Type</div>
      <div class="column column-data column-header column-10 column-padded">Workflow Name</div>
      <div class="column column-data column-header column-grow column-padded">
        <span class="column-text-button" v-on:click="toggleQueueOrderDirection('createdAt')">Created</span>
      </div>
    </div>

    <div 
      v-for="(stat) in filterQueueByWorkflow(workflowId())" :key="stat._id"
      v-bind:class="{'table-row-selected':shouldBeSelected(stat._id)}"
      v-on:click="selectQueueStatAction(stat)"
      class="row row-border-bottom table-row-selectable queue-row">
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
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'Queues',
  computed: {
    ...mapGetters('table', ['selectedData']),
    ...mapGetters('queue', ['filterQueueByWorkflow','selectedQueueStatId']),
  },
  methods: {
    ...mapMutations('queue', ['toggleQueueOrderDirection','changeSelectedStatId','changeSelectedQueueStatId']),
    ...mapActions('queue', ['archiveQueue']),
    workflowId: function() {
      if (this.$route.name === 'Requests') {
        return this.selectedData().workflowId
      } else {
        return this.selectedData()._id
      }
    },
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
    archiveQueueAction: async function(queueId) {
      try {
        await this.archiveQueue(queueId)
      } catch(err) {
        console.log(err)
      }
    },
    selectQueueStatAction: function(stat) {
      this.changeSelectedQueueStatId(stat._id)
      this.changeSelectedStatId(stat.instanceId)
    },
    shouldBeSelected: function(statId) {
      if (statId === this.selectedQueueStatId) return true
      else return false
    }
  }
};
</script>

<style lang="scss">
.queue-row:hover {
  background: #dcf0ff !important;
  border-top: #2196f3 solid 1px !important;
  border-bottom: #2196f3 solid 1px !important;
}
</style>