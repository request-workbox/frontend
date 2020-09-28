<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: "App",
  components: {
    Header,
  },
  mounted: async function() {
    try {
      if (!this.$route.name) {
        return location.assign('/projects')
      }
      
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

@import './src/styles/main';


</style>