<template>
    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row">
          <div class="column input-hover">
            <input 
            class="input-text" 
            type="text" 
            id="login-name"
            v-model="username" />
          </div>
          <div class="column input-hover">
            <input 
            class="input-text" 
            type="text" 
            id="login-password"
            v-model="password" />
          </div>
          <div class="column text-button" id="login-button" v-on:click="login">Login</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RequestLogin',
  data: function() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    ...mapActions('authentication', [
      'loginUser',
    ]),
    login: function() {
      this.loginUser({ username: this.username, password: this.password })
    }
  }
}
</script>