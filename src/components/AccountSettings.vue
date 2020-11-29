<template>
  <div class="row">
    <div class="column column-full-width">
      <AccountSettingsContactInfo />
      <!-- <AccountSettingsEmailAlerts /> -->
      <AccountSettingsWorkflowStatus />
      <AccountTokens />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import AccountSettingsContactInfo from './AccountSettingsContactInfo'
// import AccountSettingsEmailAlerts from './AccountSettingsEmailAlerts'
import AccountTokens from './AccountTokens'
import AccountSettingsWorkflowStatus from './AccountSettingsWorkflowStatus'

export default {
  name: 'AccountSettings',
  components: {
    AccountSettingsContactInfo,
    // AccountSettingsEmailAlerts,
    AccountSettingsWorkflowStatus,
    AccountTokens,
  },
  computed: {
    userAttributeEmail: function () {
      return this.$store.getters['cognito/userAttributes']['email']
    }
  }
}
</script>