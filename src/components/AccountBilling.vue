<template>
  <div class="row">
    <div class="column column-full-width">

      <AccountBillingProjects />
      <AccountBillingCard />
      <AccountBillingCredit />
      <AccountBillingCardForm v-if="updateCardView"/>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import AccountBillingProjects from './AccountBillingProjects'
import AccountBillingCard from './AccountBillingCard'
import AccountBillingCredit from './AccountBillingCredit'

import AccountBillingCardForm from './AccountBillingCardForm'

export default {
  name: 'AccountBilling',
  components: {
    AccountBillingProjects,
    AccountBillingCard,
    AccountBillingCredit,
    AccountBillingCardForm,
  },
  computed: {
    ...mapState('billing', ['updateCardView']),
  },
}
</script>