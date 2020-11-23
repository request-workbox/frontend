<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <!-- ORDER SUMMARY -->

      <div class="row">
        <div class="column column-grow">
          <p class="lineitem-text">Standard Account</p>
        </div>
        <div class="column">
          <p class="lineitem-text">$5.55</p>
        </div>
      </div>

      <hr>

      <div class="row row-justify-between">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-60">
              <input type="text" class="user-form-input user-form-input-stretch" placeholder="Discount Code">
            </div>
            <div class="spacer"></div>
            <div class="column">
              <p class="column-left-heading-cancel-text">Apply Code</p>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div class="row row-align-start">
        <div class="column column-grow">
          <p class="lineitem-text">1st GB Free (monthly)</p>
          <p class="lineitem-subtext">$3.00/unit/month</p>
        </div>
        <div class="column">
          <p class="lineitem-price">$0.00</p>
        </div>
      </div>

      <div class="row row-align-start">
        <div class="column column-grow">
          <p class="lineitem-text">1st Hour Free (monthly)</p>
          <p class="lineitem-subtext">$3.00/unit/month</p>
        </div>
        <div class="column">
          <p class="lineitem-price">$0.00</p>
        </div>
      </div>

      <div class="row row-align-start">
        <div class="column column-grow">
          <p class="lineitem-text">Discount Code (monthly)</p>
          <p class="lineitem-subtext">for 3 Billing Cycles</p>
        </div>
        <div class="column">
          <p class="lineitem-price">-$5.55</p>
        </div>
      </div>

      <div class="row row-align-start">
        <div class="column column-grow">
          <p class="lineitem-text">Credit</p>
          <p class="lineitem-subtext">for 1 Billing Cycle</p>
        </div>
        <div class="column">
          <p class="lineitem-price">-$5.00</p>
        </div>
      </div>

      
      <hr>

      <div class="row row-align-start margin-bottom-10">
        <div class="column column-grow">
          <p class="lineitem-text">Pay Today</p>
          <p class="lineitem-subtext">Billed monthly on the 21st</p>
        </div>
        <div class="column">
          <p class="lineitem-price">$5.55</p>
        </div>
      </div>

      <div class="row row-align-start margin-bottom-10">
        <div class="column column-full-width">
          <p class="lineitem-subtext">Total price does not include usage. Usage for this month will be included in the next billing cycle.
              An invoice will be sent to you by email 3 days before the end of the billing cycle.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: "CheckoutFormOrderSummary",
};
</script>