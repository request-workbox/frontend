<template>
  <div class="row">
    <div class="column column-full-width grey-background">

      <div class="row row-border-bottom">
        <div class="column column-data column-header column-15 column-padded">
          <span class="column-text-button" v-on:click="toggleWebhookOrderDirection">Date Created</span>
        </div>
        <div class="column column-data column-header column-25 column-padded">Webhook Name</div>
        <div class="column column-data column-header column-grow column-padded">URL</div>
        <div class="column column-data column-header column-10 column-padded">Status</div>
      </div>

      <div class="row row-border-bottom table-row-selectable" v-for="(webhook) in sortedWebhooks" :key="webhook._id" v-on:click="selectWebhookAction(webhook._id)" v-bind:class="{'table-row-selected':shouldBeSelected(webhook._id)}">
        <div class="column column-data column-15 column-padded">{{ webhookCreatedAt(webhook.createdAt) }}</div>
        <div class="column column-data column-25 column-padded">{{ webhook.name }}</div>
        <div class="column column-data column-grow column-padded">{{ webhookURL(webhook._id) }}</div>
        <div class="column column-data column-10 column-padded">{{ webhookStatus(webhook.active) }}</div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import moment from 'moment-timezone'

export default {
  name: "WebhookList",
  computed: {
    ...mapState('webhook',['apiUrl','selectedWebhookId']),
    ...mapGetters('webhook', ['sortedWebhooks']),
  },
  methods: {
    ...mapMutations('webhook', ['updateSelectedWebhookId','toggleWebhookOrderDirection']),
    webhookCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm:ss a')}`
    },
    webhookURL: function(webhookId) {
      return `${this.apiUrl}/webhooks/${webhookId}`
    },
    webhookStatus: function(active) {
      if (active) return `Active`
      else return `Inactive`
    },
    selectWebhookAction: function(webhookId) {
      this.updateSelectedWebhookId(webhookId)
    },
    shouldBeSelected: function(webhookId) {
      if (webhookId === this.selectedWebhookId) return true
      else return false
    },
  }
};
</script>