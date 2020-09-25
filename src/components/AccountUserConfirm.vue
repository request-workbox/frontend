<template>
  <div class="row">
    <div class="column column-full-width">

      <!-- Confirm Sign Up -->

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Confirm Sign Up</div>
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
            <input type="text" class="column-input-text" disabled value="Sign Up Code">
          </div>
          <div class="column column-data column-grow">
            <input type="text" v-model="code" placeholder="Sign Up Code" autocomplete="one-time-code" class="column-input-text">
          </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-if="!loading" v-on:click="confirmUserAction">Confirm Sign Up</div>
          <div class="column text-button action action-text-center" v-if="loading">Confirming...</div>
        </div>
        <span class="tiny-text tiny-text-spaced">{{ message }}</span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'AccountUserConfirm',
  data: function() {
    return {
      loading: false,
      message: ''
    }
  },
  computed: {
    ...mapFields('authentication', [
      'confirm.username',
      'confirm.code',
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'confirmUser'
    ]),
    confirmUserAction: async function() {
      try {
        this.loading = true
        this.message = ''
        await this.confirmUser()
        location.reload()
      } catch(err) {
        this.message = err.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>