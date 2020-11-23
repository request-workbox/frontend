<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <!-- PAYMENT INFORMATION -->
      <div class="row">
        <div class="column column-full-width">
          <p class="column-left-heading-subheader">Payment Information</p>
        </div>
      </div>

      <!-- Card -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <p class="column-left-heading-text">Card</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width" id="card-info">
              
            </div>
          </div>
        </div>
      </div>

      <!-- Save Card Button -->
      <div class="row row-justify-between row-shadow row-white" v-if="this.$route.name === 'Account'">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-grow column-button">
              <p class="column-button-text">Save Card</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pay Button -->
      <div class="row row-justify-between row-shadow row-white" v-if="this.$route.name === 'Checkout'">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-grow column-button">
              <p class="column-button-text">Start Subscription</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: "CheckoutFormPaymentInformation",
  mounted: function() {
    const card = Vue.$stripe.elements().create('card')
    card.mount('#card-info')
  },
};
</script>