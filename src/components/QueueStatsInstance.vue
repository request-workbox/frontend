<template>
  <div class="row">
    <div class="column column-full-width">

    <div class="row row-border-bottom">
      <div class="column column-data column-header-text column-grow column-group-header">Instance Stats</div>
    </div>

    <div class="row row-border-bottom">
      <div class="column text-button" v-bind:class="{'text-button-selected':this.option === 'results'}" v-on:click="editOptionAction('results')">Results</div>
      <div class="column text-button" v-bind:class="{'text-button-selected':this.option === 'usage'}" v-on:click="editOptionAction('usage')">Usage</div>
    </div>

    <div class="row row-border-bottom" v-if="this.selectedInstanceId !== '' && this.selectedInstanceStatId !== ''">
      <div class="column text-button action" v-if="!loading" v-on:click="getInstanceDetailAction()">Load Requests / Responses</div>
      <div class="column text-button action" v-if="loading">Loading Data...</div>

      <div class="column text-button action" v-if="!downloading && selectedInstance().downloadPayload" v-on:click="downloadInstanceStatAction">Download Payload</div>
      <div class="column text-button action" v-if="downloading && selectedInstance().downloadPayload">Downloading...</div>

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
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

import QueueStatsInstanceResults from './QueueStatsInstanceResults'
import QueueStatsInstanceUsage from './QueueStatsInstanceUsage'

const download = require('downloadjs')

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
    QueueStatsInstanceResults,
    QueueStatsInstanceUsage,
  },
  computed: {
    ...mapState('instance', ['option']),
    ...mapGetters('instance', ['selectedInstance']),
    
    queueStatsInstanceOption: function() {
      return `QueueStatsInstance${_.upperFirst(this.option)}`
    }
  },
  methods: {
    ...mapMutations('instance',['editOption']),
    ...mapActions('instance', ['getInstanceDetail','getInstanceUsage','downloadInstanceStat']),
    editOptionAction: function(option) {
      this.editOption(option)
    },
    getInstanceDetailAction: async function() {
      try {
        this.loading = true
        await this.getInstanceDetail({instanceId: this.selectedInstance()._id})
      } catch(err) {
        console.log('Queue stats instance error', err.message)
      } finally {
        this.loading = false
      }
    },
    downloadInstanceStatAction: async function() {
      try {
        this.downloading = true
        const fileDataResponse = await this.downloadInstanceStat({ instanceId: this.selectedInstance()._id, statId: this.selectedInstance()._id })
        const fileData = fileDataResponse.data
        const fileStringData = JSON.stringify(fileData)

        return download(fileStringData, `${this.selectedInstance().workflowName}-${this.selectedInstance().requestName}`, 'text/plain')
      } catch(err) {
        console.log('Queue stats instance error', err.message)
      } finally {
        this.downloading = false
      }
    },
    getInstanceUsageAction: async function() {
      try {
        this.loadingUsage = true
        await this.getInstanceUsage({instanceId: this.selectedInstance()._id})
      } catch(err) {
        console.log('Queue stats instance error', err.message)
      } finally {
        this.loadingUsage = false
      }
    },
  }
};
</script>