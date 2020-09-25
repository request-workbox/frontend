<template>
  <div class="row">
    <div class="column column-full-width">

      <!-- Log In -->

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Log In</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Username">
          </div>
          <div class="column column-data column-grow">
            <input type="text" v-model="username" placeholder="Username" autocomplete="username" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Password">
          </div>
          <div class="column column-data column-grow">
            <input type="password" v-model="password1" placeholder="Password" autocomplete="current-password" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-if="!loading" v-on:click="loginUserAction">Log In</div>
          <div class="column text-button action action-text-center" v-if="loading">Logging in...</div>
        </div>
        <span class="tiny-text tiny-text-spaced">{{ message }}</span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'AccountUserLogIn',
  data: function() {
    return {
      loading: false,
      message: ''
    }
  },
  computed: {
    ...mapFields('authentication', [
      'login.username',
      'login.password1',
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'loginUser'
    ]),
    loginUserAction: async function() {
      try {
        this.message = ''
        this.loading = true
        await this.loginUser()
        location.assign('/projects')
      } catch(err) {
        if (err.message === 'Incorrect username or password.') {
          this.message = 'Incorrect username or password.'
        } else if (err.message === 'Custom auth lambda trigger is not configured for the user pool.') {
          this.message = 'Please confirm password.'
        } else if (err.message === 'Username cannot be empty') {
          this.message = 'Please confirm username.'
        } else if (err.message === 'Password attempts exceeded') {
          this.message = 'Password attempts exceeded. Please contact support.'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>