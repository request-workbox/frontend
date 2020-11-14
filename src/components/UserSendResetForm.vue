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
                  <p class="user-form-heading-text user-form-heading-text-small">Send password reset email</p>
                </div>
              </div>

              <!-- Username -->
              <div class="row row-justify-between">
                <div class="column column-grow">
                  <div class="row">
                    <div class="column column-full-width user-form-label-container">
                      <label class="user-form-label">Username</label>
                    </div>
                    <div class="column user-help-text-small column-full-width column-left-heading user-form-label-container">
                      <span class="user-help-text-button-grey" v-on:click="goToResetUser">Already have a code?</span>
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

              <!-- Confirm Button -->
              <div class="row row-justify-between">
                <div class="column column-grow">
                  <div class="row">
                    <div class="column column-grow column-button user-form-button" v-if="!loadingEmail" v-on:click="resetPasswordAction">
                      <p class="column-button-text">Send Reset Email</p>
                    </div>
                    <div class="column column-grow column-button user-form-button" v-if="loadingEmail">
                      <p class="column-button-text">Sending...</p>
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
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'UserResetForm',
  data: function() {
    return {
      loadingEmail: false,
      usernameMessage: '',
      usernameError: false,
    }
  },
  computed: {
    ...mapFields('authentication', [
      'change.username',
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'resetPassword',
    ]),
    resetPasswordAction: async function() {
      try {
        this.usernameMessage = ''
        this.usernameError = false
        this.loadingEmail = true
        await this.resetPassword()
        location.assign(`/reset-password?username=${this.username}`)
      } catch(err) {
        this.usernameError = true
        if (err.message === 'Username cannot be empty') {
          this.usernameMessage = 'Please enter a username'
        } else if (err.message === 'Please enter a username') {
          this.usernameMessage = 'Please enter a username'
        } else if (err.message === 'Attempt limit exceeded, please try after some time.') {
          this.usernameMessage = 'Attempt limit exceeded. Please contact support.'
        } else {
          this.usernameMessage = err.message
        }
      } finally {
        this.loadingEmail = false
      }
    },
    goToRegisterUser: function() {
      location.assign('/register')
    },
    goToResetUser: function() {
      location.assign('/reset-password')
    },
  }
}
</script>