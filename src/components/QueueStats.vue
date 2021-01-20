<template>
  <div class="row" v-if="this.selectedQueueId">

    <div class="column column-full-width">
      <div class="row">
        <div class="column column-full-width">
          <div class="row row-border-bottom-light">
        <div class="column column-grow account-column-data-header">Queue Stats</div>
      </div>
          <!-- <div class="row row-border-bottom-light">
            <div class="column account-column-data column-header column-20">Date</div>
            <div class="column account-column-data column-header column-10">Status</div>
            <div class="column account-column-data column-header column-grow">Message</div>
          </div> -->
          <!-- <div 
              
              class="row row-border-bottom-light">
            <div class="column account-column-data column-20">{{ statisticCreatedAt(stat.createdAt) }}</div>
            <div class="column account-column-data column-10">{{ stat.status }}</div>
            <div class="column account-column-data column-grow">{{ stat.statusText }}</div>
          </div> -->

          <div
            v-for="(stat) in selectedQueueStats"
            v-bind:key="stat._id"
            class="row workflow-row">

            <div 
              class="column column-full-width workflow-button-nav">
                <div class="row">
                  <div class="column column-grow">
                    <p class="workflow-button-nav-text">{{ statisticCreatedAt(stat.createdAt) }}</p>
                  </div>
                  <div class="column">
                    <p class="workflow-button-nav-text">{{ stat.status }}</p>
                  </div>
                </div>
              </div>

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
  name: 'QueueStats',
  computed: {
    ...mapState('queue',['selectedQueueId']),
    ...mapGetters('queue', ['getQueueById']),

    selectedQueueStats: function() {
      if (this.selectedQueueId === '') return []

      return this.getQueueById(this.selectedQueueId).stats
    },
  },
  methods: {
    statisticCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm:ss a')}`
    },
  }
}
</script>