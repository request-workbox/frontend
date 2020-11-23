<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <!-- ORDER SUMMARY -->

      <div class="row">
        <div class="column column-grow">
          <p class="column-left-heading-subheader">Standard Account</p>
        </div>
        <div class="column">
          <p class="column-left-heading-subheader">$5.55</p>
        </div>
      </div>

      <hr>

      <div class="row row-justify-between">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-40">
              <input type="text" class="user-form-input user-form-input-stretch" placeholder="Discount Code">
            </div>
            <div class="column">
              <p class="column-left-heading-cancel-text">Apply Code</p>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div class="row row-align-start">
        <div class="column column-grow">
          <p class="column-left-heading-subheader">1st GB Free (monthly)</p>
          <p class="column-left-heading-subheader">$3.00/unit/month</p>
        </div>
        <div class="column">
          <p class="column-left-heading-subheader">$0.00</p>
        </div>
      </div>

      <div class="row row-align-start">
        <div class="column column-grow">
          <p class="column-left-heading-subheader">1st HOUR Free (monthly)</p>
          <p class="column-left-heading-subheader">$3.00/unit/month</p>
        </div>
        <div class="column">
          <p class="column-left-heading-subheader">$0.00</p>
        </div>
      </div>

      <div class="row">
        <div class="column column-grow">
          <p class="column-left-heading-subheader">Monthly Discount</p>
        </div>
        <div class="column">
          <p class="column-left-heading-subheader">$5.55</p>
        </div>
      </div>

      
      <hr>

      <div class="row row-align-start">
        <div class="column column-grow">
          <p class="column-left-heading-subheader">Total</p>
          <p class="column-left-heading-subheader">Billed monthly on the 21st</p>
        </div>
        <div class="column">
          <p class="column-left-heading-subheader">$5.55</p>
        </div>
      </div>

      <hr>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: "CheckoutFormOrderSummary",
};
</script>