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
        <div class="column text-button action" v-on:click="upgradeTo('free')" v-bind:class="{ 'text-button-selected-blue':isAccountType('free') }">
          <span>Free</span>
        </div>
        <div class="column text-button action" v-on:click="upgradeTo('standard')" v-bind:class="{ 'text-button-selected-blue':isAccountType('standard') }">
          <span>Standard</span>
        </div>
        <div class="column text-button action" v-on:click="upgradeTo('developer')" v-bind:class="{ 'text-button-selected-blue':isAccountType('developer') }">
          <span>Developer</span>
        </div>
        <div class="column text-button action" v-on:click="upgradeTo('professional')" v-bind:class="{ 'text-button-selected-blue':isAccountType('professional') }">
          <span>Professional</span>
        </div>
        <div class="column column-grow"></div>
        <span class="tiny-text tiny-text-spaced">Billed on the 1st (prorated)</span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AccountBillingType',
  computed: {
    ...mapState('billing', ['accountType','card']),
  },
  methods: {
    ...mapActions('billing', ['updateAccountType']),
    upgradeTo: async function(accountType) {
      if (accountType === 'free') return;
      
      if (this.card) {
        location.assign(`/checkout?card=existing&type=${accountType}`)
      } else {
        location.assign(`/checkout?card=update&type=${accountType}`)
      }
    },
    updateAccountTypeAction: async function(accountType) {
      try {
        await this.updateAccountType({ accountType: accountType })
      } catch(err) {
        console.log(err)
      }
    },
    isAccountType: function(accountType) {
      if (accountType === this.accountType) return true
      else return false
    }
  }
}
</script>