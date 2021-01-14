<template>
  <div id="billing-container">
    <BillingMenu />
    <BillingContactInfo />
    <BillingCard />
    <BillingCredit />
    <BillingCardForm v-if="updateCardView"/>
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import _ from 'lodash'

import BillingMenu from './BillingMenu'
import BillingContactInfo from './BillingContactInfo'
import BillingCard from './BillingCard'
import BillingCredit from './BillingCredit'
import BillingCardForm from './BillingCardForm'
import Footer from './Footer'

export default {
  name: 'Billing',
  components: {
    BillingMenu,
    BillingContactInfo,
    BillingCard,
    BillingCredit,
    BillingCardForm,
    Footer,
  },
  mounted: function () {
    this.init()
  },
  beforeRouteUpdate(to, from, next) {
    // this.init()
    return next()
  },
  computed: {
    ...mapState('billing', ['updateCardView']),
  },
  methods: {
    ...mapActions('billing', ['billingInformation']),
    init: async function () {
      try {
        await this.billingInformation()
      } catch(err) {
        console.log('Billing error: ', err.message)
      }
    },
  },
};
</script>

<style lang="scss">
#billing-container {
  display: flex;
  flex-direction: column;

  // align-items: flex-start;
  // overflow-x: hidden;

  margin: 0 15px;
}
</style>