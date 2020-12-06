<template>
  <div class="row" v-if="this.selectedWebhookId !== ''">
    <div class="column column-full-width">

    <div class="row row-border-bottom">
      <div class="column column-data column-header column-20 column-padded">Date Created</div>
      <div class="column column-data column-header column-15 column-padded">Includes Payload</div>
      <div class="column column-data column-header column-15 column-padded">Payload Type</div>
      <div class="column column-data column-header column-grow column-padded">ID</div>
    </div>

    <div class="row row-border-bottom table-row-selectable" v-for="(webhookDetail) in this.sortedWebhookDetails" :key="webhookDetail._id">
      <div class="column column-data column-20 column-padded">{{ webhookDetailCreatedAt(webhookDetail.createdAt) }}</div>
      <div class="column column-data column-15 column-padded">{{ webhookDetailIncludesPayload(webhookDetail.payloadSize) }}</div>
      <div class="column column-data column-15 column-padded">{{ webhookDetail.payloadType }}</div>
      <div class="column column-data column-grow column-padded">{{ webhookDetail.id }}</div>
      <div class="column column-data column-20 column-padded">
        <span class="column-text-button" v-if="webhookDetail.payloadType === 'application/json'" v-on:click="downloadWebhookDetailAction(webhookDetail._id)">Download</span>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'
import _ from 'lodash'

const download = require("downloadjs")

export default {
  name: "WebhookDetails",
  data: function() {
    return {
      downloading: false,
    }
  },
  computed: {
    ...mapState('webhook',['selectedWebhookId']),
    ...mapGetters('webhook',['sortedWebhookDetails']),
  },
  methods: {
    ...mapActions('webhook',['downloadWebhookDetail']),
    webhookDetailCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm:ss a')}`
    },
    webhookDetailIncludesPayload: function(payloadSize) {
      if (!payloadSize || payloadSize === 0) return 'No'
      else return 'Yes'
    },
    downloadWebhookDetailAction: async function(webhookDetailId) {
      try {
        this.downloading = true
        const fileDataResponse = await this.downloadWebhookDetail({ webhookDetailId: webhookDetailId })
        const fileData = fileDataResponse.data
        const fileStringData = JSON.stringify(fileData)

        return download(fileStringData, `${webhookDetailId}`, 'text/plain')
      } catch(err) {
        console.log(err)
      } finally {
        this.downloading = false
      }
    },
  }
};
</script>