<template>
  <div id="projects-container">
    <ProjectsMenu />
    <ProjectsList />
    <ProjectsDetails />
    <ProjectsSettings />
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import ProjectsMenu from './ProjectsMenu'
import ProjectsList from './ProjectsList'
import ProjectsDetails from './ProjectsDetails'
import ProjectsSettings from './ProjectsSettings'
import Footer from './Footer'

export default {
  name: 'Projects',
  components: {
    ProjectsMenu,
    ProjectsList,
    ProjectsDetails,
    ProjectsSettings,
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
#projects-container {
  display: flex;
  flex-direction: column;

  // align-items: flex-start;
  // overflow-x: hidden;

  margin: 0 15px;
}
</style>