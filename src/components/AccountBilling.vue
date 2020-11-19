<template>
  <div class="row">
    <div class="column column-full-width">

      <AccountBillingType />
      <AccountBillingCredit />
      <AccountBillingCard />
      <AccountBillingUsage />
      <AccountBillingBeta />
      <AccountBillingCardForm v-if="updateCardView"/>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import AccountBillingBeta from './AccountBillingBeta'
import AccountBillingUsage from './AccountBillingUsage'
import AccountBillingType from './AccountBillingType'
import AccountBillingCredit from './AccountBillingCredit'
import AccountBillingCard from './AccountBillingCard'
import AccountBillingCardForm from './AccountBillingCardForm'

export default {
  name: 'AccountBilling',
  components: {
    AccountBillingBeta,
    AccountBillingUsage,
    AccountBillingType,
    AccountBillingCredit,
    AccountBillingCard,
    AccountBillingCardForm,
  },
  computed: {
    ...mapState('billing', ['updateCardView']),
  },
}
</script>