<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column text-button action" v-on:click="newWebhookAction">Create Webhook</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "WebhookCreate",
  computed: {
    ...mapState('project', ['projectId']),
  },
  methods: {
    ...mapActions('webhook', ['newWebhook']),
    newWebhookAction: async function() {
      await this.newWebhook({ projectId: this.projectId })
    },
  }
};
</script>