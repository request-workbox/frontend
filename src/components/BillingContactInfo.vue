<template>
  <div class="row">
    <div class="column column-full-width">

      <div class="row row-border-bottom">
        <div class="column column-grow account-column-data-header">Contact and Card Information</div>
      </div>

      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-15">
          <p class="text-12">Email</p>
        </div>
        <span class="tiny-text tiny-text-spaced">{{ userAttributeEmail }}</span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BillingContactInfo',
  computed: {
    userAttributeEmail: function () {
      return this.$store.getters['cognito/userAttributes']['email']
    }
  }
}
</script>