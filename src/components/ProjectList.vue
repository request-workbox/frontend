<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-20">Project Id</div>
        <div class="column column-data column-header-text column-grow">Project Name</div>
      </div>

      <div class="row row-border-bottom project-row" v-for="(project) in projects" :key="project._id">
        <div class="column column-data column-20">{{ project._id }}</div>
        <div class="column column-data column-grow">{{ project.name }}</div>
        <div class="column column-data text-button" v-on:click="navigateToRoute('requests', project._id)">Requests</div>
        <div class="column column-data text-button" v-on:click="navigateToRoute('workflows', project._id)">Workflows</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProjectList",
  computed: {
    ...mapState("project", ["projects"]),
  },
  methods: {
    navigateToRoute: function(route, projectId) {
      location.assign(`/projects/${projectId}/${route}`)
    }
  }
};
</script>

<style lang="scss">
.project-row:hover {
  background: #ececec;
}
</style>