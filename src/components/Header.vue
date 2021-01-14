<template>
  <div class="row">
    <div class="column column-full-width">

      <div class="row" id="site-header-container">
        <div class="column column-full-width">
          <div class="row">
            <div class="column text-button" id="site-header" v-if="!this.$store.getters['cognito/isLoggedIn']" v-on:click="assignHome">
              Request Workbox
            </div>
            <div class="column text-button" id="site-header-hidden" v-if="this.$store.getters['cognito/isLoggedIn']" v-on:click="assignHome">
              Request Workbox
            </div>
            <div class="column column-grow"></div>
            <div class="column text-button" id="support-button" v-if="!displaySupportEmail" v-on:click="displaySupportEmailAction">Support</div>
            <div class="column text-button" id="support-button-email" v-if="displaySupportEmail">support@requestworkbox.com</div>
            <div class="column text-button" id="feedback-button" v-on:click="changeDisplayFormAction(true)" v-if="this.$store.getters['cognito/isLoggedIn']">Feedback</div>
            <!-- <div class="column text-button" id="docs-button" v-on:click="openDocs">Docs</div> -->
            <div class="column text-button" id="docs-button" v-on:click="openAPI">API</div>
            <div class="column text-button" id="docs-button" v-if="this.$store.getters['cognito/isLoggedIn']" v-on:click="logoutUserAction">Logout</div>
          </div>
        </div>
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
#site-header-container {
  background: #011321;
}
#site-header {
  font-size: 17px;
  font-weight: 700;
  background: #011321;
  color: white;
  border-radius: 0;
}
#site-header-hidden {
  font-size: 17px;
  font-weight: 700;
  background: #011321;
  color: #011321;
}
#feedback-button {
  background: transparent;
  color: white;
}

#docs-button {
  background: transparent;
  color: white;
}

#support-button {
  background: transparent;
  color: white;
}

#support-button-email {
  background: transparent;
  color: white;
  cursor:text;
}
</style>