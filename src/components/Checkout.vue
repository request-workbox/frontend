<template>
  <div class="row row-border-bottom row-align-start" id="checkout-row">
    <div class="column column-full-width column-padding-40">
      <CheckoutFormBillingInformation />
      <CheckoutFormPaymentInformation />
    </div>

    <div class="column column-full-width column-padding-40">
      <CheckoutFormOrderSummary />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import CheckoutFormOrderSummary from './CheckoutFormOrderSummary'
import CheckoutFormBillingInformation from './CheckoutFormBillingInformation'
import CheckoutFormPaymentInformation from './CheckoutFormPaymentInformation'

export default {
  name: "Checkout",
  components: {
    CheckoutFormOrderSummary,
    CheckoutFormBillingInformation,
    CheckoutFormPaymentInformation,
  },
};
</script>

<style lang="scss">
#checkout-row {
  background: #f7f7f7;
}
.column-padding-40 {
  padding: 40px;
}
</style>