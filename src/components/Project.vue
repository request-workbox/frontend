<template>
  <div id="project-container">
    <Menu />
    <ProjectList />
    <Footer />
    <SocketFooter />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

import Menu from "./Menu";
import ProjectList from './ProjectList'
import SocketFooter from './SocketFooter'
import Footer from './Footer'

export default {
  name: "Project",
  components: {
    Menu,
    ProjectList,
    SocketFooter,
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
    ...mapMutations('table', ['setCurrentRoute']),
    ...mapActions("project", ["getProjects"]),
    init: function () {
      this.setCurrentRoute({ route: this.$route.name })
      this.getProjects();
    },
  },
};
</script>

<style lang="scss">
#project-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;
}
</style>