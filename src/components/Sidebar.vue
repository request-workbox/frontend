<template>
  <div id="sidebar">
    <AppDetail />
    <User />
    <SidebarNav />
  </div>
</template>

<script>
import User from "./User";
import AppDetail from "./AppDetail";
import SidebarNav from './SidebarNav'

export default {
  name: "Sidebar",
  components: {
    User,
    AppDetail,
    SidebarNav
  }
};
</script>

<style lang="scss">
#sidebar {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
</style>