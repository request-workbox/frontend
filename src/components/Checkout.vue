<template>
  <div>
    <div class="row row-border-bottom">
      <div class="column column-full-width">

        <div class="row row-border-bottom row-align-start" id="checkout-row">
          <div class="column column-10"></div>

          <div class="column column-50 column-padding-20">
            <CheckoutFormAccountSummary />
            <CheckoutFormBillingInformation />
          </div>

          <div class="column column-grow column-padding-20">
            <CheckoutFormOrderSummary />
          </div>

          <div class="column column-10"></div>

        </div>

      </div>
    </div>
    <div class="small-footer"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import CheckoutFormAccountSummary from './CheckoutFormAccountSummary'
import CheckoutFormOrderSummary from './CheckoutFormOrderSummary'
import CheckoutFormBillingInformation from './CheckoutFormBillingInformation'
import CheckoutFormPaymentInformation from './CheckoutFormPaymentInformation'

export default {
  name: "Checkout",
  components: {
    CheckoutFormAccountSummary,
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