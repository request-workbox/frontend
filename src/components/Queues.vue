<template>
  <div class="row">
    <div class="column column-full-width">

      <div class="row row-border-bottom-light">
        <div class="column column-grow account-column-data-header">Queues</div>
      </div>
<!-- 
    <div class="row row-border-bottom-light">
      <div class="column column-data column-header column-10 column-padded">
        <span class="column-text-button" v-on:click="updateQueueOrderBy('date')">Departure</span>
      </div>
      <div class="column column-data column-header column-5 column-padded">Status</div>
      <div class="column column-data column-header column-5 column-padded">Queue Type</div>
      <div class="column column-data column-header column-10 column-padded">Workflow Name</div>
      <div class="column column-data column-header column-grow column-padded">
        <span class="column-text-button" v-on:click="updateQueueOrderBy('createdAt')">Created</span>
      </div>
    </div> -->

    <!-- <div 
      
      
      
      class="row row-border-bottom-light table-row-selectable queue-row">
      <div class="column column-data column-10 column-padded">{{ formattedDate(queue.date) }}</div>
      <div class="column column-data column-5 column-padded">{{ formattedQueueStatus(queue.status) }}</div>
      <div class="column column-data column-5 column-padded">{{ formattedQueueType(queue.queueType) }}</div>
      <div class="column column-data column-10 column-padded">{{ queue.workflowName }}</div>
      <div class="column column-data column-grow column-padded">{{ formattedDate(queue.createdAt) }}</div>
      <div class="column column-data column-grow column-padded">
        <span class="column-text-button" v-if="canArchiveQueue(queue.status)" v-on:click="archiveQueueAction(queue._id)">Archive</span>
      </div>
    </div> -->

    <div
        v-for="(queue) in visibleQueues(activeSelectionId())"
        :key="queue._id"
        class="row workflow-row"
        v-on:click="selectQueueAction(queue)">

        <div 
          v-bind:class="{'workflow-button-nav-selected':shouldBeSelected(queue._id)}"
          class="column column-full-width workflow-button-nav">
            <div class="row">
              <div class="column column-grow">
                <p class="workflow-button-nav-text">{{ formattedDate(queue.date) }}</p>
              </div>
              <div class="column">
                <p class="workflow-button-nav-text">{{ formattedQueueStatus(queue.status) }}</p>
              </div>
            </div>
          </div>

      </div>



    <div class="row row-border-bottom-light padding-top-bottom-5" v-if="!numberOfQueues">
      <div class="column column-grow text-center text-12 text-light-grey">You don't have any queues here.</div>
    </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'Queues',
  computed: {
    ...mapState('project', ['selectedProjectId']),
    ...mapState('queue', ['selectedQueueId']),
    ...mapGetters('queue', ['visibleQueues']),

    ...mapGetters('request', ['selectedRequest']),
    ...mapGetters('workflow', ['selectedWorkflow']),
    numberOfQueues: function() {
      if (!this.visibleQueues(this.activeSelectionId())) return 0
      else return _.size(this.visibleQueues(this.activeSelectionId()))
    }
  },
  methods: {
    ...mapMutations('queue', ['updateQueueOrderBy','editSelectedQueueId']),
    ...mapMutations('instance', ['editSelectedInstanceId', 'editSelectedInstanceStatId']),

    ...mapActions('queue', ['archiveQueue']),
    ...mapActions('instance', ['getInstance']),
    activeSelectionId: function() {
      return this.selectedWorkflow()._id
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
    canArchiveQueue: (status) => {
      if (status === 'pending') return true
      else return false
    },
    archiveQueueAction: async function(queueId) {
      try {
        await this.archiveQueue(queueId)
      } catch(err) {
        console.log('Queues error', err.message)
      }
    },
    selectQueueAction: async function(queue) {
      this.editSelectedQueueId(queue._id)
      this.editSelectedInstanceId(queue.instanceId)
      this.editSelectedInstanceStatId('')

      await this.getInstance({ projectId: this.selectedProjectId, instanceId: queue.instanceId })
    },
    shouldBeSelected: function(statId) {
      if (statId === this.selectedQueueId) return true
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