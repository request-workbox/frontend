<template>
  <div class="row row-border-bottom" id="card-container-row">
    <div class="column column-full-width max-width-450" id="card-container">
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
};
</script>