<template>
  <div class="row">
    <div class="column column-full-width table-row-data-light">
      
      <div class="row row-border-bottom-light padding-top-bottom-5">
        <div class="column column-grow text-center text-12 text-light-grey">API Keys are only displayed once.</div>
      </div>

      <div class="row row-border-bottom-light padding-top-bottom-5" v-for="(token) in tokens" :key="token.snippet">
        <div class="column account-column-data column-15">
          <p class="text-12">{{ token.snippet }}</p>
        </div>
        <div class="column text-button action" v-if="!revoking" v-on:click="revokeTokenAction(token.snippet)"><span>Revoke</span></div>
        <div class="column text-button action" v-if="revoking"><span>Revoke</span></div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TokensList',
  data: function() {
    return {
      loading: false,
      revoking: false,
    }
  },
  computed: {
    ...mapState('billing', ['tokens']),
  },
  methods: {
    ...mapActions('billing',['revokeToken']),
    revokeTokenAction: async function(snippet) {
      try {
        const confirm = window.confirm('Are you sure you want to revoke this token?')
        if (confirm) {
          this.revoking = true
          const revoke = await this.revokeToken(snippet)
        }
      } catch(err) {
        console.log('Account settings revoke tokens error', err.message)
      } finally {
        this.revoking = false
      }
    },
  }
}
</script>