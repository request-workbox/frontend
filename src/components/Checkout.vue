<template>
  <div>
    <div class="row row-border-bottom">
      <div class="column column-full-width">

        <div class="row row-border-bottom row-align-start" id="checkout-row">
          <div class="column column-40 column-padding-20">
            <CheckoutFormBillingInformation />
            <CheckoutFormPaymentInformation />
          </div>

          <div class="column column-grow column-padding-20">
            <CheckoutFormOrderSummary />
          </div>

        </div>

      </div>
    </div>
    <div class="small-footer"></div>
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
.column-padding-20 {
  padding: 20px;
}
</style>