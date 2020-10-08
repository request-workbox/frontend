<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <div class="row row-border-bottom" id="site-header-container">
        <div class="column column-full-width">
          <div class="row">
            <div class="column text-button" id="site-header" v-if="!this.$store.getters['cognito/isLoggedIn']">
              Request Workbox
            </div>
            <div class="column text-button" id="site-header-hidden" v-if="this.$store.getters['cognito/isLoggedIn']">
              Request Workbox
            </div>
            <div class="column column-grow"></div>
            <div class="column text-button" id="support-button" v-if="!displaySupportEmail" v-on:click="displaySupportEmailAction">Support</div>
            <div class="column text-button" id="support-button-email" v-if="displaySupportEmail">support@requestworkbox.com</div>
            <div class="column text-button" id="feedback-button" v-on:click="changeDisplayFormAction(true)">Feedback</div>
            <div class="column text-button" id="docs-button">Docs</div>
          </div>
        </div>
      </div>

      <HeaderFeedback />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
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
      changeDisplayFormAction: function(displayForm) {
          this.changeDisplayForm(displayForm)
      },
      displaySupportEmailAction: function() {
        this.displaySupportEmail = true
      }
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