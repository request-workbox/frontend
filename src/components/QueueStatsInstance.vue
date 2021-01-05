<template>
  <div class="row">
    <div class="column column-full-width">

    <div class="row row-border-bottom">
      <div class="column column-data column-header-text column-grow column-group-header">Instance Stats</div>
    </div>

    <div class="row row-border-bottom">
      <div class="column text-button" v-bind:class="{'text-button-selected':this.option === 'results'}" v-on:click="changeOptionAction('results')">Results</div>
      <div class="column text-button" v-bind:class="{'text-button-selected':this.option === 'usage'}" v-on:click="changeOptionAction('usage')">Usage</div>
    </div>

    <div class="row row-border-bottom" v-if="this.selectedStatId !== '' && this.selectedInstanceStatId !== ''">
      <div class="column text-button action" v-if="!loading" v-on:click="getInstanceDetailAction()">Load Requests / Responses</div>
      <div class="column text-button action" v-if="loading">Loading Data...</div>

      <div class="column text-button action" v-if="!downloading && shouldShowSelectedStat() && selectedStat().downloadPayload" v-on:click="downloadInstanceStatAction">Download Payload</div>
      <div class="column text-button action" v-if="downloading && shouldShowSelectedStat() && selectedStat().downloadPayload">Downloading...</div>

      <div class="column text-button action" v-if="!loadingUsage" v-on:click="getInstanceUsageAction()">Load Usage</div>
      <div class="column text-button action" v-if="loadingUsage">Loading Usage...</div>
    </div>

    <div v-if="this.option !== ''">
      <keep-alive>
        <component :is="queueStatsInstanceOption" v-if="this.option !== ''"></component>
      </keep-alive>
    </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'
import _ from 'lodash'

import ScheduleStatsInstanceResults from './ScheduleStatsInstanceResults'
import ScheduleStatsInstanceUsage from './ScheduleStatsInstanceUsage'

const download = require("downloadjs")

export default {
  name: 'QueueStatsInstance',
  data: function() {
    return {
      loading: false,
      downloading: false,
      loadingUsage: false,
    }
  },
  components: {
    ScheduleStatsInstanceResults,
    ScheduleStatsInstanceUsage,
  },
  computed: {
    ...mapState('table', ['selectedStatId','selectedInstanceStatId']),
    ...mapState('queue', ['option']),
    ...mapGetters('table', ['selectedData']),
    ...mapGetters('queue', ['selectedStat']),
    queueStatsInstanceOption: function() {
      return `ScheduleStatsInstance${_.upperFirst(this.option)}`
    }
  },
  methods: {
    ...mapMutations('queue',['changeOption']),
    ...mapActions('instance', ['getInstanceDetail','getInstanceUsage','downloadInstanceStat']),
    changeOptionAction: function(option) {
      this.changeOption(option)
    },
    shouldShowSelectedStat: function() {
      if (!_.size(this.selectedStat())) return false
      return true
    },
    getInstanceDetailAction: async function() {
      try {
        this.loading = true
        await this.getInstanceDetail({instanceId: this.selectedData()._id})
      } catch(err) {
        console.log('Error getting instance details')
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    downloadInstanceStatAction: async function() {
      try {
        this.downloading = true
        const fileDataResponse = await this.downloadInstanceStat({ instanceId: this.selectedData()._id, statId: this.selectedStat()._id })
        const fileData = fileDataResponse.data
        const fileStringData = JSON.stringify(fileData)

        return download(fileStringData, `${this.selectedData().workflowName}-${this.selectedStat().requestName}`, 'text/plain')
      } catch(err) {
        // console.log(err)
      } finally {
        this.downloading = false
      }
    },
    getInstanceUsageAction: async function() {
      try {
        this.loadingUsage = true
        await this.getInstanceUsage({instanceId: this.selectedData()._id})
      } catch(err) {
        // console.log('Error getting instance usage')
      } finally {
        this.loadingUsage = false
      }
    },
  }
};
</script>