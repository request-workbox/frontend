<template>
  <div class="row">
    <div class="column column-full-width">

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Credit Remaining"
            disabled
          />
        </div>
        <span class="tiny-text tiny-text-spaced">{{ balanceCurrency }}</span>
        <div class="column column-grow"></div>
        <span class="tiny-text tiny-text-spaced"></span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AccountBillingCredit',
  computed: {
    ...mapState('billing', ['balance']),
    balanceCurrency: function() {
      if (this.balance === 0) return '$0.00'
      else if (this.balance > 0) {
        const total = (this.balance / 100).toFixed(2)
        return `- $${total}`
      } else if (this.balance < 0) {
        const total = ( Math.abs(this.balance) / 100).toFixed(2)
        return `$${total}`
      }
    },
  }
}
</script>