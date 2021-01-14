<template>
  <div id="app">

    <!-- Register/Login Container -->
    <div id="main-view" v-if="!this.$store.getters['cognito/isLoggedIn']">
      <Header />
      <router-view />
    </div>

    <!-- Workflow Container -->
    <div id="main-view" v-if="this.$store.getters['cognito/isLoggedIn'] && $route.name === 'workflow'">
      <Header />
      <router-view />
    </div>

    <!-- Projects/Settings/Billing Container -->
    <div id="left-sidebar" v-if="this.$store.getters['cognito/isLoggedIn'] && $route.name !== 'workflow'">
      <Nav />
    </div>
    <div id="main-view" v-if="this.$store.getters['cognito/isLoggedIn'] && $route.name !== 'workflow'">
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

      if (!this.$route.name) return location.assign('/projects')
    } catch(err) {
      if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/confirm' || location.pathname === '/reset-password' || location.pathname === '/send-reset-password') return
      else location.assign('/register')
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
  // background:#edeff1;
  
}

.v-notices {
  top: 5px !important;
}

.v-toast {
  opacity: 0.9 !important;
  min-height: 3em !important;
}

.v-toast-default {
    background: #2197f3 !important;
    color: white !important;
}

.v-toast-text {
  font-family: "Open Sans", sans-serif;
  padding: 0 1em !important;
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

@import './src/styles/main';
@import './src/styles/account';


</style>