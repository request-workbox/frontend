<template>
  <div>
    <div class="row row-border-bottom">
      <div class="column column-full-width">

        <div class="row row-border-bottom row-align-start padding-bottom-150" id="checkout-row">
          <div class="column column-5 column-min-width-0"></div>

          <div class="column column-40 column-padding-20 column-min-width-0">
            <CheckoutFormAccountSummary />
            <CheckoutFormCardForm />
          </div>

          <div class="column column-grow column-padding-20 column-min-width-0">
            <CheckoutFormOrderSummary />
          </div>

          <div class="column column-20 column-min-width-0"></div>

        </div>

      </div>
    </div>
    <div class="small-footer"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Vue from 'vue'

import CheckoutFormAccountSummary from './CheckoutFormAccountSummary'
import CheckoutFormOrderSummary from './CheckoutFormOrderSummary'
import CheckoutFormCardForm from './CheckoutFormCardForm'

export default {
  name: "Checkout",
  mounted: async function() {
    this.updateIntentType(this.$route.query.intentType)
    this.updateProduct(this.$route.query.product)
    this.updateProjectId(this.$route.query.projectId)
    this.updateProjectName(this.$route.query.projectName)

    try {
      await this.billingInformation()

      let paymentIntent;

      if (this.$route.query.intentType === 'upgrade') {
        paymentIntent = await this.createPaymentIntentUpgrade({ projectId: this.$route.query.projectId, product: this.$route.query.product })
      } else if (this.$route.query.intentType === 'datatransfer') {
        paymentIntent = await this.createPaymentIntentDataTransfer({ projectId: this.$route.query.projectId, product: this.$route.query.product })
      }

      if (!paymentIntent || !paymentIntent._id) throw new Error('Not found.')

      if (paymentIntent.status === 'completed') {
        Vue.$toast.open({ message: 'Success!', type: 'success' })

        setTimeout(function() {
          location.assign('/account')
        }, 2500)
      } else if (paymentIntent.status !== 'started') {
        throw new Error('Status not found.')
      }

    } catch(err) { 
      console.log('Checkout error: ', err.message)

      Vue.$toast.open({ message: err.message })

      setTimeout(function() {
        location.assign('/account')
      }, 2500)
    }
  },
  components: {
    CheckoutFormAccountSummary,
    CheckoutFormOrderSummary,
    CheckoutFormCardForm,
  },
  computed: {
    ...mapState('checkout', ['intentType','product','projectId','projectName']),
  },
  methods: {
    ...mapMutations('checkout', ['updateIntentType','updateProduct','updateProjectId','updateProjectName']),
    ...mapActions('billing', ['billingInformation',]),
    ...mapActions('checkout', ['createPaymentIntentUpgrade','createPaymentIntentDataTransfer']),
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