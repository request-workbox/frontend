<template>
  <div class="row">
    <div class="column column-full-width">

      <AccountBillingContactInfo />
      <AccountBillingCard />
      <AccountBillingCredit />
      <AccountBillingCardForm v-if="updateCardView"/>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import AccountBillingContactInfo from './AccountBillingContactInfo'
import AccountBillingCard from './AccountBillingCard'
import AccountBillingCredit from './AccountBillingCredit'

import AccountBillingCardForm from './AccountBillingCardForm'

export default {
  name: 'AccountBilling',
  components: {
    AccountBillingContactInfo,
    AccountBillingCard,
    AccountBillingCredit,
    AccountBillingCardForm,
  },
  computed: {
    ...mapState('billing', ['updateCardView']),
  },
}
</script>