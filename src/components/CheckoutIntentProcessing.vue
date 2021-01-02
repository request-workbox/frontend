<template>
  <div class="row row-border-bottom" id="card-container-row" v-if="paymentIntentProcessingView">
    <div class="column column-full-width max-width-450" id="card-container">
        <div class="row row-border-bottom">
          <div class="column column-full-width">

            <div class="row margin-top-10">
              <div class="column column-full-width">
                <p class="column-left-center-subheader">Processing your order...</p>
              </div>
            </div>

            <div class="row margin-top-10 margin-bottom-25">
              <div class="column column-full-width semi-blue-container">
                <p class="text-center text-weight-600">
                  Hold tight, your order is being processed.
                </p>
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
  name: "CheckoutIntentProcessing",
  computed: {
    ...mapState('checkout', ['paymentIntentProcessingView'])
  }
};
</script>