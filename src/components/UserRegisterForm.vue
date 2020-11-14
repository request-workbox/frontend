<template>
  <div class="row" id="user-form-container">
    <div class="column column-full-width" id="user-form">

      <!-- Heading -->
      <div class="row">
        <div class="column-column-full-width">
          <p class="user-form-heading-text">Create your free Request Workbox account</p>
        </div>
      </div>

      <!-- Email -->
      <div class="row row-justify-between">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width user-form-label-container">
              <label class="user-form-label">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="column column-full-width">
              <input type="text" class="user-form-input" autocomplete="email" v-model="email" v-bind:class="{ 'user-form-input-danger':emailError }">
            </div>
          </div>
          <div class="row">
            <div class="column column-full-width">
              <p class="user-form-message">{{ emailMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Username -->
      <div class="row row-justify-between">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width user-form-label-container">
              <label class="user-form-label">Username</label>
            </div>
          </div>
          <div class="row">
            <div class="column column-full-width">
              <input type="text" class="user-form-input" autocomplete="username" v-model="username" v-bind:class="{ 'user-form-input-danger':usernameError }">
            </div>
          </div>
          <div class="row">
            <div class="column column-full-width">
              <p class="user-form-message">{{ usernameMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Password -->
      <div class="row row-justify-between">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width user-form-label-container">
              <label class="user-form-label">Password</label>
            </div>
          </div>
          <div class="row">
            <div class="column column-full-width">
              <input type="password" class="user-form-input" autocomplete="new-password" v-model="password1" v-bind:class="{ 'user-form-input-danger':passwordError }">
            </div>
          </div>
          <div class="row">
            <div class="column column-full-width">
              <p class="user-form-message">{{ passwordMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Confirm Password -->
      <div class="row row-justify-between">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width user-form-label-container">
              <label class="user-form-label">Confirm Password</label>
            </div>
          </div>
          <div class="row">
            <div class="column column-full-width">
              <input type="password" class="user-form-input" autocomplete="new-password" v-model="password2" v-bind:class="{ 'user-form-input-danger':passwordError }">
            </div>
          </div>
          <div class="row">
            <div class="column column-full-width">
              <p class="user-form-message">{{ passwordMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Create account Button -->
      <div class="row row-justify-between">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-grow column-button user-form-button" v-if="!loading" v-on:click="signupUserAction">
              <p class="column-button-text">Create account</p>
            </div>
            <div class="column column-grow column-button user-form-button" v-if="loading">
              <p class="column-button-text">Creating account...</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sign in Button -->
      <div class="row row-justify-between">
        <div class="column column-grow">
          <div class="row row-justify-center">
            <div class="column user-help-text">
              <span class="user-help-text-text">Have an account?</span><span class="user-help-text-button" v-on:click="goToLoginUser">Sign in</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';
import _ from 'lodash'

export default {
  name: 'UserRegisterForm',
  data: function() {
    return {
      loading: false,
      emailMessage: '',
      usernameMessage: '',
      passwordMessage: '',

      emailError: false,
      usernameError: false,
      passwordError: false,
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
        this.emailMessage = ''
        this.usernameMessage = ''
        this.passwordMessage = ''

        this.emailError = false
        this.usernameError = false
        this.passwordError = false


        await this.signupUser()
        await this.createCustomer()
        location.assign(`/confirm?username=${this.username}`)
        this.message = 'Check your email for sign up instructions'
      } catch(err) {
        if (err.message === 'Username cannot be empty') {
          this.usernameMessage = 'Please enter a unique username'
          this.usernameError = true
        } else if (err.message === 'Email cannot be empty') {
          this.emailMessage = 'Please enter an email address'
          this.emailError = true
        } else if (err.message === 'Password cannot be empty') {
          this.passwordMessage = 'Please enter a password'
          this.passwordError = true
        } else if (err.message === 'User already exists') {
          this.usernameMessage = 'Username already exists'
          this.usernameError = true
        } else if (_.includes(err.message, 'Attributes did not conform to the schema: email: The attribute is required')) {
          this.emailMessage = 'Please enter an email address'
          this.emailError = true
        } else if (err.message === 'Please include an email') {
          this.emailMessage = 'Please enter an email address'
          this.emailError = true
        } else if (err.message === 'Please confirm password') {
          this.passwordMessage = 'Please confirm password'
          this.passwordError = true
        } else if (err.message === 'Passwords must match') {
          this.passwordMessage = 'Passwords must match'
          this.passwordError = true
        } else if (err.message === 'Password must contain at least 8 characters') {
          this.passwordMessage = 'Password must contain at least 8 characters'
          this.passwordError = true
        } else if (err.message === "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6") {
          this.passwordMessage = 'Password should contain at least 6 characters'
          this.passwordError = true
        } else if (err.message === 'Invalid email address format.') {
          this.emailMessage = 'Please enter a valid email address'
          this.emailError = true
        } else if (err.message === 'Password did not conform with policy: Password must have uppercase characters') {
          this.passwordMessage = 'Password should contain at least one uppercase character'
          this.passwordError = true
        } else if (err.message === 'Password did not conform with policy: Password must have numeric characters') {
          this.passwordMessage = 'Password should contain at least one number'
          this.passwordError = true
        } else if (err.message === 'Password did not conform with policy: Password must have lowercase characters') {
          this.passwordMessage = 'Password should contain at least one lowercase character'
          this.passwordError = true
        } else if (err.message === 'Password did not conform with policy: Password must have symbol characters') {
          this.passwordMessage = 'Password should contain at least one symbol'
          this.passwordError = true
        } else {
          this.passwordMessage = err.message
          this.passwordError = true
        }
      } finally {
        this.loading = false
      }
    },
    goToLoginUser: function() {
      location.assign('/login')
    }
  }
}
</script>