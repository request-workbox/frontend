<template>
  <div class="row row-border-bottom" id="card-container-row">
    <div class="column column-full-width max-width-550" id="card-container">
      <!-- Header -->
      <div class="row">
        <div class="column column-full-width">
          <p class="column-left-heading-header">Update Card</p>
        </div>
        <div class="column column-16 column-left-heading-cancel" v-on:click="goBackAction">
          <p class="column-left-heading-cancel-text">⬅ Go Back</p>
        </div>
      </div>

      <CheckoutFormCardInput />

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import CheckoutFormCardInput from './CheckoutFormCardInput'

export default {
  name: "AccountBillingCardForm",
  components: {
    CheckoutFormCardInput,
  },
  methods: {
    ...mapMutations('billing', ['toggleUpdateCardView']),
    goBackAction: function() {
      this.$router.replace({ path: this.$route.name, query: { option: 'billing' }}).catch((err) => err)
      this.toggleUpdateCardView()
    },
  }
};
</script>