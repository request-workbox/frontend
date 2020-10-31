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
  </div>
</template>

<script>
import Vue from 'vue'
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
  },
  mounted: function () {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    this.init();
    return next();
  },
  methods: {
    ...mapMutations('schedule', ['addToSchedule']),
    ...mapMutations('table',['changeOption', 'setCurrentRoute','updateOrderDirection']),
    ...mapActions("project", ["getProjectName"]),
    ...mapActions('table',['getWorkflows','getRequestsForSelectOptions']),
    init: async function () {
      this.setCurrentRoute({ route: this.$route.name })
      this.getProjectName({ projectId: this.projectId });
      this.updateOrderDirection(localStorage.getItem('orderDirection'))
      this.getWorkflows({ projectId: this.projectId });
      this.getRequestsForSelectOptions({ projectId: this.projectId })
      this.changeOption('instance');

      // Listen to socket
      await this.$store.dispatch('cognito/fetchSession')
      const userSub = this.$store.getters['cognito/userSub']
      if (userSub) {
        Vue.$apiSocket.on(userSub, this.addToSchedule)
        Vue.$jobsSocket.on(userSub, this.addToSchedule)
      }
      
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