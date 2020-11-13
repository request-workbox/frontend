<template>
  <div class="row">
    <div class="column column-full-width">

      <!-- Reset Password -->

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Reset Password</div>
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
          <div class="column text-button action action-text-center" v-if="!loadingEmail" v-on:click="resetPasswordAction">Send Reset Email</div>
          <div class="column text-button action action-text-center" v-if="loadingEmail">Sending...</div>
        </div>
        <span class="tiny-text tiny-text-spaced">{{ emailMessage }}</span>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Password">
          </div>
          <div class="column column-data column-grow">
            <input type="password" v-model="password1" placeholder="New Password" autocomplete="new-password" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Password">
          </div>
          <div class="column column-data column-grow">
            <input type="password" v-model="password2" placeholder="Confirm New Password" autocomplete="new-password" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Reset Code">
          </div>
          <div class="column column-data column-grow">
            <input type="text" v-model="code" placeholder="Enter Reset Code From Reset Email" autocomplete="one-time-code" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-if="!loadingReset" v-on:click="changePasswordAction">Reset</div>
          <div class="column text-button action action-text-center" v-if="loadingReset">Resetting...</div>
        </div>
        <span class="tiny-text tiny-text-spaced">{{ resetMessage }}</span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'UserReset',
  data: function() {
    return {
      loadingEmail: false,
      loadingReset: false,

      emailMessage: '',
      resetMessage: '',
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
    ...mapActions('authentication', [
      'resetPassword',
      'changePassword'
    ]),
    resetPasswordAction: async function() {
      try {
        this.emailMessage = ''
        this.loadingEmail = true
        await this.resetPassword()
        this.emailMessage = 'Please check email and continue with reset.'
      } catch(err) {
        if (err.message === 'Username cannot be empty') {
          this.emailMessage = 'Username cannot be empty'
        } else if (err.message === 'Attempt limit exceeded, please try after some time.') {
          this.emailMessage = 'Attempt limit exceeded, please try after some time.'
        } else {
          this.emailMessage = err
        }
      } finally {
        this.loadingEmail = false
      }
    },
    changePasswordAction: async function() {
      try {
        this.resetMessage = ''
        this.loadingReset = true
        await this.changePassword()
        location.reload()
      } catch(err) {
        if (err.message === 'Please confirm username') {
          this.resetMessage = 'Please confirm username'
        } else if (err.message === 'Please confirm password') {
          this.resetMessage = 'Please confirm password'
        } else if (err.message === 'Passwords must match') {
          this.resetMessage = 'Passwords must match'
        } else if (err.message === 'Code cannot be empty') {
          this.resetMessage = 'Code cannot be empty'
        } else if (err.message === 'Invalid verification code provided, please try again.') {
          this.resetMessage = 'Invalid verification code provided, please try again.'
        } else if (err.message === 'Invalid code provided, please request a code again.') {
          this.resetMessage = 'Invalid code provided, please request a code again.'
        } else if (err.message === 'Attempt limit exceeded, please try after some time.') {
          this.resetMessage = 'Attempt limit exceeded, please try after some time.'
        } else {
          this.resetMessage = err
        }
      } finally {
        this.loadingReset = false
      }
    },
  }
}
</script>