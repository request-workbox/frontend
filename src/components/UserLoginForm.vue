<template>
  <div class="row" v-if="showForm">
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
                  <p class="user-form-heading-text user-form-heading-text-small">Sign in to your account</p>
                </div>
              </div>

              <!-- Email -->
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

              <!-- Password -->
              <div class="row row-justify-between">
                <div class="column column-grow">
                  <div class="row row-justify-between">
                    <div class="column column-full-width user-form-label-container">
                      <label class="user-form-label">Password</label>
                    </div>
                    <div class="column user-help-text-small column-full-width column-left-heading user-form-label-container">
                      <span class="user-help-text-button-grey" v-on:click="goToSendResetUser">Forgot your password?</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="column column-full-width">
                      <input type="password" class="user-form-input user-form-input-stretch" autocomplete="current-password" v-model="password1" v-bind:class="{ 'user-form-input-danger':passwordError }" v-on:keyup.enter="loginUserAction">
                    </div>
                  </div>
                  <div class="row">
                    <div class="column column-full-width">
                      <p class="user-form-message">{{ passwordMessage }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Login Button -->
              <div class="row row-justify-between">
                <div class="column column-grow">
                  <div class="row">
                    <div class="column column-grow column-button user-form-button" v-if="!loading" v-on:click="loginUserAction">
                      <p class="column-button-text">Continue</p>
                    </div>
                    <div class="column column-grow column-button user-form-button" v-if="loading">
                      <p class="column-button-text">Logging in...</p>
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
  name: 'UserLoginForm',
  data: function() {
    return {
      loading: false,
      usernameMessage: '',
      passwordMessage: '',

      usernameError: false,
      passwordError: false,

      showForm: true,
    }
  },
  mounted: function() {
    if (this.$route.query && this.$route.query.username) {
      // set username
      this.updateLoginUsername(this.$route.query.username)
    }
  },
  computed: {
    ...mapFields('authentication', [
      'login.username',
      'login.password1',
    ]),
  },
  methods: {
    ...mapMutations('authentication', ['updateLoginUsername']),
    ...mapActions('authentication', [
      'loginUser'
    ]),
    loginUserActionKey: async function() {
      if (this.loading) return;

      this.loginUserAction()
    },
    loginUserAction: async function() {
      try {
        this.passwordError = false
        this.usernameError = false
        this.usernameMessage = ''
        this.passwordMessage = ''
        this.loading = true
        await this.loginUser()
        this.showForm = false
        location.assign('/projects')
      } catch(err) {
        if (err.message === 'Incorrect username or password.') {
          this.passwordError = true
          this.passwordMessage = 'Please confirm password'
          this.usernameError = true
          this.usernameMessage = 'Please confirm username'
        } else if (err.message === 'Custom auth lambda trigger is not configured for the user pool.') {
          this.passwordError = true
          this.passwordMessage = 'Please confirm password'
          this.usernameError = true
          this.usernameMessage = 'Please confirm username'
        } else if (err.message === 'Username cannot be empty') {
          this.usernameError = true
          this.usernameMessage = 'Please enter a username'
        } else if (err.message === 'Password cannot be empty') {
          this.passwordError = true
          this.passwordMessage = 'Please enter a password'
        } else if (err.message === 'Password attempts exceeded') {
          this.passwordError = true
          this.passwordMessage = 'Password attempts exceeded. Please contact support.'
        }
      } finally {
        this.loading = false
      }
    },
    goToRegisterUser: function() {
      location.assign('/register')
    },
    goToSendResetUser: function() {
      location.assign('/send-reset-password')
    },
  }
}
</script>