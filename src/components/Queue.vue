<template>
  <div class="row" v-if="workflowId">

    <div class="column column-full-width padding-left-right-15">
      <QueueActions />
      <!-- <QueueFilters /> -->
      <Queues />
      <QueueStats />
      <QueueStatsInstance />
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

import QueueActions from './QueueActions'
import QueueFilters from './QueueFilters'
import Queues from './Queues'
import QueueStats from './QueueStats'
import QueueStatsInstance from './QueueStatsInstance'

export default {
  name: 'Queue',
  components: {
    QueueActions,
    QueueFilters,
    Queues,
    QueueStats,
    QueueStatsInstance,
  },
  mounted: function() {
    this.init()
  },
  computed: {
    ...mapState('request', ['selectedRequestId']),
    ...mapState('workflow', ['selectedWorkflowId']),
    ...mapState('queue', ['queueOrderDirection']),

    ...mapGetters('workflow', ['selectedWorkflow']),
    // showQueue: function() {
    //   if (this.$route.name === 'requests' && this.selectedRequestId) return true
    //   else if (this.$route.name === 'workflows' && this.selectedWorkflowId) return true
    //   else return false
    // },
    workflowId: function() {
      if (!this.selectedWorkflow()) return ''
      return this.selectedWorkflow()._id
    }
  },
  methods: {
    ...mapMutations('queue', ['updateQueueOrderDirection']),
    init: function() {
      const queueOrderDirection = localStorage.getItem('queueOrderDirection') || this.queueOrderDirection
      this.updateQueueOrderDirection({ queueOrderDirection, })
    },
  }
}
</script>