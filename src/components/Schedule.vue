<template>
  <div class="row" v-if="showQueueStats()">

    <div class="column column-full-width">
      <ScheduleActionsRequest v-if="this.$route.name === 'Requests'"/>
      <ScheduleActionsWorkflow v-if="this.$route.name === 'Workflows'"/>
      <ScheduleFilters />
      <ScheduleQueues />
      <ScheduleStatsQueue />
      <ScheduleStatsInstance />
    </div>
    
  </div>
</template>

<script>
import moment from 'moment-timezone'
import _ from 'lodash'
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

import ScheduleActionsRequest from './ScheduleActionsRequest'
import ScheduleActionsWorkflow from './ScheduleActionsWorkflow'
import ScheduleFilters from './ScheduleFilters'
import ScheduleQueues from './ScheduleQueues'
import ScheduleStatsQueue from './ScheduleStatsQueue'
import ScheduleStatsInstance from './ScheduleStatsInstance'

export default {
  name: 'Schedule',
  components: {
    ScheduleActionsRequest,
    ScheduleActionsWorkflow,
    ScheduleFilters,
    ScheduleQueues,
    ScheduleStatsQueue,
    ScheduleStatsInstance,
  },
  computed: {
    ...mapState('table',['selectedQueueStatId']),
    ...mapGetters('table', ['selectedData']),
    ...mapGetters('schedule', ['getScheduleByRequestId','getScheduleByWorkflowId']),
    selectedQueueStats: function() {
      if (!this.selectedData()._id) return []
      if (this.selectedQueueStatId === '') return []

      if (this.$route.name === 'Requests') {
        return this.getScheduleByRequestId(this.selectedData()._id, this.selectedQueueStatId).stats
      } else if (this.$route.name === 'Workflows') {
        return this.getScheduleByWorkflowId(this.selectedData()._id, this.selectedQueueStatId).stats
      }
    },
  },
  methods: {
    statisticCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm:ss a')}`
    },
    showQueueStats: function() {
      if (!this.selectedData()._id) return false
      else return true
    }
  }
}
</script>