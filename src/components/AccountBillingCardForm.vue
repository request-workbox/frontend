<template>
  <div class="row row-border-bottom" id="card-container-row">
    <div class="column column-full-width" id="card-container">
      <!-- Header -->
      <div class="row">
        <div class="column column-full-width">
          <p class="column-left-heading-header">Update Card</p>
        </div>
        <div class="column column-16 column-left-heading-cancel" v-on:click="toggleUpdateCardView">
          <p class="column-left-heading-cancel-text">⬅ Go Back</p>
        </div>
      </div>

      <CheckoutFormBillingInformation />
      <CheckoutFormPaymentInformation />

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import CheckoutFormOrderSummary from './CheckoutFormOrderSummary'
import CheckoutFormBillingInformation from './CheckoutFormBillingInformation'
import CheckoutFormPaymentInformation from './CheckoutFormPaymentInformation'

export default {
  name: "AccountBillingCardForm",
  components: {
    CheckoutFormOrderSummary,
    CheckoutFormBillingInformation,
    CheckoutFormPaymentInformation,
  },
  methods: {
    ...mapMutations('billing', ['toggleUpdateCardView']),
  }
};
</script>