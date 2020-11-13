<template>
  <div class="row">
    <div class="column column-full-width">

      <AccountBillingPayment />
      <AccountBillingUsage />
      <AccountBillingBeta />
      <AccountBillingCard v-if="updateCardView"/>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import AccountBillingBeta from './AccountBillingBeta'
import AccountBillingCard from './AccountBillingCard'
import AccountBillingUsage from './AccountBillingUsage'
import AccountBillingPayment from './AccountBillingPayment'

export default {
  name: 'AccountBilling',
  components: {
    AccountBillingBeta,
    AccountBillingCard,
    AccountBillingUsage,
    AccountBillingPayment,
  },
  computed: {
    ...mapState('billing', ['updateCardView']),
  },
}
</script>