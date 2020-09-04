<template>
  <div class="row">
    <div class="column column-full-width">

    

    <div class="row row-border-bottom">
      <div class="column column-data column-header column-10">Status Code</div>
      <div class="column column-data column-header column-10">Status Text</div>
      <div class="column column-data column-header column-10">Request Name</div>
      <div class="column column-data column-header column-20">Request Type</div>
      <div class="column column-data column-header column-grow">Date</div>
    </div>

    <div class="row row-border-bottom table-row-selectable" v-bind:class="{'table-row-selected':shouldBeSelected(stat._id)}" v-for="(stat) in this.selectedData().stats" :key="stat._id" v-on:click="selectStatAction(stat)">
      <div class="column column-data column-10">{{ stat.status }}</div>
      <div class="column column-data column-10">{{ stat.statusText }}</div>
      <div class="column column-data column-10">{{ stat.requestName }}</div>
      <div class="column column-data column-20">{{ stat.requestType }}</div>
      <div class="column column-data column-grow">{{ statisticCreatedAt(stat.createdAt) }}</div>
    </div>

    <pre v-if="shouldShowSelectedStat()">
      <code>{{ selectedStat }}</code>
    </pre>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: "StatisticOptionsDetails",
  data: function() {
    return {
      selectedStat: {},
      selectedStatId: ''
    }
  },
  computed: {
    ...mapGetters("table", ["selectedData"]),
  },
  methods: {
    statisticCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm:ss a')}`
    },
    selectStatAction: function(stat) {
      this.selectedStat = stat
      this.selectedStatId = stat._id
    },
    shouldShowSelectedStat: function() {
      if (!_.size(this.selectedStat)) return false
      return true
    },
    shouldBeSelected: function(statId) {
      if (statId === this.selectedStatId) return true
      else return false
    }
  }
};
</script>