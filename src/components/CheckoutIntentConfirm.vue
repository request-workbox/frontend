<template>
  <div class="row row-border-bottom" id="card-container-row" v-if="paymentIntentConfirmView">
    <div class="column column-full-width max-width-450" id="card-container">
        <div class="row row-border-bottom">
          <div class="column column-full-width">

            <div class="row margin-top-10">
              <div class="column column-full-width">
                <p class="column-left-center-subheader">Confirm Payment</p>
              </div>
            </div>

            <div class="row margin-top-10 margin-bottom-25">
              <div class="column column-full-width semi-blue-container">
                <p class="text-weight-600">Are you sure you want to pay {{ productPrice }} with your {{ stripeCardBrand }} ending in {{ stripeCardLast4 }}?</p>
              </div>
            </div>

            <div class="row row-justify-between margin-top-10" v-on:click="confirmPaymentIntentAction">
              <div class="column column-grow">
                <div class="row">
                  <div class="column column-grow pay-button">
                    <p class="pay-button-text">Confirm</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="row row-justify-between margin-top-10" v-on:click="togglePaymentIntentConfirmView">
              <div class="column column-grow">
                <div class="row">
                  <div class="column column-grow pay-button-cancel">
                    <p class="pay-button-cancel-text">Cancel</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Vue from 'vue'

export default {
  props: ['stripeCard','billingType'],
  name: "CheckoutIntentConfirm",
  data: function() {
    return {
      confirming: false,
    }
  },
  computed: {
    ...mapState('billing', ['stripeCardBrand' ,'stripeCardLast4']),
    ...mapState('checkout',['paymentIntentConfirmView','price', 'payment','client_secret']),
    productPrice: function() {
      if (this.price === '' || this.price === 0) {
        return 'Loading...'
      } else {
        const price = (this.price / 100).toFixed(2)
        return `$${price}`
      }
    },
  },
  methods: {
    ...mapMutations('checkout', ['togglePaymentIntentConfirmView','togglePaymentIntentProcessingView','togglePaymentIntentSuccessView','togglePaymentIntentFailedView']),
    ...mapActions('checkout', ['confirmPaymentIntent']),
    confirmPaymentIntentAction: async function () {
      if (this.confirming) return

      Vue.$toast.open({ message: 'One moment...', })

      this.togglePaymentIntentConfirmView()
      this.togglePaymentIntentProcessingView()

      try {
        this.confirming = true

        let paymentMethod;

        if (this.billingType === 'existing') {
          const paymentMethodId = await this.confirmPaymentIntent()
          paymentMethod = paymentMethodId
        } else if (this.billingType === 'update') {
          const paymentMethodCard = this.stripeCard
          paymentMethod = {
            card: paymentMethodCard,
          }
        }

        const paymentAttempt = await Vue.$stripe.confirmCardPayment(this.client_secret, {
          payment_method: paymentMethod
        })

        console.log('payment attempt', paymentAttempt)

        Vue.$toast.open({ message: 'Success!', type: 'success', })

        this.togglePaymentIntentSuccessView()

      } catch(err) {
        console.log('Checkout confirm error', err)

        Vue.$toast.open({ message: err.message, })

        this.togglePaymentIntentFailedView()

      } finally {
        this.confirming = false
        this.togglePaymentIntentProcessingView()
      }
    }
  }
};
</script>