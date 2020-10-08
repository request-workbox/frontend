<template>
  <div id="workflow-container">
    <ProjectInfo />
    <Menu />
    <TableToolbar />
    <Table />
    <TableDetails />
    <TableOptionsToolbar />
    <WorkflowOptionsActions />
    <WorkflowOptions />
    <Footer />
    <SocketFooter />
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
import WorkflowOptionsActions from './WorkflowOptionsActions';
import WorkflowOptions from './WorkflowOptions';
import Footer from './Footer'
import SocketFooter from './SocketFooter'

export default {
  name: "Workflow",
  props: ["projectId"],
  components: {
    ProjectInfo,
    Menu,
    TableToolbar,
    Table,
    TableDetails,
    TableOptionsToolbar,
    WorkflowOptionsActions,
    WorkflowOptions,
    Footer,
    SocketFooter
  },
  mounted: function () {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    this.init();
    return next();
  },
  methods: {
    ...mapMutations('table',['changeOption', 'setCurrentRoute']),
    ...mapActions("project", ["getProjectName"]),
    ...mapActions('table',['getWorkflows','getRequestsForSelectOptions']),
    init: function () {
      this.setCurrentRoute({ route: this.$route.name })
      this.getProjectName({ projectId: this.projectId });
      this.getWorkflows({ projectId: this.projectId });
      this.getRequestsForSelectOptions({ projectId: this.projectId })
      this.changeOption('instance');
    },
  },
};
</script>

<style lang="scss">
#workflow-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;
}
</style>