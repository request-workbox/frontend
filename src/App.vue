<template>
  <div id="app">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="content">
      <div class="appbar">
        <AppBar />
      </div>
      <div class="view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import AppBar from "./components/AppBar";

export default {
  name: "App",
  components: {
    Sidebar,
    AppBar
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');

#app {
  font-family: "Roboto", sans-serif;
  // font-family: "Open Sans", sans-serif;
}

.sidebar {
  display: block;
  position: fixed;

  top: 0;
  left: 0;
  bottom: 0;

  height: 100%;
  width: 250px;

  background: #04002d;

  z-index: 3;

  padding: 0;
}
.content {
  display: block;
  position: fixed;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  height: 100%;
  width: auto;

  margin-left: 250px;

  overflow: auto;

  padding: 0;

}


.appbar {
  display: block;
  position: fixed;

  width: 100%;

  z-index: 2;
}
.view {
  margin-top: 60px;

  z-index: 1;
}


</style>