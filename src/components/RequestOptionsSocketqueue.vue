<template>
  <div class="row row-border-top" v-if="showQueueStats()">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-grow">Queue Stats - {{ this.selectedQueueStatId }}</div>
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
</template>

<script>
import moment from 'moment-timezone'
import _ from 'lodash'
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'Socketqueue',
  computed: {
    ...mapState('table', ['selectedQueueStatId']),
    ...mapGetters('schedule', ['getScheduleById']),
    selectedQueueStats: function() {
      if (!this.selectedQueueStatId) return []

      return this.getScheduleById(this.selectedQueueStatId).stats
    },
  },
  methods: {
    statisticCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm:ss a')}`
    },
    showQueueStats: function() {
      if (!this.selectedQueueStatId) return false
      else return true
    }
  }
}
</script>