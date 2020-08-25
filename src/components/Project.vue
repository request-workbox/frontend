<template>
  <div id="project-container">
    <Nav />
    <Menu />
    <ProjectList />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

import Nav from './Nav'
import Menu from "./Menu";
import ProjectList from './ProjectList'

export default {
  name: "Project",
  components: {
    Nav,
    Menu,
    ProjectList,
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