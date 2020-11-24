<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <!-- BILLING INFORMATION -->
      <div class="row margin-top-10">
        <div class="column column-full-width">
          <p class="column-left-heading-subheader">Billing Information</p>
        </div>
      </div>

      <div class="row row-justify-between">
        <div class="column column-min-50">
          <div class="row">
            <div class="column column-full-width margin-left-15">
              <input type="radio" name="" id="">
            </div>
          </div>
        </div>
        <div class="column column-grow">
          Use existing billing informtion
        </div>
      </div>

      <div class="row row-justify-between">
        <div class="column column-min-50">
          <div class="row">
            <div class="column column-full-width margin-left-15">
              <input type="radio" name="" id="">
            </div>
          </div>
        </div>
        <div class="column column-grow">
          Update billing information
        </div>
      </div>

      <!-- Name -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-min-50">
          <div class="row">
            <div class="column column-full-width margin-left-15">
              <p class="column-left-heading-text text-13">Name</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <input type="text" class="card-container-input-text text-13 stretch margin-right-15 height-30" placeholder="John Rosen" autocomplete="name">
            </div>
          </div>
        </div>
      </div>

      <!-- Email -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-min-50">
          <div class="row">
            <div class="column column-full-width margin-left-15">
              <p class="column-left-heading-text text-13">Email</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <input type="text" class="card-container-input-text card-container-input-text-short text-13 stretch margin-right-15 height-30" placeholder="john@example.com" autocomplete="email">
            </div>
          </div>
        </div>
      </div>

      <CheckoutFormPaymentInformation />
      
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import CheckoutFormPaymentInformation from './CheckoutFormPaymentInformation'

export default {
  name: "CheckoutFormBillingInformation",
  components: {
    CheckoutFormPaymentInformation,
  }
};
</script>