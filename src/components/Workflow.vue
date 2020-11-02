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
    // console.log('loaded 1')
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    // console.log('loaded 2')
    // this.init();
    return next();
  },
  methods: {
    ...mapMutations('schedule', ['addToSchedule']),
    ...mapMutations('table',['changeOption', 'setCurrentRoute','updateOrderDirection']),
    ...mapMutations('schedule', ['updateScheduleOrderDirection', 'updateCurrentTime']),
    ...mapActions("project", ["getProjectName"]),
    ...mapActions('table',['getWorkflows','getWorkflow','getRequestsForSelectOptions']),
    init: async function () {
      this.setCurrentRoute({ route: this.$route.name })
      this.getProjectName({ projectId: this.projectId });
      this.updateOrderDirection({
        orderDirection: localStorage.getItem('orderDirection') || 'descending'
      })
      this.updateScheduleOrderDirection({
        scheduleOrderDirection: localStorage.getItem('scheduleOrderDirection') || 'descending',
        scheduleOrderBy: localStorage.getItem('scheduleOrderBy') || 'date',
      })
      await this.getRequestsForSelectOptions({ projectId: this.projectId })
      
      if (this.$route.query && this.$route.query.id) {
        await this.getWorkflow({ projectId: this.projectId, workflowId: this.$route.query.id })
      } else {
        await this.getWorkflows({ projectId: this.projectId });
      }

      if (this.$route.query && this.$route.query.option) {
        this.changeOption(this.$route.query.option);
      } else {
        this.changeOption('instance');
      }

      // Listen to socket
      await this.$store.dispatch('cognito/fetchSession')
      const userSub = this.$store.getters['cognito/userSub']
      if (userSub) {
        Vue.$apiSocket.on(userSub, this.addToSchedule)
        Vue.$jobsSocket.on(userSub, this.addToSchedule)
      }

      const thisRef = this
      setInterval(function() {
        thisRef.updateCurrentTime()
      }, 1000)
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