<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <!-- Card -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-min-50">
          <div class="row">
            <div class="column column-full-width margin-left-15">
              <p class="column-left-heading-text text-13">Card</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width text-13" id="card-info">
              
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
    card.mount('#card-info', {
      style: {
        base: {
          fontSize: '10px',
          fontWeight: 400,
          fontFamily: "Open Sans, sans-serif",
          fontSmoothing: 'antialiased',
        }
      }
    })
  },
};
</script>