<template>
  <div class="row" v-if="this.selectedData()._id">

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
    ...mapGetters('table', ['selectedData']),
  },
}
</script>