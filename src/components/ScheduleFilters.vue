<template>
  <div class="row row-border-bottom" v-if="this.option === 'schedule'">
    <div class="column column-full-width">
      <div class="row padding-top-bottom-5">

            <div class="column">
              <span class="tiny-text tiny-text-small-spaced">Filter</span>
            </div>

            <!-- Queue Type Filter -->
            <div class="spacer"></div>
            <div
              class="column filter-button filter-button-left"
              v-bind:class="{ 'filter-button-active': this.scheduleType === 'all' }"
              v-on:click="changeScheduleTypeAction('all')"
            >
              All
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.scheduleType === 'return' }" 
              v-on:click="changeScheduleTypeAction('return')">
              Return
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.scheduleType === 'queue' }" 
              v-on:click="changeScheduleTypeAction('queue')">
              Queue
            </div>
            <div
              class="column filter-button filter-button-right"
              v-bind:class="{ 'filter-button-active': this.scheduleType === 'schedule' }"
              v-on:click="changeScheduleTypeAction('schedule')"
            >
              Schedule
            </div>

            <!-- Queue Status Filter -->
            <div class="spacer"></div>
            <div
              class="column filter-button filter-button-left"
              v-bind:class="{ 'filter-button-active': this.scheduleStatus === 'all' }"
              v-on:click="changeScheduleStatusAction('all')"
            >
              All
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.scheduleStatus === 'active' }"
              v-on:click="changeScheduleStatusAction('active')">
              Active
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.scheduleStatus === 'archived' }"
              v-on:click="changeScheduleStatusAction('archived')">
              Archived
            </div>
            <div 
              class="column filter-button" 
              v-bind:class="{ 'filter-button-active': this.scheduleStatus === 'error' }"
              v-on:click="changeScheduleStatusAction('error')">
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
  name: "ScheduleFilters",
  data: function () {
    return {
      loading: false,
      clearing: false,
    };
  },
  computed: {
    ...mapState('schedule', ['scheduleDate','scheduleType', 'scheduleStatus', 'currentTime']),
    ...mapGetters("table", ["selectedData"]),
    ...mapState("table", ["editing"]),
    ...mapState("table", ["option"]),
  },
  methods: {
    ...mapMutations('schedule', ['changeScheduleDate', 'changeScheduleType', 'changeScheduleStatus']),
    ...mapMutations('table', ['changeSelectedQueueStatId','changeSelectedInstanceStatId']),

    changeScheduleTypeAction: function(scheduleType) {
      this.changeSelectedQueueStatId('')
      this.changeSelectedInstanceStatId('')
      this.changeScheduleType(scheduleType)
    },
    changeScheduleStatusAction: function(scheduleStatus) {
      this.changeSelectedQueueStatId('')
      this.changeSelectedInstanceStatId('')
      this.changeScheduleStatus(scheduleStatus)
    },
  },
};
</script>

<style lang="scss">
input[type="date"] {
  font-family: "Open Sans", sans-serif;
}
</style>