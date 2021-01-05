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
              v-on:click="changeQueueTypeAction('all')"
            >
              All
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.queueType === 'return' }" 
              v-on:click="changeQueueTypeAction('return')">
              Return
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.queueType === 'queue' }" 
              v-on:click="changeQueueTypeAction('queue')">
              Queue
            </div>
            <div
              class="column filter-button filter-button-right"
              v-bind:class="{ 'filter-button-active': this.queueType === 'schedule' }"
              v-on:click="changeQueueTypeAction('schedule')"
            >
              Schedule
            </div>

            <!-- Queue Status Filter -->
            <div class="spacer"></div>
            <div
              class="column filter-button filter-button-left"
              v-bind:class="{ 'filter-button-active': this.queueStatus === 'all' }"
              v-on:click="changeQueueStatusAction('all')"
            >
              All
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.queueStatus === 'active' }"
              v-on:click="changeQueueStatusAction('active')">
              Active
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.queueStatus === 'archived' }"
              v-on:click="changeQueueStatusAction('archived')">
              Archived
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.queueStatus === 'error' }"
              v-on:click="changeQueueStatusAction('error')">
              Errored
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import moment from 'moment-timezone'
import Vue from 'vue'

export default {
  name: "QueueFilters",
  data: function () {
    return {
      loading: false,
      clearing: false,
    };
  },
  computed: {
    ...mapState('queue', ['queueType', 'queueStatus']),
  },
  methods: {
    ...mapMutations('queue', ['changeQueueType', 'changeQueueStatus','changeSelectedQueueStatId']),
    ...mapMutations('instance', ['changeSelectedInstanceStatId']),

    changeQueueTypeAction: function(queueType) {
      this.changeSelectedQueueStatId('')
      this.changeSelectedInstanceStatId('')
      this.changeQueueType(queueType)
    },
    changeQueueStatusAction: function(queueStatus) {
      this.changeSelectedQueueStatId('')
      this.changeSelectedInstanceStatId('')
      this.changeQueueStatus(queueStatus)
    },
  },
};
</script>