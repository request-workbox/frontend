<template>
  <div id="sidebar">
    <SidebarDetail />
    <SidebarUser />
    <SidebarNav />
  </div>
</template>

<script>
import SidebarUser from "./SidebarUser";
import SidebarDetail from "./SidebarDetail";
import SidebarNav from './SidebarNav'

export default {
  name: "Sidebar",
  components: {
    SidebarUser,
    SidebarDetail,
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