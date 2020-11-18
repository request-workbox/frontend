<template>
  <div class="row">
    <div class="column column-full-width table-row-data">
      
      <ProjectToolbar />

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-20">Date Created</div>
        <div class="column column-data column-header-text column-grow">Project Name</div>
        <div class="column column-data column-header-text column-20">Project ID</div>
      </div>

      <div class="row row-border-bottom project-row" v-bind:class="{'project-row-selected':shouldBeSelected(project._id)}" v-for="(project) in sortedData()" :key="project._id" v-on:click="selectProjectAction(project._id)">
        <div class="column column-data column-20">{{ projectCreatedAt(project.createdAt) }}</div>
        <div class="column column-data column-grow">{{ project.name }}</div>
        <div class="column column-data column-20">{{ project._id }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectToolbar from './ProjectToolbar'

import moment from 'moment-timezone'
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "ProjectList",
  components: {
    ProjectToolbar,
  },
  computed: {
    ...mapState("project", ["projects",'projectId']),
    ...mapGetters('project', ['sortedData'])
  },
  methods: {
    ...mapMutations('project', ['changeProjectId']),
    navigateToRoute: function(route, projectId) {
      location.assign(`/projects/${projectId}/${route}`)
    },
    selectProjectAction: function(projectId) {
      if (projectId === this.projectId) return this.changeProjectId({ projectId: '' })
      else return this.changeProjectId({ projectId: projectId })
    },
    shouldBeSelected: function(projectId) {
      if (projectId === this.projectId) return true;
      else return false;
    },
    projectCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm a')}`
    }
  }
};
</script>