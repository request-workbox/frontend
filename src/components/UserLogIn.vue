<template>
  <div class="row" id="user-sign-up">
    <div class="column column-full-width">


      <div class="row row-align-start row-height-100">
        <!-- Login -->
        <div class="column column-grow">
          <UserLoginForm />
        </div>
      </div>

      <!-- Login -->

      <div class="row row-align-start row-height-20">
        <!-- Login -->
        <div class="column column-grow">
          
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'

import UserLoginForm from './UserLoginForm'

export default {
  name: 'UserLogin',
  components: {
    UserLoginForm,
  }
}
</script>