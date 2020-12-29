<template>
  <div>
    <div class="row row-border-bottom">
      <div class="column column-full-width">

        <div class="row row-border-bottom row-align-start padding-bottom-150" id="checkout-row">
          <div class="column column-10"></div>

          <div class="column column-50 column-padding-20">
            <CheckoutFormAccountSummary />
            <CheckoutFormCardInput />
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
import CheckoutFormCardInput from './CheckoutFormCardInput'

export default {
  name: "Checkout",
  mounted: async function() {
    if (this.$route.query && this.$route.query.type) {
      this.changeCheckoutType(this.$route.query.type)
    }

    try {
        await this.getAccountDetails()
        await this.previewCheckoutPrice({ checkoutType: this.$route.query.type })
      } catch(err) {
        console.log(err)
      }
  },
  components: {
    CheckoutFormAccountSummary,
    CheckoutFormOrderSummary,
    CheckoutFormCardInput,
  },
  computed: {
    ...mapState('checkout', ['checkoutType']),
  },
  methods: {
    ...mapMutations('checkout', ['changeCheckoutType']),
    ...mapActions('billing', ['getAccountDetails',]),
    ...mapActions('checkout', ['previewCheckoutPrice']),
  }
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