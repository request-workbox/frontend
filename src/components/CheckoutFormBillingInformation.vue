<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <!-- BILLING INFORMATION -->
      <div class="row margin-top-10">
        <div class="column column-full-width">
          <p class="column-left-heading-subheader">Billing Information</p>
        </div>
      </div>

      <div class="row row-justify-between grey-container" v-bind:class="{ 'grey-container-selected':billingType === 'existing' }" v-on:click="changeBillingType('existing')" v-if="card">
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
          {{ card }}
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
              <input type="text" class="card-container-input-text text-13 stretch margin-right-15 height-30" placeholder="John Rosen" autocomplete="name" v-model="name" v-bind:class="{ 'red-border': nameError }">
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
              <input type="email" class="card-container-input-text card-container-input-text-short text-13 stretch margin-right-15 height-30" placeholder="john@example.com" autocomplete="email" v-model="email" v-bind:class="{ 'red-border': emailError }">
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

      <div class="row margin-top-10 red-container" v-if="cardError">
        <div class="column column-grow">
          <p class="blue-text">{{ cardMessage }}</p>
        </div>
      </div>

      <div class="row row-align-start margin-bottom-10 margin-top-10">
        <div class="column column-grow">
          <p class="blue-text">I authorise Request Workbox to send instructions to the financial institution that issued my card to take payments from my card account in accordance with the terms of my agreement with you.
          </p>
        </div>
      </div>

      <!-- Save Card Button -->
      <div class="row row-justify-between row-shadow row-white margin-top-10" v-on:click="saveCardAction" v-if="this.$route.name === 'Account'">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-grow pay-button" v-if="!saving">
              <p class="pay-button-text">Save Card</p>
            </div>
            <div class="column column-grow pay-button" v-if="saving">
              <p class="pay-button-text">Saving...</p>
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
      saving: false,

      billingType: 'existing',
      nameError: false,
      emailError: false,
      cardError: false,
      cardMessage: '',
      cardReady: false,
      stripeCard: null,

      name: '',
      email: '',
    }
  },
  mounted: function() {
    const thisRef = this

    this.stripeCard = Vue.$stripe.elements().create('card')
    this.stripeCard.on('change', function(event) {
      if (event.complete) {
        thisRef.cardReady = true
        thisRef.cardError = false
        thisRef.cardMessage = ''
      } else if (event.error) {
        thisRef.cardReady = false
        thisRef.cardError = true
        thisRef.cardMessage = event.error.message
      } else {
        thisRef.cardReady = false
        thisRef.cardError = false
        thisRef.cardMessage = ''
      }
    })

    if (this.$route.query && this.$route.query.card === 'update') {
      this.changeBillingType('update')
    }
  },
  computed: {
    ...mapState('billing', ['card']),
  },
  methods: {
    ...mapMutations('billing', ['toggleUpdateCardView']),
    ...mapActions('billing', ['createSetupIntent', 'updatePaymentMethod']),
    changeBillingType: function(billingType) {
      this.billingType = billingType

      if (billingType === 'update') {
        this.$nextTick(function() {
          this.stripeCard.mount('#card-info', {
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
    },
    saveCardAction: async function() {
      try {
        if (this.billingType === 'existing' && this.$route.name === 'Account') {
          this.$router.replace({ path: this.$route.name, query: { option: 'billing' }}).catch((err) => err)
          return this.toggleUpdateCardView()
        }

        this.saving = true
        this.nameError = false
        this.emailError = false

        if (this.name === '') return this.nameError = true
        if (this.email === '') return this.emailError = true
        if (this.cardError) return
        if (!this.cardReady) {
          this.cardError = true
          this.cardMessage = 'Please confirm card'
          return
        }

        const setupIntent = await this.createSetupIntent()
        const clientSecret = setupIntent.data.clientSecret
        const confirmCard = await Vue.$stripe.confirmCardSetup(clientSecret, {
          payment_method: {
            card: this.stripeCard,
            billing_details: {
              name: this.name,
              email: this.email,
            }
          }
        })

        const paymentMethodId = confirmCard.setupIntent.payment_method

        const updateCustomer = await this.updatePaymentMethod(paymentMethodId)

        Vue.$toast.open({
          message: 'Success! One moment please...',
          type: 'success',
        })

        this.$router.replace({ path: this.$route.name, query: { option: 'billing' }}).catch((err) => err)
        location.reload()

      } catch(err) {
        console.log(err)
      } finally {
        this.saving = false
      }
    }
  }
};
</script>