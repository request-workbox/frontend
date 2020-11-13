<template>
  <div class="row">
    <div class="column column-full-width">

      <!-- Sign Up -->

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Sign Up</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Email">
          </div>
          <div class="column column-data column-grow">
            <input type="text" v-model="email" placeholder="Email" autocomplete="email" class="column-input-text">
          </div>
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
            <input type="password" v-model="password1" placeholder="Password" autocomplete="new-password" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Password">
          </div>
          <div class="column column-data column-grow">
            <input type="password" v-model="password2" placeholder="Confirm Password" autocomplete="new-password" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-if="!loading" v-on:click="signupUserAction">Sign Up</div>
          <div class="column text-button action action-text-center" v-if="loading">Signing up...</div>
        </div>
        <span class="tiny-text tiny-text-spaced">{{ message }}</span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';
import _ from 'lodash'

export default {
  name: 'UserSignUp',
  data: function() {
    return {
      loading: false,
      message: ''
    }
  },
  computed: {
    ...mapFields('authentication', [
      'signup.username',
      'signup.email',
      'signup.password1',
      'signup.password2',
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'signupUser',
      'createCustomer',
    ]),
    signupUserAction: async function() {
      try {
        this.loading = true
        this.message = ''
        await this.signupUser()
        await this.createCustomer()
        this.message = 'Check your email for sign up instructions'
      } catch(err) {
        if (err.message === 'Username cannot be empty') {
          this.message = 'Username cannot be empty'
        } else if (err.message === 'Password cannot be empty') {
          this.message = 'Password cannot be empty'
        } else if (err.message === 'User already exists') {
          this.message = 'User already exists'
        } else if (_.includes(err.message, 'Attributes did not conform to the schema: email: The attribute is required')) {
          this.message = 'Email cannot be empty'
        } else if (err.message === 'Please include an email') {
          this.message = 'Please confirm email'
        } else if (err.message === 'Please confirm password') {
          this.message = 'Please confirm password'
        } else if (err.message === 'Passwords must match') {
          this.message = 'Passwords must match'
        } else {
          this.message = err.message
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>