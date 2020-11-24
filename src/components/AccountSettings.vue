<template>
  <div class="row">
    <div class="column column-full-width">
      <AccountSettingsContactInfo />
      <AccountSettingsEmailAlerts />
      <AccountSettingsWorkflowStatus />
      <AccountSettingsTokens />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import AccountSettingsContactInfo from './AccountSettingsContactInfo'
import AccountSettingsEmailAlerts from './AccountSettingsEmailAlerts'
import AccountSettingsWorkflowStatus from './AccountSettingsWorkflowStatus'
import AccountSettingsTokens from './AccountSettingsTokens'

export default {
  name: 'AccountSettings',
  components: {
    AccountSettingsContactInfo,
    AccountSettingsEmailAlerts,
    AccountSettingsWorkflowStatus,
    AccountSettingsTokens,
  },
  computed: {
    userAttributeEmail: function () {
      return this.$store.getters['cognito/userAttributes']['email']
    }
  }
}
</script>