<template>
  <div class="row row-border-bottom" v-if="this.selectedWebhookId !== ''">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row" v-if="this.option === 'payloads'">

            <div class="tiny-spacer"></div>

            <div class="column">
              <input type="date" name="" id="" :value="webhookDate" v-on:change="changeWebhookDateAction"/>
            </div>

            <div class="spacer"></div>
            <div
              v-if="!loading"
              v-on:click="getWebhookDetailsAction"
              class="column text-button action">
              Reload
            </div>
            <div
            v-if="loading"
              class="column text-button action">
              Loading...
            </div>
            
          </div>
          <div class="row" v-if="this.option === 'settings'">

            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelChangesAction"
            >Cancel</div>
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="saveChangesAction"
            >Save Changes</div>
            
          </div>
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
  name: "WebhookToolbarActions",
  data: function() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState('webhook',['webhookDate','selectedWebhookId','option','editing']),
    ...mapGetters('webhook',['selectedWebhook'])
  },
  methods: {
    ...mapMutations('webhook',['changeWebhookDate']),
    ...mapActions('webhook',['getWebhookDetails','cancelChanges','saveChanges']),
    changeWebhookDateAction: function() {
      this.changeWebhookDate(event.srcElement.value)
    },
    getWebhookDetailsAction: async function () {
      if (!this.selectedWebhookId || this.selectedWebhookId === '') return;
      
      this.loading = true
      try {
        const payload = { webhookId: this.selectedWebhookId, date: moment(this.webhookDate) }
        await this.getWebhookDetails(payload)
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    cancelChangesAction: async function() {
      await this.cancelChanges({ webhookId: this.selectedWebhookId })
    },
    saveChangesAction: async function() {
      await this.saveChanges(this.selectedWebhook)
    },
  }
};
</script>

<style lang="scss">
input[type="date"] {
  font-family: "Open Sans", sans-serif;
}
.tiny-text-spaced {
  margin-left: 9px !important;
}
</style>