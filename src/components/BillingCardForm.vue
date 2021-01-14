<template>
  <div class="row row-border-bottom" id="card-container-row">
    <div class="column column-full-width max-width-450" id="card-container">

      <!-- BILLING INFORMATION -->
      <div class="row margin-top-10">
        <div class="column column-full-width">
          <p class="column-left-heading-subheader">Billing Information</p>
        </div>
      </div>

      <div class="row row-justify-between grey-container" v-bind:class="{ 'grey-container-selected':billingType === 'existing' }" v-on:click="changeBillingType('existing')" v-if="stripeCardBrand">
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
          {{ stripeCardBrand }} {{ stripeCardLast4 }}
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
              <input type="text" class="card-container-input-text text-13 stretch margin-right-15 height-30" placeholder="John Rosen" autocomplete="name" v-model="name" v-bind:class="{ 'red-background': nameError }">
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
              <input type="email" class="card-container-input-text card-container-input-text-short text-13 stretch margin-right-15 height-30" placeholder="john@example.com" autocomplete="email" v-model="email" v-bind:class="{ 'red-background': emailError }">
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
          <p class="blue-text">I authorize Request Workbox to send instructions to the financial institution that issued my card to take payments from my card account in accordance with the terms of my agreement with you.
          </p>
        </div>
      </div>

      <!-- Save Card Button -->
      <div class="row row-justify-between margin-top-10" v-on:click="saveCardAction">
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

      <!-- Cancel Button -->
      <div class="row row-justify-between margin-top-10" v-on:click="goBackAction">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-grow pay-button-cancel">
              <p class="pay-button-cancel-text">Cancel</p>
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
  name: "BillingCardForm",
  data: function() {
    return {
      saving: false,

      billingType: 'update',
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

    this.mountStripeElement()
  },
  computed: {
    ...mapState('billing', ['stripeCardBrand' ,'stripeCardLast4']),
  },
  methods: {
    ...mapMutations('billing', ['toggleUpdateCardView']),
    ...mapActions('billing',['billingInformation']),
    ...mapActions('checkout', ['createSetupIntent','updatePaymentMethod']),
    goBackAction: function() {
      this.toggleUpdateCardView()
    },
    mountStripeElement: function() {
      if (this.billingType === 'update') {
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
    changeBillingType: function(billingType) {
      this.billingType = billingType

      this.nameError = false
      this.emailError = false
      this.cardError = false

      this.mountStripeElement()
    },
    saveCardAction: async function() {
      if (this.saving) return
      if (this.billingType === 'existing') return this.toggleUpdateCardView()

      try {

        this.saving = true
        this.nameError = false
        this.emailError = false

        if (this.name === '') {
          this.nameError = true
          throw new Error()
        }
        if (this.email === '') {
          this.emailError = true
          throw new Error()
        }
        if (this.cardError) throw new Error()
        if (!this.cardReady) {
          this.cardError = true
          this.cardMessage = 'Please confirm card'
          throw new Error()
        }

        Vue.$toast.open({ message: 'Confirming...', })

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

        Vue.$toast.open({ message: 'Updating...', })

        await this.updatePaymentMethod(confirmCard.setupIntent.payment_method)
        await this.billingInformation()

        Vue.$toast.open({ message: 'Success!', type: 'success', })

        this.toggleUpdateCardView()

      } catch(err) {
        console.log('Account billing card form error: ', err.message)
        throw new Error(err.message)
      } finally {
        this.saving = false
      }
    },
  }
};
</script>