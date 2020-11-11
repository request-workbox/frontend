<template>
  <div class="row">
    <div class="column column-full-width">
      <!-- Free 3 Month Trial -->
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">3 Month Trial Upgrade to Standard</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Pending Actions"
            disabled
          />
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

      <!-- Free $5.00 Account Credit -->
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">$5.00 Account Credit</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Pending Actions"
            disabled
          />
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
  name: 'AccountBetaProgram',
  methods: {
    ...mapActions('billing', ['updateAccountType']),
  }
}
</script>