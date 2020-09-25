<template>
  <div class="row">
    <div class="column column-full-width">
      <!-- <AccountUserContactInfo /> -->
      <AccountUserReset v-if="this.userOption === 'reset'"/>
      <AccountUserSignUp v-if="this.userOption === 'signup'"/>
      <AccountUserConfirm v-if="this.userOption === 'confirm'"/>
      <AccountUserLogIn v-if="this.userOption === 'login'"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';

import AccountUserContactInfo from './AccountUserContactInfo'
import AccountUserReset from './AccountUserReset'
import AccountUserSignUp from './AccountUserSignUp'
import AccountUserConfirm from './AccountUserConfirm'
import AccountUserLogIn from './AccountUserLogIn'

export default {
  name: 'AccountUser',
  components: {
    AccountUserContactInfo,
    AccountUserReset,
    AccountUserSignUp,
    AccountUserConfirm,
    AccountUserLogIn,
  },
  computed: {
    ...mapState('account', [
      'userOption'
    ])
  }
}
</script>