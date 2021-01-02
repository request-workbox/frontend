<template>
  <div class="row row-border-bottom" id="card-container-row" v-if="paymentIntentFailedView">
    <div class="column column-full-width max-width-450" id="card-container">
        <div class="row row-border-bottom">
          <div class="column column-full-width">

            <div class="row margin-top-10">
              <div class="column column-full-width">
                <p class="column-left-center-subheader">Payment failed</p>
              </div>
            </div>

            <div class="row margin-top-10 margin-bottom-25">
              <div class="column column-full-width semi-red-container">
                <p class="text-weight-600">
                  We are sorry, there was an error processing your payment. 
                  Please try again with a different payment method.
                </p>
              </div>
            </div>

            <div class="row row-justify-between margin-top-10" v-on:click="goBackAction">
              <div class="column column-grow">
                <div class="row">
                  <div class="column column-grow pay-button-cancel">
                    <p class="pay-button-cancel-text">Back to checkout page</p>
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

export default {
  name: "CheckoutIntentFailed",
  computed: {
    ...mapState('checkout', ['paymentIntentFailedView'])
  },
  methods: {
    ...mapMutations('checkout', ['togglePaymentIntentFailedView']),
    goBackAction: function() {
      this.togglePaymentIntentFailedView()
    }
  }
};
</script>