<template>
  <div class="row" v-if="showQueue">

    <div class="column column-full-width">
      <QueueActions />
      <QueueFilters />
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
  computed: {
    ...mapState('request', ['selectedRequestId']),
    ...mapState('workflow', ['selectedWorkflowId']),
    showQueue: function() {
      if (this.$route.name === 'Requests' && this.selectedRequestId) return true
      else if (this.$route.name === 'Workflows' && this.selectedWorkflowId) return true
      else return false
    },
  },
}
</script>