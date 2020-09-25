<template>
  <div class="row">
    <div class="column column-full-width">

      <!-- Contact Information -->

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Contact Information</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Email"
            disabled
          />
        </div>
        <span class="tiny-text tiny-text-spaced">zacharycoss@gmail.com</span>
      </div>

      <!-- Reset Password -->

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Reset Password</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Username">
          </div>
          <div class="column column-data column-grow">
            <input type="text" v-model="change.username" placeholder="Username" class="column-input-text">
          </div>
      </div>
      
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center">Send Reset Email</div>
        </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Password">
          </div>
          <div class="column column-data column-grow">
            <input type="text" v-model="change.password1" placeholder="New Password" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Password">
          </div>
          <div class="column column-data column-grow">
            <input type="text" v-model="change.password2" placeholder="Confirm New Password" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Reset Code">
          </div>
          <div class="column column-data column-grow">
            <input type="text" v-model="change.code" placeholder="Enter Reset Code From Reset Email" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center">Reset</div>
        </div>
      </div>

      <!-- Signup -->

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Sign Up</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Email">
          </div>
          <div class="column column-data column-grow">
            <input type="text" placeholder="Email" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Username">
          </div>
          <div class="column column-data column-grow">
            <input type="text" placeholder="Username" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Password">
          </div>
          <div class="column column-data column-grow">
            <input type="text" placeholder="Password" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Password">
          </div>
          <div class="column column-data column-grow">
            <input type="text" placeholder="Confirm Password" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center">Sign Up</div>
        </div>
      </div>

      <!-- Confirm Sign Up -->

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Confirm Sign Up</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Username">
          </div>
          <div class="column column-data column-grow">
            <input type="text" placeholder="Username" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Sign Up Code">
          </div>
          <div class="column column-data column-grow">
            <input type="text" placeholder="Sign Up Code" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center">Confirm Sign Up</div>
        </div>
      </div>

      <!-- Log In -->

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Log In</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Username">
          </div>
          <div class="column column-data column-grow">
            <input type="text" placeholder="Username" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Password">
          </div>
          <div class="column column-data column-grow">
            <input type="text" placeholder="Password" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center">Log In</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'AccountBilling',
  computed: {
    ...mapFields('authentication', [
      'login',
      'signup',
      'change',
      'confirm',
    ]),
  }
}
</script>