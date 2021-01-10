<template>
  <div class="row">
    <div class="column column-full-width">

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">API Tokens</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-15">
          <div class="column text-button action text-center" v-if="!loading" v-on:click="generateTokenAction"><span>Generate API Token</span></div>
          <div class="column text-button action text-center" v-if="loading"><span>Generating...</span></div>
        </div>
        <span class="tiny-text tiny-text-spaced">API Tokens are only displayed once.</span>
      </div>

      <div class="row row-border-bottom" v-for="(token) in tokens" :key="token.snippet">
        <div class="column column-data column-15">
          <input
            type="text"
            placeholder=""
            class="column-input-text"
            :value="token.snippet"
            disabled
          />
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
  name: 'AccountSettingsTokens',
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
    ...mapActions('billing',['generateToken', 'revokeToken',]),
    generateTokenAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to generate a token?')
        if (confirm) {
          this.loading = true
          const token = await this.generateToken()
        }
      } catch(err) {
        console.log('Account settings tokens error', err.message)
      } finally {
        this.loading = false
      }
    },
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