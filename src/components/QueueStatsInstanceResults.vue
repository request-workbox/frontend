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
      v-bind:class="{'table-row-selected':shouldBeSelectedInstanceStat(instance._id)}" 
      v-for="(instance) in selectedInstanceStats(workflowId())" :key="instance._id" v-on:click="selectInstanceStatAction(instance)">
      <div class="column column-data column-10 column-padded">{{ instance.status }}</div>
      <div class="column column-data column-10 column-padded">{{ instance.statusText }}</div>
      <div class="column column-data column-10 column-padded">{{ instance.requestName }}</div>
      <div class="column column-data column-20 column-padded">{{ requestType(instance.requestType) }}</div>
      <div class="column column-data column-grow column-padded">{{ statisticCreatedAt(instance.createdAt) }}</div>
    </div>

    <pre v-if="this.selectedStatId !== '' && this.selectedInstanceStatId !== ''">
      <code>{{ selectedInstanceStat() }}</code>
    </pre>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'QueueStatsInstanceResults',
  computed: {
    ...mapState('instance', ['selectedStatId','selectedInstanceStatId']),

    ...mapGetters('table', ['selectedData','selectedStat']),
    ...mapGetters('instance', ['getInstanceByRequestId','getInstanceByWorkflowId']),
  },
  methods: {
    ...mapMutations('instance', ['changeSelectedInstanceStatId']),
    selectInstanceStatAction: function(stat) {
      this.changeSelectedInstanceStatId(stat._id)
    },
    selectedInstanceStats: function() {
      if (!this.selectedData()._id) return []
      if (this.selectedStatId === '') return []

      if (this.$route.name === 'Requests') {
        return this.getInstanceByRequestId(this.selectedData()._id, this.selectedStatId).stats
      } else if (this.$route.name === 'Workflows') {
        return this.getInstanceByWorkflowId(this.selectedData()._id, this.selectedStatId).stats
      }
    },
    selectedInstanceStat: function(stats, statId) {
      if (!this.selectedData()._id) return []
      if (this.selectedStatId === '') return []
      if (this.selectedInstanceStatId === '') return []

      if (this.$route.name === 'Requests') {
        return this.getInstanceByRequestId(this.selectedData()._id, this.selectedStatId, this.selectedInstanceStatId)
      } else if (this.$route.name === 'Workflows') {
        return this.getInstanceByWorkflowId(this.selectedData()._id, this.selectedStatId, this.selectedInstanceStatId)
      }
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
    workflowId: function() {
      if (this.$route.name === 'Requests') {
        return this.selectedData().workflowId
      } else {
        return this.selectedData()._id
      }
    },
  }
};
</script>