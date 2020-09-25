<template>
  <div id="app">
    <div class="row row-border-bottom" id="site-header-container">
      <div class="column column-full-width">
        <div class="row">
          <div class="column text-button" id="site-header">Request Workbox</div>
          <div class="column column-grow"></div>
          <div class="column text-button" id="support-button">Support</div>
          <div class="column text-button" id="feedback-button">Feedback</div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
  mounted: async function() {
    try {
      await this.$store.dispatch('cognito/fetchSession')
    } catch(err) {
      if (location.pathname !== '/account') {
        location.assign('/account')
      }
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');

body {
  margin: 0;
}

#app {
  font-family: "Roboto", sans-serif;
}
#site-header-container {
  background: black;
}
#site-header {
  font-size: 17px;
  font-weight: 700;
  background: transparent;
  color: white;
}
#support-button {
  background: transparent;
  color: white;
}
#feedback-button {
  background: transparent;
  color: white;
}

@import './src/styles/main';


</style>