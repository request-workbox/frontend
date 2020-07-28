<template>
  <div id="request-container">
    <!-- <RequestLogin /> -->
    <Nav />
    <ProjectInfo />
    <Menu />
    <TableToolbar />
    <Table />
    <TableDetails />
    <TableOptionsToolbar />
    <RequestOptionsActions />
    <RequestOptions />
    <RequestFooter />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import RequestLogin from './RequestLogin'
import Nav from './Nav'
import ProjectInfo from "./ProjectInfo";
import Menu from "./Menu";
import TableToolbar from "./TableToolbar";
import Table from "./Table";
import TableDetails from "./TableDetails";
import TableOptionsToolbar from "./TableOptionsToolbar";
import RequestOptionsActions from './RequestOptionsActions';
import RequestOptions from "./RequestOptions";
import RequestFooter from "./RequestFooter";

export default {
  name: "Request",
  props: ['projectId'],
  components: {
    RequestLogin,
    Nav,
    ProjectInfo,
    Menu,
    TableToolbar,
    Table,
    TableDetails,
    TableOptionsToolbar,
    RequestOptionsActions,
    RequestOptions,
    RequestFooter
  },
  mounted: function() {
    this.init()
  },
  beforeRouteUpdate (to, from, next) {
    this.init()
    return next()
  },
  methods: {
    ...mapMutations('project', ['changeUrlProjectId']),
    ...mapActions('project', ['getProjectName']),
    
    ...mapActions('table', ['getRequests']),
    init: function() {
      this.getProjectName({ projectId: this.projectId })
      this.getRequests({ projectId: this.projectId })
    }
  }
};
</script>