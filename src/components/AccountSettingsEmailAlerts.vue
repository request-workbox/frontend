<template>
  <div class="row">
    <div class="column column-full-width">

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
        <div class="column email-alert-form-row">
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
        <div class="column email-alert-form-row">
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
        <div class="column email-alert-form-row">
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
        <div class="column email-alert-form-row">
          <input type="radio" id="feature" value="feature">
          <label for="feature">Send</label>

          <input type="radio" id="bug" value="bug">
          <label for="bug">Do Not Send</label>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AccountSettingsEmailAlerts',
  computed: {
    userAttributeEmail: function () {
      return this.$store.getters['cognito/userAttributes']['email']
    }
  }
}
</script>

<style lang="scss" scoped>
.email-alert-form-row {
  margin: 5px 0;

  input {
    margin: 5px 5px 5px 10px;
  }
  label {
    margin-left: 10px;
    font-size: 0.85em;
    font-weight: 400;
  }
}
</style>