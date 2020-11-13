<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Account</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Account Type"
            disabled
          />
        </div>
        <div class="column text-button action" v-on:click="updateAccountTypeAction('free')">
          <span>Free</span>
        </div>
        <div class="column text-button action" v-on:click="updateAccountTypeAction('standard')">
          <span>Standard</span>
        </div>
        <div class="column text-button action" v-on:click="updateAccountTypeAction('developer')">
          <span>Developer</span>
        </div>
        <div class="column text-button action" v-on:click="updateAccountTypeAction('professional')">
          <span>Professional</span>
        </div>
        <div class="column column-grow"></div>
        <span class="tiny-text tiny-text-spaced">Billed on the 1st (prorated)</span>
      </div>

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
        <span class="tiny-text tiny-text-spaced">$7.95</span>
        <div class="column text-button action"><span>$5</span></div>
        <div class="column text-button action"><span>$25</span></div>
        <div class="column text-button action"><span>$50</span></div>
        <div class="column column-grow"></div>
        <span class="tiny-text tiny-text-spaced"></span>
      </div>

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
        <span class="tiny-text tiny-text-spaced">VISA 4444</span>
        <div class="column text-button action" v-on:click="toggleUpdateCardView">
          <span>Update Card</span>
        </div>
        <div class="column text-button action">
          <span>Remove Card</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AccountBillingPayment',
  methods: {
    ...mapMutations('billing', ['toggleUpdateCardView']),
    ...mapActions('billing', ['updateAccountType']),
    updateAccountTypeAction: async function(accountType) {
      try {
        await this.updateAccountType({ accountType: accountType })
      } catch(err) {
        console.log(err)
      }
    },
  }
}
</script>