<template>
  <div class="row">
    <div class="column column-full-width">

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
  name: 'AccountUserLogIn',
  computed: {
    ...mapFields('authentication', [
      'login',
    ]),
  }
}
</script>