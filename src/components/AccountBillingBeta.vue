<template>
  <div class="row">
    <div class="column column-full-width">
      <!-- Free 3 Month Trial -->
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Beta Program</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column text-button action beta-button">
          <span>Unlock Standard 3 Month Trial</span>
        </div>
        <div class="column text-button action">
          <span>Add Default Credit Card</span>
        </div>
        <div class="column text-button action">
          <span>Create 5 Requests</span>
        </div>
        <div class="column text-button action">
          <span>Run 2 Workflows</span>
        </div>
        <div class="column text-button action">
          <span>Access Storage Text</span>
        </div>
        <div class="column column-grow"></div>
        <span class="tiny-text tiny-text-spaced"></span>
      </div>

      <div class="row row-border-bottom">
        <div class="column text-button action beta-button">
          <span>Unlock $5.00 Account Credit</span>
        </div>
        <div class="column text-button action">
          <span>Create API Key</span>
        </div>
        <div class="column text-button action">
          <span>Schedule Workflow</span>
        </div>
        <div class="column text-button action">
          <span>Download Storage File</span>
        </div>
        <div class="column text-button action">
          <span>Send Workflow Webhook</span>
        </div>
        <div class="column column-grow"></div>
        <span class="tiny-text tiny-text-spaced"></span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AccountBillingBeta',
  methods: {
    ...mapActions('billing', ['updateAccountType']),
  }
}
</script>

<style lang="scss">
.beta-button {
  background: #ececec !important;
  color: #011321 !important;
  font-weight: 600;
  min-width: 195px !important;
  text-align:center !important;
  font-size: 11px;
}
</style>