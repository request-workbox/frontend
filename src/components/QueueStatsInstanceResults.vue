<template>
  <div class="row">
    <div class="column column-full-width">

    <!-- <div class="row row-border-bottom-light">
      <div class="column account-column-data column-header column-10 column-padded">Status Code</div>
      <div class="column account-column-data column-header column-10 column-padded">Status Text</div>
      <div class="column account-column-data column-header column-10 column-padded">Request Name</div>
      <div class="column account-column-data column-header column-20 column-padded">Request Type</div>
      <div class="column account-column-data column-header column-grow column-padded">Date</div>
    </div> -->

    <!-- <div class="row row-border-bottom-light table-row-selectable" 
      
      v-bind:class="{'table-row-selected':}" 
      >
      <div class="column account-column-data column-10 column-padded">{{ instanceStat.status }}</div>
      <div class="column account-column-data column-10 column-padded">{{ instanceStat.statusText }}</div>
      <div class="column account-column-data column-10 column-padded">{{ instanceStat.requestName }}</div>
      <div class="column account-column-data column-20 column-padded">{{ requestType(instanceStat.requestType) }}</div>
      <div class="column account-column-data column-grow column-padded">{{ statisticCreatedAt(instanceStat.createdAt) }}</div>
    </div> -->

    <div
        v-for="(instanceStat) in selectedInstanceStats()"
        :key="instanceStat._id"
        class="row workflow-row"
        v-on:click="selectInstanceStatAction(instanceStat)">

        <div 
          v-bind:class="{'workflow-button-nav-selected':shouldBeSelectedInstanceStat(instanceStat._id)}"
          class="column column-full-width workflow-button-nav">
            <div class="row">
              <div class="column column-grow">
                <p class="workflow-button-nav-text">{{ instanceStat.statusText }}</p>
              </div>
              <!-- <div class="column">
                <p class="workflow-button-nav-text">{{ formattedQueueStatus(queue.status) }}</p>
              </div> -->
            </div>
          </div>

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
    ...mapGetters('instance', ['getInstanceById','getInstanceStatById','visibleInstances']),
    ...mapGetters('queue', ['selectedQueue']),
  },
  methods: {
    ...mapMutations('instance', ['editSelectedInstanceId','editSelectedInstanceStatId']),
    selectInstanceStatAction: function(stat) {
      this.editSelectedInstanceStatId(stat._id)
    },
    selectedInstanceStats: function() {
      const instances = _.filter(this.visibleInstances(), (data) => {
        if (data.queueId === this.selectedQueue()._id) return true
        else return false
      })

      if (_.size(instances)) return instances[0].stats
      else return {}
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