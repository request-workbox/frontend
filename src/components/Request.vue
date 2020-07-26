<template>
  <div id="request-container">
    <!-- <RequestLogin /> -->
    <ProjectInfo />
    <Menu />
    <TableToolbar />
    <Table />
    <RequestDetails />
    <RequestOptionsToolbar />
    <RequestOptionsActions />
    <RequestOptions />
    <RequestFooter />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import RequestLogin from './RequestLogin'
import ProjectInfo from "./ProjectInfo";
import Menu from "./Menu";
import TableToolbar from "./TableToolbar";
import Table from "./Table";
import RequestDetails from "./RequestDetails";
import RequestOptionsToolbar from "./RequestOptionsToolbar";
import RequestOptionsActions from './RequestOptionsActions';
import RequestOptions from "./RequestOptions";
import RequestFooter from "./RequestFooter";

export default {
  name: "Request",
  props: ['projectId'],
  components: {
    RequestLogin,
    ProjectInfo,
    Menu,
    TableToolbar,
    Table,
    RequestDetails,
    RequestOptionsToolbar,
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