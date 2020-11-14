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
                  <p class="user-form-heading-text user-form-heading-text-small">We sent you an email with a reset code</p>
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

              <!-- Reset Code -->
              <div class="row row-justify-between">
                <div class="column column-grow">
                  <div class="row">
                    <div class="column column-full-width user-form-label-container">
                      <label class="user-form-label">Reset Code</label>
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
                      <input type="password" class="user-form-input user-form-input-stretch" autocomplete="new-password" v-model="password1" v-bind:class="{ 'user-form-input-danger':passwordError }">
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
                      <input type="password" class="user-form-input user-form-input-stretch" autocomplete="new-password" v-model="password2" v-bind:class="{ 'user-form-input-danger':passwordError }">
                    </div>
                  </div>
                  <div class="row">
                    <div class="column column-full-width">
                      <p class="user-form-message">{{ passwordMessage }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Confirm Button -->
              <div class="row row-justify-between">
                <div class="column column-grow">
                  <div class="row">
                    <div class="column column-grow column-button user-form-button" v-if="!loadingReset" v-on:click="changePasswordAction">
                      <p class="column-button-text">Reset Password</p>
                    </div>
                    <div class="column column-grow column-button user-form-button" v-if="loadingReset">
                      <p class="column-button-text">Resetting...</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sign in Button -->
              <div class="row row-justify-between">
                <div class="column column-grow">
                  <div class="row row-justify-center">
                    <div class="column user-help-text">
                      <span class="user-help-text-text">Don't have an account?</span><span class="user-help-text-button" v-on:click="goToRegisterUser">Sign up</span>
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
  name: 'UserResetForm',
  data: function() {
    return {
      loadingReset: false,

      usernameMessage: '',
      codeMessage: '',
      passwordMessage: '',

      usernameError: false,
      codeError: false,
      passwordError: false,
    }
  },
  mounted: function() {
    if (this.$route.query && this.$route.query.username) {
      // set username
      this.updateResetUsername(this.$route.query.username)
    }
  },
  computed: {
    ...mapFields('authentication', [
      'change.username',
      'change.password1',
      'change.password2',
      'change.code',
    ]),
  },
  methods: {
    ...mapMutations('authentication', ['updateResetUsername']),
    ...mapActions('authentication', [
      'changePassword'
    ]),
    changePasswordAction: async function() {
      try {
        this.loadingReset = true
        
        this.usernameMessage = ''
        this.codeMessage = ''
        this.passwordMessage = ''

        this.usernameError = false
        this.codeError = false
        this.passwordError = false
        
        await this.changePassword()
        location.assign(`/login?username=${this.username}`)
      } catch(err) {
        if (err.message === 'Please confirm username') {
          this.usernameMessage = 'Please confirm username'
          this.usernameError = true
        } else if (err.message === 'Please enter a username') {
          this.usernameMessage = 'Please enter a username'
          this.usernameError = true
        } else if (err.message === 'Please enter a reset code') {
          this.codeMessage = 'Please enter a reset code'
          this.codeError = true
        } else if (err.message === 'Please enter a password') {
          this.passwordMessage = 'Please enter a password'
          this.passwordError = true
        } else if (err.message === 'Please confirm password') {
          this.passwordMessage = 'Please confirm password'
          this.passwordError = true
        } else if (err.message === 'Passwords must match') {
          this.passwordMessage = 'Passwords must match'
          this.passwordError = true
        } else if (err.message === 'Code cannot be empty') {
          this.codeMessage = 'Please enter a reset code'
          this.codeError = true
        } else if (err.message === 'Invalid verification code provided, please try again.') {
          this.codeMessage = 'Please confirm reset code'
          this.codeError = true
        } else if (err.message === 'Invalid code provided, please request a code again.') {
          this.codeMessage = 'Please request another reset code'
          this.codeError = true
        } else if (err.message === 'Attempt limit exceeded, please try after some time.') {
          this.usernameMessage = 'Attempt limit exceeded. Please contact support.'
          this.usernameError = true
        } else if (err.message === 'Password must contain at least 8 characters') {
          this.passwordMessage = 'Password must contain at least 8 characters'
          this.passwordError = true
        } else if (err.message === "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6") {
          this.passwordMessage = 'Password should contain at least 6 characters'
          this.passwordError = true
        } else if (err.message === 'Password did not conform with policy: Password must have uppercase characters') {
          this.passwordMessage = 'Password should contain at least one uppercase character'
          this.passwordError = true
        } else if (err.message === 'Password did not conform with policy: Password must have numeric characters') {
          this.passwordMessage = 'Password should contain at least one number'
          this.passwordError = true
        } else if (err.message === 'Password did not conform with policy: Password must have lowercase characters') {
          this.passwordMessage = 'Password should contain at least one lowercase character'
          this.passwordError = true
        } else if (err.message === 'Password does not conform to policy: Password must have lowercase characters') {
          this.passwordMessage = 'Password should contain at least one lowercase character'
          this.passwordError = true
        } else if (err.message === 'Password does not conform to policy: Password must have uppercase characters') {
          this.passwordMessage = 'Password should contain at least one uppercase character'
          this.passwordError = true
        } else if (err.message === 'Password did not conform with policy: Password must have symbol characters') {
          this.passwordMessage = 'Password should contain at least one symbol'
          this.passwordError = true
        } else {
          console.log(err.message)
          this.resetMessage = err
        }
      } finally {
        this.loadingReset = false
      }
    },
    goToRegisterUser: function() {
      location.assign('/register')
    }
  }
}
</script>