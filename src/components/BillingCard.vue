<template>
  <div class="row">
    <div class="column column-full-width">

      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-15">
          <p class="text-12">Payment Card</p>
        </div>
        <span class="tiny-text tiny-text-spaced" v-if="stripeCardBrand">{{ stripeCardBrand }} {{ stripeCardLast4 }}</span>
        <div class="column text-button action" v-on:click="updateCardAction" v-if="stripeCardBrand">
          <span>Update Card</span>
        </div>
        <div class="column text-button action" v-on:click="removeCardAction" v-if="stripeCardBrand">
          <span>Remove Card</span>
        </div>
        <div class="column text-button action"  v-on:click="addCardAction" v-if="!stripeCardBrand">
          <span>Add Card</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Vue from 'vue'

export default {
  name: 'BillingCard',
  computed: {
    ...mapState('billing', ['stripeCardBrand','stripeCardLast4']),
  },
  methods: {
    ...mapMutations('billing', ['toggleUpdateCardView']),
    ...mapActions('billing', ['billingInformation']),
    ...mapActions('checkout', ['removePaymentMethod']),
    addCardAction: function() {
      this.toggleUpdateCardView()
    },
    updateCardAction: function() {
      this.toggleUpdateCardView()
    },
    removeCardAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to remove this card?')

        if (confirm) {
          Vue.$toast.open({ message: 'Removing...' })
          
          await this.removePaymentMethod()
          await this.billingInformation()

          Vue.$toast.open({ message: 'Success!', type: 'success', })
          
        }
      } catch(err) {
        console.log('Account billing card error: ', err.message)
      }
    },
  }
}
</script>