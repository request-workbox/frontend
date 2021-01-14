<template>
    <div class="row">
      <div class="column column-full-width">
        <div class="row">
          <div class="column account-container">
            <label class="account-breadcrumb">Account - API Keys</label>
            <h3 class="account-header-slim">API Keys</h3>
          </div>
        </div>
        <div class="row row-border-bottom">
          <div class="column account-tab account-tab-selected">Keys</div>
          <div class="column column-grow"></div>
          <div class="column account-button" v-on:click="generateTokenAction()">
            <span>Generate API Key</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'TokensMenu',
  methods: {
    ...mapActions('billing',['generateToken']),
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
  }
}
</script>