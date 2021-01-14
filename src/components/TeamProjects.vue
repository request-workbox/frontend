<template>
  <div id="team-projects-container">
    <TeamProjectsMenu />
    <TeamProjectsList />
    <TeamProjectsDetails />
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import TeamProjectsMenu from './TeamProjectsMenu'
import TeamProjectsList from './TeamProjectsList'
import TeamProjectsDetails from './TeamProjectsDetails'
import Footer from './Footer'

export default {
  name: 'TeamProjects',
  components: {
    TeamProjectsMenu,
    TeamProjectsList,
    TeamProjectsDetails,
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
    ...mapActions('project', ['listTeamProjects']),
    init: async function () {
      try {
        const projects = await this.listTeamProjects()
      } catch(err) {
        console.log('Team projects error', err.message)
      }
    },
  },
};
</script>

<style lang="scss">
#team-projects-container {
  display: flex;
  flex-direction: column;

  // align-items: flex-start;
  // overflow-x: hidden;

  margin: 0 15px;
}
</style>