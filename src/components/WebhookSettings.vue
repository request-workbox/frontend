<template>
  <div class="row" v-if="this.selectedWebhookId !== ''">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Description</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Name"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="this.selectedWebhook.name"
            v-on:input="editWebhookAction($event)"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'

export default {
  name: "WebhookSettings",
  computed: {
    ...mapState('webhook',['selectedWebhookId']),
    ...mapGetters('webhook', ['selectedWebhook']),
  },
  methods: {
    ...mapMutations('webhook', ['editWebhook']),
    editWebhookAction: function(event) {
      this.editWebhook({ selectedWebhookId: this.selectedWebhookId, key: 'name', value: event.target.value })
    }
  }
};
</script>