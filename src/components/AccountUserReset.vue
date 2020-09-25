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
          <div class="column text-button action action-text-center">Send Reset Email</div>
        </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Password">
          </div>
          <div class="column column-data column-grow">
            <input type="text" v-model="password1" placeholder="New Password" autocomplete="new-password" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
            <input type="text" class="column-input-text" disabled value="Password">
          </div>
          <div class="column column-data column-grow">
            <input type="text" v-model="password2" placeholder="Confirm New Password" autocomplete="new-password" class="column-input-text">
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
          <div class="column text-button action action-text-center">Reset</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'AccountUserReset',
  computed: {
    ...mapFields('authentication', [
      'change.username',
      'change.password1',
      'change.password2',
      'change.code',
    ]),
  }
}
</script>