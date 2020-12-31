<template>
  <div id="request-container">
    <!-- <RequestLogin /> -->
    <ProjectInfo />
    <Menu />
    <TableToolbar />
    <Table />
    <TableDetails />
    <TableOptionsToolbar />
    <RequestOptionsActions />
    <RequestOptions />
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex'

import RequestLogin from './RequestLogin'
import ProjectInfo from "./ProjectInfo";
import Menu from "./Menu";
import TableToolbar from "./TableToolbar";
import Table from "./Table";
import TableDetails from "./TableDetails";
import TableOptionsToolbar from "./TableOptionsToolbar";
import RequestOptionsActions from './RequestOptionsActions';
import RequestOptions from "./RequestOptions";
import Footer from './Footer'

export default {
  name: "Request",
  props: ['projectId'],
  components: {
    RequestLogin,
    ProjectInfo,
    Menu,
    TableToolbar,
    Table,
    TableDetails,
    TableOptionsToolbar,
    RequestOptionsActions,
    RequestOptions,
    Footer,
  },
  mounted: function() {
    this.init()
  },
  beforeRouteUpdate (to, from, next) {
    // this.init()
    return next()
  },
  methods: {
    ...mapMutations('schedule',['addToSchedule']),
    ...mapMutations('table',['changeOption', 'setCurrentRoute','updateOrderDirection']),

    ...mapActions('project', ['getProjectName']),
    ...mapActions('table', ['getRequests', 'getRequest', 'getStoragesForSelectOptions']),
    init: async function() {
      this.setCurrentRoute({ route: this.$route.name })
      this.getProjectName({ projectId: this.projectId })
      this.updateOrderDirection({
        orderDirection: localStorage.getItem('orderDirection') || 'descending'
      })
      await this.getStoragesForSelectOptions({ projectId: this.projectId })

      if (this.$route.query && this.$route.query.id) {
        await this.getRequest({ projectId: this.projectId, requestId: this.$route.query.id })
      } else {
        await this.getRequests({ projectId: this.projectId })
      }

      if (this.$route.query && this.$route.query.option) {
        this.changeOption(this.$route.query.option);
      } else {
        this.changeOption('url');
      }

      // Listen to socket
      await this.$store.dispatch('cognito/fetchSession')
      const userSub = this.$store.getters['cognito/userSub']
      if (userSub) {
        Vue.$apiSocket.on(userSub, this.addToSchedule)
        Vue.$jobsSocket.on(userSub, this.addToSchedule)
      }

    }
  }
};
</script>