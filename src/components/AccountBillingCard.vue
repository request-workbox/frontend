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
        <span class="tiny-text tiny-text-spaced" v-if="card">VISA 4444</span>
        <div class="column text-button action" v-on:click="toggleUpdateCardView" v-if="card">
          <span>Update Card</span>
        </div>
        <div class="column text-button action" v-if="card">
          <span>Remove Card</span>
        </div>
        <div class="column text-button action"  v-on:click="toggleUpdateCardView" v-if="!card">
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
  }
}
</script>