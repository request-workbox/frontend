<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Contact Information</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Email"
            disabled
          />
        </div>
        <span class="tiny-text tiny-text-spaced">{{ userAttributeEmail }}</span>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Email Alerts</div>
      </div>

      <!-- Workflow Errors -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            class="column-input-text"
            value="Workflow Errors"
            disabled
          />
        </div>
        <div class="column">
          <input type="radio" id="feature" value="feature">
          <label for="feature">Send</label>

          <input type="radio" id="bug" value="bug">
          <label for="bug">Do Not Send</label>
        </div>
      </div>

      <!-- Billing Alerts -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            class="column-input-text"
            value="Billing Notifications"
            disabled
          />
        </div>
        <div class="column">
          <input type="radio" id="feature" value="feature">
          <label for="feature">Send</label>

          <input type="radio" id="bug" value="bug">
          <label for="bug">Do Not Send</label>
        </div>
      </div>

      <!-- Product Updates -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            class="column-input-text"
            value="System Updates"
            disabled
          />
        </div>
        <div class="column">
          <input type="radio" id="feature" value="feature">
          <label for="feature">Send</label>

          <input type="radio" id="bug" value="bug">
          <label for="bug">Do Not Send</label>
        </div>
      </div>

      <!-- Marketing Alerts -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            class="column-input-text"
            value="Marketing and New Products"
            disabled
          />
        </div>
        <div class="column">
          <input type="radio" id="feature" value="feature">
          <label for="feature">Send</label>

          <input type="radio" id="bug" value="bug">
          <label for="bug">Do Not Send</label>
        </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Workflows</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Workflow Status"
            disabled
          />
        </div>
        <div class="column text-button action"><span>Stop Workflows</span></div>
        <div class="column column-grow"></div>
        <span class="tiny-text tiny-text-spaced">After stopping, current instances are completed and future requests are denied.</span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AccountSettings',
  computed: {
    userAttributeEmail: function () {
      return this.$store.getters['cognito/userAttributes']['email']
    }
  }
}
</script>