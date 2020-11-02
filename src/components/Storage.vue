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
    // this.init();
    return next();
  },
  methods: {
    ...mapMutations('table',['changeOption', 'setCurrentRoute','updateOrderDirection']),
    ...mapActions("project", ["getProjectName"]),
    ...mapActions('table',['getStorages','getStorage']),
    init: async function () {
      this.setCurrentRoute({ route: this.$route.name })
      this.getProjectName({ projectId: this.projectId });
      this.updateOrderDirection({
        orderDirection: localStorage.getItem('orderDirection') || 'descending'
      })
      this.changeOption('details');

      if (this.$route.query && this.$route.query.id) {
        await this.getStorage({ projectId: this.projectId, storageId: this.$route.query.id })
      } else {
        await this.getStorages({ projectId: this.projectId });
      }
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