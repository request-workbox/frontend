<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
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