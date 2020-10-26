<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row">
        <div class="column column-full-width">
          <AccountUserReset v-if="this.userOption === 'reset' && !this.$store.getters['cognito/isLoggedIn']"/>
          <AccountUserSignUp v-if="this.userOption === 'signup' && !this.$store.getters['cognito/isLoggedIn']"/>
          <AccountUserConfirm v-if="this.userOption === 'confirm' && !this.$store.getters['cognito/isLoggedIn']"/>
          <AccountUserLogIn v-if="this.userOption === 'login' && !this.$store.getters['cognito/isLoggedIn']"/>
        </div>
      </div>

      <GetStarted />
    </div>
  </div>

  
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';

import AccountUserReset from './AccountUserReset'
import AccountUserSignUp from './AccountUserSignUp'
import AccountUserConfirm from './AccountUserConfirm'
import AccountUserLogIn from './AccountUserLogIn'
import GetStarted from './GetStarted'

export default {
  name: 'AccountUser',
  components: {
    AccountUserReset,
    AccountUserSignUp,
    AccountUserConfirm,
    AccountUserLogIn,
    GetStarted,
  },
  computed: {
    ...mapState('account', [
      'userOption'
    ])
  }
}
</script>