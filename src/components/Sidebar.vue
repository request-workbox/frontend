<template>
  <div id="sidebar">
    <SidebarDetail />
    <div class="spacer"></div>
    <SidebarNav />
  </div>
</template>

<script>
import SidebarDetail from "./SidebarDetail";
import SidebarNav from './SidebarNav'

export default {
  name: "Sidebar",
  components: {
    SidebarDetail,
    SidebarNav
  }
};
</script>

<style lang="scss" scoped>
#sidebar {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
.spacer {
  border-color: #353535;
  border-style: solid;
  border-width: thin 0 0 0;

  margin:0;
  padding:0;
}
</style>