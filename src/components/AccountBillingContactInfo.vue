<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Contact Information</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-15">
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

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AccountBillingContactInfo',
  computed: {
    userAttributeEmail: function () {
      return this.$store.getters['cognito/userAttributes']['email']
    }
  }
}
</script>