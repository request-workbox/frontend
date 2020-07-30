<template>
  <div id="environment-container">
    <Nav />
    <ProjectInfo />
    <Menu />
    <TableToolbar />
    <Table />
    <TableDetails />
    <TableOptionsToolbar />
    <EnvironmentOptionsActions />
    <EnvironmentOptions />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

import Nav from './Nav'
import ProjectInfo from "./ProjectInfo";
import Menu from "./Menu";
import TableToolbar from "./TableToolbar";
import Table from "./Table";
import TableDetails from "./TableDetails";
import TableOptionsToolbar from "./TableOptionsToolbar";
import EnvironmentOptionsActions from './EnvironmentOptionsActions';
import EnvironmentOptions from './EnvironmentOptions';

export default {
  name: "Environment",
  props: ["projectId"],
  components: {
    Nav,
    ProjectInfo,
    Menu,
    TableToolbar,
    Table,
    TableDetails,
    TableOptionsToolbar,
    EnvironmentOptionsActions,
    EnvironmentOptions
  },
  mounted: function () {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    this.init();
    return next();
  },
  methods: {
    ...mapMutations('table',['changeOption']),
    ...mapMutations("project", ["changeUrlProjectId"]),
    ...mapActions("project", ["getProjectName"]),
    ...mapActions('table',['getEnvironments']),
    init: function () {
      this.getProjectName({ projectId: this.projectId });
      this.getEnvironments({ projectId: this.projectId });
      this.changeOption('data');
    },
  },
};
</script>

<style lang="scss">
#environment-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;
}
</style>