<template>
  <div class="row">
    <div class="column column-full-width">

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Payment Card"
            disabled
          />
        </div>
        <span class="tiny-text tiny-text-spaced" v-if="card">{{ card }}</span>
        <div class="column text-button action" v-on:click="updateCardAction" v-if="card">
          <span>Update Card</span>
        </div>
        <div class="column text-button action" v-on:click="removeCardAction" v-if="card">
          <span>Remove Card</span>
        </div>
        <div class="column text-button action"  v-on:click="addCardAction" v-if="!card">
          <span>Add Card</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AccountBillingCard',
  computed: {
    ...mapState('billing', ['card']),
  },
  methods: {
    ...mapMutations('billing', ['toggleUpdateCardView']),
    ...mapActions('billing', ['removePaymentMethod']),
    addCardAction: function() {
      this.$router.replace({ path: this.$route.name, query: { option: 'billing', card: 'update' }}).catch((err) => err)
      this.toggleUpdateCardView()
    },
    updateCardAction: function() {
      this.$router.replace({ path: this.$route.name, query: { option: 'billing', card: 'update' }}).catch((err) => err)
      this.toggleUpdateCardView()
    },
    removeCardAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to remove this card?')
        if (confirm) {
          await this.removePaymentMethod()
        }
        location.reload()
      } catch(err) {
        console.log(err)
      }
    },
  }
}
</script>