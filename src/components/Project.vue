<template>
  <div id="project-container">
    <ProjectMenu />
    <ProjectList />
    <ProjectDetails />
    <ProjectSettings />
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import ProjectMenu from './ProjectMenu'
import ProjectList from './ProjectList'
import ProjectDetails from './ProjectDetails'
import ProjectSettings from './ProjectSettings'
import Footer from './Footer'

export default {
  name: 'Project',
  components: {
    ProjectMenu,
    ProjectList,
    ProjectDetails,
    ProjectSettings,
    Footer,
  },
  mounted: function () {
    this.init()
  },
  beforeRouteUpdate(to, from, next) {
    this.init()
    return next()
  },
  methods: {
    ...mapActions('project', ['listProjects']),
    init: async function () {
      try {
        const projects = await this.listProjects()
      } catch(err) {
        console.log('Project error', err.message)
      }
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