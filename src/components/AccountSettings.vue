<template>
  <div class="row">
    <div class="column column-full-width">
      <AccountSettingsContactInfo />
      <AccountSettingsEmailAlerts />
      <AccountSettingsWorkflowStatus />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import AccountSettingsContactInfo from './AccountSettingsContactInfo'
import AccountSettingsEmailAlerts from './AccountSettingsEmailAlerts'
import AccountSettingsWorkflowStatus from './AccountSettingsWorkflowStatus'

export default {
  name: 'AccountSettings',
  components: {
    AccountSettingsContactInfo,
    AccountSettingsEmailAlerts,
    AccountSettingsWorkflowStatus
  },
  computed: {
    userAttributeEmail: function () {
      return this.$store.getters['cognito/userAttributes']['email']
    }
  }
}
</script>