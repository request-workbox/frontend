<template>
  <div class="row" id="user-sign-up">
    <div class="column column-full-width">


      <div class="row row-align-start row-height-100">
        <!-- Marketing Info -->
        <div class="column column-45 column-right-border" id="signup-marketing-container">
          <UserRegisterMarketing />
        </div>
        <!-- Register -->
        <div class="column column-grow" id="main-user-form-container">
          <UserRegisterForm />
        </div>
      </div>

      <!-- Sign Up -->

      <div class="row row-align-start row-height-20">
        <!-- Marketing Info -->
        <div class="column column-45 column-right-border" id="signup-marketing-container">
          
        </div>
        <!-- Register -->
        <div class="column column-grow" id="main-user-form-container">
          
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'

import UserRegisterForm from './UserRegisterForm'
import UserRegisterMarketing from './UserRegisterMarketing'

export default {
  name: 'UserRegister',
  components: {
    UserRegisterForm,
    UserRegisterMarketing,
  }
}
</script>