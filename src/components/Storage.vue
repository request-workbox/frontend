<template>
  <div id="storage-container">
    <ProjectInfo />
    <Menu />
    <TableToolbar />
    <Table />
    <TableDetails />
    <TableOptionsToolbar />
    <StorageOptionsActions />
    <StorageOptions />
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

import ProjectInfo from "./ProjectInfo";
import Menu from "./Menu";
import TableToolbar from "./TableToolbar";
import Table from "./Table";
import TableDetails from "./TableDetails";
import TableOptionsToolbar from "./TableOptionsToolbar";
import StorageOptionsActions from './StorageOptionsActions';
import StorageOptions from './StorageOptions';
import Footer from './Footer'

export default {
  name: "Storage",
  props: ["projectId"],
  components: {
    ProjectInfo,
    Menu,
    TableToolbar,
    Table,
    TableDetails,
    TableOptionsToolbar,
    StorageOptionsActions,
    StorageOptions,
    Footer,
  },
  mounted: function () {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    this.init();
    return next();
  },
  methods: {
    ...mapMutations('table',['changeOption', 'setCurrentRoute','updateOrderDirection']),
    ...mapActions("project", ["getProjectName"]),
    ...mapActions('table',['getStorages']),
    init: function () {
      this.setCurrentRoute({ route: this.$route.name })
      this.updateOrderDirection(localStorage.getItem('orderDirection'))
      this.getProjectName({ projectId: this.projectId });
      this.getStorages({ projectId: this.projectId });
      this.changeOption('details');
    },
  },
};
</script>

<style lang="scss">
#storage-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;
}
</style>