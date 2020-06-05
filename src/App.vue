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
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

.sidebar {
  display: inline-block;
  position: fixed;

  top: 0;
  bottom: 0;
  left: 0;

  height: 100%;
  width: 200px;

  background: #04012e;
}
.content {
  display: inline-block;
  position: absolute;

  top: 0;
  left: 200px;
  right: 0;

  height: auto;

  background: #04012e;
}
</style>