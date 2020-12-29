<template>
  <div class="row">
    <div class="column column-full-width">
      <AccountSettingsContactInfo />
      <AccountTokens />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import AccountSettingsContactInfo from './AccountSettingsContactInfo'
import AccountTokens from './AccountTokens'

export default {
  name: 'AccountSettings',
  components: {
    AccountSettingsContactInfo,
    AccountTokens,
  },
  computed: {
    userAttributeEmail: function () {
      return this.$store.getters['cognito/userAttributes']['email']
    }
  }
}
</script>