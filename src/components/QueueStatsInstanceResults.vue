<template>
  <div class="row">
    <div class="column column-full-width">

    <div class="row row-border-bottom">
      <div class="column column-data column-header column-10 column-padded">Status Code</div>
      <div class="column column-data column-header column-10 column-padded">Status Text</div>
      <div class="column column-data column-header column-10 column-padded">Request Name</div>
      <div class="column column-data column-header column-20 column-padded">Request Type</div>
      <div class="column column-data column-header column-grow column-padded">Date</div>
    </div>

    <div class="row row-border-bottom table-row-selectable" 
      v-for="(instanceStat) in selectedInstanceStats()" :key="instanceStat._id"
      v-bind:class="{'table-row-selected':shouldBeSelectedInstanceStat(instanceStat._id)}" 
      v-on:click="selectInstanceStatAction(instanceStat)">
      <div class="column column-data column-10 column-padded">{{ instanceStat.status }}</div>
      <div class="column column-data column-10 column-padded">{{ instanceStat.statusText }}</div>
      <div class="column column-data column-10 column-padded">{{ instanceStat.requestName }}</div>
      <div class="column column-data column-20 column-padded">{{ requestType(instanceStat.requestType) }}</div>
      <div class="column column-data column-grow column-padded">{{ statisticCreatedAt(instanceStat.createdAt) }}</div>
    </div>

    <pre v-if="this.selectedInstanceId !== '' && this.selectedInstanceStatId !== ''">
      <code>{{ selectedInstanceStat() }}</code>
    </pre>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'QueueStatsInstanceResults',
  computed: {
    ...mapState('instance', ['selectedInstanceId','selectedInstanceStatId']),
    ...mapGetters('instance', ['getInstanceById','getInstanceStatById']),
  },
  methods: {
    ...mapMutations('instance', ['editSelectedInstanceStatId']),
    selectInstanceStatAction: function(stat) {
      this.editSelectedInstanceStatId(stat._id)
    },
    selectedInstanceStats: function() {
      if (this.selectedInstanceId === '') return []

      return this.getInstanceById(this.selectedInstanceId).stats
    },
    selectedInstanceStat: function(stats, statId) {
      if (this.selectedInstanceId === '') return {}

      return this.getInstanceStatById(this.selectedInstanceId, this.selectedInstanceStatId)
    },
    statisticCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm:ss a')}`
    },
    shouldBeSelectedInstanceStat: function(statId) {
      if (statId === this.selectedInstanceStatId) return true
      else return false
    },
    requestType: function(requestType) {
      return _.upperFirst(requestType)
    },
  }
};
</script>