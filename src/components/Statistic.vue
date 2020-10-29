<template>
  <div id="statistic-container">
    <ProjectInfo />
    <Menu />
    <TableToolbar />
    <Table />
    <TableDetails />
    <TableOptionsToolbar />
    <StatisticOptions />
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
import StatisticOptions from './StatisticOptions'
import Footer from './Footer'

export default {
  name: "Statistic",
  props: ["projectId"],
  components: {
    ProjectInfo,
    Menu,
    TableToolbar,
    Table,
    TableDetails,
    TableOptionsToolbar,
    StatisticOptions,
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
    ...mapMutations('table',['changeOption','setCurrentRoute','updateSearchTerm']),
    ...mapActions("project", ["getProjectName"]),
    ...mapActions('table',['getInstances', 'getInstance']),
    init: function () {
      this.setCurrentRoute({ route: this.$route.name })
      this.getProjectName({ projectId: this.projectId });
      this.changeOption('details');
      
      if (this.$route.query && this.$route.query.instance) {
        this.getInstance({ projectId: this.projectId, instanceId: this.$route.query.instance })
      } else {
        this.getInstances({ projectId: this.projectId });
      }
    },
  },
};
</script>

<style lang="scss">
#statistic-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;
}
</style>