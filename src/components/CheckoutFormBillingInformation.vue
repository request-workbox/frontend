<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <!-- BILLING INFORMATION -->
      <div class="row margin-top-10">
        <div class="column column-full-width">
          <p class="column-left-heading-subheader">Billing Information</p>
        </div>
      </div>

      <div class="row row-justify-between grey-container" v-bind:class="{ 'grey-container-selected':billingType === 'existing' }" v-on:click="changeBillingType('existing')">
        <div class="column column-min-50">
          <div class="row">
            <div class="column column-full-width margin-left-15">
              <input type="radio" name="existing" value="existing" v-model="billingType">
            </div>
          </div>
        </div>
        <div class="column column-grow text-13">
          Use existing billing information
        </div>
        <div class="column column-grow text-12 text-weight-600">
          VISA 4444
        </div>
      </div>

      <div class="row row-justify-between grey-container" v-bind:class="{ 'grey-container-selected':billingType === 'update' }" v-on:click="changeBillingType('update')">
        <div class="column column-min-50">
          <div class="row">
            <div class="column column-full-width margin-left-15">
              <input type="radio" name="update" value="update" v-model="billingType">
            </div>
          </div>
        </div>
        <div class="column column-grow text-13">
          Update billing information
        </div>
      </div>

      <!-- Name -->
      <div class="row row-justify-between row-shadow row-white" v-if="billingType === 'update'">
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
              <input type="text" class="card-container-input-text text-13 stretch margin-right-15 height-30" placeholder="John Rosen" autocomplete="name" v-bind:class="{ 'red-border': nameError }">
            </div>
          </div>
        </div>
      </div>

      <!-- Email -->
      <div class="row row-justify-between row-shadow row-white" v-if="billingType === 'update'">
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
              <input type="text" class="card-container-input-text card-container-input-text-short text-13 stretch margin-right-15 height-30" placeholder="john@example.com" autocomplete="email" v-bind:class="{ 'red-border': emailError }">
            </div>
          </div>
        </div>
      </div>

      <!-- Card -->
      <div class="row row-justify-between row-shadow row-white" v-if="billingType === 'update'">
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

      <div class="row margin-top-10 red-container" v-if="nameError">
        <div class="column column-grow">
          <p class="blue-text">Please confirm name</p>
        </div>
      </div>

      <div class="row margin-top-10 red-container" v-if="emailError">
        <div class="column column-grow">
          <p class="blue-text">Please confirm email</p>
        </div>
      </div>

      <!-- Save Card Button -->
      <div class="row row-justify-between row-shadow row-white margin-top-10" v-if="this.$route.name === 'Account'">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-grow pay-button">
              <p class="pay-button-text">Save Card</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pay Button -->
      <div class="row row-justify-between row-shadow row-white margin-top-10" v-if="this.$route.name === 'Checkout'">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-grow pay-button">
              <p class="pay-button-text">Upgrade Account</p>
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
  name: "CheckoutFormBillingInformation",
  data: function() {
    return {
      billingType: 'existing',
      nameError: false,
      emailError: false,
      card: null,
    }
  },
  mounted: function() {
    this.card = Vue.$stripe.elements().create('card')
  },
  methods: {
    changeBillingType: function(billingType) {
      this.billingType = billingType

      if (billingType === 'update') {
        this.$nextTick(function() {
          this.card.mount('#card-info', {
            style: {
              base: {
                fontSize: '10px',
                fontWeight: 400,
                fontFamily: "Open Sans, sans-serif",
                fontSmoothing: 'antialiased',
              }
            }
          })
        })
      }
    }
  }
};
</script>