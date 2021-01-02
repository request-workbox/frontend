<template>
  <div class="row row-border-bottom" id="card-container-row" v-if="paymentIntentSuccessView">
    <div class="column column-full-width max-width-450" id="card-container">
        <div class="row row-border-bottom">
          <div class="column column-full-width">

            <div class="row margin-top-10">
              <div class="column column-full-width">
                <p class="column-left-center-subheader">Payment successful</p>
              </div>
            </div>

            <div class="row margin-top-10 margin-bottom-25">
              <div class="column column-full-width semi-blue-container">
                <p class="text-weight-600">
                  Your order has been placed. We'll send you an email with 
                  your order details.
                </p>
              </div>
            </div>

            <div class="row row-justify-between margin-top-10" v-on:click="continueAction">
              <div class="column column-grow">
                <div class="row">
                  <div class="column column-grow pay-button">
                    <p class="pay-button-text">Continue</p>
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
  name: "CheckoutIntentSuccess",
  computed: {
    ...mapState('checkout', ['paymentIntentSuccessView'])
  },
  methods: {
    continueAction: function() {
      location.assign('/account')
    }
  }
};
</script>