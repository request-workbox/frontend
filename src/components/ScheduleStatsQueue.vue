<template>
  <div class="row" v-if="showQueueStats()">

    <div class="column column-full-width">
      <div class="row">
        <div class="column column-full-width">
          <div class="row row-border-bottom">
            <div class="column column-data column-header-text column-grow column-group-header">Queue Stats</div>
          </div>
          <div class="row row-border-bottom">
            <div class="column column-data column-header column-20">Date</div>
            <div class="column column-data column-header column-10">Status</div>
            <div class="column column-data column-header column-grow">Message</div>
          </div>
          <div v-for="(stat) in selectedQueueStats"
              v-bind:key="stat._id"
              class="row row-border-bottom">
            <div class="column column-data column-20">{{ statisticCreatedAt(stat.createdAt) }}</div>
            <div class="column column-data column-10">{{ stat.status }}</div>
            <div class="column column-data column-grow">{{ stat.statusText }}</div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import moment from 'moment-timezone'
import _ from 'lodash'
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'ScheduleStatsQueue',
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