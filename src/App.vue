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


export default {
  name: "App",
  components: {
    Header,
    Nav,
  },
  mounted: async function() {
    try {
      await this.$store.dispatch('cognito/fetchSession')

      if (!this.$route.name) {
        return location.assign('/projects')
      }
    } catch(err) {
      if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/confirm' || location.pathname === '/reset-password' || location.pathname === '/send-reset-password') {
        return;
      } else {
        location.assign('/register')
      }
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

input {
  font-family: "Open Sans", sans-serif !important;
}

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
  width: -webkit-fill-available;
}

@media (min-width:320px)  {
   /* tablet, landscape iPad, lo-res laptops ands desktops */ 
   #main-view {
    width: fit-content;
  }
}

@media (min-width:600px)  {
   /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */
   #main-view {
    width: 100%;
    width: -webkit-fill-available;
  }
}

.v-toast-text {
  font-family: "Open Sans", sans-serif;
}

@import './src/styles/main';


</style>