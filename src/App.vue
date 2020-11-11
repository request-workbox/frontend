<template>
  <div id="app">
    <div id="left-sidebar" v-if="this.$store.getters['cognito/isLoggedIn']">
      <Nav />
    </div>
    <div id="main-view">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from './components/Header'
import Nav from './components/Nav'
import {loadStripe} from '@stripe/stripe-js';

export default {
  name: "App",
  components: {
    Header,
    Nav,
  },
  mounted: async function() {
    try {
      if (!this.$route.name) {
        return location.assign('/projects')
      }
      
      await this.$store.dispatch('cognito/fetchSession')
      const stripe = await loadStripe('pk_test_51Ha7CVJzZURMKlQ3m7CtvxXK4cFuJbznhCXG39BX675qgw1E33q55v6ZalTcC450sggHyAcZi9GQp1hoB4imONuw00Cggm8OYX')
      Vue.prototype.$stripe = stripe
    } catch(err) {
      if (location.pathname !== '/account') {
        location.assign('/account')
      }
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

body {
  margin: 0;
}

#app {
  font-family: "Open Sans", sans-serif;

  display:flex;
}

#left-sidebar {
  background:#edeff1;
  
}
#main-view {
  width: 100%;
}

.v-toast-text {
  font-family: "Open Sans", sans-serif;
}

@import './src/styles/main';


</style>