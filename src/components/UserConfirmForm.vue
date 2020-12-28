<template>
  <div class="row">
    <div class="column column-full-width">


      <div class="row">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width text-center user-form-header-small">
              <img src="/favicon2.png" alt="" id="small-img-container" class="small-img">
            </div>
          </div>
        </div>
      </div>


      <div class="row row-justify-center">
        <div class="column column-300 user-form-box">
          <div class="row">
            <div class="column column-full-width">
              
              <!-- Form Begins -->

              <!-- Heading -->
              <div class="row">
                <div class="column-column-full-width">
                  <p class="user-form-heading-text user-form-heading-text-small">We sent you an email with a sign up code</p>
                </div>
              </div>

              <!-- Username -->
              <div class="row row-justify-between">
                <div class="column column-grow">
                  <div class="row row-justify-between">
                    <div class="column column-full-width user-form-label-container">
                      <label class="user-form-label">Username</label>
                    </div>
                    <div class="column user-help-text-small column-full-width column-left-heading user-form-label-container">
                      <span class="user-help-text-button-grey" v-if="!resentCode" v-on:click="confirmUserAction(true)">Resend sign up code</span>
                      <span class="user-help-text-button-grey" v-if="resentCode">Sent code!</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="column column-full-width">
                      <input type="text" class="user-form-input user-form-input-stretch" autocomplete="username" v-model="username" v-bind:class="{ 'user-form-input-danger':usernameError }">
                    </div>
                  </div>
                  <div class="row">
                    <div class="column column-full-width">
                      <p class="user-form-message">{{ usernameMessage }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sign Up Code -->
              <div class="row row-justify-between">
                <div class="column column-grow">
                  <div class="row row-justify-between">
                    <div class="column column-full-width user-form-label-container">
                      <label class="user-form-label">Sign Up Code</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="column column-full-width">
                      <input type="text" class="user-form-input user-form-input-stretch" autocomplete="one-time-code" v-model="code" v-bind:class="{ 'user-form-input-danger':codeError }">
                    </div>
                  </div>
                  <div class="row">
                    <div class="column column-full-width">
                      <p class="user-form-message">{{ codeMessage }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Confirm Button -->
              <div class="row row-justify-between">
                <div class="column column-grow">
                  <div class="row">
                    <div class="column column-grow column-button user-form-button" v-if="!loading" v-on:click="confirmUserAction(false)">
                      <p class="column-button-text">Confirm</p>
                    </div>
                    <div class="column column-grow column-button user-form-button" v-if="loading">
                      <p class="column-button-text">Confirming...</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sign in Button -->
              <div class="row row-justify-between">
                <div class="column column-grow">
                  <div class="row row-justify-center">
                    <div class="column user-help-text">
                      <span class="user-help-text-text">Don't have an account?</span><span class="user-help-text-button" v-on:click="goToRegisterUser">Register free</span>
                    </div>
                  </div>
                  <div class="row row-justify-center">
                    <div class="column user-help-text">
                      <span class="user-help-text-text">Have an account?</span><span class="user-help-text-button" v-on:click="goToLoginUser">Sign in</span>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'UserConfirmForm',
  data: function() {
    return {
      loading: false,
      usernameMessage: '',
      usernameError: false,
      codeMessage: '',
      codeError: false,

      resentCode: false
    }
  },
  computed: {
    ...mapFields('authentication', [
      'confirm.username',
      'confirm.code',
    ]),
  },
  mounted: function() {
    if (this.$route.query && this.$route.query.username) {
      // set username
      this.updateConfirmUsername(this.$route.query.username)
    }
  },
  methods: {
    ...mapMutations('authentication', ['updateConfirmUsername']),
    ...mapActions('authentication', [
      'confirmUser',
      'updateCustomer',
      'resendConfirmation',
    ]),
    confirmUserAction: async function(reset) {
      try {

        this.usernameMessage = ''
        this.codeMessage = ''
        this.usernameError = false
        this.codeError = false

        if (reset) {
          await this.resendConfirmation()
          this.resentCode = true
        } else {
          this.loading = true
          await this.confirmUser()
          await this.updateCustomer()
          location.assign(`/login?username=${this.username}`)
        }
        
      } catch(err) {
        if (err.message === 'Please confirm sign up code') {
          this.codeMessage = 'Please enter a sign up code'
          this.codeError = true
        } else if (err.message === 'Please confirm username') {
          this.usernameMessage = err.message
          this.usernameError = true
        } else if (err.message === 'Invalid verification code provided, please try again.') {
          this.codeMessage = 'Invalid validation code'
          this.codeError = true
        } else if (err.message === 'Invalid code provided, please request a code again.') {
          this.codeMessage = 'Please request another code'
          this.codeError = true
        } else {
          this.codeMessage = err.message
          this.codeError = true
        }
      } finally {
        this.loading = false
      }
    },
    goToLoginUser: function() {
      location.assign('/login')
    },
    goToRegisterUser: function() {
      location.assign('/register')
    },
  }
}
</script>