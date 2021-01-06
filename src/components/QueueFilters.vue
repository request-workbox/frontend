<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">
      <div class="row padding-top-bottom-5">

            <div class="column">
              <span class="tiny-text tiny-text-small-spaced">Filter</span>
            </div>

            <!-- Queue Type Filter -->
            <div class="spacer"></div>
            <div
              class="column filter-button filter-button-left"
              v-bind:class="{ 'filter-button-active': this.queueType === 'all' }"
              v-on:click="editQueueTypeAction('all')"
            >
              All
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.queueType === 'return' }" 
              v-on:click="editQueueTypeAction('return')">
              Return
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.queueType === 'queue' }" 
              v-on:click="editQueueTypeAction('queue')">
              Queue
            </div>
            <div
              class="column filter-button filter-button-right"
              v-bind:class="{ 'filter-button-active': this.queueType === 'schedule' }"
              v-on:click="editQueueTypeAction('schedule')"
            >
              Schedule
            </div>

            <!-- Queue Status Filter -->
            <div class="spacer"></div>
            <div
              class="column filter-button filter-button-left"
              v-bind:class="{ 'filter-button-active': this.queueStatus === 'all' }"
              v-on:click="editQueueStatusAction('all')"
            >
              All
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.queueStatus === 'active' }"
              v-on:click="editQueueStatusAction('active')">
              Active
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.queueStatus === 'archived' }"
              v-on:click="editQueueStatusAction('archived')">
              Archived
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.queueStatus === 'error' }"
              v-on:click="editQueueStatusAction('error')">
              Errored
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import moment from 'moment-timezone'
import Vue from 'vue'

export default {
  name: 'QueueFilters',
  data: function () {
    return {
      loading: false,
      clearing: false,
    }
  },
  computed: {
    ...mapState('queue', ['queueType', 'queueStatus']),
  },
  methods: {
    ...mapMutations('queue', ['editQueueType', 'editQueueStatus','editSelectedQueueId']),
    ...mapMutations('instance', ['editSelectedInstanceId', 'editSelectedInstanceStatId']),

    editQueueTypeAction: function(queueType) {
      this.editSelectedQueueId('')
      this.editSelectedInstanceId('')
      this.editSelectedInstanceStatId('')
      this.editQueueType(queueType)
    },
    editQueueStatusAction: function(queueStatus) {
      this.editSelectedQueueId('')
      this.editSelectedInstanceId('')
      this.editSelectedInstanceStatId('')
      this.editQueueStatus(queueStatus)
    },
  },
};
</script>