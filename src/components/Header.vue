<template>
  <div class="row" id="header-row">
    <div class="column column-full-width">

      <div class="row">
        <div class="column" id="site-header" v-on:click="assignHome">
          Request Workbox
        </div>
        <div class="column-grow"></div>

        <div id="support-button" v-if="this.$store.getters['cognito/isLoggedIn'] && !displaySupportEmail" v-on:click="displaySupportEmailAction">Support</div>
        <div id="support-button-email" v-if="this.$store.getters['cognito/isLoggedIn'] && displaySupportEmail">support@requestworkbox.com</div>
        <div id="feedback-button" v-on:click="changeDisplayFormAction(true)" v-if="this.$store.getters['cognito/isLoggedIn']">Feedback</div>
        <div id="docs-button" v-on:click="openAPI">API</div>
        <div id="docs-button" v-if="this.$store.getters['cognito/isLoggedIn']" v-on:click="logoutUserAction">Logout</div>

      </div>

      <HeaderFeedback />

    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import HeaderFeedback from './HeaderFeedback'

export default {
  name: "Header",
  data: function() {
    return {
      displaySupportEmail: false
    }
  },
  components: {
    HeaderFeedback,
  },
  methods: {
      ...mapMutations('header', ['changeDisplayForm']),
      ...mapActions('authentication', ['logoutUser']),

      changeDisplayFormAction: function(displayForm) {
          this.changeDisplayForm(displayForm)
      },
      displaySupportEmailAction: function() {
        this.displaySupportEmail = true
      },
      assignHome: function() {
        location.assign('/')
      },
      openDocs: function() {
        window.open('https://requestworkbox.zendesk.com/hc/en-us')
      },
      openDiscord: function() {
        window.open('https://discord.gg/XuG5x3HV98')
      },
      openAPI: function() {
        window.open('https://www.npmjs.com/package/request-workbox')
      },
      logoutUserAction: async function() {
      try {
        await this.logoutUser()
        location.assign('/login')
      } catch(err) {
        // console.log(err)
      }
    },
  }
};
</script>

<style lang="scss">
#header-row {
  display: block;
  background: #011321;

  width: 100%;
  width: fit-content;
  width: -webkit-fill-available;
}
#site-header {
  font-size: 17px;
  font-weight: 700;
  background: #011321;
  color: white;
  border-radius: 0;
  padding: 8px;
  cursor: pointer;
}
#feedback-button {
  background: transparent;
  color: white;
  font-size: 12px;
  padding: 8px;
  cursor: pointer;
}

#docs-button {
  background: transparent;
  color: white;
  font-size: 12px;
  padding: 8px;
  cursor: pointer;
}

#support-button {
  background: transparent;
  color: white;
  font-size: 12px;
  padding: 8px;
  cursor: pointer;
}

#support-button-email {
  background: transparent;
  color: white;
  cursor:text;
  font-size: 12px;
  padding: 8px;
  cursor: pointer;
}
</style>