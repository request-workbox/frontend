<template>
  <div id="workflow-container">
    <ProjectInfo />
    <Menu />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

import ProjectInfo from "./ProjectInfo";
import Menu from "./Menu";

export default {
  name: "Workflow",
  props: ["projectId"],
  components: {
    ProjectInfo,
    Menu,
  },
  mounted: function () {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    this.init();
    return next();
  },
  methods: {
    ...mapMutations("project", ["changeUrlProjectId"]),
    ...mapActions("project", ["getProjectName"]),
    ...mapActions('table',['getWorkflows']),
    init: function () {
      this.getProjectName({ projectId: this.projectId });
      this.getWorkflows({ projectId: this.projectId });
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