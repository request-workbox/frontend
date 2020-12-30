<template>
  <div class="row">
    <div class="column column-full-width">
      <AccountSettingsProjects />
      <AccountSettingsTokens />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import AccountSettingsProjects from './AccountSettingsProjects'
import AccountSettingsTokens from './AccountSettingsTokens'

export default {
  name: 'AccountSettings',
  components: {
    AccountSettingsProjects,
    AccountSettingsTokens,
  },
  computed: {
    userAttributeEmail: function () {
      return this.$store.getters['cognito/userAttributes']['email']
    }
  },
}
</script>