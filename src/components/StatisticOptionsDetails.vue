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

    <div class="row row-border-bottom table-row-selectable" v-bind:class="{'table-row-selected':shouldBeSelected(stat._id)}" v-for="(stat) in this.selectedData().stats" :key="stat._id" v-on:click="selectStatAction(stat)">
      <div class="column column-data column-10 column-padded">{{ stat.status }}</div>
      <div class="column column-data column-10 column-padded">{{ stat.statusText }}</div>
      <div class="column column-data column-10 column-padded">{{ stat.requestName }}</div>
      <div class="column column-data column-20 column-padded">{{ stat.requestType }}</div>
      <div class="column column-data column-grow column-padded">{{ statisticCreatedAt(stat.createdAt) }}</div>
    </div>

    <div class="row row-border-bottom" v-if="shouldShowSelectedStat()">
      <div class="column text-button action" v-if="!loading" v-on:click="getInstanceDetailAction()">Load Requests / Responses</div>
      <div class="column text-button action" v-if="loading">Loading...</div>
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
      selectedStatId: '',
      loading: false,
    }
  },
  computed: {
    ...mapGetters("table", ["selectedData"]),
  },
  methods: {
    ...mapActions('table', ['getInstanceDetail']),
    getInstanceDetailAction: async function() {
      try {
        this.loading = true
        await this.getInstanceDetail({instanceId: this.selectedData()._id})
      } catch(err) {
        console.log('Error getting instance details')
      } finally {
        this.loading = false
      }
      
    },
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