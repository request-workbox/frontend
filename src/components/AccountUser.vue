<template>
  <div class="row">
    <div class="column column-full-width">
      <AccountUserContactInfo />
      <AccountUserReset />
      <AccountUserSignUp />
      <AccountUserConfirm />
      <AccountUserLogIn />
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
  }
}
</script>